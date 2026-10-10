// ═══════════════════════════════════════════════════════════
// DAR AL-BINA — The Ancient Builder's Game
// Each Sūrah = a chamber • Each Āyah = a stone to lay
// ═══════════════════════════════════════════════════════════

// ── 28 Sacred Letters → 28 Earthly Building Materials ──
const ARABIC_LETTERS = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
const LETTER_ORDER = {};
'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('').forEach((c, i) => LETTER_ORDER[c] = i);

const MATERIALS = {
    'ا': { name: 'Ladder',       icon: '🪜', nature: 'Cedar Wood',  desc: 'A cedar-wood ladder, strong & straight' },
    'ب': { name: 'Bench',        icon: '🪑', nature: 'Oak Wood',    desc: 'A hand-carved oak bench' },
    'ت': { name: 'Table',        icon: '🪵', nature: 'Pine Wood',   desc: 'A pine-wood table, smooth and sturdy' },
    'ث': { name: 'Threshold',    icon: '🚪', nature: 'Granite',     desc: 'A granite threshold stone' },
    'ج': { name: 'Garden',       icon: '🌿', nature: 'Living Earth',desc: 'A garden bed with herbs and flowers' },
    'ح': { name: 'Hearth',       icon: '🔥', nature: 'River Stone', desc: 'A warm hearth of river stones' },
    'خ': { name: 'Kiln',         icon: '🏺', nature: 'Fired Clay',  desc: 'A clay kiln for baking bricks' },
    'د': { name: 'Door',         icon: '🚪', nature: 'Cedar Wood',  desc: 'A carved cedar door on iron hinges' },
    'ذ': { name: 'Path',         icon: '🛤️', nature: 'Flagstone',   desc: 'A flagstone path winding through' },
    'ر': { name: 'Roof',         icon: '🏠', nature: 'Thatch & Beam',desc: 'A thatched roof upon cedar beams' },
    'ز': { name: 'Trellis',      icon: '🌱', nature: 'Willow Wood', desc: 'A willow trellis for climbing vines' },
    'س': { name: 'Stairs',       icon: '🪜', nature: 'Limestone',   desc: 'Limestone stairs rising gently' },
    'ش': { name: 'Chimney',      icon: '🧱', nature: 'Brick',       desc: 'A brick chimney releasing fragrant smoke' },
    'ص': { name: 'Stone Wall',   icon: '🧱', nature: 'Limestone',   desc: 'A sturdy wall of fitted limestone' },
    'ض': { name: 'Shade Canopy', icon: '⛱️', nature: 'Woven Palm',  desc: 'A woven palm-leaf canopy for shade' },
    'ط': { name: 'Tower',        icon: '🗼', nature: 'Sandstone',   desc: 'A sandstone tower watching over' },
    'ظ': { name: 'Pavilion',     icon: '⛺', nature: 'Canvas & Poles',desc: 'A quiet pavilion for rest' },
    'ع': { name: 'Spring',       icon: '💧', nature: 'Living Water',desc: 'A natural spring bubbling clear' },
    'غ': { name: 'Greenhouse',   icon: '🌿', nature: 'Glass & Wood',desc: 'A greenhouse for tender seedlings' },
    'ف': { name: 'Fireplace',    icon: '🔥', nature: 'Hewn Stone',  desc: 'An indoor fireplace of hewn stone' },
    'ق': { name: 'Archway',      icon: '🏛️', nature: 'Carved Stone',desc: 'A beautiful stone archway' },
    'ك': { name: 'Cupboard',     icon: '🗄️', nature: 'Walnut Wood', desc: 'A walnut cupboard for grains' },
    'ل': { name: 'Lantern',      icon: '🏮', nature: 'Copper & Oil',desc: 'A copper lantern glowing warm' },
    'م': { name: 'Mirror Pool',  icon: '🪞', nature: 'Still Water', desc: 'A mirror-still reflecting pool' },
    'ن': { name: 'Birdhouse',    icon: '🐦', nature: 'Birch Wood',  desc: 'A small birdhouse for winged friends' },
    'ه': { name: 'Hallway',      icon: '🚶', nature: 'Cool Stone',  desc: 'A cool covered hallway' },
    'و': { name: 'Wall',         icon: '🧱', nature: 'Mud Brick',   desc: 'A wall of sun-baked mud brick' },
    'ي': { name: 'Yard',         icon: '🏡', nature: 'Open Earth',  desc: 'An open yard under the sky' }
};

// ── Game State ──
const Game = {
    currentSurah: 0,
    currentAyah: 0,
    blueprint: null,
    selectedMaterial: null,
    placements: {},
    completed: {},       // "s|a" → true
    COLS: 5,

    // ── Init ──
    init() {
        this.loadProgress();
        this.buildSurahGrid();
        this.showTitle();
    },

    // ── Navigation ──
    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
        window.scrollTo(0, 0);
    },
    showTitle()    { this.showScreen('screen-title'); },
    showSurahs()   { this.buildSurahGrid(); this.showScreen('screen-surahs'); },
    showAyahList() { this.buildAyahList(); this.showScreen('screen-ayahs'); },

    // ── Surah Grid ──
    buildSurahGrid() {
        const grid = document.getElementById('surah-grid');
        grid.innerHTML = '';
        for (let s = 1; s <= 114; s++) {
            const count = SURAH_COUNTS[s] || 0;
            if (!count) continue;
            let done = 0;
            for (let a = 1; a <= count; a++) {
                if (this.completed[`${s}|${a}`]) done++;
            }
            const pct = count > 0 ? Math.round(done / count * 100) : 0;
            const card = document.createElement('div');
            card.className = 'surah-card';
            card.innerHTML = `
                <div class="num">Sūrah ${s}</div>
                <div class="name">${SURAH_NAMES[s] || ''}</div>
                <div class="count">${count} verses</div>
                ${pct > 0 ? `<span class="badge">${pct}%</span>` : ''}
            `;
            card.onclick = () => this.selectSurah(s);
            grid.appendChild(card);
        }
    },

    selectSurah(s) {
        this.currentSurah = s;
        document.getElementById('ayah-list-title').textContent =
            `Sūrah ${s}: ${SURAH_NAMES[s] || ''}`;
        this.showAyahList();
    },

    // ── Ayah List ──
    buildAyahList() {
        const list = document.getElementById('ayah-list');
        list.innerHTML = '';
        const count = SURAH_COUNTS[this.currentSurah] || 0;
        let done = 0;
        for (let a = 1; a <= count; a++) {
            const isDone = this.completed[`${this.currentSurah}|${a}`];
            if (isDone) done++;
            const data = this.getAyah(this.currentSurah, a);
            const card = document.createElement('div');
            card.className = 'ayah-card' + (isDone ? ' done' : '');
            card.innerHTML = `
                <div class="vnum">${a}</div>
                <div class="preview">${data ? data[2].substring(0, 20) : ''}</div>
            `;
            card.onclick = () => this.selectAyah(a);
            list.appendChild(card);
        }
        // progress bar
        const pct = count > 0 ? Math.round(done / count * 100) : 0;
        document.getElementById('progress-bar').style.width = pct + '%';
        document.getElementById('progress-text').textContent =
            `${done} / ${count} built (${pct}%)`;
    },

    getAyah(s, a) {
        return QURAN_DATA.find(x => x[0] === s && x[1] === a);
    },

    selectAyah(a) {
        this.currentAyah = a;
        this.startBuild();
    },

    // ── Letter extraction ──
    extractLetters(text) {
        const seen = new Set();
        const result = [];
        for (const ch of text) {
            if (LETTER_ORDER[ch] !== undefined && !seen.has(ch)) {
                seen.add(ch);
                result.push(ch);
            }
        }
        return result;
    },

    // ── Blueprint Generation ──
    generateBlueprint(letters, surah, ayah) {
        const n = letters.length;
        const cols = this.COLS;
        const rows = Math.ceil(n / cols);
        const cells = [];

        // Deterministic pseudo-random seed from surah+ayah
        let seed = surah * 1000 + ayah;
        const rand = () => {
            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
            return seed / 0x7fffffff;
        };

        // Create list of positions, shuffle deterministically
        const positions = [];
        for (let i = 0; i < rows * cols; i++) positions.push(i);
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        // Fill cells: some empty, some with materials
        // Keep the first N positions (shuffled) filled with the letters
        for (let i = 0; i < rows * cols; i++) {
            const pos = positions.indexOf(i);
            if (pos < n) {
                cells.push(letters[pos]);
            } else {
                cells.push(null);
            }
        }

        return { cells, cols, rows, letters };
    },

    // ── Start Building ──
    startBuild() {
        const data = this.getAyah(this.currentSurah, this.currentAyah);
        if (!data) return;

        const text = data[2];
        const letters = this.extractLetters(text);
        this.blueprint = this.generateBlueprint(letters, this.currentSurah, this.currentAyah);
        this.selectedMaterial = null;
        this.placements = {};

        // Update UI
        document.getElementById('build-ref').textContent =
            `Sūrah ${this.currentSurah}:${this.currentAyah} — ${SURAH_NAMES[this.currentSurah] || ''}`;
        document.getElementById('build-count').textContent =
            `Verse ${this.currentAyah} of ${SURAH_COUNTS[this.currentSurah]}`;
        document.getElementById('ayah-text').textContent = text;

        this.renderBlueprint();
        this.renderConstruction();
        this.renderPalette(letters);
        this.renderInstructions();
        document.getElementById('build-message').textContent = '';
        document.getElementById('build-message').className = '';
        document.getElementById('btn-check').classList.remove('hidden');
        document.getElementById('btn-next').classList.add('hidden');
        this.showScreen('screen-build');
    },

    renderBlueprint() {
        const grid = document.getElementById('blueprint-grid');
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${this.blueprint.cols}, auto)`;
        this.blueprint.cells.forEach((letter, idx) => {
            const cell = document.createElement('div');
            cell.className = 'cell' + (letter ? '' : ' empty');
            if (letter) {
                cell.innerHTML = `${MATERIALS[letter].icon}<span class="letter">${letter}</span>`;
                cell.title = MATERIALS[letter].name;
            }
            grid.appendChild(cell);
        });
    },

    renderConstruction() {
        const grid = document.getElementById('construction-grid');
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${this.blueprint.cols}, auto)`;
        this.blueprint.cells.forEach((letter, idx) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.idx = idx;
            const placed = this.placements[idx];
            if (placed) {
                cell.classList.add('filled');
                cell.innerHTML = `${MATERIALS[placed].icon}<span class="letter">${placed}</span>`;
                cell.title = MATERIALS[placed].name;
            }
            cell.onclick = () => this.placeMaterial(idx);
            grid.appendChild(cell);
        });
    },

    renderPalette(letters) {
        const palette = document.getElementById('material-palette');
        palette.innerHTML = '';
        // Shuffle letters for the palette (so player must match, not just go in order)
        const shuffled = [...letters];
        let seed = this.currentSurah * 7 + this.currentAyah * 13;
        const rand = () => {
            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
            return seed / 0x7fffffff;
        };
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        shuffled.forEach(letter => {
            const m = MATERIALS[letter];
            const btn = document.createElement('button');
            btn.className = 'material-btn';
            btn.dataset.letter = letter;
            btn.innerHTML = `<span class="icon">${m.icon}</span> <span>${m.name}</span> <span class="letter">${letter}</span>`;
            btn.title = m.desc;
            btn.onclick = () => this.selectPaletteMaterial(letter, btn);
            palette.appendChild(btn);
        });
    },

    selectPaletteMaterial(letter, btn) {
        this.selectedMaterial = letter;
        document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    },

    placeMaterial(idx) {
        if (!this.selectedMaterial) return;
        const cell = document.querySelector(`#construction-grid .cell[data-idx="${idx}"]`);
        if (!cell) return;
        // Don't place on empty blueprint cells
        if (this.blueprint.cells[idx] === null) {
            this.showMessage('That spot is empty ground — no building needed there.', 'error');
            return;
        }
        // Remove previous placement of this material if any
        for (const [key, val] of Object.entries(this.placements)) {
            if (val === this.selectedMaterial) {
                delete this.placements[key];
                const prevCell = document.querySelector(`#construction-grid .cell[data-idx="${key}"]`);
                if (prevCell) {
                    prevCell.classList.remove('filled');
                    prevCell.innerHTML = '';
                    prevCell.title = '';
                }
            }
        }
        // Place it
        this.placements[idx] = this.selectedMaterial;
        cell.classList.add('filled');
        cell.innerHTML = `${MATERIALS[this.selectedMaterial].icon}<span class="letter">${this.selectedMaterial}</span>`;
        cell.title = MATERIALS[this.selectedMaterial].name;
        this.updatePalette();
        this.updateInstructions();

        // Check if all placed
        const needed = this.blueprint.letters.length;
        const placedCount = Object.keys(this.placements).length;
        if (placedCount === needed) {
            this.showMessage('All materials placed! ⛺ Check your work.', 'success');
        }
    },

    updatePalette() {
        document.querySelectorAll('.material-btn').forEach(btn => {
            const letter = btn.dataset.letter;
            const used = Object.values(this.placements).includes(letter);
            btn.classList.toggle('used', used);
            if (used && btn.classList.contains('selected')) {
                btn.classList.remove('selected');
                this.selectedMaterial = null;
            }
        });
    },

    renderInstructions() {
        const list = document.getElementById('instructions-list');
        list.innerHTML = '';
        this.blueprint.letters.forEach((letter, i) => {
            const m = MATERIALS[letter];
            // Find the position of this letter in the blueprint
            let pos = -1;
            this.blueprint.cells.forEach((c, idx) => {
                if (c === letter && pos === -1) pos = idx;
            });
            const row = Math.floor(pos / this.blueprint.cols) + 1;
            const col = (pos % this.blueprint.cols) + 1;
            const item = document.createElement('div');
            item.className = 'instr-item';
            item.dataset.letter = letter;
            item.innerHTML = `
                <span class="icon">${m.icon}</span>
                <span>${m.name}</span>
                <span class="letter">(${letter})</span>
                <span class="pos">→ Row ${row}, Col ${col}</span>
            `;
            list.appendChild(item);
        });
    },

    updateInstructions() {
        document.querySelectorAll('.instr-item').forEach(item => {
            const letter = item.dataset.letter;
            const used = Object.values(this.placements).includes(letter);
            item.classList.toggle('done', used);
        });
    },

    checkBuild() {
        let allCorrect = true;
        let wrongCount = 0;
        this.blueprint.cells.forEach((expected, idx) => {
            const cell = document.querySelector(`#construction-grid .cell[data-idx="${idx}"]`);
            if (!cell) return;
            const placed = this.placements[idx];
            if (expected === null) {
                // Empty cell — should be empty
                if (placed) {
                    cell.classList.add('wrong');
                    allCorrect = false;
                    wrongCount++;
                }
            } else if (placed === expected) {
                cell.classList.add('correct');
                cell.classList.remove('wrong');
            } else {
                cell.classList.add('wrong');
                cell.classList.remove('correct');
                allCorrect = false;
                wrongCount++;
            }
        });

        if (allCorrect) {
            this.completed[`${this.currentSurah}|${this.currentAyah}`] = true;
            this.saveProgress();
            this.showMessage('🌿 Well built! The Master approves. 🌿', 'success');
            document.getElementById('btn-check').classList.add('hidden');
            document.getElementById('btn-next').classList.remove('hidden');
        } else {
            this.showMessage(`⚠ ${wrongCount} piece${wrongCount > 1 ? 's' : ''} misplaced. Consult the Blueprint.`, 'error');
        }
    },

    nextAyah() {
        const count = SURAH_COUNTS[this.currentSurah];
        if (this.currentAyah < count) {
            this.currentAyah++;
            this.startBuild();
        } else {
            // Surah complete
            document.getElementById('complete-text').textContent =
                `You have completed Sūrah ${this.currentSurah}: ${SURAH_NAMES[this.currentSurah] || ''}! ` +
                `All ${count} verses built. The chamber stands strong.`;
            this.showScreen('screen-complete');
        }
    },

    showMessage(msg, type) {
        const el = document.getElementById('build-message');
        el.textContent = msg;
        el.className = type || '';
    },

    // ── Progress Persistence ──
    saveProgress() {
        try {
            localStorage.setItem('dar-al-bina-progress', JSON.stringify(this.completed));
        } catch (e) { /* no storage */ }
    },

    loadProgress() {
        try {
            const saved = localStorage.getItem('dar-al-bina-progress');
            if (saved) this.completed = JSON.parse(saved);
        } catch (e) { /* no storage */ }
    }
};

// ── Boot ──
window.addEventListener('DOMContentLoaded', () => Game.init());
