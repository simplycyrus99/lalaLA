from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parents[1]
errors=[]
for html in root.glob("*.html"):
    soup=BeautifulSoup(html.read_text(encoding="utf-8"),"html.parser")
    if not soup.title: errors.append(f"{html.name}: missing title")
    for tag in soup.find_all(["a","img","script","link"]):
        attr="href" if tag.name in ("a","link") else "src"
        v=tag.get(attr)
        if not v or v.startswith(("http","#","mailto:","javascript:")): continue
        p=(html.parent/v.split("?")[0]).resolve()
        if not p.exists(): errors.append(f"{html.name}: missing {v}")
print("PASS" if not errors else "\n".join(errors))
raise SystemExit(1 if errors else 0)
