# 🕌 دار البناء — DĀR AL-BINĀ'

> **The Ancient Builder's Game** — Build the House of Wisdom, verse by verse.

A puzzle/construction game where each **Sūrah** is a *chamber* of a house and each **Āyah** is a *stone* to lay. The 28 Arabic letters map to 28 nature-friendly building materials. Copy the Master's Blueprint to build each verse.

## 🌿 How to Play

1. **Choose a Sūrah** (a chamber of the house)
2. **Choose an Āyah** (a stone/piece to build)
3. Study **The Master's Blueprint** (the prebuilt guide on the left)
4. Pick materials from the palette below
5. Click a material, then click a spot on **Your Construction Site**
6. Follow **The Master's Instructions** to know what goes where
7. **Check Your Work** — green means correct, red means misplaced
8. Build all verses to complete the chamber!

## 🪵 The 28 Materials

| Letter | Material | Nature Source |
|--------|----------|---------------|
| ا | Ladder | Cedar Wood |
| ب | Bench | Oak Wood |
| ت | Table | Pine Wood |
| ث | Threshold | Granite |
| ج | Garden | Living Earth |
| ح | Hearth | River Stone |
| خ | Kiln | Fired Clay |
| د | Door | Cedar Wood |
| ذ | Path | Flagstone |
| ر | Roof | Thatch & Beam |
| ز | Trellis | Willow Wood |
| س | Stairs | Limestone |
| ش | Chimney | Brick |
| ص | Stone Wall | Limestone |
| ض | Shade Canopy | Woven Palm |
| ط | Tower | Sandstone |
| ظ | Pavilion | Canvas & Poles |
| ع | Spring | Living Water |
| غ | Greenhouse | Glass & Wood |
| ف | Fireplace | Hewn Stone |
| ق | Archway | Carved Stone |
| ك | Cupboard | Walnut Wood |
| ل | Lantern | Copper & Oil |
| م | Mirror Pool | Still Water |
| ن | Birdhouse | Birch Wood |
| ه | Hallway | Cool Stone |
| و | Wall | Mud Brick |
| ي | Yard | Open Earth |

## 🏗️ Features

- **All 114 Sūrahs** — 6,236 verses to build
- **Deterministic blueprints** — each verse always has the same unique layout
- **Shuffled material palette** — you must match, not just place in order
- **Progress saved** — your builds persist in the browser
- **Green & nature-friendly theme** — every material sourced from the earth
- **Ancient 1400-year aesthetic** — parchment, gold, calligraphy, and stone

## 🚀 Running

Simply open `index.html` in any browser. No server needed.

Or serve locally:
```bash
cd quran-builder-game
python -m http.server 8080
# Open http://localhost:8080
```

## 📁 Files

- `index.html` — Game page
- `style.css` — Ancient green theme
- `game.js` — Game logic
- `quran-data.js` — All 6,236 verses (auto-generated from Quran text)

## 📜 Data Source

Quran text from [quran-simple-clean.txt](https://github.com/mustafa0x/quran-texts) (simple-clean edition).
