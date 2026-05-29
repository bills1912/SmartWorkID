"""
Jalankan dari ROOT repo SmartWorkID:
    python apply_darkmode_fix2.py
"""
import os, subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))

def patch(rel_path, replacements):
    path = os.path.join(ROOT, rel_path)
    with open(path, encoding="utf-8") as f:
        src = f.read()
    for old, new in replacements:
        if old in src:
            src = src.replace(old, new)
            print(f"  patched in {rel_path}: {old[:50]}...")
        else:
            print(f"  skip (not found or already applied): {old[:50]}...")
    with open(path, "w", encoding="utf-8") as f:
        f.write(src)

# Fix 1: Footer - always dark background
patch("frontend/src/components/layout/Footer.jsx", [
    (
        'className="bg-foreground text-background"',
        'className="bg-[hsl(215,25%,6%)] text-slate-100"',
    ),
    (
        'className="bg-background/10"',
        'className="bg-white/10"',
    ),
])

# Replace all text-background in Footer
footer_path = os.path.join(ROOT, "frontend/src/components/layout/Footer.jsx")
with open(footer_path, encoding="utf-8") as f:
    src = f.read()
src = src.replace("text-background", "text-white")
with open(footer_path, "w", encoding="utf-8") as f:
    f.write(src)
print("  replaced text-background → text-white in Footer.jsx")

# Fix 2: LandingPage CTA - always white text on dark gradient
patch("frontend/src/pages/LandingPage.jsx", [
    (
        'className="font-heading text-3xl sm:text-4xl font-bold text-primary-foreground mb-4"',
        'className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4"',
    ),
    (
        'className="text-base text-primary-foreground/70 max-w-xl mx-auto mb-8"',
        'className="text-base text-white/70 max-w-xl mx-auto mb-8"',
    ),
    (
        'className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors duration-200"',
        'className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-200"',
    ),
])

def run(cmd):
    print(f"$ {cmd}")
    r = subprocess.run(cmd, shell=True, cwd=ROOT, capture_output=True, text=True)
    if r.stdout: print(r.stdout.strip())
    if r.stderr: print(r.stderr.strip())

run("git add frontend/src/components/layout/Footer.jsx frontend/src/pages/LandingPage.jsx")
run('git commit -m "Fix dark mode: footer always dark, CTA text always white"')
run("git push -u origin claude/wizardly-ramanujan-sjkCT")
print("\nDone!")
