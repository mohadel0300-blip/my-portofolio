from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
FULL_DIR = ROOT / "web" / "full"
THUMB_DIR = ROOT / "web" / "thumb"
FULL_DIR.mkdir(parents=True, exist_ok=True)
THUMB_DIR.mkdir(parents=True, exist_ok=True)

EXTS = {".png", ".jpg", ".jpeg", ".JPG", ".JPEG"}
SKIP = {"MINED.png", "MINED.jpg"}


def save_variant(source: Path, target: Path, max_side: int, quality: int):
    with Image.open(source) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode in ("RGBA", "LA"):
            background = Image.new("RGB", im.size, "white")
            alpha = im.getchannel("A") if "A" in im.getbands() else None
            background.paste(im.convert("RGB"), mask=alpha)
            im = background
        elif im.mode != "RGB":
            im = im.convert("RGB")
        im.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        im.save(target, "WEBP", quality=quality, method=6)


def main():
    count = 0
    for source in sorted(ROOT.iterdir(), key=lambda p: p.name.lower()):
        if not source.is_file() or source.suffix not in EXTS or source.name in SKIP:
            continue
        full_target = FULL_DIR / f"{source.name}.webp"
        thumb_target = THUMB_DIR / f"{source.name}.webp"
        try:
            save_variant(source, full_target, 1800, 80)
            save_variant(source, thumb_target, 520, 72)
            count += 1
            print(f"optimized: {source.name}")
        except Exception as exc:
            print(f"skip {source.name}: {exc}")
    print(f"created web variants for {count} images")


if __name__ == "__main__":
    main()
