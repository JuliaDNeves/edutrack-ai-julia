#!/usr/bin/env python3
"""
EduTrack AI - Servidor Local de Insights Inteligentes com IA
Disponibiliza o endpoint POST/GET /api/insights na porta 5002.
"""
import sys
import os

# Adiciona diretório de scripts ao path de importação
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from academic_insights_engine import run_server

if __name__ == "__main__":
    port = 5002
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    run_server(host="127.0.0.1", port=port)

