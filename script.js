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
// PER-TOOL GUIDES & CONTENT
// ==========================================

const TOOL_GUIDES = {
    'word-counter': {
        intro: 'Word Counter gives you an instant, accurate breakdown of any text you paste or type. It counts words, characters (with and without spaces), sentences, paragraphs, and estimates how long it would take an average reader to finish the content.',
        who: 'Students checking essay length, writers tracking article targets, bloggers ensuring posts hit a word count goal, or anyone who needs to know the size of a piece of text.',
        steps: ['Paste or type your text into the input box.', 'Stats update instantly — no button click needed.', 'Use the Copy Text button to copy your input back to the clipboard.', 'Click Clear to reset everything.'],
        tips: 'Reading time is estimated at approximately 200 words per minute, which is the average for silent reading. Your actual reading speed may differ.'
    },
    'case-converter': {
        intro: 'Case Converter transforms text between four common capitalization formats instantly. Whether you need all caps for a heading, sentence case for an email, or title case for a formal document, this tool handles it in one click.',
        who: 'Writers, coders, students, and professionals who frequently need to reformat copied text without retyping it.',
        steps: ['Paste or type your text in the input box.', 'Click one of the four buttons: UPPERCASE, lowercase, Title Case, or Sentence case.', 'The converted text appears in the Result box below.', 'Click Copy Result to copy the output to your clipboard.'],
        tips: 'Title Case capitalizes the first letter of every word. Sentence case only capitalizes the very first word of the text.'
    },
    'ai-summarizer': {
        intro: 'AI Text Summarizer uses OpenAI\'s GPT model to condense long articles, reports, or documents into a shorter, readable summary. Choose how brief or detailed you want the output to be.',
        who: 'Students summarizing research papers, professionals skimming long reports, or anyone who wants the key points from a long document without reading everything.',
        steps: ['Enter your OpenAI API key in the field provided. It is stored only in your browser and sent directly to OpenAI — never to Techvelo.', 'Paste the text you want summarized.', 'Choose a summary length: Short, Medium, or Long.', 'Click Summarize and wait a moment for the AI to respond.', 'Copy the result using the Copy Result button.'],
        tips: 'For best results, paste clean text without unnecessary symbols or formatting. Very short inputs (under 50 words) may not produce useful summaries. Your API key must have available credits on your OpenAI account.'
    },
    'ai-rewriter': {
        intro: 'AI Text Rewriter takes your existing writing and rephrases it in a different tone — more professional, simpler, friendlier, or more formal — without changing the core meaning.',
        who: 'Students improving essay drafts, professionals polishing emails, content writers adapting copy for different audiences, or non-native English speakers refining their writing.',
        steps: ['Enter your OpenAI API key.', 'Paste the text you want to rewrite.', 'Select a tone from the dropdown: Professional, Simple, Friendly, or Formal.', 'Click Rewrite and wait for the AI response.', 'Review and copy the rewritten text.'],
        tips: 'Short, clear input tends to give the most focused rewrite. If the rewrite does not match your expectations, try a different tone or rephrase your original text slightly before submitting again.'
    },
    'image-compressor': {
        intro: 'Image Compressor reduces the file size of JPEG, PNG, and WebP images directly in your browser. No files are ever uploaded to a server — all processing happens locally on your device.',
        who: 'Web developers optimizing page load times, students attaching images to online submissions with file size limits, or anyone sharing images over email or messaging apps.',
        steps: ['Click the upload area or drag and drop a JPEG, PNG, or WebP image onto it.', 'Use the Quality slider to set your desired compression level (10% to 100%). Lower values mean smaller files but reduced image quality.', 'Click Compress Image.', 'Review the before and after file sizes shown.', 'Click Download Image to save the compressed version.'],
        tips: 'A quality setting of 70–80% usually offers a good balance between visual quality and file size reduction. PNG images with transparency may be converted to JPEG, which does not support transparency.'
    },
    'image-resizer': {
        intro: 'Image Resizer lets you change the exact pixel dimensions of any image. It supports all common image formats and processes everything locally in your browser without uploading your file anywhere.',
        who: 'Developers needing specific image dimensions for websites or apps, students resizing profile photos to meet upload requirements, or anyone fitting images to a fixed size constraint.',
        steps: ['Upload an image by clicking the upload area or dragging a file onto it.', 'Enter your desired Width or Height in pixels.', 'Keep "Maintain Aspect Ratio" checked to prevent distortion, or uncheck it to set both dimensions independently.', 'Click Resize Image.', 'Preview the result and click Download Image to save it.'],
        tips: 'Enlarging an image beyond its original dimensions will reduce its quality. For best results, only scale images down, or use images with a higher resolution than your target size.'
    },
    'pdf-merger': {
        intro: 'PDF Merger combines two or more PDF files into a single document, all inside your browser. No files leave your device, making it safe for sensitive documents.',
        who: 'Students combining assignment pages, professionals packaging reports, or anyone who regularly needs to compile several PDFs into one file.',
        steps: ['Click the upload area and select two or more PDF files from your computer. You can select multiple files at once.', 'The selected files will be listed in the order they were added.', 'Click Merge PDFs to begin combining them.', 'Once complete, click Download Merged PDF to save the result.', 'Click Start Over to reset and merge a different set of files.'],
        tips: 'Files are merged in the order they are listed. If you need a specific order, select files in that sequence when uploading. Very large PDFs may take a few seconds to process depending on your device\'s speed.'
    },
    'pdf-to-images': {
        intro: 'PDF to Images converts every page of a PDF document into individual PNG image files. This is useful when you need to share specific PDF pages as images, or when a system only accepts image formats.',
        who: 'Students extracting slides or diagrams from lecture PDFs, professionals sharing specific PDF pages on social media or in presentations, or developers working with document content as images.',
        steps: ['Click the upload area and select a PDF file from your device.', 'The tool will detect and display the number of pages in the PDF.', 'Click "Convert All Pages to Images" to begin the conversion.', 'Each page will appear as a separate image once processed.', 'Click the Download button beneath each page image to save it individually.'],
        tips: 'Conversion quality depends on the original PDF resolution. Password-protected PDFs cannot be processed by this tool. For very large PDFs, conversion may take some time as all processing is done in your browser.'
    },
    'json-formatter': {
        intro: 'JSON Formatter helps you quickly make raw or minified JSON readable. It can also validate your JSON for syntax errors and minify formatted JSON back into a compact single line.',
        who: 'Developers inspecting API responses, students learning about JSON data structures, or anyone working with configuration files or data exports.',
        steps: ['Paste your JSON data into the input box.', 'Choose an indentation style: 2 Spaces, 4 Spaces, or Tab.', 'Click "Format & Validate" to beautify the JSON and check it for errors. Any syntax errors will be highlighted.', 'Click "Minify" to compress formatted JSON back into a compact single line.', 'Click "Copy Output" to copy the result.'],
        tips: 'If you see an error message after clicking Format, it means your JSON has a syntax issue. Common problems include missing commas, unmatched brackets, or unquoted keys. The error message will indicate where the problem is.'
    },
    'password-generator': {
        intro: 'Password Generator creates strong, random passwords based on the character types and length you choose. All generation happens in your browser — no passwords are stored or transmitted anywhere.',
        who: 'Anyone who needs to create a new account password, IT professionals setting up system credentials, or security-conscious users who want to avoid weak or reused passwords.',
        steps: ['Choose a password length using the slider (4 to 64 characters). Longer passwords are generally more secure.', 'Check or uncheck the character type boxes: Uppercase letters, Lowercase letters, Numbers, and Symbols.', 'Click "Generate New Password" to create a password, or click the copy icon next to the generated password to copy it immediately.', 'The Strength indicator below will reflect the current password\'s estimated security level.'],
        tips: 'For most online accounts, a length of 16 or more characters with all four character types enabled is recommended. Never share generated passwords over email or messaging. Using a password manager to store them is strongly advised.'
    },
    'assignment-planner': {
        intro: 'Assignment Planner helps you keep track of all your academic assignments in one place. Add tasks with their subject, due date, and priority level, and mark them complete as you finish them. Your assignments are saved in your browser and will still be here when you return.',
        who: 'Students at any level who want to stay organized, avoid missing deadlines, and manage their academic workload effectively.',
        steps: ['Fill in the Title (required) and optionally the Subject, Due Date, and Priority.', 'Click "Add Assignment" to save it to your list.', 'Use the filter buttons (All, Upcoming, Overdue) to view specific groups of assignments.', 'Click the complete button on any assignment to mark it as done.', 'Remove completed or unnecessary assignments using the delete button.'],
        tips: 'Your assignments are saved automatically in your browser\'s local storage. They will persist between visits as long as you use the same browser. Clearing your browser data will remove saved assignments.'
    },
    'citation-generator': {
        intro: 'Citation Generator produces correctly formatted academic citations for books, websites, and journal articles. It currently supports APA 7th edition with source-specific formatting, and also provides templates for MLA 9th, Chicago, and Harvard styles.',
        who: 'Students writing research papers, essays, or theses who need to properly credit their sources and follow a specific citation style.',
        steps: ['Select your Citation Style (APA 7th is the most detailed and recommended).', 'Select the Source Type: Book, Website, or Journal Article. The form will update to show the relevant fields.', 'Fill in the Author (required) and Title (required). Add as many other fields as you have available.', 'Click "Generate Citation" to produce the formatted citation.', 'Copy the result using the "Copy Citation" button.'],
        tips: 'Always verify citations against your institution\'s official style guide, as requirements may vary. For websites, including the access date may be required by some institutions even though this tool does not have a dedicated field for it. For journal articles, check the Volume, Issue, and Page numbers in the original source.'
    },
    'research-organizer': {
        intro: 'Research Paper Organizer gives you a personal library to save and manage all your sources in one place. Add titles, authors, URLs, key findings, and tags to keep your research organized and searchable.',
        who: 'Students conducting literature reviews or working on research papers who need to track multiple sources, papers, and websites.',
        steps: ['Enter the Title (required) of the source along with any other details like Author, URL, Notes, and Tags.', 'Click "Save Source" to add it to your library.', 'Use the Search box on the right to filter your saved sources by title or tag.', 'Use "Export JSON" to save a backup file of all your sources.', 'Use "Import JSON" to restore a previously exported backup.'],
        tips: 'Use descriptive tags (e.g., "climate", "methodology", "key source") to make filtering faster. Your sources are saved in your browser. Export a backup regularly if you are working on a long project to avoid accidental data loss.'
    },
    'presentation-outline': {
        intro: 'Presentation Outline Maker generates a slide-by-slide outline for your presentations. Without an API key, it produces a useful manual template based on your topic and duration. With an OpenAI API key, it can generate more tailored, content-specific outlines.',
        who: 'Students preparing academic presentations, professionals building business pitches, or anyone planning a structured talk and needing a quick starting framework.',
        steps: ['Optionally enter your OpenAI API key for AI-powered outlines. Leave it blank for a manual template.', 'Enter your Topic (required).', 'Enter the target Audience (e.g., "university students", "business executives").', 'Set the Duration in minutes.', 'Click "Generate Outline" to produce your slide plan.', 'Copy the outline using the "Copy Result" button.'],
        tips: 'The manual template distributes slides roughly evenly at 2 minutes per slide. Use it as a starting framework and add your own bullet points. If using AI, be specific with your topic — for example, "The impact of social media on mental health in teenagers" will produce a better outline than just "social media".'
    },
    'flashcard-maker': {
        intro: 'Flashcard Maker lets you create and study your own digital flashcard decks. Type a question on the front and the answer on the back, then use the flip, next, and previous buttons to study your deck. Your cards are saved in your browser.',
        who: 'Students memorizing vocabulary, definitions, formulas, historical dates, or any material that benefits from active recall practice.',
        steps: ['Type a question or term in the "Front" box and the answer or definition in the "Back" box.', 'Click "Add Card" to add it to your deck.', 'Use the card viewer on the right to study. Click "Flip" to see the answer, and "Next" or "Prev" to move between cards.', 'Use "Export Deck" to download your flashcards as a JSON file for backup or sharing.', 'Use "Import Deck" to load a previously exported JSON file.'],
        tips: 'Keep each card focused on a single concept. Short, specific questions work better than long, vague ones. Imported decks are checked for duplicates — cards that already exist in your current deck will not be added twice.'
    },
    'quiz-generator': {
        intro: 'Quiz & MCQ Generator lets you create and take multiple-choice quizzes. You can add questions manually one by one, or use AI to automatically generate questions from a block of text or your study notes.',
        who: 'Students preparing for exams who want to test their own knowledge, teachers or tutors creating quick practice quizzes, or anyone who wants to turn notes into an interactive test.',
        steps: ['To add questions manually: Fill in the Question, Options A through D, select the correct answer, and click "Add Question".', 'To generate questions with AI: Paste your notes into the Notes text box, enter your API key, and click "Generate from Notes". The AI will create 3 multiple-choice questions from your text.', 'Once questions are added, they appear in the Quiz View on the right.', 'Select your answers and click "Submit Quiz" to see your score.', 'Click "Clear Quiz" to start fresh.'],
        tips: 'AI-generated questions are based on the text you provide. The more specific and factual your notes, the better the questions. AI may occasionally produce questions with ambiguous answers — always review AI output before using it for serious study.'
    },
    'gpa-calculator': {
        intro: 'GPA & CGPA Calculator computes your semester GPA and optionally your cumulative GPA (CGPA) if you provide your previous results. It uses the standard 4.0 scale with +/- grade variations.',
        who: 'University and college students who want to track their academic standing, plan for grade improvement, or understand how a current semester affects their overall CGPA.',
        steps: ['For each subject in your current semester, enter the Credit Hours and select the Grade you received or expect.', 'Click "+ Add Subject" if you need more rows.', 'To calculate CGPA, enter your Previous CGPA and the total Previous Credits Completed in the right panel.', 'Click "Calculate GPA" to see your Semester GPA and Overall CGPA.'],
        tips: 'The calculator uses the standard 4.0 scale (A=4.0, A-=3.7, B+=3.3, B=3.0, etc.). Some universities use different scales or do not include +/- grades. Cross-check your institution\'s specific grading policy for accurate results. The calculator does not account for failed/repeated courses in CGPA unless you adjust the input accordingly.'
    },
    'study-timetable': {
        intro: 'Study Timetable Generator creates a simple weekly study schedule by distributing your subjects across the days of the week. Enter your subjects and how many hours per day you want to study, and it builds a 7-day plan.',
        who: 'Students who want to ensure every subject gets regular attention across the week, especially during exam preparation periods.',
        steps: ['Type your subjects in the input box, separated by commas (e.g., "Math, Physics, English").', 'Enter the number of study hours per day you plan to dedicate.', 'Click "Generate Timetable" to see your weekly schedule.', 'Use the "Print Timetable" button to print or save it as a PDF via your browser.'],
        tips: 'The generator distributes subjects in a repeating cycle. If you have fewer subjects than study hours per day, subjects will repeat. For a more personalized schedule, consider which subjects need more time and adjust the hours accordingly. This tool provides a starting template — feel free to modify it to suit your actual availability.'
    },
    'scientific-calculator': {
        intro: 'Scientific Calculator performs standard arithmetic as well as scientific functions including trigonometry, logarithms, square roots, and exponentiation. It uses a safe, locally-run expression parser with proper operator precedence.',
        who: 'Students in math, science, or engineering courses who need a quick in-browser calculator for academic problems.',
        steps: ['Click the number buttons and operators to build your expression in the display field.', 'For scientific functions (sin, cos, tan, log, sqrt), click the function button — an opening parenthesis will be added automatically. Close it with the ")" button.', 'Use "^" for exponentiation (e.g., 2^3 for 2 to the power of 3).', 'Press "=" to evaluate the expression.', 'Press "C" to clear the display and start a new calculation.'],
        tips: 'Trigonometric functions (sin, cos, tan) accept values in radians, not degrees. To convert degrees to radians, multiply by π/180 (approximately 0.01745). Division by zero will display an error message rather than crashing the tool.'
    },
    'notes-to-study-guide': {
        intro: 'Notes to Study Guide transforms your raw, unstructured lecture notes into a cleaner, organized study guide. The manual mode extracts capitalized key terms and formats the first few lines as key concepts. The AI mode produces a fully structured guide with headings, key terms, and review questions.',
        who: 'Students who take messy or stream-of-consciousness notes during lectures and want a cleaner reference document for revision.',
        steps: ['Optionally enter your OpenAI API key for the AI mode.', 'Paste your raw notes into the "Raw Notes" text box.', 'Click "Process Manually" for an instant basic extraction — no API key required.', 'Click "Process with AI" for a structured guide with headings, definitions, and review questions.', 'Copy the output using the "Copy Guide" button.'],
        tips: 'The manual mode works best when your notes contain capitalized proper nouns and technical terms. The AI mode produces more useful results with notes that are at least a paragraph long. Very short inputs may not give the AI enough material to work with.'
    },
    'essay-structure-helper': {
        intro: 'Essay Structure Helper generates a detailed structural outline for your essay based on your topic, essay type, and target word count. It breaks the plan into Introduction, Body Paragraphs, and Conclusion, with estimated word counts for each section.',
        who: 'Students planning essays or research papers who want a clear structure before starting to write, or anyone who struggles with essay organization.',
        steps: ['Enter your Essay Topic.', 'Select the Essay Type: Argumentative, Expository, or Narrative.', 'Set your Target Word Count.', 'Optionally add Key Arguments (comma separated) that you want your body paragraphs to cover.', 'Click "Generate Outline & Structure" to see your essay plan.'],
        tips: 'The word counts for each section are approximate targets, not strict limits. The Introduction and Conclusion are each set to roughly 10% of your total word count, with the rest allocated to body paragraphs. Add your own specific evidence, examples, and transitions to flesh out the structure.'
    },
    'study-estimator': {
        intro: 'Reading Time & Study Estimator calculates how long it will take to read a piece of material based on its word count and your reading speed. It also suggests how many 25-minute Pomodoro study sessions you might need.',
        who: 'Students planning study sessions and needing to budget time for different reading materials, or anyone estimating how long it will take to finish an article or book chapter.',
        steps: ['Enter the word count of the material you want to study.', 'Adjust the Reading Speed slider to match your typical pace. The default is 200 words per minute, which is an average reading speed.', 'Click "Estimate Time" to see the total reading time and the suggested number of 25-minute sessions.'],
        tips: 'Reading speed varies significantly depending on the complexity of the material. Technical or academic content is often read at 100–150 wpm, while casual fiction can be read at 300 wpm or faster. Adjust the slider to reflect your realistic speed for the type of content you are studying.'
    },
    'code-explainer': {
        intro: 'Code Explainer uses AI to analyze a piece of code, explain what it does in plain language, and identify any obvious bugs or issues. It supports Python, JavaScript, Java, and C++.',
        who: 'Students learning to program who want to understand unfamiliar code, beginner developers debugging their own work, or anyone who encounters a code snippet and needs a quick explanation.',
        steps: ['Enter your OpenAI API key in the field provided.', 'Select the programming Language from the dropdown.', 'Paste the code you want explained into the code input box.', 'Click "Explain Code" and wait for the AI response.', 'Read the explanation in the output area below.'],
        tips: 'The AI explanation is based on the code you paste, so providing context in comments (e.g., what the function is supposed to do) can lead to a more accurate and useful response. The AI may miss subtle logical bugs — it is best suited for explaining code structure and catching obvious syntax or logic errors.'
    },
    'student-unit-converter': {
        intro: 'Student Unit Converter converts common measurement units across Length, Mass, and Temperature. All conversions are calculated instantly in your browser with no server required.',
        who: 'Students working on science, engineering, or math problems that require unit conversions, or anyone dealing with measurements in different unit systems.',
        steps: ['Select a Category: Length, Mass, or Temperature.', 'Choose the unit you are converting From and the unit you are converting To using the dropdowns.', 'Enter the value you want to convert.', 'Click "Convert" to see the result.'],
        tips: 'Temperature conversion uses exact mathematical formulas (not look-up tables), so decimal precision is maintained. Length and Mass conversions use precise reference values. For very large or very small numbers, scientific notation may appear in the result.'
    },
    'exam-countdown': {
        intro: 'Exam Countdown tracks all your upcoming exams and shows exactly how many days remain until each one. Exams are sorted by date and color-coded — urgent exams appear in red when 3 or fewer days remain.',
        who: 'Students who want a quick visual overview of all their upcoming exams to prioritize their study time effectively.',
        steps: ['Enter the Exam Title (required) and optionally the Subject.', 'Set the Exam Date using the date picker.', 'Click "Add Exam" to save it to your countdown list.', 'Your exams are automatically sorted from nearest to furthest.', 'Click "Delete" next to any exam to remove it from the list.'],
        tips: 'Exams that have already passed will show as "Passed" rather than a countdown. Your exam list is saved in your browser\'s local storage and will persist between visits. Remember to delete passed exams to keep your list clean.'
    }
};

function getToolGuide(id) {
    const g = TOOL_GUIDES[id];
    if (!g) return '';
    const stepsHtml = g.steps.map((s, i) => `<li><strong>${i + 1}.</strong> ${s}</li>`).join('');
    const tipsHtml = g.tips ? `<div class="alert alert-info mt-4" style="margin-bottom:0"><i data-lucide="lightbulb"></i><strong>Tip: </strong>${g.tips}</div>` : '';
    return `
        <div class="glass-card" style="padding: 1.5rem 2rem; margin-bottom: 1.5rem;">
            <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.7;">${g.intro}</p>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1rem;">
                <div>
                    <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-color);">Who Is This For?</h4>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${g.who}</p>
                </div>
                <div>
                    <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-color);">How To Use</h4>
                    <ol style="padding-left: 0; list-style: none; margin: 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;">${stepsHtml}</ol>
                </div>
            </div>
            ${tipsHtml}
        </div>
    `;
}



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

function setPageMeta(title, description) {
    document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', description);
}

function initRouter() {
    const path = window.location.hash.slice(1) || '/';
    const app = document.getElementById('app-content');
    
    // Clear current content
    app.innerHTML = '';

    if (path === '/' || path === '') {
        setPageMeta(
            'Techvelo - Free Online Tools for Students & Professionals',
            'Techvelo provides 25+ free online tools including AI text summarizer, PDF merger, image compressor, password generator, GPA calculator, citation generator, and more. No signup required.'
        );
        renderHome(app);
    } else if (path === '/tools') {
        setPageMeta(
            'All Tools - Techvelo',
            'Browse all 25+ free online tools on Techvelo. Text tools, AI tools, PDF tools, image utilities, and university student tools — all in one place.'
        );
        renderAllTools(app);
    } else if (path.startsWith('/tools/')) {
        const toolId = path.split('/')[2];
        const tool = TOOLS.find(t => t.id === toolId);
        if (tool) {
            setPageMeta(
                `${tool.name} - Free Online Tool | Techvelo`,
                `${tool.description} Use ${tool.name} free online at Techvelo — no signup required.`
            );
            renderToolPage(app, tool);
        } else {
            setPageMeta('Tool Not Found - Techvelo', 'The requested tool could not be found on Techvelo.');
            app.innerHTML = '<div class="text-center section-title">Tool not found</div>';
        }
    } else if (path === '/about') {
        setPageMeta(
            'About Us - Techvelo',
            'Learn about Techvelo, our mission to make everyday digital tasks easier, and the tools we provide for students, professionals, and general users.'
        );
        renderAboutPage(app);
    } else if (path === '/contact') {
        setPageMeta(
            'Contact Us - Techvelo',
            'Get in touch with the Techvelo team. We welcome feedback, questions, and suggestions about our free online tools.'
        );
        renderContactPage(app);
    } else if (path === '/privacy') {
        setPageMeta(
            'Privacy Policy - Techvelo',
            'Read the Techvelo Privacy Policy to understand how we handle your data. Techvelo does not collect personal data and all tool processing happens in your browser.'
        );
        renderPrivacyPage(app);
    } else if (path === '/terms') {
        setPageMeta(
            'Terms & Conditions - Techvelo',
            'Read the Techvelo Terms & Conditions governing your use of our free online tools and website.'
        );
        renderTermsPage(app);
    } else {
        setPageMeta('Page Not Found - Techvelo', 'The page you are looking for does not exist on Techvelo.');
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
    const guide = getToolGuide(tool.id);
    
    container.innerHTML = `
        <div class="tool-page">
            ${breadcrumbs}
            ${header}
            ${guide}
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
