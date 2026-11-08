#!/usr/bin/env python3
"""
EduTrack AI - Servidor Local de Geração de Relatórios em PDF
Disponibiliza o endpoint POST/GET /api/academic_reports/pdf na porta 5001.
"""
import sys
import os

# Adiciona diretório de scripts ao path de importação
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generate_academic_report import run_server

if __name__ == "__main__":
    port = 5001
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    run_server(host="127.0.0.1", port=port)

