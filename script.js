const TOOLS = [
    { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and estimate reading time instantly.', icon: 'type', category: 'Text Tools' },
    { id: 'case-converter', name: 'Case Converter', description: 'Convert text to uppercase, lowercase, title case, and more.', icon: 'case-upper', category: 'Text Tools' },
    { id: 'ai-summarizer', name: 'AI Text Summarizer', description: 'Summarize long texts quickly using AI.', icon: 'sparkles', category: 'AI Tools' },
    { id: 'ai-rewriter', name: 'AI Text Rewriter', description: 'Rewrite content in different tones using AI.', icon: 'pen-tool', category: 'AI Tools' },
    { id: 'image-compressor', name: 'Image Compressor', description: 'Compress JPEG, PNG, WebP images locally in your browser.', icon: 'image-minus', category: 'Image Tools' },
    { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images by custom width and height.', icon: 'scaling', category: 'Image Tools' },
    { id: 'pdf-merger', name: 'PDF Merger', description: 'Merge multiple PDF files into a single document locally.', icon: 'file-plus', category: 'PDF Tools' },
    { id: 'pdf-to-images', name: 'PDF to Images', description: 'Convert PDF pages into downloadable PNG images.', icon: 'file-image', category: 'PDF Tools' },
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format, minify, and validate JSON data.', icon: 'file-json', category: 'Developer Tools' },
    { id: 'password-generator', name: 'Password Generator', description: 'Generate strong, secure passwords instantly.', icon: 'key-round', category: 'Developer Tools' }
];

const CATEGORIES = [...new Set(TOOLS.map(t => t.category))];

// ==========================================
// CORE APP LOGIC & ROUTING
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRouter();
    initSearch();
    initMobileMenu();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    window.addEventListener('hashchange', initRouter);
});

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('techvelo_theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
    }

    toggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('techvelo_theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('techvelo_theme', 'dark');
        }
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
    menu.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
}

function initSearch() {
    const input = document.getElementById('global-search');
    const results = document.getElementById('search-results');
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            results.classList.add('hidden');
            return;
        }
        
        const matches = TOOLS.filter(t => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
        
        results.innerHTML = matches.length 
            ? matches.map(t => `
                <a href="#/tools/${t.id}" class="search-result-item" onclick="document.getElementById('global-search').value=''; document.getElementById('search-results').classList.add('hidden');">
                    <i data-lucide="${t.icon}"></i>
                    <div>
                        <div style="font-weight: 500">${t.name}</div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary)">${t.category}</div>
                    </div>
                </a>
              `).join('')
            : '<div style="padding: 1rem; color: var(--text-secondary)">No tools found.</div>';
            
        lucide.createIcons();
        results.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            results.classList.add('hidden');
        }
    });
}

function initRouter() {
    const path = window.location.hash.slice(1) || '/';
    const app = document.getElementById('app-content');
    
    // Clear current content
    app.innerHTML = '';

    if (path === '/' || path === '') {
        renderHome(app);
    } else if (path === '/tools') {
        renderAllTools(app);
    } else if (path.startsWith('/tools/')) {
        const toolId = path.split('/')[2];
        const tool = TOOLS.find(t => t.id === toolId);
        if (tool) {
            renderToolPage(app, tool);
        } else {
            app.innerHTML = '<div class="text-center section-title">Tool not found</div>';
        }
    } else if (path === '/about') {
        renderAboutPage(app);
    } else if (path === '/contact') {
        renderContactPage(app);
    } else if (path === '/privacy') {
        renderPrivacyPage(app);
    } else if (path === '/terms') {
        renderTermsPage(app);
    } else {
        app.innerHTML = '<div class="text-center section-title">Page not found</div>';
    }
    
    window.scrollTo(0, 0);
    lucide.createIcons();
}

function createToolCard(tool) {
    return `
        <a href="#/tools/${tool.id}" class="glass-card tool-card">
            <div class="tool-icon-wrapper">
                <i data-lucide="${tool.icon}"></i>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <span class="badge">${tool.category}</span>
        </a>
    `;
}

function renderHome(container) {
    const html = `
        <section class="hero">
            <h1>Everything You Need,<br>One Smart Platform.</h1>
            <p>Techvelo offers premium, fast, and free online tools for everyday tasks. Process PDFs, optimize images, generate passwords, and leverage AI—all in one place.</p>
            <a href="#/tools" class="btn-primary">
                Explore Tools <i data-lucide="arrow-right"></i>
            </a>
        </section>

        <section>
            <h2 class="section-title text-center">Popular Tools</h2>
            <div class="grid">
                ${TOOLS.slice(0, 6).map(createToolCard).join('')}
            </div>
            <div class="text-center">
                <a href="#/tools" class="btn-secondary">View All Tools</a>
            </div>
        </section>
        
        <section style="margin-top: 5rem;">
            <h2 class="section-title text-center">Categories</h2>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                ${CATEGORIES.map(cat => `
                    <div class="glass-card text-center" style="padding: 2rem;">
                        <h3>${cat}</h3>
                        <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.9rem;">
                            ${TOOLS.filter(t => t.category === cat).length} tools
                        </p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    container.innerHTML = html;
}

function renderAllTools(container) {
    let html = `
        <div class="tool-header">
            <h1>All Tools</h1>
            <p>Browse our collection of smart, simple solutions.</p>
        </div>
        <div class="input-group" style="max-width: 600px; margin: 0 auto 3rem auto; text-align: left;">
            <div style="position: relative;">
                <input type="text" id="tools-search" placeholder="Search tools by name, description, or category..." style="width:100%; padding: 1rem 1rem 1rem 3rem; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-primary); font-size: 1rem;">
                <i data-lucide="search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary);"></i>
            </div>
        </div>
        <div id="tools-container"></div>
    `;
    
    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
    
    const toolsContainer = document.getElementById('tools-container');
    const searchInput = document.getElementById('tools-search');
    
    const renderFiltered = (query = '') => {
        let out = '';
        const q = query.toLowerCase().trim();
        
        let foundAny = false;
        CATEGORIES.forEach(cat => {
            const catTools = TOOLS.filter(t => 
                t.category === cat && 
                (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
            );
            if (catTools.length > 0) {
                foundAny = true;
                out += `
                    <h2 class="section-title" style="margin-top: 3rem; font-size: 1.5rem;">${cat}</h2>
                    <div class="grid">
                        ${catTools.map(createToolCard).join('')}
                    </div>
                `;
            }
        });
        
        if (!foundAny) {
            out = `<div class="text-center" style="padding: 3rem; color: var(--text-secondary); font-size: 1.2rem;">No tools found matching "${query}".</div>`;
        }
        toolsContainer.innerHTML = out;
        if (window.lucide) lucide.createIcons();
    };
    
    searchInput.addEventListener('input', (e) => renderFiltered(e.target.value));
    renderFiltered();
}

function renderToolPage(container, tool) {
    const breadcrumbs = `
        <div class="breadcrumbs">
            <a href="#/">Home</a> <i data-lucide="chevron-right" style="width: 14px"></i>
            <a href="#/tools">Tools</a> <i data-lucide="chevron-right" style="width: 14px"></i>
            <span>${tool.name}</span>
        </div>
    `;

    const header = `
        <div class="tool-header">
            <h1>${tool.name}</h1>
            <p>${tool.description}</p>
        </div>
    `;

    const toolUI = getToolUI(tool.id);
    
    container.innerHTML = `
        <div class="tool-page">
            ${breadcrumbs}
            ${header}
            <div class="glass-card tool-container">
                ${toolUI}
            </div>
        </div>
    `;
    
    // Initialize specific tool logic
    initToolLogic(tool.id);
}

// ==========================================
// TOOL UI TEMPLATES & LOGIC
// ==========================================

function getToolUI(id) {
    switch (id) {
        case 'word-counter':
            return `
                <div class="input-group">
                    <textarea id="wc-input" rows="8" placeholder="Type or paste your text here..."></textarea>
                </div>
                <div class="btn-group">
                    <button class="btn-secondary" id="wc-clear">Clear</button>
                    <button class="btn-secondary" id="wc-copy">Copy Text</button>
                </div>
                <div class="stats-grid">
                    <div class="stat-card"><div class="value" id="wc-words">0</div><div class="label">Words</div></div>
                    <div class="stat-card"><div class="value" id="wc-chars">0</div><div class="label">Characters</div></div>
                    <div class="stat-card"><div class="value" id="wc-chars-ns">0</div><div class="label">Chars (No Spaces)</div></div>
                    <div class="stat-card"><div class="value" id="wc-sentences">0</div><div class="label">Sentences</div></div>
                    <div class="stat-card"><div class="value" id="wc-paragraphs">0</div><div class="label">Paragraphs</div></div>
                    <div class="stat-card"><div class="value" id="wc-time">0 min</div><div class="label">Reading Time</div></div>
                </div>
            `;
            
        case 'case-converter':
            return `
                <div class="input-group">
                    <textarea id="cc-input" rows="6" placeholder="Type or paste your text here..."></textarea>
                </div>
                <div class="btn-group">
                    <button class="btn-primary" id="cc-upper">UPPERCASE</button>
                    <button class="btn-primary" id="cc-lower">lowercase</button>
                    <button class="btn-primary" id="cc-title">Title Case</button>
                    <button class="btn-primary" id="cc-sentence">Sentence case</button>
                </div>
                <div class="input-group mt-4">
                    <label>Result</label>
                    <textarea id="cc-output" rows="6" readonly></textarea>
                </div>
                <div class="btn-group">
                    <button class="btn-secondary" id="cc-copy">Copy Result</button>
                    <button class="btn-secondary" id="cc-clear">Clear All</button>
                </div>
            `;
            
        case 'ai-summarizer':
            return `
                <div class="alert alert-info">
                    <i data-lucide="info"></i>
                    <strong>API Key Required:</strong> Since this is a static client-side app, you must provide your own OpenAI API key to use AI features. Your key is saved securely in your browser's local storage and never sent anywhere except directly to OpenAI.
                </div>
                <div class="input-group">
                    <label>OpenAI API Key</label>
                    <input type="text" id="ai-key" placeholder="sk-..." type="password">
                </div>
                <div class="input-group">
                    <label>Text to Summarize</label>
                    <textarea id="ai-sum-input" rows="8" placeholder="Paste long text here..."></textarea>
                </div>
                <div class="input-group">
                    <label>Summary Length</label>
                    <select id="ai-sum-length">
                        <option value="short">Short</option>
                        <option value="medium" selected>Medium</option>
                        <option value="long">Long</option>
                    </select>
                </div>
                <button class="btn-primary" id="ai-sum-btn">Summarize</button>
                <div class="mt-4 hidden" id="ai-sum-loading"><span class="loader"></span> Processing...</div>
                <div class="input-group mt-4">
                    <label>Result</label>
                    <div id="ai-sum-output" class="result-box"></div>
                </div>
                <button class="btn-secondary mt-4" id="ai-sum-copy">Copy Result</button>
            `;

        case 'ai-rewriter':
            return `
                <div class="alert alert-info">
                    <i data-lucide="info"></i>
                    <strong>API Key Required:</strong> Provide your OpenAI API key below.
                </div>
                <div class="input-group">
                    <label>OpenAI API Key</label>
                    <input type="text" id="ai-key-rw" placeholder="sk-..." type="password">
                </div>
                <div class="input-group">
                    <label>Text to Rewrite</label>
                    <textarea id="ai-rw-input" rows="8" placeholder="Paste your text here..."></textarea>
                </div>
                <div class="input-group">
                    <label>Tone</label>
                    <select id="ai-rw-tone">
                        <option value="Professional">Professional</option>
                        <option value="Simple">Simple</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Formal">Formal</option>
                    </select>
                </div>
                <button class="btn-primary" id="ai-rw-btn">Rewrite</button>
                <div class="mt-4 hidden" id="ai-rw-loading"><span class="loader"></span> Processing...</div>
                <div class="input-group mt-4">
                    <label>Result</label>
                    <div id="ai-rw-output" class="result-box"></div>
                </div>
                <button class="btn-secondary mt-4" id="ai-rw-copy">Copy Result</button>
            `;
            
        case 'image-compressor':
            return `
                <div class="file-upload-area" id="ic-drop">
                    <i data-lucide="upload-cloud"></i>
                    <h3>Click or Drag & Drop Image</h3>
                    <p>Supports JPEG, PNG, WebP</p>
                    <input type="file" id="ic-file" accept="image/jpeg, image/png, image/webp">
                </div>
                <div id="ic-controls" class="hidden mt-4">
                    <div class="input-group">
                        <label>Quality: <span id="ic-quality-val">80</span>%</label>
                        <input type="range" id="ic-quality" min="10" max="100" value="80" style="width: 100%">
                    </div>
                    <button class="btn-primary" id="ic-compress-btn">Compress Image</button>
                </div>
                <div id="ic-results" class="hidden mt-4 text-center">
                    <div class="stats-grid mb-4">
                        <div class="stat-card"><div class="value" id="ic-orig-size">-</div><div class="label">Original Size</div></div>
                        <div class="stat-card"><div class="value" id="ic-new-size">-</div><div class="label">Compressed Size</div></div>
                        <div class="stat-card"><div class="value" id="ic-reduction">-</div><div class="label">Reduction</div></div>
                    </div>
                    <div class="image-preview-container">
                        <img id="ic-preview" src="">
                    </div>
                    <div class="btn-group justify-center mt-4">
                        <a id="ic-download" class="btn-primary" download="compressed.jpg">Download Image</a>
                        <button class="btn-secondary" id="ic-reset">Reset</button>
                    </div>
                </div>
            `;
            
        case 'image-resizer':
            return `
                <div class="file-upload-area" id="ir-drop">
                    <i data-lucide="upload-cloud"></i>
                    <h3>Upload Image to Resize</h3>
                    <input type="file" id="ir-file" accept="image/*">
                </div>
                <div id="ir-controls" class="hidden mt-4">
                    <div class="flex gap-4 mb-4">
                        <div class="input-group" style="flex:1">
                            <label>Width (px)</label>
                            <input type="number" id="ir-width">
                        </div>
                        <div class="input-group" style="flex:1">
                            <label>Height (px)</label>
                            <input type="number" id="ir-height">
                        </div>
                    </div>
                    <div class="input-group flex items-center gap-2 mb-4">
                        <input type="checkbox" id="ir-aspect" checked>
                        <label style="margin:0">Maintain Aspect Ratio</label>
                    </div>
                    <button class="btn-primary" id="ir-resize-btn">Resize Image</button>
                </div>
                <div id="ir-results" class="hidden mt-4 text-center">
                    <div class="image-preview-container">
                        <img id="ir-preview" src="">
                    </div>
                    <div class="btn-group justify-center mt-4">
                        <a id="ir-download" class="btn-primary" download="resized.png">Download Image</a>
                        <button class="btn-secondary" id="ir-reset">Reset</button>
                    </div>
                </div>
            `;

        case 'pdf-merger':
            return `
                <div class="file-upload-area" id="pm-drop">
                    <i data-lucide="file-plus"></i>
                    <h3>Select PDF Files</h3>
                    <p>Select multiple PDFs to merge them</p>
                    <input type="file" id="pm-file" accept="application/pdf" multiple>
                </div>
                <div id="pm-list" class="mt-4"></div>
                <button class="btn-primary mt-4 hidden" id="pm-btn">Merge PDFs</button>
                <div class="mt-4 hidden" id="pm-loading"><span class="loader"></span> Merging...</div>
                <div class="btn-group justify-center mt-4 hidden" id="pm-results">
                    <a id="pm-download" class="btn-primary" download="merged.pdf">Download Merged PDF</a>
                    <button class="btn-secondary" id="pm-reset">Start Over</button>
                </div>
            `;
            
        case 'pdf-to-images':
            return `
                <div class="file-upload-area" id="p2i-drop">
                    <i data-lucide="file-image"></i>
                    <h3>Select PDF File</h3>
                    <input type="file" id="p2i-file" accept="application/pdf">
                </div>
                <div id="p2i-controls" class="hidden mt-4 text-center">
                    <p class="mb-4">PDF Loaded: <strong id="p2i-pages">0</strong> pages found.</p>
                    <button class="btn-primary" id="p2i-btn">Convert All Pages to Images</button>
                    <div class="mt-4 hidden" id="p2i-loading"><span class="loader"></span> Converting...</div>
                </div>
                <div id="p2i-results" class="mt-4 grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));"></div>
            `;

        case 'json-formatter':
            return `
                <div class="input-group">
                    <label>JSON Input</label>
                    <textarea id="jf-input" rows="8" placeholder='{"key": "value"}' style="font-family: monospace;"></textarea>
                </div>
                <div class="input-group">
                    <label>Indentation</label>
                    <select id="jf-indent">
                        <option value="2">2 Spaces</option>
                        <option value="4">4 Spaces</option>
                        <option value="tab">Tab</option>
                    </select>
                </div>
                <div class="btn-group mb-4">
                    <button class="btn-primary" id="jf-format">Format & Validate</button>
                    <button class="btn-primary" id="jf-minify">Minify</button>
                    <button class="btn-secondary" id="jf-clear">Clear</button>
                </div>
                <div id="jf-error" class="alert hidden"></div>
                <div class="input-group">
                    <label>Output</label>
                    <textarea id="jf-output" rows="12" readonly style="font-family: monospace;"></textarea>
                </div>
                <button class="btn-secondary" id="jf-copy">Copy Output</button>
            `;

        case 'password-generator':
            return `
                <div class="input-group">
                    <label>Generated Password</label>
                    <div class="flex gap-2">
                        <input type="text" id="pg-output" readonly style="font-family: monospace; font-size: 1.25rem;">
                        <button class="btn-primary" id="pg-copy"><i data-lucide="copy"></i></button>
                    </div>
                </div>
                <div class="input-group mt-4">
                    <label>Password Length: <span id="pg-length-val">16</span></label>
                    <input type="range" id="pg-length" min="4" max="64" value="16" style="width: 100%">
                </div>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div class="input-group flex items-center gap-2">
                        <input type="checkbox" id="pg-upper" checked> <label style="margin:0">Uppercase (A-Z)</label>
                    </div>
                    <div class="input-group flex items-center gap-2">
                        <input type="checkbox" id="pg-lower" checked> <label style="margin:0">Lowercase (a-z)</label>
                    </div>
                    <div class="input-group flex items-center gap-2">
                        <input type="checkbox" id="pg-num" checked> <label style="margin:0">Numbers (0-9)</label>
                    </div>
                    <div class="input-group flex items-center gap-2">
                        <input type="checkbox" id="pg-sym" checked> <label style="margin:0">Symbols (!@#$)</label>
                    </div>
                </div>
                <div class="input-group">
                    <label>Strength: <span id="pg-strength" style="font-weight:bold; color: var(--primary-color)">Strong</span></label>
                </div>
                <button class="btn-primary" id="pg-generate" style="width: 100%; justify-content: center;">Generate New Password</button>
            `;
    }
    return '';
}

// ==========================================
// INDIVIDUAL TOOL LOGIC
// ==========================================

function initToolLogic(id) {
    if (id === 'word-counter') initWordCounter();
    if (id === 'case-converter') initCaseConverter();
    if (id === 'ai-summarizer') initAiSummarizer();
    if (id === 'ai-rewriter') initAiRewriter();
    if (id === 'image-compressor') initImageCompressor();
    if (id === 'image-resizer') initImageResizer();
    if (id === 'pdf-merger') initPdfMerger();
    if (id === 'pdf-to-images') initPdfToImages();
    if (id === 'json-formatter') initJsonFormatter();
    if (id === 'password-generator') initPasswordGenerator();
}

function copyToClipboard(text, btn) {
    if(!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = 'Copied!';
        setTimeout(() => btn.innerText = orig, 2000);
    });
}

// 1. Word Counter
function initWordCounter() {
    const input = document.getElementById('wc-input');
    const updateStats = () => {
        const text = input.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s+/g, '').length;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
        const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
        const time = Math.ceil(words / 200);

        document.getElementById('wc-words').innerText = words;
        document.getElementById('wc-chars').innerText = chars;
        document.getElementById('wc-chars-ns').innerText = charsNoSpaces;
        document.getElementById('wc-sentences').innerText = sentences;
        document.getElementById('wc-paragraphs').innerText = paragraphs;
        document.getElementById('wc-time').innerText = time + ' min';
    };

    input.addEventListener('input', updateStats);
    document.getElementById('wc-clear').addEventListener('click', () => { input.value = ''; updateStats(); });
    document.getElementById('wc-copy').addEventListener('click', (e) => copyToClipboard(input.value, e.target));
}

// 2. Case Converter
function initCaseConverter() {
    const input = document.getElementById('cc-input');
    const output = document.getElementById('cc-output');

    document.getElementById('cc-upper').addEventListener('click', () => output.value = input.value.toUpperCase());
    document.getElementById('cc-lower').addEventListener('click', () => output.value = input.value.toLowerCase());
    document.getElementById('cc-title').addEventListener('click', () => {
        output.value = input.value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    });
    document.getElementById('cc-sentence').addEventListener('click', () => {
        output.value = input.value.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    });

    document.getElementById('cc-clear').addEventListener('click', () => { input.value = ''; output.value = ''; });
    document.getElementById('cc-copy').addEventListener('click', (e) => copyToClipboard(output.value, e.target));
}

// 3. AI Summarizer
function initAiSummarizer() {
    const keyInput = document.getElementById('ai-key');
    keyInput.value = localStorage.getItem('techvelo_openai_key') || '';
    keyInput.addEventListener('change', (e) => localStorage.setItem('techvelo_openai_key', e.target.value));

    document.getElementById('ai-sum-btn').addEventListener('click', async () => {
        const text = document.getElementById('ai-sum-input').value.trim();
        const length = document.getElementById('ai-sum-length').value;
        const key = keyInput.value.trim();
        const output = document.getElementById('ai-sum-output');
        const loading = document.getElementById('ai-sum-loading');
        
        if (!key) return alert('Please enter your OpenAI API key.');
        if (!text) return alert('Please enter text to summarize.');

        loading.classList.remove('hidden');
        output.innerHTML = '';
        
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: `Summarize this text in a ${length} way. Text: ${text}` }]
                })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error.message);
            output.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
        } catch (err) {
            output.innerHTML = `<span style="color:red">Error: ${err.message}</span>`;
        } finally {
            loading.classList.add('hidden');
        }
    });

    document.getElementById('ai-sum-copy').addEventListener('click', (e) => copyToClipboard(document.getElementById('ai-sum-output').innerText, e.target));
}

// 4. AI Rewriter
function initAiRewriter() {
    const keyInput = document.getElementById('ai-key-rw');
    keyInput.value = localStorage.getItem('techvelo_openai_key') || '';
    keyInput.addEventListener('change', (e) => localStorage.setItem('techvelo_openai_key', e.target.value));

    document.getElementById('ai-rw-btn').addEventListener('click', async () => {
        const text = document.getElementById('ai-rw-input').value.trim();
        const tone = document.getElementById('ai-rw-tone').value;
        const key = keyInput.value.trim();
        const output = document.getElementById('ai-rw-output');
        const loading = document.getElementById('ai-rw-loading');
        
        if (!key) return alert('Please enter your OpenAI API key.');
        if (!text) return alert('Please enter text to rewrite.');

        loading.classList.remove('hidden');
        output.innerHTML = '';
        
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: `Rewrite this text in a ${tone} tone. Text: ${text}` }]
                })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error.message);
            output.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
        } catch (err) {
            output.innerHTML = `<span style="color:red">Error: ${err.message}</span>`;
        } finally {
            loading.classList.add('hidden');
        }
    });

    document.getElementById('ai-rw-copy').addEventListener('click', (e) => copyToClipboard(document.getElementById('ai-rw-output').innerText, e.target));
}

// 5. Image Compressor
function initImageCompressor() {
    const drop = document.getElementById('ic-drop');
    const fileInput = document.getElementById('ic-file');
    const controls = document.getElementById('ic-controls');
    const results = document.getElementById('ic-results');
    let currentFile = null;

    drop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length) {
            currentFile = e.target.files[0];
            drop.classList.add('hidden');
            controls.classList.remove('hidden');
        }
    });

    const qualityInput = document.getElementById('ic-quality');
    qualityInput.addEventListener('input', (e) => document.getElementById('ic-quality-val').innerText = e.target.value);

    document.getElementById('ic-compress-btn').addEventListener('click', () => {
        if(!currentFile) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                const quality = parseInt(qualityInput.value) / 100;
                const type = currentFile.type === 'image/png' ? 'image/jpeg' : currentFile.type; // Force jpeg for compression if png
                const dataUrl = canvas.toDataURL(type, quality);
                
                document.getElementById('ic-preview').src = dataUrl;
                document.getElementById('ic-download').href = dataUrl;
                
                // Calc sizes
                const origSize = currentFile.size;
                const newSize = Math.round((dataUrl.length - 22) * 3 / 4); // rough base64 byte count
                document.getElementById('ic-orig-size').innerText = (origSize / 1024).toFixed(1) + ' KB';
                document.getElementById('ic-new-size').innerText = (newSize / 1024).toFixed(1) + ' KB';
                const red = 100 - ((newSize/origSize)*100);
                document.getElementById('ic-reduction').innerText = red > 0 ? red.toFixed(1) + '%' : '0%';
                
                controls.classList.add('hidden');
                results.classList.remove('hidden');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(currentFile);
    });

    document.getElementById('ic-reset').addEventListener('click', () => {
        fileInput.value = '';
        currentFile = null;
        results.classList.add('hidden');
        drop.classList.remove('hidden');
    });
}

// 6. Image Resizer
function initImageResizer() {
    const drop = document.getElementById('ir-drop');
    const fileInput = document.getElementById('ir-file');
    const controls = document.getElementById('ir-controls');
    const results = document.getElementById('ir-results');
    let currentImg = null;
    let originalRatio = 1;

    drop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    currentImg = img;
                    originalRatio = img.width / img.height;
                    document.getElementById('ir-width').value = img.width;
                    document.getElementById('ir-height').value = img.height;
                    
                    drop.classList.add('hidden');
                    controls.classList.remove('hidden');
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    const wInput = document.getElementById('ir-width');
    const hInput = document.getElementById('ir-height');
    const aspect = document.getElementById('ir-aspect');

    wInput.addEventListener('input', () => {
        if(aspect.checked && currentImg) hInput.value = Math.round(wInput.value / originalRatio);
    });
    hInput.addEventListener('input', () => {
        if(aspect.checked && currentImg) wInput.value = Math.round(hInput.value * originalRatio);
    });

    document.getElementById('ir-resize-btn').addEventListener('click', () => {
        if(!currentImg) return;
        const canvas = document.createElement('canvas');
        canvas.width = parseInt(wInput.value) || currentImg.width;
        canvas.height = parseInt(hInput.value) || currentImg.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/png');
        document.getElementById('ir-preview').src = dataUrl;
        document.getElementById('ir-download').href = dataUrl;
        
        controls.classList.add('hidden');
        results.classList.remove('hidden');
    });

    document.getElementById('ir-reset').addEventListener('click', () => {
        fileInput.value = '';
        currentImg = null;
        results.classList.add('hidden');
        drop.classList.remove('hidden');
    });
}

// 7. PDF Merger
function initPdfMerger() {
    const drop = document.getElementById('pm-drop');
    const fileInput = document.getElementById('pm-file');
    const list = document.getElementById('pm-list');
    const btn = document.getElementById('pm-btn');
    let filesArray = [];

    drop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length) {
            filesArray = Array.from(e.target.files);
            updatePdfList();
        }
    });

    function updatePdfList() {
        list.innerHTML = filesArray.map((f, i) => `
            <div class="glass-card mb-4 p-2 flex justify-between items-center" style="padding:1rem">
                <div>${f.name} ( ${(f.size/1024/1024).toFixed(2)} MB )</div>
                <button class="btn-secondary" style="padding:0.25rem 0.75rem" onclick="window.removePdf(${i})">Remove</button>
            </div>
        `).join('');
        
        if (filesArray.length > 1) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    }

    window.removePdf = (index) => {
        filesArray.splice(index, 1);
        updatePdfList();
    };

    btn.addEventListener('click', async () => {
        if (filesArray.length < 2) return;
        
        document.getElementById('pm-loading').classList.remove('hidden');
        btn.classList.add('hidden');
        
        try {
            const { PDFDocument } = window.PDFLib;
            const mergedPdf = await PDFDocument.create();
            
            for (let file of filesArray) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            document.getElementById('pm-download').href = url;
            document.getElementById('pm-results').classList.remove('hidden');
            document.getElementById('pm-loading').classList.add('hidden');
        } catch (e) {
            alert('Error merging PDFs: ' + e.message);
            document.getElementById('pm-loading').classList.add('hidden');
            btn.classList.remove('hidden');
        }
    });

    document.getElementById('pm-reset').addEventListener('click', () => {
        filesArray = [];
        updatePdfList();
        document.getElementById('pm-results').classList.add('hidden');
    });
}

// 8. PDF to Images
function initPdfToImages() {
    const drop = document.getElementById('p2i-drop');
    const fileInput = document.getElementById('p2i-file');
    const controls = document.getElementById('p2i-controls');
    let pdfDoc = null;
    let fileName = 'page';

    drop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async (e) => {
        if(e.target.files.length) {
            const file = e.target.files[0];
            fileName = file.name.replace('.pdf', '');
            const arrayBuffer = await file.arrayBuffer();
            
            try {
                pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                document.getElementById('p2i-pages').innerText = pdfDoc.numPages;
                drop.classList.add('hidden');
                controls.classList.remove('hidden');
            } catch (err) {
                alert('Could not parse PDF: ' + err.message);
            }
        }
    });

    document.getElementById('p2i-btn').addEventListener('click', async () => {
        if (!pdfDoc) return;
        const results = document.getElementById('p2i-results');
        const loading = document.getElementById('p2i-loading');
        loading.classList.remove('hidden');
        results.innerHTML = '';
        
        try {
            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                await page.render({ canvasContext: ctx, viewport: viewport }).promise;
                const dataUrl = canvas.toDataURL('image/png');
                
                results.innerHTML += `
                    <div class="glass-card text-center" style="padding: 1rem">
                        <img src="${dataUrl}" style="max-width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                        <a href="${dataUrl}" download="${fileName}_page_${i}.png" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download Pg ${i}</a>
                    </div>
                `;
            }
        } catch(err) {
            alert('Error converting PDF: ' + err.message);
        } finally {
            loading.classList.add('hidden');
        }
    });
}

// 9. JSON Formatter
function initJsonFormatter() {
    const input = document.getElementById('jf-input');
    const output = document.getElementById('jf-output');
    const errBox = document.getElementById('jf-error');
    const indentSelect = document.getElementById('jf-indent');

    const processJson = (minify = false) => {
        errBox.classList.add('hidden');
        try {
            if(!input.value.trim()) return;
            const obj = JSON.parse(input.value);
            let space = indentSelect.value === 'tab' ? '\t' : parseInt(indentSelect.value);
            output.value = minify ? JSON.stringify(obj) : JSON.stringify(obj, null, space);
        } catch (e) {
            errBox.innerText = 'Invalid JSON: ' + e.message;
            errBox.classList.remove('hidden');
        }
    };

    document.getElementById('jf-format').addEventListener('click', () => processJson(false));
    document.getElementById('jf-minify').addEventListener('click', () => processJson(true));
    document.getElementById('jf-clear').addEventListener('click', () => { input.value = ''; output.value = ''; errBox.classList.add('hidden'); });
    document.getElementById('jf-copy').addEventListener('click', (e) => copyToClipboard(output.value, e.target));
}

// 10. Password Generator
function initPasswordGenerator() {
    const output = document.getElementById('pg-output');
    const lenInput = document.getElementById('pg-length');
    const upperC = document.getElementById('pg-upper');
    const lowerC = document.getElementById('pg-lower');
    const numC = document.getElementById('pg-num');
    const symC = document.getElementById('pg-sym');
    const strengthEl = document.getElementById('pg-strength');

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    lenInput.addEventListener('input', (e) => document.getElementById('pg-length-val').innerText = e.target.value);

    const generate = () => {
        let chars = '';
        if (upperC.checked) chars += upper;
        if (lowerC.checked) chars += lower;
        if (numC.checked) chars += nums;
        if (symC.checked) chars += syms;

        if (!chars) {
            output.value = 'Select at least one option';
            return;
        }

        const length = parseInt(lenInput.value);
        let pass = '';
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);
        
        for (let i = 0; i < length; i++) {
            pass += chars[randomValues[i] % chars.length];
        }
        
        output.value = pass;

        // Calc strength
        let types = [upperC.checked, lowerC.checked, numC.checked, symC.checked].filter(Boolean).length;
        if (length < 8 || types < 2) {
            strengthEl.innerText = 'Weak';
            strengthEl.style.color = '#ef4444';
        } else if (length < 12 || types < 3) {
            strengthEl.innerText = 'Medium';
            strengthEl.style.color = '#f59e0b';
        } else {
            strengthEl.innerText = 'Strong';
            strengthEl.style.color = '#10b981';
        }
    };

    document.getElementById('pg-generate').addEventListener('click', generate);
    document.getElementById('pg-copy').addEventListener('click', () => copyToClipboard(output.value, document.getElementById('pg-copy')));
    
    // Auto generate on load
    generate();
}
