"""
Jalankan dari ROOT repo SmartWorkID:
    python apply_nginx_fix.py
"""
import os, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))

nginx_conf = r"""server {
    listen ${PORT};
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # DNS resolver for dynamic upstream resolution
    resolver 1.1.1.1 8.8.8.8 valid=30s ipv6=off;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1024;

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Proxy API calls to backend service
    location /api/ {
        set $backend "${BACKEND_URL}";
        proxy_pass $backend;
        proxy_http_version 1.1;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    # SPA routing - fall through to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
"""

path = os.path.join(ROOT, "frontend", "nginx.conf")
with open(path, "w", encoding="utf-8") as f:
    f.write(nginx_conf)
print(f"Wrote {path}")

def run(cmd):
    print(f"$ {cmd}")
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
    if r.stdout: print(r.stdout.strip())
    if r.stderr: print(r.stderr.strip())

run("git add frontend/nginx.conf")
run('git commit -m "Fix nginx proxy: add resolver + use variable for dynamic upstream DNS"')
run("git push -u origin claude/wizardly-ramanujan-sjkCT")
print("\nDone! Railway akan redeploy otomatis.")
