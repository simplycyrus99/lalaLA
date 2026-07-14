from pathlib import Path
import json
import qrcode

SITE_URL = "https://your-github-username.github.io/la-reel-map/"
DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "locations.json"
OUT = Path(__file__).resolve().parents[1] / "assets" / "qr"
OUT.mkdir(parents=True, exist_ok=True)

with open(DATA_FILE) as f:
    data = json.load(f)

for loc in data["locations"]:
    url = f"{SITE_URL.rstrip('/')}/location.html?id={loc['id']}"
    img = qrcode.make(url)
    img.save(OUT / f"{loc['id']}.png")
    print(loc["id"], url)
