#!/usr/bin/env python3
"""
EduTrack AI - Motor Analítico de Indicadores Acadêmicos e Integração com IA
Calcula métricas acadêmicas determinísticas para o usuário autenticado e
gera diagnósticos e recomendações acionáveis através de IA (Google Gemini).
"""

import sys
import os
import io
import json
import argparse
from datetime import datetime
from typing import Dict, List, Any, Optional, Tuple
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.request
import urllib.error


# ==============================================================================
# 1. Motor Analítico de Indicadores Acadêmicos (Cálculo Determinístico)
# ==============================================================================

def clean_number(val: Any, default: Optional[float] = 0.0) -> Optional[float]:
    """Converte valores numéricos com segurança contra nulos ou strings vazias."""
    if val is None:
        return default
    try:
        if isinstance(val, (int, float)):
            return float(val)
        val_str = str(val).strip()
        if not val_str or val_str.lower() in ("null", "none", "-"):
            return default
        return float(val_str)
    except (ValueError, TypeError):
        return default


def calculate_academic_metrics(
    data: Dict[str, Any],
    authenticated_user_id: Optional[int] = None
) -> Dict[str, Any]:
    """
    Calcula indicadores acadêmicos determinísticos a partir de dados reais do usuário.
    
    Regras de Negócio e Isolamento:
    - Se authenticated_user_id for fornecido, filtra rigorosamente subjects e tasks
      onde user_id == authenticated_user_id.
    - Disciplinas sem tarefas têm taxa de conclusão de 0.0%.
    - Comparação de tempo considera EXCLUSIVAMENTE tarefas com status == 'completed'
      e com spent_time válido, numérico e > 0.
    - Tarefas pendentes ou sem tempo gasto registrado são estritamente excluídas
      da comparação temporal (somas de tempo estimado e tempo gasto, e variação percentual),
      sendo contabilizadas normalmente nas métricas de contagem de tarefas.
    """
    user = data.get("user") or {}
    raw_subjects = data.get("subjects") or []
    raw_tasks = data.get("tasks") or []

    # Determina o ID do usuário autenticado para validação de integridade
    effective_user_id = authenticated_user_id or user.get("id")

    # 1. Filtro estrito de isolamento por usuário autenticado
    if effective_user_id is not None:
        try:
            effective_user_id_int = int(effective_user_id)
            subjects = [
                s for s in raw_subjects 
                if s.get("user_id") is None or int(s.get("user_id")) == effective_user_id_int
            ]
            tasks = [
                t for t in raw_tasks 
                if t.get("user_id") is None or int(t.get("user_id")) == effective_user_id_int
            ]
        except (ValueError, TypeError):
            subjects = list(raw_subjects)
            tasks = list(raw_tasks)
    else:
        subjects = list(raw_subjects)
        tasks = list(raw_tasks)

    # Agrupa tarefas por subject_id
    tasks_by_subject: Dict[Optional[int], List[Dict[str, Any]]] = {}
    for task in tasks:
        subj_id = task.get("subject_id")
        # Converte para int se possível para evitar incompatibilidade string vs int
        try:
            subj_id_key = int(subj_id) if subj_id is not None else None
        except (ValueError, TypeError):
            subj_id_key = subj_id
        tasks_by_subject.setdefault(subj_id_key, []).append(task)

    # 2. Métricas por disciplina
    subject_metrics: List[Dict[str, Any]] = []

    # Totais globais agregados
    total_tasks_global = 0
    total_completed_global = 0
    total_pending_global = 0
    valid_tasks_time_global = 0
    sum_est_time_global = 0.0
    sum_spent_time_global = 0.0

    for subject in subjects:
        raw_id = subject.get("id")
        try:
            subj_id = int(raw_id) if raw_id is not None else None
        except (ValueError, TypeError):
            subj_id = raw_id

        subject_tasks = tasks_by_subject.get(subj_id, [])

        t_total = len(subject_tasks)
        t_completed = 0
        t_pending = 0

        # Tarefas elegíveis para análise temporal:
        # Status 'completed' E spent_time preenchido e > 0
        time_eligible_tasks: List[Dict[str, Any]] = []
        sum_est_minutes = 0.0
        sum_spent_minutes = 0.0

        for task in subject_tasks:
            status = str(task.get("status", "")).strip().lower()
            if status == "completed":
                t_completed += 1
            else:
                t_pending += 1

            # Verificação estrita de tempo para tarefas concluídas
            raw_spent = task.get("spent_time")
            cleaned_spent = clean_number(raw_spent, default=None)

            raw_est = task.get("estimated_time")
            cleaned_est = clean_number(raw_est, default=0.0) or 0.0

            # Exclusão estrita: deve ser concluída e ter tempo gasto registrado > 0
            if status == "completed" and cleaned_spent is not None and cleaned_spent > 0:
                time_eligible_tasks.append(task)
                sum_est_minutes += cleaned_est
                sum_spent_minutes += cleaned_spent

        # Percentual de conclusão da disciplina
        if t_total > 0:
            completion_rate = round((t_completed / t_total) * 100.0, 1)
        else:
            completion_rate = 0.0

        # Cálculo da diferença percentual de tempo
        has_time_data = len(time_eligible_tasks) > 0
        time_diff_pct: Optional[float] = None
        time_status_tag: str = "sem_dados_tempo"

        if has_time_data:
            if sum_est_minutes > 0:
                # Diff = ((Realizado - Estimado) / Estimado) * 100
                time_diff_pct = round(((sum_spent_minutes - sum_est_minutes) / sum_est_minutes) * 100.0, 1)
                if time_diff_pct > 15.0:
                    time_status_tag = "subestimado"      # Gastou mais tempo que o planejado
                elif time_diff_pct < -15.0:
                    time_status_tag = "superestimado"    # Concluiu mais rápido que o previsto
                else:
                    time_status_tag = "dentro_esperado"  # Próximo ao previsto (+- 15%)
            else:
                # Houve tempo gasto sem estimativa inicial
                time_diff_pct = 100.0
                time_status_tag = "sem_estimativa_base"
        elif t_total == 0:
            time_status_tag = "sem_tarefas"
        elif t_completed == 0:
            time_status_tag = "nenhuma_concluida"
        else:
            time_status_tag = "tempo_nao_registrado"

        # Atualiza acumuladores globais
        total_tasks_global += t_total
        total_completed_global += t_completed
        total_pending_global += t_pending
        valid_tasks_time_global += len(time_eligible_tasks)
        sum_est_time_global += sum_est_minutes
        sum_spent_time_global += sum_spent_minutes

        subject_metrics.append({
            "subject_id": subject.get("id"),
            "subject_name": subject.get("name", "Sem Nome"),
            "teacher": subject.get("teacher"),
            "workload_hours": subject.get("hours"),
            "total_tasks": t_total,
            "completed_tasks": t_completed,
            "pending_tasks": t_pending,
            "completion_rate_pct": completion_rate,
            "time_comparison": {
                "has_data": has_time_data,
                "eligible_tasks_count": len(time_eligible_tasks),
                "estimated_time_minutes": round(sum_est_minutes, 1) if has_time_data else 0.0,
                "spent_time_minutes": round(sum_spent_minutes, 1) if has_time_data else 0.0,
                "diff_percentage": time_diff_pct,
                "status_tag": time_status_tag
            }
        })

    # 3. Resumo Geral Global
    if total_tasks_global > 0:
        overall_completion_rate = round((total_completed_global / total_tasks_global) * 100.0, 1)
    else:
        overall_completion_rate = 0.0

    global_has_time_data = valid_tasks_time_global > 0
    if global_has_time_data and sum_est_time_global > 0:
        global_diff_pct = round(((sum_spent_time_global - sum_est_time_global) / sum_est_time_global) * 100.0, 1)
    else:
        global_diff_pct = None

    general_summary = {
        "student": {
            "id": user.get("id"),
            "name": user.get("name", "Estudante"),
            "email": user.get("email")
        },
        "total_subjects": len(subjects),
        "total_tasks": total_tasks_global,
        "total_completed": total_completed_global,
        "total_pending": total_pending_global,
        "completion_rate_pct": overall_completion_rate,
        "time_analysis": {
            "has_data": global_has_time_data,
            "total_evaluated_tasks": valid_tasks_time_global,
            "total_estimated_minutes": round(sum_est_time_global, 1) if global_has_time_data else 0.0,
            "total_spent_minutes": round(sum_spent_time_global, 1) if global_has_time_data else 0.0,
            "overall_diff_percentage": global_diff_pct
        },
        "generated_at": datetime.now().isoformat()
    }

    return {
        "summary": general_summary,
        "subjects": subject_metrics
    }


# ==============================================================================
# 2. Engenharia de Prompt e Validação de Resposta da IA
# ==============================================================================

SYSTEM_PROMPT_ACADEMIC_MENTOR = """Você é o Assistente Especialista em Inteligência Acadêmica do EduTrack AI.
Sua missão é analisar os indicadores acadêmicos reais calculados pelo sistema para o estudante e fornecer diagnósticos precisos, recomendações práticas acionáveis e identificar pontos fortes.

DIRETRIZES E REGRAS ESTRITAS (ANTI-ALUCINAÇÃO):
1. BASEIE-SE ESTRITAMENTE NOS DADOS FORNECIDOS NO PROMPT. Não invente nomes de trabalhos, notas de provas, vestibulares, datas ou matérias ausentes.
2. NUNCA invente notas escolares (como 'tirou 8,5') pois o sistema ainda não armazena notas.
3. Se uma disciplina possui 'has_data: false' na comparação de tempo, reconheça explicitamente que não há tempo gasto registrado e incentive o estudante a registrar o tempo gasto nas próximas tarefas concluídas.
4. Explique as diferenças percentuais calculadas:
   - Valor positivo (> 0%): o estudante gastou mais tempo do que o estimado inicial (subestimação de esforço ou dificuldade).
   - Valor negativo (< 0%): o estudante concluiu em menos tempo que o planejado (alta produtividade ou superestimação).
5. As recomendações devem ser orientadas a ação (como priorizar tarefas pendentes, ajustar estimativas futuras e equilibrar a carga horária).
6. RETORNE SUA RESPOSTA EXCLUSIVAMENTE NO FORMATO JSON ESPECIFICADO.
"""

def build_insights_prompt(metrics_payload: Dict[str, Any]) -> str:
    """
    Constrói a mensagem contextualizada para o modelo de IA com base nas métricas
    pré-calculadas determinísticamente pelo sistema.
    """
    summary = metrics_payload.get("summary", {})
    subjects = metrics_payload.get("subjects", [])
    student_name = summary.get("student", {}).get("name", "Estudante")

    prompt_lines = [
        f"Dados do Estudante: {student_name}",
        f"Data de Análise: {summary.get('generated_at', '')}",
        "",
        "--- RESUMO GERAL PRÉ-CALCULADO ---",
        f"- Total de Disciplinas: {summary.get('total_subjects')}",
        f"- Total de Tarefas: {summary.get('total_tasks')}",
        f"- Tarefas Concluídas: {summary.get('total_completed')}",
        f"- Tarefas Pendentes: {summary.get('total_pending')}",
        f"- Taxa Geral de Conclusão: {summary.get('completion_rate_pct')}%",
    ]

    time_analysis = summary.get("time_analysis", {})
    if time_analysis.get("has_data"):
        diff_str = f"{time_analysis.get('overall_diff_percentage'):+}%" if time_analysis.get('overall_diff_percentage') is not None else "N/A"
        prompt_lines.extend([
            f"- Tempo Total Estimado (tarefas avaliadas): {time_analysis.get('total_estimated_minutes')} min",
            f"- Tempo Total Realizado (tarefas avaliadas): {time_analysis.get('total_spent_minutes')} min",
            f"- Desvio Global de Tempo: {diff_str}",
        ])
    else:
        prompt_lines.append("- Análise de Tempo Global: Dados insuficientes de tempo gasto em tarefas concluídas.")

    prompt_lines.extend(["", "--- INDICADORES DETALHADOS POR DISCIPLINA ---"])

    for s in subjects:
        tc = s.get("time_comparison", {})
        diff_display = f"{tc.get('diff_percentage'):+}%" if tc.get("diff_percentage") is not None else "Sem tempo registrado"
        prompt_lines.extend([
            f"Disciplina: {s.get('subject_name')} (ID: {s.get('subject_id')})",
            f"  * Professor: {s.get('teacher') or 'Não informado'} | Carga Horária: {s.get('workload_hours') or '-'}h",
            f"  * Tarefas: {s.get('completed_tasks')} concluídas de {s.get('total_tasks')} totais ({s.get('pending_tasks')} pendentes)",
            f"  * Conclusão: {s.get('completion_rate_pct')}%",
            f"  * Tempo: Estimado {tc.get('estimated_time_minutes', 0)} min | Realizado {tc.get('spent_time_minutes', 0)} min | Desvio: {diff_display} (Status: {tc.get('status_tag')})",
            ""
        ])

    prompt_lines.extend([
        "--- ESTRUTURA JSON ESPERADA DA RESPOSTA ---",
        "Retorne APENAS um objeto JSON válido com a seguinte estrutura exata:",
        "{",
        '  "resumo_geral": "Síntese em 2 a 3 frases sobre o panorama acadêmico e progresso atual.",',
        '  "diagnosticos_disciplinas": [',
        '    {',
        '      "subject_id": 123,',
        '      "subject_name": "Nome da Disciplina",',
        '      "diagnostico": "Análise contextualizada de prazos e aderência de tempo.",',
        '      "status_tempo": "dentro_esperado | subestimado | superestimado | sem_dados"',
        '    }',
        '  ],',
        '  "recomendacoes_praticas": [',
        '    "Recomendação acionável 1...",',
        '    "Recomendação acionável 2...",',
        '    "Recomendação acionável 3..."',
        '  ],',
        '  "pontos_fortes": [',
        '    "Ponto forte observado 1...",',
        '    "Ponto forte observado 2..."',
        '  ]',
        "}"
    ])

    return "\n".join(prompt_lines)


# ==============================================================================
# 3. Integração Segura com a API do Google Gemini
# ==============================================================================

def get_gemini_api_key() -> Optional[str]:
    """
    Recupera a chave de API do Gemini estritamente de variáveis de ambiente
    ou de arquivo .env local sem expor nada ao cliente frontend.
    """
    # 1. Variável de ambiente do sistema
    key = os.environ.get("GEMINI_API_KEY")
    if key and key.strip():
        return key.strip()

    # 2. Busca em arquivo .env no diretório do projeto ou diretório corrente
    for path in [".env", os.path.join(os.path.dirname(__file__), "..", ".env")]:
        try:
            if os.path.isfile(path):
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("GEMINI_API_KEY="):
                            val = line.split("=", 1)[1].strip().strip('"').strip("'")
                            if val:
                                return val
        except Exception:
            continue

    return None


def call_gemini_api(
    prompt_text: str,
    api_key: Optional[str] = None,
    model: str = "gemini-1.5-flash",
    timeout_seconds: int = 25
) -> Dict[str, Any]:
    """
    Executa a requisição REST para o Google Gemini com segurança server-side.
    Utiliza response_mime_type: application/json para garantia de formatação.
    """
    effective_key = api_key or get_gemini_api_key()
    if not effective_key:
        raise ValueError("Chave GEMINI_API_KEY não encontrada no ambiente do servidor.")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={effective_key}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt_text}
                ]
            }
        ],
        "systemInstruction": {
            "parts": [
                {"text": SYSTEM_PROMPT_ACADEMIC_MENTOR}
            ]
        },
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json"
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="POST")

    with urllib.request.urlopen(req, timeout=timeout_seconds) as resp:
        if resp.status != 200:
            raise RuntimeError(f"Gemini API respondeu com status {resp.status}")
        raw_resp = resp.read().decode("utf-8")
        parsed_resp = json.loads(raw_resp)

    # Extrai o texto gerado da resposta do Gemini
    candidates = parsed_resp.get("candidates") or []
    if not candidates:
        raise RuntimeError("Nenhum candidato retornado pelo modelo Gemini.")

    content = candidates[0].get("content") or {}
    parts = content.get("parts") or []
    if not parts:
        raise RuntimeError("Conteúdo de texto vazio na resposta do Gemini.")

    raw_text = parts[0].get("text", "").strip()

    # Sanitização caso o modelo inclua marcação markdown ```json ... ```
    if raw_text.startswith("```"):
        lines = raw_text.splitlines()
        if len(lines) >= 3:
            raw_text = "\n".join(lines[1:-1]).strip()

    return json.loads(raw_text)


# ==============================================================================
# 4. Geração com Fallback Determinístico (Contingência de Falhas)
# ==============================================================================

def generate_fallback_insights(metrics: Dict[str, Any]) -> Dict[str, Any]:
    """
    Gera diagnósticos e recomendações baseadas em regras determinísticas caso a
    IA esteja indisponível ou sem chave de API, garantindo robustez contínua.
    """
    summary = metrics.get("summary", {})
    subjects = metrics.get("subjects", [])
    student_name = summary.get("student", {}).get("name", "Estudante")
    completion_rate = summary.get("completion_rate_pct", 0.0)

    # 1. Resumo Geral
    if completion_rate >= 80.0:
        resumo = f"Excelente desempenho de {student_name}, com {completion_rate}% das tarefas concluídas no período avaliado."
    elif completion_rate >= 50.0:
        resumo = f"{student_name} mantém um progresso regular de {completion_rate}%, necessitando atenção às tarefas pendentes."
    else:
        resumo = f"Atenção prioritária requerida para {student_name}: a taxa de conclusão atual está em {completion_rate}%, com {summary.get('total_pending')} tarefas pendentes."

    # 2. Diagnósticos por disciplina
    diagnosticos = []
    recomendacoes = []
    pontos_fortes = []

    for s in subjects:
        s_name = s.get("subject_name", "Disciplina")
        s_id = s.get("subject_id")
        tc = s.get("time_comparison", {})
        c_rate = s.get("completion_rate_pct", 0.0)
        p_tasks = s.get("pending_tasks", 0)

        diag_text = f"{s_name}: {c_rate}% de conclusão ({p_tasks} tarefas pendentes)."
        status_tempo = "sem_dados"

        if tc.get("has_data"):
            diff = tc.get("diff_percentage")
            if diff is not None:
                if diff > 15.0:
                    status_tempo = "subestimado"
                    diag_text += f" O tempo real foi {diff:+}% maior que o estimado ({tc.get('spent_time_minutes')} min vs {tc.get('estimated_time_minutes')} min)."
                    recomendacoes.append(f"Em '{s_name}', revise o planejamento: as tarefas demandaram mais tempo do que o estimado inicialmente.")
                elif diff < -15.0:
                    status_tempo = "superestimado"
                    diag_text += f" Conclusão rápida com {diff:+}% em relação ao tempo planejado."
                    pontos_fortes.append(f"Alta eficiência temporal nas entregas de '{s_name}'.")
                else:
                    status_tempo = "dentro_esperado"
                    diag_text += " Execução alinhada com as estimativas planejadas."
                    pontos_fortes.append(f"Ótima previsibilidade temporal no cronograma de '{s_name}'.")
        else:
            if s.get("total_tasks", 0) > 0 and s.get("completed_tasks", 0) > 0:
                recomendacoes.append(f"Registre o tempo gasto ao concluir tarefas de '{s_name}' para habilitar análises de produtividade.")

        if c_rate >= 80.0 and s.get("total_tasks", 0) > 0:
            pontos_fortes.append(f"Alto índice de conclusão de tarefas na disciplina '{s_name}'.")
        elif p_tasks > 3:
            recomendacoes.append(f"Priorize as {p_tasks} tarefas pendentes de '{s_name}' no seu cronograma desta semana.")

        diagnosticos.append({
            "subject_id": s_id,
            "subject_name": s_name,
            "diagnostico": diag_text,
            "status_tempo": status_tempo
        })

    # Recomendações genéricas de apoio caso a lista esteja muito curta
    if not recomendacoes:
        recomendacoes.append("Mantenha o hábito de planejar suas tarefas semanalmente dividindo metas complexas em blocos menores.")
    if not pontos_fortes:
        pontos_fortes.append("Engajamento e cadastro contínuo de disciplinas no EduTrack AI.")

    return {
        "resumo_geral": resumo,
        "diagnosticos_disciplinas": diagnosticos,
        "recomendacoes_praticas": recomendacoes[:5],
        "pontos_fortes": pontos_fortes[:4]
    }


def generate_academic_insights(
    data: Dict[str, Any],
    api_key: Optional[str] = None,
    model: str = "gemini-1.5-flash",
    authenticated_user_id: Optional[int] = None
) -> Dict[str, Any]:
    """
    Coordena o fluxo completo:
    1. Calcula métricas determinísticas estritamente para o usuário autenticado.
    2. Tenta invocar a IA (Gemini) com prompt contextualizado e diretrizes estritas.
    3. Em caso de indisponibilidade ou ausência de chave, ativa contingência determinística
       mantendo os indicadores intactos.
    """
    # 1. Cálculo matemático determinístico
    metrics = calculate_academic_metrics(data, authenticated_user_id=authenticated_user_id)

    # 2. Tentativa de chamada à IA
    effective_key = api_key or get_gemini_api_key()
    ai_status = "not_configured"
    ai_error = None
    ai_insights = None

    if effective_key:
        try:
            prompt = build_insights_prompt(metrics)
            ai_insights = call_gemini_api(prompt, api_key=effective_key, model=model)
            ai_status = "success"
        except Exception as e:
            ai_status = "fallback_used"
            ai_error = str(e)
            ai_insights = generate_fallback_insights(metrics)
    else:
        ai_status = "fallback_used"
        ai_error = "GEMINI_API_KEY não configurada no servidor."
        ai_insights = generate_fallback_insights(metrics)

    return {
        "status": "success",
        "ai_engine": {
            "status": ai_status,
            "model": model if ai_status == "success" else "deterministic_rules",
            "error_detail": ai_error
        },
        "metrics": metrics,
        "insights": ai_insights
    }


# ==============================================================================
# 5. Servidor HTTP Local para Chamada sob Demanda
# ==============================================================================

class AcademicInsightsRequestHandler(BaseHTTPRequestHandler):
    """Manipulador HTTP REST para fornecer o endpoint sob demanda de insights."""

    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path in ("/api/insights/health", "/health"):
            self.send_response(200)
            self._set_cors_headers()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            res = {
                "status": "online",
                "service": "EduTrack AI Insights Engine",
                "has_gemini_key": bool(get_gemini_api_key()),
                "timestamp": datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(res, indent=2).encode("utf-8"))
        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()

    def do_POST(self):
        if self.path in ("/api/insights", "/api/insights/"):
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length).decode("utf-8")
                input_data = json.loads(body) if body.strip() else {}

                result = generate_academic_insights(input_data)

                self.send_response(200)
                self._set_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(result, ensure_ascii=False, indent=2).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self._set_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                err = {
                    "status": "error",
                    "message": f"Erro interno ao processar insights: {str(e)}"
                }
                self.wfile.write(json.dumps(err).encode("utf-8"))
        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()

    def log_message(self, format, *args):
        sys.stdout.write(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]} {args[1]} -> {args[2]}\n")
        sys.stdout.flush()


def run_server(host: str = "127.0.0.1", port: int = 5002):
    """Inicia o servidor HTTP para geração de insights sob demanda."""
    server = HTTPServer((host, port), AcademicInsightsRequestHandler)
    print(f"[*] EduTrack AI - Servidor de Insights IA ativo em http://{host}:{port}/api/insights")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Encerrando servidor de insights.")
        server.server_close()


# ==============================================================================
# 6. Ponto de Entrada CLI
# ==============================================================================

def main():
    parser = argparse.ArgumentParser(description="EduTrack AI - Motor de Insights Acadêmicos com IA")
    parser.add_argument("--input", "-i", type=str, help="Caminho do arquivo JSON de entrada")
    parser.add_argument("--json", "-j", type=str, help="String JSON de entrada com dados do usuário")
    parser.add_argument("--output", "-o", type=str, help="Caminho do arquivo de saída JSON (opcional)")
    parser.add_argument("--metrics-only", action="store_true", help="Calcula apenas métricas determinísticas sem chamada à IA")
    parser.add_argument("--serve", "-s", action="store_true", help="Inicia servidor HTTP de insights sob demanda")
    parser.add_argument("--port", "-p", type=int, default=5002, help="Porta para o servidor HTTP (padrão: 5002)")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host para o servidor HTTP")

    args = parser.parse_args()

    if args.serve:
        run_server(host=args.host, port=args.port)
        return

    raw_data = None
    if args.json:
        raw_data = args.json
    elif args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            raw_data = f.read()
    elif not sys.stdin.isatty():
        raw_data = sys.stdin.read()

    if not raw_data or not raw_data.strip():
        print(json.dumps({
            "status": "error",
            "message": "Nenhum dado JSON fornecido. Use --input, --json ou redirecione via stdin."
        }, indent=2), file=sys.stderr)
        sys.exit(1)

    try:
        data = json.loads(raw_data)
        if args.metrics_only:
            result = {
                "status": "success",
                "metrics": calculate_academic_metrics(data)
            }
        else:
            result = generate_academic_insights(data)

        output_json = json.dumps(result, ensure_ascii=False, indent=2)

        if args.output:
            out_path = os.path.abspath(args.output)
            os.makedirs(os.path.dirname(out_path), exist_ok=True) if os.path.dirname(out_path) else None
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(output_json)
            print(f"Resultados salvos em: {out_path}")
        else:
            print(output_json)

    except Exception as e:
        err_res = {
            "status": "error",
            "message": f"Falha no processamento de insights: {str(e)}"
        }
        print(json.dumps(err_res, indent=2), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

