const STUDENT_TOOLS = [
    { id: 'assignment-planner', name: 'Assignment Planner', description: 'Create, edit, and organize your academic assignments.', icon: 'calendar-check', category: 'University Student Tools' },
    { id: 'citation-generator', name: 'Citation Generator', description: 'Generate APA, MLA, Chicago, and Harvard citations.', icon: 'quote', category: 'University Student Tools' },
    { id: 'research-organizer', name: 'Research Paper Organizer', description: 'Organize sources, notes, and key findings for your papers.', icon: 'library', category: 'University Student Tools' },
    { id: 'presentation-outline', name: 'Presentation Outline Maker', description: 'Create slide-by-slide outlines for your presentations.', icon: 'presentation', category: 'University Student Tools' },
    { id: 'flashcard-maker', name: 'Flashcard Maker', description: 'Create and study with custom flashcard decks.', icon: 'layers', category: 'University Student Tools' },
    { id: 'quiz-generator', name: 'Quiz & MCQ Generator', description: 'Create and take custom multiple-choice quizzes.', icon: 'check-square', category: 'University Student Tools' },
    { id: 'gpa-calculator', name: 'GPA & CGPA Calculator', description: 'Calculate your semester and cumulative GPA accurately.', icon: 'calculator', category: 'University Student Tools' },
    { id: 'study-timetable', name: 'Study Timetable Generator', description: 'Generate a practical weekly study schedule.', icon: 'calendar', category: 'University Student Tools' },
    { id: 'scientific-calculator', name: 'Scientific Calculator', description: 'Perform advanced mathematical calculations.', icon: 'function-square', category: 'University Student Tools' },
    { id: 'notes-to-study-guide', name: 'Notes to Study Guide', description: 'Convert raw notes into structured study guides.', icon: 'book-open', category: 'University Student Tools' },
    { id: 'essay-structure-helper', name: 'Essay Structure Helper', description: 'Generate outlines and word count targets for essays.', icon: 'align-left', category: 'University Student Tools' },
    { id: 'study-estimator', name: 'Reading Time & Study Estimator', description: 'Estimate reading duration and plan study sessions.', icon: 'clock', category: 'University Student Tools' },
    { id: 'code-explainer', name: 'Code Explainer', description: 'Understand complex code snippets using AI.', icon: 'code', category: 'University Student Tools' },
    { id: 'student-unit-converter', name: 'Student Unit Converter', description: 'Convert common academic units accurately.', icon: 'arrow-right-left', category: 'University Student Tools' },
    { id: 'exam-countdown', name: 'Exam Countdown', description: 'Track your upcoming exams and days remaining.', icon: 'timer', category: 'University Student Tools' }
];

// Append to global arrays
TOOLS.push(...STUDENT_TOOLS);
if (!CATEGORIES.includes('University Student Tools')) {
    CATEGORIES.push('University Student Tools');
}

// Validation UI Helpers
window.showInlineError = function(btnId, msg) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let err = btn.previousElementSibling;
    if (!err || !err.classList.contains('inline-err')) {
        err = document.createElement('div');
        err.className = 'alert inline-err mb-4';
        err.style.color = '#ef4444';
        err.style.border = '1px solid #ef4444';
        err.style.background = 'rgba(239, 68, 68, 0.1)';
        err.style.padding = '0.75rem';
        err.style.borderRadius = '8px';
        btn.parentNode.insertBefore(err, btn);
    }
    err.innerText = msg;
    err.classList.remove('hidden');
};

window.clearInlineError = function(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const err = btn.previousElementSibling;
    if (err && err.classList.contains('inline-err')) {
        err.classList.add('hidden');
    }
};

// Intercept getToolUI
const originalGetToolUI = window.getToolUI;
window.getToolUI = function(id) {
    const customUI = getStudentToolUI(id);
    if (customUI) return customUI;
    if (typeof originalGetToolUI === 'function') return originalGetToolUI(id);
    return '';
};

// Intercept initToolLogic
const originalInitToolLogic = window.initToolLogic;
window.initToolLogic = function(id) {
    if (initStudentToolLogic(id)) return true;
    if (typeof originalInitToolLogic === 'function') return originalInitToolLogic(id);
    return false;
};

function getStudentToolUI(id) {
    switch(id) {
        case 'assignment-planner': return `
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass-card" style="padding: 1.5rem">
                    <h3>Add Assignment</h3>
                    <div class="input-group mt-4"><label>Title</label><input type="text" id="ap-title"></div>
                    <div class="input-group"><label>Subject</label><input type="text" id="ap-subject"></div>
                    <div class="input-group"><label>Due Date</label><input type="date" id="ap-date"></div>
                    <div class="input-group"><label>Priority</label><select id="ap-priority"><option>High</option><option>Medium</option><option>Low</option></select></div>
                    <button class="btn-primary" id="ap-add" style="width:100%; justify-content:center">Add Assignment</button>
                </div>
                <div>
                    <div class="flex gap-2 mb-4">
                        <button class="btn-secondary" id="ap-filter-all">All</button>
                        <button class="btn-secondary" id="ap-filter-upcoming">Upcoming</button>
                        <button class="btn-secondary" id="ap-filter-overdue">Overdue</button>
                    </div>
                    <div id="ap-list"></div>
                </div>
            </div>`;
        
        case 'citation-generator': return `
            <div class="input-group"><label>Citation Style</label>
                <select id="cg-style"><option value="APA">APA 7th</option><option value="MLA">MLA 9th</option><option value="Chicago">Chicago</option><option value="Harvard">Harvard</option></select>
            </div>
            <div class="input-group"><label>Source Type</label>
                <select id="cg-type"><option value="Book">Book</option><option value="Website">Website</option><option value="Journal">Journal Article</option></select>
            </div>
            <div id="cg-error" class="alert hidden mb-4" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444;"></div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="input-group"><label id="cg-author-label">Author (Last, First) *</label><input type="text" id="cg-author"></div>
                <div class="input-group"><label>Title *</label><input type="text" id="cg-title"></div>
                <div class="input-group"><label>Year</label><input type="text" id="cg-year"></div>
                
                <div class="input-group" id="cg-group-pub"><label id="cg-pub-label">Publisher</label><input type="text" id="cg-publisher"></div>
                <div class="input-group hidden" id="cg-group-month-day"><label>Month & Day (e.g., Oct 4)</label><input type="text" id="cg-month-day"></div>
                
                <div class="input-group hidden" id="cg-group-vol"><label>Volume(Issue)</label><input type="text" id="cg-vol" placeholder="e.g. 12(3)"></div>
                <div class="input-group hidden" id="cg-group-pages"><label>Page Range</label><input type="text" id="cg-pages" placeholder="e.g. 401-415"></div>

                <div class="input-group" id="cg-group-url" style="grid-column: span 2;"><label>URL / DOI</label><input type="text" id="cg-url"></div>
            </div>
            <button class="btn-primary" id="cg-generate">Generate Citation</button>
            <div class="alert alert-info mt-4"><i data-lucide="info"></i> Please verify citation format against your specific institution's guidelines.</div>
            <div class="input-group mt-4"><label>Result</label><div id="cg-output" class="result-box"></div></div>
            <button class="btn-secondary mt-4" id="cg-copy">Copy Citation</button>
        `;

        case 'research-organizer': return `
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass-card" style="padding: 1.5rem">
                    <h3>Add Source</h3>
                    <div class="input-group mt-4"><label>Title</label><input type="text" id="ro-title"></div>
                    <div class="input-group"><label>Author</label><input type="text" id="ro-author"></div>
                    <div class="input-group"><label>URL / DOI</label><input type="text" id="ro-url"></div>
                    <div class="input-group"><label>Key Findings / Notes</label><textarea id="ro-notes" rows="4"></textarea></div>
                    <div class="input-group"><label>Tags (comma separated)</label><input type="text" id="ro-tags"></div>
                    <button class="btn-primary" id="ro-add" style="width:100%; justify-content:center">Save Source</button>
                </div>
                <div>
                    <div class="flex gap-2 justify-between mb-4">
                        <input type="text" id="ro-search" placeholder="Search sources..." style="width: 200px">
                        <div class="btn-group m-0"><button class="btn-secondary" id="ro-export">Export JSON</button><button class="btn-secondary" id="ro-import-btn">Import JSON</button><input type="file" id="ro-import" hidden accept=".json"></div>
                    </div>
                    <div id="ro-list"></div>
                </div>
            </div>`;

        case 'presentation-outline': return `
            <div class="alert alert-info"><i data-lucide="info"></i> AI Generation requires an OpenAI API Key. Otherwise, a manual template is generated.</div>
            <div class="input-group"><label>OpenAI API Key (Optional)</label><input type="password" id="po-key" placeholder="sk-..."></div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="input-group"><label>Topic</label><input type="text" id="po-topic"></div>
                <div class="input-group"><label>Audience</label><input type="text" id="po-audience"></div>
                <div class="input-group"><label>Duration (Minutes)</label><input type="number" id="po-duration" value="10"></div>
            </div>
            <button class="btn-primary" id="po-generate">Generate Outline</button>
            <div class="mt-4 hidden" id="po-loading"><span class="loader"></span> Generating...</div>
            <div class="input-group mt-4"><label>Result</label><div id="po-output" class="result-box"></div></div>
            <button class="btn-secondary mt-4" id="po-copy">Copy Result</button>
        `;

        case 'flashcard-maker': return `
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass-card" style="padding: 1.5rem">
                    <h3>Add Flashcard</h3>
                    <div class="input-group mt-4"><label>Front (Question)</label><textarea id="fc-front" rows="3"></textarea></div>
                    <div class="input-group"><label>Back (Answer)</label><textarea id="fc-back" rows="3"></textarea></div>
                    <button class="btn-primary" id="fc-add" style="width:100%; justify-content:center">Add Card</button>
                    <hr style="margin:1.5rem 0; border:none; border-top:1px solid var(--glass-border)">
                    <button class="btn-secondary" id="fc-export" style="width:100%; justify-content:center; margin-bottom:0.5rem">Export Deck</button>
                    <button class="btn-secondary" id="fc-import-btn" style="width:100%; justify-content:center">Import Deck</button>
                    <input type="file" id="fc-import" hidden accept=".json">
                </div>
                <div class="glass-card" style="padding: 2rem; text-align:center; display:flex; flex-direction:column; justify-content:center; min-height: 300px">
                    <div id="fc-display" style="font-size:1.5rem; margin-bottom:2rem">No cards added yet.</div>
                    <div class="btn-group justify-center">
                        <button class="btn-secondary" id="fc-prev">Prev</button>
                        <button class="btn-primary" id="fc-flip">Flip</button>
                        <button class="btn-secondary" id="fc-next">Next</button>
                    </div>
                    <div class="mt-4 text-secondary" id="fc-count">0 / 0</div>
                </div>
            </div>`;

        case 'quiz-generator': return `
            <div class="alert alert-info"><i data-lucide="info"></i> Use AI to generate questions from notes, or add manually below.</div>
            <div class="input-group"><label>OpenAI API Key (Optional)</label><input type="password" id="qg-key" placeholder="sk-..."></div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <div class="glass-card mb-4" style="padding: 1.5rem">
                        <h3>AI Generator</h3>
                        <div class="input-group mt-2"><label>Notes text</label><textarea id="qg-notes" rows="4"></textarea></div>
                        <button class="btn-primary" id="qg-ai-btn">Generate from Notes</button>
                        <div class="mt-2 hidden" id="qg-loading"><span class="loader"></span> Generating...</div>
                    </div>
                    <div class="glass-card" style="padding: 1.5rem">
                        <h3>Manual Entry</h3>
                        <div class="input-group mt-2"><label>Question</label><input type="text" id="qg-q"></div>
                        <div class="input-group"><label>Option A</label><input type="text" id="qg-a"></div>
                        <div class="input-group"><label>Option B</label><input type="text" id="qg-b"></div>
                        <div class="input-group"><label>Option C</label><input type="text" id="qg-c"></div>
                        <div class="input-group"><label>Option D</label><input type="text" id="qg-d"></div>
                        <div class="input-group"><label>Correct Answer</label><select id="qg-correct"><option>A</option><option>B</option><option>C</option><option>D</option></select></div>
                        <button class="btn-secondary" id="qg-add-manual" style="width:100%; justify-content:center">Add Question</button>
                    </div>
                </div>
                <div class="glass-card" style="padding: 1.5rem">
                    <div class="flex justify-between items-center mb-4"><h3>Quiz View</h3><button class="btn-secondary" id="qg-clear">Clear Quiz</button></div>
                    <div id="qg-play-area">Add questions to start quiz.</div>
                </div>
            </div>`;

        case 'gpa-calculator': return `
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h3 class="mb-4">Current Semester</h3>
                    <div id="gpa-subjects"></div>
                    <button class="btn-secondary mt-4" id="gpa-add-row">+ Add Subject</button>
                </div>
                <div class="glass-card" style="padding: 1.5rem">
                    <h3 class="mb-4">Cumulative GPA (Optional)</h3>
                    <div class="input-group"><label>Previous CGPA</label><input type="number" step="0.01" id="gpa-prev-cgpa"></div>
                    <div class="input-group"><label>Previous Credits Completed</label><input type="number" id="gpa-prev-credits"></div>
                    <hr style="margin:1.5rem 0; border:none; border-top:1px solid var(--glass-border)">
                    <button class="btn-primary" id="gpa-calc-btn" style="width:100%; justify-content:center; font-size:1.2rem">Calculate GPA</button>
                    <div class="stats-grid mt-4">
                        <div class="stat-card"><div class="value" id="gpa-sem-res">0.00</div><div class="label">Semester GPA</div></div>
                        <div class="stat-card"><div class="value" id="gpa-cgpa-res">0.00</div><div class="label">Overall CGPA</div></div>
                    </div>
                    <div class="alert alert-info mt-4">Scale: A=4, B=3, C=2, D=1, F=0 (with +/- variations). Adjust per university.</div>
                </div>
            </div>`;

        case 'study-timetable': return `
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass-card" style="padding: 1.5rem">
                    <h3>Timetable Config</h3>
                    <div class="input-group mt-4"><label>Subjects (comma separated)</label><input type="text" id="tt-subjects" placeholder="Math, Physics, English"></div>
                    <div class="input-group"><label>Hours per day</label><input type="number" id="tt-hours" value="4"></div>
                    <button class="btn-primary" id="tt-generate" style="width:100%; justify-content:center">Generate Timetable</button>
                </div>
                <div>
                    <div class="glass-card" style="padding: 1.5rem; overflow-x: auto;">
                        <table id="tt-table" style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead><tr style="border-bottom: 2px solid var(--glass-border)"><th style="padding:1rem">Day</th><th style="padding:1rem">Study Plan</th></tr></thead>
                            <tbody id="tt-body"><tr><td colspan="2" style="padding:1rem; text-align:center">Generate to see timetable</td></tr></tbody>
                        </table>
                    </div>
                    <button class="btn-secondary mt-4" onclick="window.print()">Print Timetable</button>
                </div>
            </div>`;

        case 'scientific-calculator': return `
            <div style="max-width: 400px; margin: 0 auto;" class="glass-card p-4">
                <div style="padding: 1.5rem">
                    <input type="text" id="sc-display" readonly style="width:100%; font-size:1.5rem; text-align:right; margin-bottom:1rem; padding:1rem; border-radius:12px; background:var(--bg-color); border:1px solid var(--glass-border); color:var(--text-primary)">
                    <div class="grid" style="grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                        <button class="btn-secondary sc-btn">sin</button><button class="btn-secondary sc-btn">cos</button><button class="btn-secondary sc-btn">tan</button><button class="btn-secondary sc-btn" style="color:#ef4444">C</button>
                        <button class="btn-secondary sc-btn">log</button><button class="btn-secondary sc-btn">sqrt</button><button class="btn-secondary sc-btn">^</button><button class="btn-secondary sc-btn">/</button>
                        <button class="btn-secondary sc-btn">(</button><button class="btn-secondary sc-btn">)</button><button class="btn-secondary sc-btn">%</button><button class="btn-secondary sc-btn">*</button>
                        <button class="btn-secondary sc-btn">7</button><button class="btn-secondary sc-btn">8</button><button class="btn-secondary sc-btn">9</button><button class="btn-secondary sc-btn">-</button>
                        <button class="btn-secondary sc-btn">4</button><button class="btn-secondary sc-btn">5</button><button class="btn-secondary sc-btn">6</button><button class="btn-secondary sc-btn">+</button>
                        <button class="btn-secondary sc-btn">1</button><button class="btn-secondary sc-btn">2</button><button class="btn-secondary sc-btn">3</button><button class="btn-primary sc-btn" style="grid-row: span 2">=</button>
                        <button class="btn-secondary sc-btn" style="grid-column: span 2">0</button><button class="btn-secondary sc-btn">.</button>
                    </div>
                </div>
            </div>`;

        case 'notes-to-study-guide': return `
            <div class="alert alert-info"><i data-lucide="info"></i> Process manually or use AI for better organization.</div>
            <div class="input-group"><label>OpenAI API Key (Optional for AI)</label><input type="password" id="nsg-key" placeholder="sk-..."></div>
            <div class="input-group"><label>Raw Notes</label><textarea id="nsg-input" rows="8" placeholder="Paste your raw lecture notes here..."></textarea></div>
            <div class="btn-group">
                <button class="btn-primary" id="nsg-manual">Process Manually</button>
                <button class="btn-primary" id="nsg-ai">Process with AI</button>
            </div>
            <div class="mt-4 hidden" id="nsg-loading"><span class="loader"></span> Processing...</div>
            <div class="input-group mt-4"><label>Study Guide</label><div id="nsg-output" class="result-box"></div></div>
            <button class="btn-secondary mt-4" id="nsg-copy">Copy Guide</button>
        `;

        case 'essay-structure-helper': return `
            <div class="alert alert-info"><i data-lucide="info"></i> AI integration available for better structural suggestions.</div>
            <div class="input-group"><label>OpenAI API Key (Optional)</label><input type="password" id="esh-key" placeholder="sk-..."></div>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="input-group"><label>Essay Topic</label><input type="text" id="esh-topic"></div>
                <div class="input-group"><label>Essay Type</label><select id="esh-type"><option>Argumentative</option><option>Expository</option><option>Narrative</option></select></div>
                <div class="input-group"><label>Target Word Count</label><input type="number" id="esh-words" value="1000"></div>
            </div>
            <div class="input-group"><label>Key Arguments (Optional)</label><input type="text" id="esh-args" placeholder="Arg1, Arg2..."></div>
            <button class="btn-primary" id="esh-generate">Generate Outline & Structure</button>
            <div class="mt-4 hidden" id="esh-loading"><span class="loader"></span> Generating...</div>
            <div class="input-group mt-4"><label>Essay Plan</label><div id="esh-output" class="result-box"></div></div>
        `;

        case 'study-estimator': return `
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <div class="input-group"><label>Material Word Count</label><input type="number" id="se-words" placeholder="e.g. 5000"></div>
                    <div class="input-group"><label>Reading Speed: <span id="se-speed-val">200</span> wpm</label><input type="range" id="se-speed" min="50" max="600" value="200" style="width:100%"></div>
                    <button class="btn-primary mt-4" id="se-calc">Estimate Time</button>
                </div>
                <div class="glass-card" style="padding: 1.5rem">
                    <h3 class="mb-4">Estimation Results</h3>
                    <div class="stats-grid">
                        <div class="stat-card"><div class="value" id="se-res-time">0m</div><div class="label">Total Reading Time</div></div>
                        <div class="stat-card"><div class="value" id="se-res-sessions">0</div><div class="label">Suggested Sessions (25m)</div></div>
                    </div>
                </div>
            </div>`;

        case 'code-explainer': return `
            <div class="alert alert-info"><i data-lucide="info"></i> Requires OpenAI API Key to explain code logic and identify issues.</div>
            <div class="input-group"><label>OpenAI API Key</label><input type="password" id="ce-key" placeholder="sk-..."></div>
            <div class="input-group"><label>Language</label><select id="ce-lang"><option>Python</option><option>JavaScript</option><option>Java</option><option>C++</option></select></div>
            <div class="input-group"><label>Paste Code</label><textarea id="ce-code" rows="8" style="font-family:monospace"></textarea></div>
            <button class="btn-primary" id="ce-btn">Explain Code</button>
            <div class="mt-4 hidden" id="ce-loading"><span class="loader"></span> Analyzing...</div>
            <div class="input-group mt-4"><label>Explanation</label><div id="ce-output" class="result-box"></div></div>
        `;

        case 'student-unit-converter': return `
            <div class="grid" style="grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items:end">
                <div class="input-group mb-0"><label>Category</label><select id="uc-cat"><option value="length">Length</option><option value="mass">Mass</option><option value="temp">Temperature</option></select></div>
                <div class="input-group mb-0"><label>From</label><select id="uc-from"></select></div>
                <div class="input-group mb-0"><label>To</label><select id="uc-to"></select></div>
            </div>
            <div class="grid mt-4" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="input-group"><label>Value</label><input type="number" id="uc-val" value="1"></div>
                <div class="input-group"><label>Result</label><input type="text" id="uc-res" readonly></div>
            </div>
            <button class="btn-primary mt-4" id="uc-convert">Convert</button>
        `;

        case 'exam-countdown': return `
            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 2rem;">
                <div class="glass-card" style="padding: 1.5rem">
                    <h3>Add Exam</h3>
                    <div class="input-group mt-4"><label>Title</label><input type="text" id="ec-title"></div>
                    <div class="input-group"><label>Subject</label><input type="text" id="ec-subject"></div>
                    <div class="input-group"><label>Date</label><input type="date" id="ec-date"></div>
                    <button class="btn-primary" id="ec-add" style="width:100%; justify-content:center">Add Exam</button>
                </div>
                <div>
                    <h3 class="mb-4">Upcoming Exams</h3>
                    <div id="ec-list"></div>
                </div>
            </div>`;
    }
    return null;
}

function initStudentToolLogic(id) {
    switch (id) {
        case 'assignment-planner': initAssignmentPlanner(); return true;
        case 'citation-generator': initCitationGenerator(); return true;
        case 'research-organizer': initResearchOrganizer(); return true;
        case 'presentation-outline': initPresentationOutline(); return true;
        case 'flashcard-maker': initFlashcardMaker(); return true;
        case 'quiz-generator': initQuizGenerator(); return true;
        case 'gpa-calculator': initGpaCalculator(); return true;
        case 'study-timetable': initStudyTimetable(); return true;
        case 'scientific-calculator': initScientificCalculator(); return true;
        case 'notes-to-study-guide': initNotesToStudyGuide(); return true;
        case 'essay-structure-helper': initEssayStructureHelper(); return true;
        case 'study-estimator': initStudyEstimator(); return true;
        case 'code-explainer': initCodeExplainer(); return true;
        case 'student-unit-converter': initStudentUnitConverter(); return true;
        case 'exam-countdown': initExamCountdown(); return true;
    }
    return false;
}

// ----------------------------------------------------
// TOOL LOGIC IMPLEMENTATIONS
// ----------------------------------------------------

function initAssignmentPlanner() {
    let assignments = JSON.parse(localStorage.getItem('techvelo_assignments') || '[]');
    const render = (filter = 'all') => {
        const now = new Date();
        now.setHours(0,0,0,0);
        let list = assignments;
        if(filter==='upcoming') list = assignments.filter(a => new Date(a.date) >= now && !a.completed);
        if(filter==='overdue') list = assignments.filter(a => new Date(a.date) < now && !a.completed);
        
        document.getElementById('ap-list').innerHTML = list.map((a, i) => `
            <div class="glass-card mb-4 p-4 flex justify-between items-center" style="padding:1rem; opacity: ${a.completed ? 0.6 : 1}">
                <div>
                    <strong style="text-decoration: ${a.completed ? 'line-through' : 'none'}">${a.title}</strong> - ${a.subject}
                    <div style="font-size:0.85rem; color:var(--text-secondary)">Due: ${a.date} | Priority: ${a.priority}</div>
                </div>
                <div>
                    <button class="btn-secondary" onclick="window.apToggle(${i})" style="padding:0.25rem 0.5rem">${a.completed?'Undo':'Done'}</button>
                    <button class="btn-secondary" onclick="window.apDel(${i})" style="padding:0.25rem 0.5rem; color:red">Del</button>
                </div>
            </div>
        `).join('') || '<p>No assignments found.</p>';
    };
    
    window.apDel = (i) => { assignments.splice(i,1); localStorage.setItem('techvelo_assignments', JSON.stringify(assignments)); render(); };
    window.apToggle = (i) => { assignments[i].completed = !assignments[i].completed; localStorage.setItem('techvelo_assignments', JSON.stringify(assignments)); render(); };
    
    document.getElementById('ap-add').addEventListener('click', () => {
        const title = document.getElementById('ap-title').value;
        const subject = document.getElementById('ap-subject').value;
        const date = document.getElementById('ap-date').value;
        const priority = document.getElementById('ap-priority').value;
        window.clearInlineError('ap-add');
        if(!title || !date) return window.showInlineError('ap-add', 'Title and Date required');
        assignments.push({title, subject, date, priority, completed: false});
        localStorage.setItem('techvelo_assignments', JSON.stringify(assignments));
        render();
    });
    
    document.getElementById('ap-filter-all').onclick = () => render('all');
    document.getElementById('ap-filter-upcoming').onclick = () => render('upcoming');
    document.getElementById('ap-filter-overdue').onclick = () => render('overdue');
    render();
}

function initCitationGenerator() {
    const typeSelect = document.getElementById('cg-type');
    const pubLabel = document.getElementById('cg-pub-label');
    const authorLabel = document.getElementById('cg-author-label');
    const groupMonthDay = document.getElementById('cg-group-month-day');
    const groupVol = document.getElementById('cg-group-vol');
    const groupPages = document.getElementById('cg-group-pages');
    const errorBox = document.getElementById('cg-error');

    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        // Reset visibility
        groupMonthDay.classList.add('hidden');
        groupVol.classList.add('hidden');
        groupPages.classList.add('hidden');
        
        if (type === 'Book') {
            pubLabel.innerText = 'Publisher';
            authorLabel.innerText = 'Author (Last, First) *';
        } else if (type === 'Website') {
            pubLabel.innerText = 'Website Name';
            authorLabel.innerText = 'Author or Organization *';
            groupMonthDay.classList.remove('hidden');
        } else if (type === 'Journal') {
            pubLabel.innerText = 'Journal Name';
            authorLabel.innerText = 'Author (Last, First) *';
            groupVol.classList.remove('hidden');
            groupPages.classList.remove('hidden');
        }
    });

    document.getElementById('cg-generate').addEventListener('click', () => {
        if (errorBox) errorBox.classList.add('hidden');
        
        const style = document.getElementById('cg-style').value;
        const type = typeSelect.value;
        
        const author = document.getElementById('cg-author').value.trim();
        const title = document.getElementById('cg-title').value.trim();
        const year = document.getElementById('cg-year').value.trim();
        const pub = document.getElementById('cg-publisher').value.trim();
        const url = document.getElementById('cg-url').value.trim();
        
        const monthDay = document.getElementById('cg-month-day') ? document.getElementById('cg-month-day').value.trim() : '';
        const vol = document.getElementById('cg-vol') ? document.getElementById('cg-vol').value.trim() : '';
        const pages = document.getElementById('cg-pages') ? document.getElementById('cg-pages').value.trim() : '';
        
        if (!author || !title) {
            errorBox.innerText = 'Author and Title are required fields.';
            errorBox.classList.remove('hidden');
            return;
        }

        let res = '';
        
        if (style === 'APA') {
            if (type === 'Book') {
                res = `${author}. `;
                res += year ? `(${year}). ` : `(n.d.). `;
                res += `<i>${title}</i>.`;
                if (pub) res += ` ${pub}.`;
            } 
            else if (type === 'Website') {
                res = `${author}. `;
                let dateStr = year ? year : 'n.d.';
                if (year && monthDay) dateStr = `${year}, ${monthDay}`;
                res += `(${dateStr}). `;
                res += `<i>${title}</i>.`;
                if (pub) res += ` ${pub}.`;
                if (url) res += ` ${url}`;
            } 
            else if (type === 'Journal') {
                res = `${author}. `;
                res += year ? `(${year}). ` : `(n.d.). `;
                res += `${title}. `;
                if (pub) res += `<i>${pub}</i>`;
                if (vol) res += pub ? `, ${vol}` : `${vol}`;
                if (pages) res += (pub || vol) ? `, ${pages}` : `${pages}`;
                if (pub || vol || pages) res += `.`;
                if (url) res += ` ${url}`;
            }
        } 
        else {
            let dispYear = year || 'n.d.';
            if (style === 'MLA') res = `${author}. "${title}." <i>${pub}</i>, ${dispYear}, ${url}.`;
            if (style === 'Chicago') res = `${author}. <i>${title}</i>. ${pub}, ${dispYear}. ${url}.`;
            if (style === 'Harvard') res = `${author}, ${dispYear}. <i>${title}</i>. ${pub}. Available at: ${url}.`;
            
            res = res.replace(/, ,/g, ',').replace(/\. \./g, '.').replace(/\. ,/g, '.').replace(/<i><\/i>/g, '').trim();
            if (res.endsWith(',') || res.endsWith(',.')) res = res.replace(/,\.?$/, '.');
        }
        
        res = res.replace(/\s+/g, ' ').replace(/\.\./g, '.').replace(/\s\./g, '.').trim();
        if (!res.endsWith('.') && !url) res += '.';

        document.getElementById('cg-output').innerHTML = res;
    });
    
    document.getElementById('cg-copy').addEventListener('click', e => copyToClipboard(document.getElementById('cg-output').innerText, e.target));
}

function initResearchOrganizer() {
    let sources = JSON.parse(localStorage.getItem('techvelo_research') || '[]');
    const render = (q='') => {
        const list = sources.filter(s => s.title.toLowerCase().includes(q.toLowerCase()) || s.tags.toLowerCase().includes(q.toLowerCase()));
        document.getElementById('ro-list').innerHTML = list.map((s,i) => `
            <div class="glass-card mb-4" style="padding:1rem">
                <h4>${s.title} <button onclick="window.roDel(${i})" style="float:right; border:none; background:none; color:red; cursor:pointer">X</button></h4>
                <div style="font-size:0.85rem; color:var(--text-secondary)">${s.author} | ${s.url}</div>
                <p style="margin-top:0.5rem; font-size:0.9rem">${s.notes}</p>
                <div style="margin-top:0.5rem; font-size:0.8rem; background:rgba(59,130,246,0.1); padding:0.25rem; display:inline-block; border-radius:4px">${s.tags}</div>
            </div>
        `).join('') || '<p>No sources found.</p>';
    };
    
    window.roDel = (i) => { sources.splice(i,1); localStorage.setItem('techvelo_research', JSON.stringify(sources)); render(); };
    
    document.getElementById('ro-add').addEventListener('click', () => {
        const title = document.getElementById('ro-title').value;
        window.clearInlineError('ro-add');
        if(!title) return window.showInlineError('ro-add', 'Title is required');
        sources.push({
            title,
            author: document.getElementById('ro-author').value,
            url: document.getElementById('ro-url').value,
            notes: document.getElementById('ro-notes').value,
            tags: document.getElementById('ro-tags').value
        });
        localStorage.setItem('techvelo_research', JSON.stringify(sources));
        render();
    });
    
    document.getElementById('ro-search').addEventListener('input', (e) => render(e.target.value));
    
    document.getElementById('ro-export').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(sources, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'research_sources.json'; a.click();
    });
    
    const imp = document.getElementById('ro-import');
    document.getElementById('ro-import-btn').addEventListener('click', () => imp.click());
    imp.addEventListener('change', (e) => {
        const r = new FileReader();
        r.onload = ev => { sources = JSON.parse(ev.target.result); localStorage.setItem('techvelo_research', JSON.stringify(sources)); render(); };
        if(e.target.files[0]) r.readAsText(e.target.files[0]);
    });
    
    render();
}

function initPresentationOutline() {
    const keyEl = document.getElementById('po-key');
    keyEl.value = localStorage.getItem('techvelo_openai_key') || '';
    keyEl.addEventListener('change', e => localStorage.setItem('techvelo_openai_key', e.target.value));

    document.getElementById('po-generate').addEventListener('click', async () => {
        const topic = document.getElementById('po-topic').value;
        const audience = document.getElementById('po-audience').value;
        const duration = parseInt(document.getElementById('po-duration').value) || 10;
        const key = keyEl.value.trim();
        const output = document.getElementById('po-output');
        const loading = document.getElementById('po-loading');

        window.clearInlineError('po-generate');
        if(!topic) return window.showInlineError('po-generate', 'Topic required.');
        loading.classList.remove('hidden'); output.innerHTML = '';
        
        if (key) {
            try {
                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                    body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: `Create a presentation outline for "${topic}" targeting "${audience}" lasting ${duration} minutes. Give slide by slide points.` }] })
                });
                const data = await res.json();
                if(data.error) throw new Error(data.error.message);
                output.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
            } catch(e) { output.innerHTML = `<span style="color:red">${e.message}</span>`; }
        } else {
            // Manual logic
            let slides = duration / 2; // roughly 2 mins per slide
            let html = `<strong>Slide 1: Title & Introduction</strong><br>- Welcome the ${audience || 'audience'}.<br>- Introduce "${topic}".<br><br>`;
            for(let i=2; i<=Math.max(2, slides-1); i++) {
                html += `<strong>Slide ${i}: Key Point ${i-1}</strong><br>- Detail an aspect of ${topic}.<br>- Supporting evidence/data.<br><br>`;
            }
            html += `<strong>Slide ${Math.max(3, Math.ceil(slides))}: Conclusion & Q&A</strong><br>- Summary of points.<br>- Call to action.<br>- Questions?`;
            output.innerHTML = html;
        }
        loading.classList.add('hidden');
    });
    document.getElementById('po-copy').addEventListener('click', e => copyToClipboard(document.getElementById('po-output').innerText, e.target));
}

function initFlashcardMaker() {
    let cards = JSON.parse(localStorage.getItem('techvelo_flashcards') || '[]');
    let current = 0;
    let showingFront = true;
    
    const render = () => {
        const display = document.getElementById('fc-display');
        const count = document.getElementById('fc-count');
        if(cards.length === 0) { display.innerText = 'No cards added yet.'; count.innerText = '0 / 0'; return; }
        if(current >= cards.length) current = cards.length - 1;
        if(current < 0) current = 0;
        
        display.innerText = showingFront ? cards[current].front : cards[current].back;
        display.style.color = showingFront ? 'inherit' : 'var(--primary-color)';
        count.innerText = `${current + 1} / ${cards.length}`;
    };

    document.getElementById('fc-add').addEventListener('click', () => {
        const front = document.getElementById('fc-front').value;
        const back = document.getElementById('fc-back').value;
        window.clearInlineError('fc-add');
        if(!front || !back) return window.showInlineError('fc-add', 'Both sides required');
        cards.push({front, back});
        localStorage.setItem('techvelo_flashcards', JSON.stringify(cards));
        document.getElementById('fc-front').value = ''; document.getElementById('fc-back').value = '';
        render();
    });

    document.getElementById('fc-flip').addEventListener('click', () => { showingFront = !showingFront; render(); });
    document.getElementById('fc-next').addEventListener('click', () => { if(current < cards.length-1) { current++; showingFront = true; render(); }});
    document.getElementById('fc-prev').addEventListener('click', () => { if(current > 0) { current--; showingFront = true; render(); }});
    
    // Export Deck Logic
    document.getElementById('fc-export').addEventListener('click', () => {
        if(cards.length === 0) return alert('No flashcards to export.');
        const blob = new Blob([JSON.stringify(cards, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); 
        a.href = url; 
        a.download = 'flashcards_deck.json'; 
        a.click();
    });

    // Import Deck Logic
    const imp = document.getElementById('fc-import');
    document.getElementById('fc-import-btn').addEventListener('click', () => imp.click());
    
    imp.addEventListener('change', (e) => {
        if (!e.target.files[0]) return;
        const r = new FileReader();
        r.onload = ev => {
            try {
                const importedCards = JSON.parse(ev.target.result);
                if (!Array.isArray(importedCards)) throw new Error('Invalid file format. Expected a JSON array.');
                
                let added = 0;
                importedCards.forEach(c => {
                    if (c && typeof c.front === 'string' && typeof c.back === 'string' && c.front.trim() && c.back.trim()) {
                        // Prevent exact duplicates
                        const exists = cards.some(existing => existing.front === c.front.trim() && existing.back === c.back.trim());
                        if (!exists) {
                            cards.push({front: c.front.trim(), back: c.back.trim()});
                            added++;
                        }
                    }
                });
                
                if (added > 0) {
                    localStorage.setItem('techvelo_flashcards', JSON.stringify(cards));
                    render();
                    alert(`Successfully imported ${added} new flashcards.`);
                } else {
                    alert('No valid new flashcards found to import (they might be duplicates or incorrectly formatted).');
                }
            } catch(err) {
                alert('Failed to import deck. ' + err.message);
            }
        };
        r.readAsText(e.target.files[0]);
        // Reset the file input so the same file can be selected again if needed
        e.target.value = '';
    });
    
    render();
}

function initQuizGenerator() {
    let qs = [];
    const keyEl = document.getElementById('qg-key');
    keyEl.value = localStorage.getItem('techvelo_openai_key') || '';
    keyEl.addEventListener('change', e => localStorage.setItem('techvelo_openai_key', e.target.value));

    document.getElementById('qg-play-area').addEventListener('click', (e) => {
        if (e.target && e.target.id === 'qg-submit') {
            let score = 0;
            qs.forEach((q, i) => {
                const sel = document.querySelector(`input[name="q${i}"]:checked`);
                if(sel && sel.value === q.correct) score++;
            });
            document.getElementById('qg-res').innerText = `Score: ${score} / ${qs.length}`;
            e.target.disabled = true;
        }
    });

    const render = () => {
        const area = document.getElementById('qg-play-area');
        if(!qs.length) { area.innerHTML = 'Add questions to start.'; return; }
        area.innerHTML = qs.map((q, i) => `
            <div style="margin-bottom: 1.5rem">
                <strong>Q${i+1}: ${q.q}</strong><br>
                <div style="margin-top:0.5rem">
                    <label><input type="radio" name="q${i}" value="A"> ${q.a}</label><br>
                    <label><input type="radio" name="q${i}" value="B"> ${q.b}</label><br>
                    <label><input type="radio" name="q${i}" value="C"> ${q.c}</label><br>
                    <label><input type="radio" name="q${i}" value="D"> ${q.d}</label>
                </div>
            </div>
        `).join('') + `<button class="btn-primary" id="qg-submit">Submit Quiz</button><div id="qg-res" class="mt-4" style="font-weight:bold; font-size:1.2rem"></div>`;
    };

    document.getElementById('qg-add-manual').addEventListener('click', () => {
        qs.push({
            q: document.getElementById('qg-q').value,
            a: document.getElementById('qg-a').value,
            b: document.getElementById('qg-b').value,
            c: document.getElementById('qg-c').value,
            d: document.getElementById('qg-d').value,
            correct: document.getElementById('qg-correct').value
        });
        render();
    });
    
    document.getElementById('qg-clear').addEventListener('click', () => { qs = []; render(); });

    document.getElementById('qg-ai-btn').addEventListener('click', async () => {
        const notes = document.getElementById('qg-notes').value;
        const key = keyEl.value.trim();
        window.clearInlineError('qg-ai-btn');
        if(!notes || !key) return window.showInlineError('qg-ai-btn', 'Notes and API Key required for AI generation.');
        document.getElementById('qg-loading').classList.remove('hidden');
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: `Generate 3 multiple choice questions from this text. Return JSON array of objects with keys: q, a, b, c, d, correct (where correct is A, B, C, or D). Text: ${notes}` }] })
            });
            const data = await res.json();
            const arr = JSON.parse(data.choices[0].message.content.match(/\[.*\]/s)[0] || '[]');
            qs = qs.concat(arr); render();
        } catch(e) { alert('Failed to parse AI output. Try again.'); }
        document.getElementById('qg-loading').classList.add('hidden');
    });
}

function initGpaCalculator() {
    let rows = 0;
    const addRow = () => {
        const div = document.createElement('div');
        div.className = 'grid mb-2'; div.style.gridTemplateColumns = '2fr 1fr 1fr'; div.style.gap = '0.5rem';
        div.innerHTML = `
            <input type="text" placeholder="Subject Name (opt)">
            <input type="number" class="gpa-cred" placeholder="Credits" value="3">
            <select class="gpa-grade"><option value="4">A (4.0)</option><option value="3.7">A- (3.7)</option><option value="3.3">B+ (3.3)</option><option value="3">B (3.0)</option><option value="2.7">B- (2.7)</option><option value="2.3">C+ (2.3)</option><option value="2">C (2.0)</option><option value="1">D (1.0)</option><option value="0">F (0.0)</option></select>
        `;
        document.getElementById('gpa-subjects').appendChild(div);
        rows++;
    };
    
    document.getElementById('gpa-add-row').addEventListener('click', addRow);
    for(let i=0;i<4;i++) addRow();
    
    document.getElementById('gpa-calc-btn').addEventListener('click', () => {
        const creds = Array.from(document.querySelectorAll('.gpa-cred')).map(el => parseFloat(el.value) || 0);
        const grades = Array.from(document.querySelectorAll('.gpa-grade')).map(el => parseFloat(el.value) || 0);
        
        let semPts = 0, semCreds = 0;
        for(let i=0; i<creds.length; i++) {
            semCreds += creds[i];
            semPts += creds[i] * grades[i];
        }
        const semGpa = semCreds ? semPts / semCreds : 0;
        document.getElementById('gpa-sem-res').innerText = semGpa.toFixed(2);
        
        const prevCgpa = parseFloat(document.getElementById('gpa-prev-cgpa').value) || 0;
        const prevCreds = parseFloat(document.getElementById('gpa-prev-credits').value) || 0;
        
        if (prevCreds > 0) {
            const totCreds = prevCreds + semCreds;
            const totPts = (prevCgpa * prevCreds) + semPts;
            document.getElementById('gpa-cgpa-res').innerText = (totPts / totCreds).toFixed(2);
        } else {
            document.getElementById('gpa-cgpa-res').innerText = semGpa.toFixed(2);
        }
    });
}

function initStudyTimetable() {
    document.getElementById('tt-generate').addEventListener('click', () => {
        const subs = document.getElementById('tt-subjects').value.split(',').map(s=>s.trim()).filter(Boolean);
        const hours = parseInt(document.getElementById('tt-hours').value) || 4;
        window.clearInlineError('tt-generate');
        if(!subs.length) return window.showInlineError('tt-generate', 'Enter subjects');
        
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let html = '';
        
        days.forEach((day, i) => {
            let dayPlan = '';
            for(let h=0; h<hours; h++) {
                const sub = subs[(i * hours + h) % subs.length];
                dayPlan += `<span class="badge" style="margin-right:0.5rem; margin-bottom:0.5rem; display:inline-block">${sub}</span> `;
            }
            html += `<tr style="border-bottom: 1px solid var(--glass-border)"><td style="padding:1rem; font-weight:bold">${day}</td><td style="padding:1rem">${dayPlan}</td></tr>`;
        });
        document.getElementById('tt-body').innerHTML = html;
    });
}

function initScientificCalculator() {
    const disp = document.getElementById('sc-display');
    const btns = document.querySelectorAll('.sc-btn');
    
    // Very basic safe evaluation mapping
    const safeEval = (str) => {
        try {
            if (!str) return '';
            str = str.replace(/\s+/g, '');
            let pos = 0;
            
            function parseAddSub() {
                let res = parseMulDiv();
                while (pos < str.length) {
                    if (str[pos] === '+') { pos++; res += parseMulDiv(); }
                    else if (str[pos] === '-') { pos++; res -= parseMulDiv(); }
                    else break;
                }
                return res;
            }
            
            function parseMulDiv() {
                let res = parsePow();
                while (pos < str.length) {
                    if (str[pos] === '*') { pos++; res *= parsePow(); }
                    else if (str[pos] === '/') { 
                        pos++; 
                        let right = parsePow();
                        if (right === 0) throw new Error("Division by zero");
                        res /= right; 
                    }
                    else if (str[pos] === '%') { pos++; res %= parsePow(); }
                    else break;
                }
                return res;
            }
            
            function parsePow() {
                let res = parseFactor();
                while (pos < str.length && str[pos] === '^') {
                    pos++;
                    res = Math.pow(res, parsePow());
                }
                return res;
            }
            
            function parseFactor() {
                if (pos >= str.length) throw new Error("Unexpected end of expression");
                let c = str[pos];
                if (c === '+') { pos++; return parseFactor(); }
                if (c === '-') { pos++; return -parseFactor(); }
                if (c === '(') {
                    pos++;
                    let res = parseAddSub();
                    if (pos >= str.length || str[pos] !== ')') throw new Error("Missing closing parenthesis");
                    pos++;
                    return res;
                }
                
                const funcs = ['sin', 'cos', 'tan', 'log', 'sqrt'];
                for (let f of funcs) {
                    if (str.startsWith(f, pos)) {
                        pos += f.length;
                        if (pos >= str.length || str[pos] !== '(') throw new Error("Expected '(' after function");
                        let val = parseFactor();
                        if (f === 'sin') return Math.sin(val);
                        if (f === 'cos') return Math.cos(val);
                        if (f === 'tan') return Math.tan(val);
                        if (f === 'log') return Math.log10(val);
                        if (f === 'sqrt') return Math.sqrt(val);
                    }
                }
                
                let start = pos;
                while (pos < str.length && (/[0-9\.]/.test(str[pos]))) pos++;
                if (start === pos) throw new Error("Expected number");
                return parseFloat(str.substring(start, pos));
            }
            
            let result = parseAddSub();
            if (pos < str.length) throw new Error("Unexpected character at end");
            return parseFloat(result.toPrecision(12));
        } catch(e) { return 'Error: ' + e.message; }
    };

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const v = btn.innerText;
            if(v === 'C') disp.value = '';
            else if(v === '=') disp.value = safeEval(disp.value);
            else disp.value += v + (['sin','cos','tan','log','sqrt'].includes(v) ? '(' : '');
        });
    });
}

function initNotesToStudyGuide() {
    const keyEl = document.getElementById('nsg-key');
    keyEl.value = localStorage.getItem('techvelo_openai_key') || '';
    keyEl.addEventListener('change', e => localStorage.setItem('techvelo_openai_key', e.target.value));

    const out = document.getElementById('nsg-output');
    
    document.getElementById('nsg-manual').addEventListener('click', () => {
        const text = document.getElementById('nsg-input').value;
        if(!text) return;
        const lines = text.split('\n').filter(Boolean);
        let html = '<h3>Key Terms (Guessed)</h3><ul>';
        lines.forEach(l => {
            const caps = l.match(/([A-Z][a-z]+ [A-Z][a-z]+)/g);
            if(caps) caps.forEach(c => html += `<li><strong>${c}</strong></li>`);
        });
        html += '</ul><h3>Key Concepts</h3><ul>';
        lines.slice(0, 5).forEach(l => html += `<li>${l}</li>`);
        html += '</ul>';
        out.innerHTML = html;
    });

    document.getElementById('nsg-ai').addEventListener('click', async () => {
        const text = document.getElementById('nsg-input').value;
        const key = keyEl.value;
        window.clearInlineError('nsg-ai');
        if(!text || !key) return window.showInlineError('nsg-ai', 'Notes and API Key required for AI.');
        document.getElementById('nsg-loading').classList.remove('hidden');
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: `Convert these unstructured notes into a structured study guide with headings, key terms, and 3 review questions. Notes: ${text}` }] })
            });
            const data = await res.json();
            out.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
        } catch(e) { out.innerHTML = `<span style="color:red">Error</span>`; }
        document.getElementById('nsg-loading').classList.add('hidden');
    });
    document.getElementById('nsg-copy').addEventListener('click', e => copyToClipboard(out.innerText, e.target));
}

function initEssayStructureHelper() {
    document.getElementById('esh-generate').addEventListener('click', () => {
        const topic = document.getElementById('esh-topic').value || 'Subject';
        const type = document.getElementById('esh-type').value;
        const words = parseInt(document.getElementById('esh-words').value) || 1000;
        const args = document.getElementById('esh-args').value.split(',').map(s=>s.trim()).filter(Boolean);
        
        let introWords = Math.round(words * 0.1);
        let concWords = Math.round(words * 0.1);
        let bodyWords = words - introWords - concWords;
        let numArgs = args.length || 3;
        let pWords = Math.round(bodyWords / numArgs);

        let html = `<h3>${type} Essay Plan: ${topic}</h3>`;
        html += `<p><strong>Target Word Count:</strong> ~${words} words</p><hr style="margin:1rem 0; border-top:1px solid var(--glass-border)">`;
        
        html += `<h4>Introduction (~${introWords} words)</h4><ul><li>Hook statement</li><li>Context/Background</li><li>Thesis Statement: [State your main position on ${topic}]</li></ul>`;
        
        html += `<h4>Body Paragraphs (~${bodyWords} words total)</h4>`;
        for(let i=0; i<numArgs; i++) {
            let a = args[i] || `Argument ${i+1}`;
            html += `<h5>Paragraph ${i+1}: ${a} (~${pWords} words)</h5><ul><li>Topic Sentence</li><li>Evidence / Examples</li><li>Analysis</li><li>Transition</li></ul>`;
        }
        
        html += `<h4>Conclusion (~${concWords} words)</h4><ul><li>Restate thesis</li><li>Summarize main points</li><li>Final concluding thought</li></ul>`;
        
        document.getElementById('esh-output').innerHTML = html;
    });
}

function initStudyEstimator() {
    const wIn = document.getElementById('se-words');
    const sIn = document.getElementById('se-speed');
    const tOut = document.getElementById('se-res-time');
    const sesOut = document.getElementById('se-res-sessions');
    
    sIn.addEventListener('input', e => document.getElementById('se-speed-val').innerText = e.target.value);
    
    document.getElementById('se-calc').addEventListener('click', () => {
        const w = parseInt(wIn.value) || 0;
        const s = parseInt(sIn.value) || 200;
        if(w === 0) return;
        
        const mins = Math.ceil(w / s);
        tOut.innerText = mins + 'm';
        
        const sessions = Math.ceil(mins / 25);
        sesOut.innerText = sessions;
    });
}

function initCodeExplainer() {
    const keyEl = document.getElementById('ce-key');
    keyEl.value = localStorage.getItem('techvelo_openai_key') || '';
    keyEl.addEventListener('change', e => localStorage.setItem('techvelo_openai_key', e.target.value));

    document.getElementById('ce-btn').addEventListener('click', async () => {
        const code = document.getElementById('ce-code').value;
        const lang = document.getElementById('ce-lang').value;
        const key = keyEl.value;
        const out = document.getElementById('ce-output');
        
        window.clearInlineError('ce-btn');
        if(!code || !key) return window.showInlineError('ce-btn', 'Code and API Key required.');
        document.getElementById('ce-loading').classList.remove('hidden');
        out.innerHTML = '';
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: `Explain this ${lang} code simply. Identify any obvious bugs. Code:\n${code}` }] })
            });
            const data = await res.json();
            out.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
        } catch(e) { out.innerHTML = `<span style="color:red">Error</span>`; }
        document.getElementById('ce-loading').classList.add('hidden');
    });
}

function initStudentUnitConverter() {
    const units = {
        length: { 'Meters': 1, 'Kilometers': 1000, 'Miles': 1609.34, 'Feet': 0.3048, 'Inches': 0.0254 },
        mass: { 'Grams': 1, 'Kilograms': 1000, 'Pounds': 453.592, 'Ounces': 28.3495 },
        temp: 'temp'
    };
    
    const cat = document.getElementById('uc-cat');
    const fSel = document.getElementById('uc-from');
    const tSel = document.getElementById('uc-to');
    
    const updateDropdowns = () => {
        const c = (cat.value || 'length').toLowerCase();
        fSel.innerHTML = ''; tSel.innerHTML = '';
        if (c === 'temp' || c === 'temperature') {
            ['Celsius', 'Fahrenheit', 'Kelvin'].forEach(u => {
                fSel.innerHTML += `<option value="${u}">${u}</option>`;
                tSel.innerHTML += `<option value="${u}">${u}</option>`;
            });
        } else {
            const list = units[c] || units.length;
            Object.keys(list).forEach(u => {
                fSel.innerHTML += `<option value="${u}">${u}</option>`;
                tSel.innerHTML += `<option value="${u}">${u}</option>`;
            });
        }
    };
    cat.addEventListener('change', updateDropdowns);
    updateDropdowns();
    
    document.getElementById('uc-convert').addEventListener('click', () => {
        const c = cat.value;
        const v = parseFloat(document.getElementById('uc-val').value) || 0;
        const f = fSel.value; const t = tSel.value;
        let res = 0;
        
        if (c === 'temp') {
            let inC = v;
            if(f === 'Fahrenheit') inC = (v - 32) * 5/9;
            if(f === 'Kelvin') inC = v - 273.15;
            
            res = inC;
            if(t === 'Fahrenheit') res = (inC * 9/5) + 32;
            if(t === 'Kelvin') res = inC + 273.15;
        } else {
            const inBase = v * units[c][f];
            res = inBase / units[c][t];
        }
        document.getElementById('uc-res').value = parseFloat(res.toFixed(6));
    });
}

function initExamCountdown() {
    let exams = JSON.parse(localStorage.getItem('techvelo_exams') || '[]');
    const render = () => {
        exams.sort((a,b) => new Date(a.date) - new Date(b.date));
        document.getElementById('ec-list').innerHTML = exams.map((e,i) => {
            const days = Math.ceil((new Date(e.date) - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
            let badgeColor = 'var(--primary-color)';
            if(days < 0) badgeColor = 'var(--text-secondary)';
            else if (days <= 3) badgeColor = '#ef4444';
            
            return `
            <div class="glass-card mb-4 flex justify-between items-center" style="padding:1.5rem">
                <div>
                    <h4>${e.title}</h4>
                    <div style="font-size:0.9rem; color:var(--text-secondary)">${e.subject} | ${e.date}</div>
                </div>
                <div style="text-align:right">
                    <div style="font-size:1.5rem; font-weight:bold; color:${badgeColor}">${days < 0 ? 'Passed' : days + ' Days'}</div>
                    <button class="btn-secondary mt-2" onclick="window.ecDel(${i})" style="padding:0.25rem 0.5rem">Delete</button>
                </div>
            </div>`;
        }).join('') || '<p>No exams added.</p>';
    };
    
    window.ecDel = (i) => { exams.splice(i,1); localStorage.setItem('techvelo_exams', JSON.stringify(exams)); render(); };
    
    document.getElementById('ec-add').addEventListener('click', () => {
        const title = document.getElementById('ec-title').value;
        const sub = document.getElementById('ec-subject').value;
        const date = document.getElementById('ec-date').value;
        window.clearInlineError('ec-add');
        if(!title || !date) return window.showInlineError('ec-add', 'Title and date required');
        exams.push({title, subject: sub, date});
        localStorage.setItem('techvelo_exams', JSON.stringify(exams));
        render();
    });
    render();
}
