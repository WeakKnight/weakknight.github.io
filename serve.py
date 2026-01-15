#!/usr/bin/env python3
"""
简单的本地 HTTP 服务器
运行: python serve.py
访问: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080

# 切换到脚本所在目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"Serving at {url}")
    print("Press Ctrl+C to stop")
    
    # 自动打开浏览器
    webbrowser.open(url)
    
    httpd.serve_forever()
