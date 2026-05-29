"""
Jalankan dari ROOT repo SmartWorkID:
    python apply_darkmode_fix.py
"""
import os, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(ROOT, "frontend", "src", "index.css")

with open(path, encoding="utf-8") as f:
    src = f.read()

# Tambahkan gradient overrides di akhir blok .dark sebelum penutup }
old = "    --chart-5: 280 45% 60%;\n  }"
new = (
    "    --chart-5: 280 45% 60%;\n\n"
    "    /* Dark mode gradient overrides */\n"
    "    --gradient-subtle: linear-gradient(180deg, hsl(215 25% 10%), hsl(215 20% 13%));\n"
    "    --gradient-hero: linear-gradient(135deg, hsl(210 80% 15%), hsl(210 70% 22%), hsl(210 60% 28%));\n"
    "  }"
)

if "gradient overrides" in src:
    print("Already patched, skipping.")
elif old in src:
    src = src.replace(old, new, 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(src)
    print(f"Patched {path}")
else:
    print("ERROR: Could not find insertion point in index.css")
    print("Manually add inside the .dark block:")
    print("  --gradient-subtle: linear-gradient(180deg, hsl(215 25% 10%), hsl(215 20% 13%));")
    print("  --gradient-hero: linear-gradient(135deg, hsl(210 80% 15%), hsl(210 70% 22%), hsl(210 60% 28%));")
    exit(1)

def run(cmd):
    print(f"$ {cmd}")
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
    if r.stdout: print(r.stdout.strip())
    if r.stderr: print(r.stderr.strip())

run("git add frontend/src/index.css")
run('git commit -m "Fix dark mode: override gradient-subtle to dark colors"')
run("git push -u origin claude/wizardly-ramanujan-sjkCT")
print("\nDone!")
