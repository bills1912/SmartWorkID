"""
Jalankan dari ROOT repo SmartWorkID:
    python apply_layout_fix.py
"""
import os, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))

path = os.path.join(ROOT, "frontend", "src", "components", "layout", "AppLayout.jsx")
with open(path, encoding="utf-8") as f:
    src = f.read()

replacements = [
    (
        '<div className="min-h-screen bg-background flex">',
        '<div className="h-screen bg-background flex overflow-hidden">',
    ),
    (
        '"hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300",',
        '"hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 h-full flex-shrink-0",',
    ),
    (
        '<div className="flex-1 flex flex-col min-h-screen">',
        '<div className="flex-1 flex flex-col overflow-hidden">',
    ),
    (
        'className="sticky top-0 z-40 h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center px-4 sm:px-6 gap-4"',
        'className="flex-shrink-0 h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center px-4 sm:px-6 gap-4"',
    ),
    (
        '<main className="flex-1 p-4 sm:p-6 lg:p-8">',
        '<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">',
    ),
]

changed = 0
for old, new in replacements:
    if old in src:
        src = src.replace(old, new)
        changed += 1
        print(f"  patched: {old[:60]}...")
    else:
        print(f"  skip (already applied): {old[:60]}...")

if changed > 0:
    with open(path, "w", encoding="utf-8") as f:
        f.write(src)
    print(f"\n  Wrote {path}")
else:
    print("\n  Nothing to change.")

def run(cmd):
    print(f"$ {cmd}")
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
    if r.stdout: print(r.stdout.strip())
    if r.stderr: print(r.stderr.strip())

run("git add frontend/src/components/layout/AppLayout.jsx")
run('git commit -m "Fix layout: lock sidebar, only main content scrolls"')
run("git push -u origin claude/wizardly-ramanujan-sjkCT")
print("\nDone!")
