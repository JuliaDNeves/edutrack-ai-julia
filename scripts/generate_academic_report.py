#!/usr/bin/env python3
"""
EduTrack AI - Gerador de Relatório Acadêmico em PDF
Utiliza ReportLab para compilar o panorama acadêmico do estudante autenticado
com a identidade visual oficial do EduTrack AI.
"""

import sys
import os
import io
import json
import argparse
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable
)
from reportlab.pdfgen import canvas

# ==============================================================================
# Paleta de Cores e Identidade Visual EduTrack AI
# ==============================================================================
COLOR_PRIMARY_DARK = colors.HexColor("#090d16")   # Fundo principal escuro
COLOR_NAVY_DARK    = colors.HexColor("#0f172a")   # Fundo de cabeçalhos de tabela
COLOR_CYAN_BRAND   = colors.HexColor("#0284c7")   # Cyan institucional / azul destaque
COLOR_CYAN_LIGHT   = colors.HexColor("#53dce3")   # Cyan vibrante do dashboard
COLOR_CYAN_BG      = colors.HexColor("#e0f2fe")   # Fundo suave cyan
COLOR_LILAC_BRAND  = colors.HexColor("#7c3aed")   # Lilás institucional
COLOR_LILAC_LIGHT  = colors.HexColor("#b19bf1")   # Lilás suave
COLOR_LILAC_BG     = colors.HexColor("#f3e8ff")   # Fundo suave lilás
COLOR_BG_CARD      = colors.HexColor("#f8fafc")   # Cinza suave para cartões
COLOR_BORDER       = colors.HexColor("#cbd5e1")   # Linhas e bordas
COLOR_TEXT_MAIN    = colors.HexColor("#0f172a")   # Texto primário
COLOR_TEXT_MUTED   = colors.HexColor("#475569")   # Texto secundário
COLOR_WHITE        = colors.HexColor("#ffffff")
COLOR_GREEN        = colors.HexColor("#059669")
COLOR_AMBER        = colors.HexColor("#d97706")


class NumberedCanvas(canvas.Canvas):
    """
    Canvas customizado de 2 passos para incluir numeração total de páginas
    e rodapé institucional em todas as páginas do relatório.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_TEXT_MUTED)

        # Barra decorativa de rodapé
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(15 * mm, 12 * mm, A4[0] - 15 * mm, 12 * mm)

        # Texto do rodapé
        now_str = datetime.now().strftime("%d/%m/%Y às %H:%M")
        footer_left = f"EduTrack AI • Relatório Acadêmico Oficial • Gerado em {now_str}"
        footer_right = f"Página {self._pageNumber} de {page_count}"

        self.drawString(15 * mm, 8 * mm, footer_left)
        self.drawRightString(A4[0] - 15 * mm, 8 * mm, footer_right)
        self.restoreState()


# ==============================================================================
# Funções Auxiliares de Tratamento e Formatação
# ==============================================================================
def clean_val(val, default="-"):
    """Trata campos vazios sem inventar informações."""
    if val is None:
        return default
    text = str(val).strip()
    return text if text != "" and text.lower() != "null" else default


def format_minutes(minutes):
    """Formata minutos no padrão legível do EduTrack (ex.: '1h 30min' ou '45min')."""
    if minutes is None:
        return "-"
    try:
        total = int(minutes)
        if total <= 0:
            return "0min"
        hrs = total // 60
        mins = total % 60
        if hrs == 0:
            return f"{mins}min"
        if mins == 0:
            return f"{hrs}h"
        return f"{hrs}h {mins}min"
    except (ValueError, TypeError):
        return "-"


def format_date(date_val):
    """Formata strings de datas (YYYY-MM-DD ou ISO) para DD/MM/YYYY."""
    if not date_val:
        return "-"
    try:
        s = str(date_val).split("T")[0].strip()
        parts = s.split("-")
        if len(parts) == 3:
            return f"{parts[2]}/{parts[1]}/{parts[0]}"
        return s
    except Exception:
        return str(date_val)


# ==============================================================================
# Geração Principal do Documento
# ==============================================================================
def generate_pdf_report(data: dict, output_target):
    """
    Compila o documento PDF a partir do dicionário de dados do estudante.
    output_target pode ser um caminho de arquivo (str) ou um buffer de bytes (io.BytesIO).
    """
    user = data.get("user") or {}
    subjects = data.get("subjects") or []
    tasks = data.get("tasks") or []

    # Se for string de caminho de arquivo, garantir existência do diretório
    if isinstance(output_target, str):
        out_dir = os.path.dirname(os.path.abspath(output_target))
        if out_dir:
            os.makedirs(out_dir, exist_ok=True)

    # Mapeamento rápido de ID da disciplina para Nome
    subjects_map = {s.get("id"): s.get("name", "Geral") for s in subjects}

    doc = SimpleDocTemplate(
        output_target,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=14 * mm,
        bottomMargin=18 * mm
    )

    styles = getSampleStyleSheet()

    # Tipografia customizada
    style_title = ParagraphStyle(
        "EduTrackTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=COLOR_WHITE
    )
    style_subtitle = ParagraphStyle(
        "EduTrackSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=COLOR_CYAN_LIGHT
    )
    style_section_h1 = ParagraphStyle(
        "EduTrackSectionH1",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=15,
        textColor=COLOR_NAVY_DARK,
        spaceBefore=10,
        spaceAfter=6
    )
    style_normal = ParagraphStyle(
        "EduTrackNormal",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        textColor=COLOR_TEXT_MAIN
    )
    style_muted = ParagraphStyle(
        "EduTrackMuted",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=COLOR_TEXT_MUTED
    )
    style_table_header = ParagraphStyle(
        "EduTrackTableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10,
        textColor=COLOR_WHITE,
        alignment=0
    )
    style_table_cell = ParagraphStyle(
        "EduTrackTableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=10.5,
        textColor=COLOR_TEXT_MAIN
    )
    style_card_label = ParagraphStyle(
        "EduTrackCardLabel",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=9,
        textColor=COLOR_TEXT_MUTED,
        alignment=1
    )
    style_card_value = ParagraphStyle(
        "EduTrackCardValue",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=16,
        textColor=COLOR_CYAN_BRAND,
        alignment=1
    )

    story = []

    # ==========================================================================
    # 1. Cabeçalho Institucional EduTrack AI
    # ==========================================================================
    header_content = [
        [
            Paragraph("<b>EduTrack AI</b>", style_title),
            Paragraph(f"<b>Estudante:</b> {clean_val(user.get('name'))}<br/>"
                      f"<b>E-mail:</b> {clean_val(user.get('email'))}<br/>"
                      f"<b>Emitido em:</b> {datetime.now().strftime('%d/%m/%Y às %H:%M')}",
                      ParagraphStyle("HRight", parent=style_normal, textColor=COLOR_WHITE, alignment=2, fontSize=8, leading=11))
        ],
        [
            Paragraph("Relatório Acadêmico Consolidado de Desempenho e Estudos", style_subtitle),
            Paragraph("Documento gerado eletronicamente com dados oficiais autenticados",
                      ParagraphStyle("HSubRight", parent=style_muted, textColor=COLOR_BORDER, alignment=2, fontSize=7, leading=9))
        ]
    ]

    header_table = Table(header_content, colWidths=[105 * mm, 77 * mm])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), COLOR_PRIMARY_DARK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMBORDER", (0, 1), (-1, 1), 3, COLOR_CYAN_BRAND),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # ==========================================================================
    # 2. Resumo Geral de Métricas
    # ==========================================================================
    completed_tasks = [t for t in tasks if t.get("status") == "completed"]
    pending_tasks = [t for t in tasks if t.get("status") == "pending"]
    total_tasks_count = len(tasks)
    completed_count = len(completed_tasks)
    pending_count = len(pending_tasks)
    pct_progress = round((completed_count / total_tasks_count) * 100, 1) if total_tasks_count > 0 else 0.0

    story.append(Paragraph("<b>Resumo Geral Acadêmico</b>", style_section_h1))

    cards_data = [
        [
            Paragraph(str(len(subjects)), style_card_value),
            Paragraph(str(total_tasks_count), style_card_value),
            Paragraph(str(pending_count), ParagraphStyle("AmberVal", parent=style_card_value, textColor=COLOR_AMBER)),
            Paragraph(str(completed_count), ParagraphStyle("GreenVal", parent=style_card_value, textColor=COLOR_GREEN)),
            Paragraph(f"{pct_progress}%", ParagraphStyle("LilacVal", parent=style_card_value, textColor=COLOR_LILAC_BRAND)),
        ],
        [
            Paragraph("Disciplinas", style_card_label),
            Paragraph("Total Tarefas", style_card_label),
            Paragraph("Tarefas Pendentes", style_card_label),
            Paragraph("Concluídas", style_card_label),
            Paragraph("Taxa Conclusão", style_card_label),
        ]
    ]

    col_w_cards = 182 * mm / 5
    summary_table = Table(cards_data, colWidths=[col_w_cards] * 5)
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), COLOR_BG_CARD),
        ("BOX", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
        ("TOPPADDING", (0, 1), (-1, 1), 2),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 6),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # ==========================================================================
    # 3. Disciplinas (Detalhes e Progresso)
    # ==========================================================================
    story.append(Paragraph("<b>Disciplinas e Progresso de Tarefas</b>", style_section_h1))

    if not subjects:
        story.append(Paragraph("<i>Nenhuma disciplina cadastrada pelo estudante.</i>", style_muted))
    else:
        subj_rows = [[
            Paragraph("Disciplina", style_table_header),
            Paragraph("Professor", style_table_header),
            Paragraph("Carga Horária", style_table_header),
            Paragraph("Período", style_table_header),
            Paragraph("Progresso de Tarefas", style_table_header),
            Paragraph("Descrição", style_table_header),
        ]]

        for s in subjects:
            s_id = s.get("id")
            s_tasks = [t for t in tasks if t.get("subject_id") == s_id]
            s_comp = len([t for t in s_tasks if t.get("status") == "completed"])
            s_tot = len(s_tasks)
            s_pct = round((s_comp / s_tot) * 100) if s_tot > 0 else 0
            progress_str = f"{s_comp} de {s_tot} ({s_pct}%)" if s_tot > 0 else "Sem tarefas"

            start_d = format_date(s.get("start_date"))
            end_d = format_date(s.get("end_date"))
            periodo = f"{start_d} a {end_d}" if start_d != "-" or end_d != "-" else "-"

            hours_val = s.get("hours")
            hours_str = f"{hours_val}h" if hours_val is not None and hours_val != "" else "-"

            subj_rows.append([
                Paragraph(f"<b>{clean_val(s.get('name'))}</b>", style_table_cell),
                Paragraph(clean_val(s.get("teacher")), style_table_cell),
                Paragraph(hours_str, style_table_cell),
                Paragraph(periodo, style_table_cell),
                Paragraph(f"<b>{progress_str}</b>", style_table_cell),
                Paragraph(clean_val(s.get("description")), style_table_cell),
            ])

        subj_table = Table(
            subj_rows,
            colWidths=[38 * mm, 30 * mm, 20 * mm, 26 * mm, 30 * mm, 38 * mm],
            repeatRows=1
        )
        subj_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), COLOR_NAVY_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), COLOR_WHITE),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLOR_WHITE, COLOR_BG_CARD]),
            ("GRID", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ]))
        story.append(subj_table)

    story.append(Spacer(1, 10))

    # ==========================================================================
    # 4. Análise de Tempo de Estudo por Disciplina (Tarefas Concluídas)
    # ==========================================================================
    story.append(Paragraph("<b>Tempo de Estudo por Disciplina (Tarefas Concluídas)</b>", style_section_h1))
    story.append(Paragraph(
        "Contabilização de tempo realizada estritamente sobre tarefas concluídas. "
        "Tempo de estudo considera o tempo gasto informado ou o tempo estimado planejado.",
        style_muted
    ))
    story.append(Spacer(1, 4))

    if not subjects:
        story.append(Paragraph("<i>Sem dados para análise de tempo de estudo.</i>", style_muted))
    else:
        study_rows = [[
            Paragraph("Disciplina", style_table_header),
            Paragraph("Tarefas Concluídas", style_table_header),
            Paragraph("Horas Estimadas", style_table_header),
            Paragraph("Tempo de Estudo Realizado", style_table_header),
            Paragraph("Diferença", style_table_header),
        ]]

        total_est_all = 0
        total_spent_all = 0
        total_comp_all = 0

        for s in subjects:
            s_id = s.get("id")
            s_completed = [t for t in completed_tasks if t.get("subject_id") == s_id]

            s_est = sum(int(t.get("estimated_time") or 0) for t in s_completed)
            s_study = 0
            for t in s_completed:
                spent = t.get("spent_time")
                if spent is not None and spent != "" and str(spent).isdigit():
                    s_study += int(spent)
                else:
                    s_study += int(t.get("estimated_time") or 0)

            diff = s_study - s_est
            diff_sign = "+" if diff > 0 else ""
            diff_str = f"{diff_sign}{format_minutes(abs(diff))}" if diff != 0 else "0min"

            total_est_all += s_est
            total_spent_all += s_study
            total_comp_all += len(s_completed)

            study_rows.append([
                Paragraph(f"<b>{clean_val(s.get('name'))}</b>", style_table_cell),
                Paragraph(f"{len(s_completed)} tarefa(s)", style_table_cell),
                Paragraph(format_minutes(s_est), style_table_cell),
                Paragraph(f"<b>{format_minutes(s_study)}</b>", style_table_cell),
                Paragraph(diff_str, style_table_cell),
            ])

        # Linha Totalizadora
        diff_total = total_spent_all - total_est_all
        diff_total_sign = "+" if diff_total > 0 else ""
        diff_total_str = f"{diff_total_sign}{format_minutes(abs(diff_total))}" if diff_total != 0 else "0min"

        study_rows.append([
            Paragraph("<b>TOTAL GERAL</b>", style_table_cell),
            Paragraph(f"<b>{total_comp_all} tarefa(s)</b>", style_table_cell),
            Paragraph(f"<b>{format_minutes(total_est_all)}</b>", style_table_cell),
            Paragraph(f"<b>{format_minutes(total_spent_all)}</b>", style_table_cell),
            Paragraph(f"<b>{diff_total_str}</b>", style_table_cell),
        ])

        study_table = Table(
            study_rows,
            colWidths=[52 * mm, 32 * mm, 32 * mm, 38 * mm, 28 * mm],
            repeatRows=1
        )
        study_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), COLOR_NAVY_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), COLOR_WHITE),
            ("ROWBACKGROUNDS", (0, 1), (-1, -2), [COLOR_WHITE, COLOR_BG_CARD]),
            ("BACKGROUND", (0, -1), (-1, -1), COLOR_CYAN_BG),
            ("LINEABOVE", (0, -1), (-1, -1), 1, COLOR_CYAN_BRAND),
            ("GRID", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ]))
        story.append(study_table)

    story.append(Spacer(1, 10))

    # ==========================================================================
    # 5. Relação Completa de Tarefas
    # ==========================================================================
    story.append(Paragraph("<b>Relação Geral de Tarefas Acadêmicas</b>", style_section_h1))

    if not tasks:
        story.append(Paragraph("<i>Nenhuma tarefa cadastrada pelo estudante.</i>", style_muted))
    else:
        task_rows = [[
            Paragraph("Título", style_table_header),
            Paragraph("Disciplina", style_table_header),
            Paragraph("Status", style_table_header),
            Paragraph("Prazo", style_table_header),
            Paragraph("Estimado", style_table_header),
            Paragraph("Gasto", style_table_header),
            Paragraph("Descrição", style_table_header),
        ]]

        for t in tasks:
            status_raw = t.get("status", "pending")
            is_done = status_raw == "completed"
            status_text = "Concluída" if is_done else "Pendente"
            status_color = COLOR_GREEN if is_done else COLOR_AMBER
            status_p = Paragraph(f"<font color='{status_color.hexval()}'><b>{status_text}</b></font>", style_table_cell)

            subj_name = subjects_map.get(t.get("subject_id"), "Geral")

            task_rows.append([
                Paragraph(f"<b>{clean_val(t.get('title'))}</b>", style_table_cell),
                Paragraph(subj_name, style_table_cell),
                status_p,
                Paragraph(format_date(t.get("due_date")), style_table_cell),
                Paragraph(format_minutes(t.get("estimated_time")), style_table_cell),
                Paragraph(format_minutes(t.get("spent_time")), style_table_cell),
                Paragraph(clean_val(t.get("description")), style_table_cell),
            ])

        tasks_table = Table(
            task_rows,
            colWidths=[38 * mm, 28 * mm, 20 * mm, 20 * mm, 18 * mm, 18 * mm, 40 * mm],
            repeatRows=1
        )
        tasks_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), COLOR_NAVY_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), COLOR_WHITE),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [COLOR_WHITE, COLOR_BG_CARD]),
            ("GRID", (0, 0), (-1, -1), 0.5, COLOR_BORDER),
            ("TOPPADDING", (0, 0), (-1, -1), 3.5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ]))
        story.append(tasks_table)

    # Construção do documento
    doc.build(story, canvasmaker=NumberedCanvas)


def generate_pdf_bytes(data: dict) -> bytes:
    """Gera o PDF em memória e retorna o fluxo de bytes brutos."""
    buffer = io.BytesIO()
    generate_pdf_report(data, buffer)
    buffer.seek(0)
    return buffer.getvalue()


class AcademicReportRequestHandler(BaseHTTPRequestHandler):
    """
    Handler HTTP para atender requisições de geração e download de relatório PDF.
    Responde com Content-Type: application/pdf e suporte a CORS.
    """
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        valid_paths = ('/api/academic_reports/pdf', '/academic_reports/pdf', '/api/report/pdf', '/report/pdf', '/')
        if self.path.split('?')[0] in valid_paths:
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
                data = json.loads(body) if body.strip() else {}

                pdf_bytes = generate_pdf_bytes(data)

                now_str = datetime.now().strftime("%Y-%m-%d")
                self.send_response(200)
                self.send_header('Content-Type', 'application/pdf')
                self.send_header('Content-Disposition', f'attachment; filename="edutrack-relatorio-{now_str}.pdf"')
                self.send_header('Content-Length', str(len(pdf_bytes)))
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(pdf_bytes)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()

    def do_GET(self):
        valid_paths = ('/api/academic_reports/pdf', '/academic_reports/pdf', '/api/report/pdf', '/report/pdf', '/')
        clean_path = self.path.split('?')[0]
        if clean_path in valid_paths:
            try:
                sample_data = {
                    "user": {"name": "Estudante EduTrack", "email": "estudante@edutrack.com"},
                    "subjects": [],
                    "tasks": []
                }
                pdf_bytes = generate_pdf_bytes(sample_data)
                now_str = datetime.now().strftime("%Y-%m-%d")
                self.send_response(200)
                self.send_header('Content-Type', 'application/pdf')
                self.send_header('Content-Disposition', f'attachment; filename="edutrack-relatorio-{now_str}.pdf"')
                self.send_header('Content-Length', str(len(pdf_bytes)))
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(pdf_bytes)
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))
        elif clean_path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok', 'service': 'EduTrack PDF Report Generator'}).encode('utf-8'))
        else:
            self.send_response(404)
            self._set_cors_headers()
            self.end_headers()

    def log_message(self, format, *args):
        # Log simplificado para console
        sys.stdout.write(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]} {args[1]} -> {args[2]}\n")
        sys.stdout.flush()


def run_server(host='127.0.0.1', port=5001):
    """Inicia o servidor HTTP para geração contínua de relatórios em PDF."""
    server = HTTPServer((host, port), AcademicReportRequestHandler)
    print(f"[*] EduTrack AI - Servidor de Relatório PDF ativo em http://{host}:{port}/api/academic_reports/pdf")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Encerrando servidor.")
        server.server_close()


def main():
    parser = argparse.ArgumentParser(description="Gerador de Relatório PDF do EduTrack AI")
    parser.add_argument("--input", "-i", type=str, help="Caminho do arquivo JSON de entrada")
    parser.add_argument("--json", "-j", type=str, help="String JSON de entrada com dados do usuário")
    parser.add_argument("--output", "-o", type=str, default="relatorio_academico.pdf", help="Caminho do PDF gerado")
    parser.add_argument("--serve", "-s", action="store_true", help="Inicia o servidor HTTP de relatórios PDF")
    parser.add_argument("--port", "-p", type=int, default=5001, help="Porta para o servidor HTTP (padrão: 5001)")
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
        print(json.dumps({"status": "error", "message": "Nenhum dado JSON fornecido para geração do relatório."}), file=sys.stderr)
        sys.exit(1)

    try:
        data = json.loads(raw_data)
        out_path = os.path.abspath(args.output)
        os.makedirs(os.path.dirname(out_path), exist_ok=True) if os.path.dirname(out_path) else None

        generate_pdf_report(data, out_path)

        result = {
            "status": "success",
            "message": "Relatório acadêmico PDF gerado com sucesso.",
            "output_path": out_path,
            "file_size_bytes": os.path.getsize(out_path)
        }
        print(json.dumps(result, indent=2))
    except Exception as e:
        err_res = {
            "status": "error",
            "message": f"Falha na geração do PDF: {str(e)}"
        }
        print(json.dumps(err_res, indent=2), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

