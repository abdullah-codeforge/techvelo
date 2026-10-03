// ==========================================
// TECHVELO — LEGAL & INFORMATIONAL PAGES
// ==========================================

// ------------------------------------
// SHARED HELPERS
// ------------------------------------
function pageShell(title, subtitle, bodyHTML) {
    return `
    <div class="tool-page static-page">
        <div class="static-page-header">
            <h1>${title}</h1>
            <p>${subtitle}</p>
        </div>
        <div class="glass-card static-page-body">
            ${bodyHTML}
        </div>
    </div>`;
}

// ------------------------------------
// ABOUT US
// ------------------------------------
function renderAboutPage(container) {
    document.title = 'About Us — Techvelo';
    container.innerHTML = pageShell(
        'About Techvelo',
        'Smart Tools. Simple Solutions.',
        `
        <div class="static-section">
            <h2>Who We Are</h2>
            <p>Techvelo is a free, browser-based toolkit designed for students, developers, and everyday users who need reliable online tools without clutter, sign-ups, or hidden fees. Our platform runs entirely in your browser — no accounts, no servers storing your files, no subscriptions.</p>
        </div>

        <div class="static-section">
            <h2>Our Mission</h2>
            <p>We believe that powerful digital tools should be accessible to everyone. Techvelo was built to give anyone a clean, fast, and honest collection of utilities — from PDF manipulation and image editing to AI-assisted writing and academic planning — all in one place.</p>
        </div>

        <div class="about-values-grid">
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="shield-check"></i></div>
                <h3>Privacy First</h3>
                <p>Most tools process your data entirely inside your own browser. Nothing is uploaded unless you explicitly invoke an external AI service.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="zap"></i></div>
                <h3>Fast &amp; Free</h3>
                <p>No paywalls, no account required, no ads interrupting your workflow. Just tools that work.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="graduation-cap"></i></div>
                <h3>Built for Learners</h3>
                <p>A dedicated University Student Tools category helps with GPA calculation, flashcards, essay planning, exam countdowns, and more.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="code-2"></i></div>
                <h3>Developer Friendly</h3>
                <p>Tools like the JSON Formatter, Password Generator, and Code Explainer are built with developers' real-world needs in mind.</p>
            </div>
        </div>

        <div class="static-section">
            <h2>What Techvelo Offers</h2>
            <ul class="static-list">
                <li><strong>25 tools</strong> across Text, AI, Image, PDF, Developer, and University Student categories.</li>
                <li>All image and document processing happens <strong>locally in your browser</strong> using Web APIs — your files never leave your device.</li>
                <li>AI-powered tools (Summarizer, Rewriter, Code Explainer) connect <strong>directly to OpenAI</strong> using a key you provide — Techvelo never stores or forwards your key.</li>
                <li>Student tools save data to your browser's <strong>local storage</strong>, which only you can access on your device.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>Honesty Policy</h2>
            <p>We do not claim certifications, awards, or user statistics that are not real. We do not publish fake testimonials. If a tool requires an external API key, we say so clearly rather than pretending the feature works without one.</p>
        </div>

        <div class="static-section">
            <h2>Future Plans</h2>
            <p>Techvelo is actively growing. Planned additions include more AI tools, collaboration features, a browser extension, and wider language support. The codebase is structured so new tools can be added without rebuilding the site.</p>
        </div>
        `
    );
    lucide.createIcons();
}

// ------------------------------------
// CONTACT US
// ------------------------------------
function renderContactPage(container) {
    document.title = 'Contact Us — Techvelo';
    container.innerHTML = pageShell(
        'Contact Us',
        'Have a question, feedback, or bug to report? We\'d love to hear from you.',
        `
        <div class="contact-grid">
            <div>
                <h2>Send a Message</h2>
                <form id="contact-form" class="contact-form" novalidate>
                    <div class="input-group">
                        <label for="cf-name">Full Name <span aria-hidden="true" style="color:#ef4444">*</span></label>
                        <input type="text" id="cf-name" name="name" placeholder="Your full name" autocomplete="name" required>
                        <span class="field-error hidden" id="cf-name-err">Please enter your name.</span>
                    </div>
                    <div class="input-group">
                        <label for="cf-email">Email Address <span aria-hidden="true" style="color:#ef4444">*</span></label>
                        <input type="email" id="cf-email" name="email" placeholder="you@example.com" autocomplete="email" required>
                        <span class="field-error hidden" id="cf-email-err">Please enter a valid email address.</span>
                    </div>
                    <div class="input-group">
                        <label for="cf-subject">Subject <span aria-hidden="true" style="color:#ef4444">*</span></label>
                        <select id="cf-subject" name="subject" required>
                            <option value="">— Select a topic —</option>
                            <option value="Bug Report">Bug Report</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Tool Feedback">Tool Feedback</option>
                            <option value="General Question">General Question</option>
                            <option value="Other">Other</option>
                        </select>
                        <span class="field-error hidden" id="cf-subject-err">Please select a subject.</span>
                    </div>
                    <div class="input-group">
                        <label for="cf-message">Message <span aria-hidden="true" style="color:#ef4444">*</span></label>
                        <textarea id="cf-message" name="message" rows="6" placeholder="Describe your question or feedback in detail..." required></textarea>
                        <span class="field-error hidden" id="cf-message-err">Please enter a message (minimum 20 characters).</span>
                    </div>
                    <button type="submit" id="cf-submit-btn" class="btn-primary" style="width:100%; justify-content:center">
                        <i data-lucide="send"></i> <span id="cf-btn-label">Send Message</span>
                    </button>
                    <div id="cf-success" class="alert alert-info hidden" style="margin-top:1rem; display:flex; align-items:center; gap:0.5rem">
                        <i data-lucide="check-circle"></i>
                        <span>Thank you! Your message has been sent. We'll get back to you within 2–5 business days.</span>
                    </div>
                    <div id="cf-error" class="alert hidden" style="margin-top:1rem; display:flex; align-items:center; gap:0.5rem">
                        <i data-lucide="circle-x"></i>
                        <span id="cf-error-text">Something went wrong. Please try again or contact us directly.</span>
                    </div>
                </form>
            </div>

            <div class="contact-info">
                <h2>Other Ways to Reach Us</h2>
                <div class="contact-info-card glass-card">
                    <i data-lucide="github"></i>
                    <div>
                        <strong>GitHub Issues</strong>
                        <p>Found a bug? The best way to report it is via GitHub Issues on the project repository once it is published.</p>
                    </div>
                </div>
                <div class="contact-info-card glass-card">
                    <i data-lucide="mail"></i>
                    <div>
                        <strong>Email (via form)</strong>
                        <p>Use the contact form on the left — messages are delivered via Formspree to our inbox.</p>
                    </div>
                </div>
                <div class="contact-info-card glass-card">
                    <i data-lucide="clock"></i>
                    <div>
                        <strong>Response Time</strong>
                        <p>We aim to respond within 2–5 business days for general enquiries. Bug reports are prioritised.</p>
                    </div>
                </div>
            </div>
        </div>
        `
    );

    lucide.createIcons();

    // ---- Formspree endpoint ----
    const FORMSPREE_URL = 'https://formspree.io/f/mljdqvgw';

    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('cf-submit-btn');
    const btnLabel  = document.getElementById('cf-btn-label');
    const successEl = document.getElementById('cf-success');
    const errorEl   = document.getElementById('cf-error');
    const errorText = document.getElementById('cf-error-text');

    // ---- Validation helper ----
    function validate() {
        let valid = true;
        const name    = document.getElementById('cf-name');
        const email   = document.getElementById('cf-email');
        const subject = document.getElementById('cf-subject');
        const message = document.getElementById('cf-message');

        const setErr = (el, errId, condition, msg) => {
            if (condition) {
                document.getElementById(errId).innerText = msg;
                document.getElementById(errId).classList.remove('hidden');
                el.classList.add('input-error');
                valid = false;
            } else {
                document.getElementById(errId).classList.add('hidden');
                el.classList.remove('input-error');
            }
        };

        setErr(name,    'cf-name-err',    !name.value.trim(),                             'Please enter your name.');
        setErr(email,   'cf-email-err',   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Please enter a valid email address.');
        setErr(subject, 'cf-subject-err', !subject.value,                                 'Please select a subject.');
        setErr(message, 'cf-message-err', message.value.trim().length < 20,               'Please enter a message (minimum 20 characters).');

        return valid;
    }

    // ---- Live validation: clear error on fix ----
    ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            if (document.getElementById(id).classList.contains('input-error')) validate();
        });
    });

    // ---- Submit handler ----
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successEl.classList.add('hidden');
        errorEl.classList.add('hidden');

        if (!validate()) return;

        // Disable button & show loading state
        submitBtn.disabled = true;
        btnLabel.textContent = 'Sending…';
        submitBtn.style.opacity = '0.7';

        try {
            const response = await fetch(FORMSPREE_URL, {
                method:  'POST',
                headers: { 'Accept': 'application/json' },
                body:    new FormData(form)
            });

            if (response.ok) {
                // Success — show message and reset form
                successEl.classList.remove('hidden');
                form.reset();
            } else {
                // Formspree returned an error (e.g. 422 validation)
                const data = await response.json().catch(() => ({}));
                const msg  = (data.errors && data.errors.map(err => err.message).join(', '))
                             || 'Submission failed. Please check your details and try again.';
                errorText.textContent = msg;
                errorEl.classList.remove('hidden');
            }
        } catch (err) {
            // Network / fetch error
            errorText.textContent = 'Network error — please check your connection and try again.';
            errorEl.classList.remove('hidden');
        } finally {
            // Always re-enable the button
            submitBtn.disabled = false;
            btnLabel.textContent = 'Send Message';
            submitBtn.style.opacity = '';
            lucide.createIcons();
        }
    });
}

// ------------------------------------
// PRIVACY POLICY
// ------------------------------------
function renderPrivacyPage(container) {
    document.title = 'Privacy Policy — Techvelo';
    container.innerHTML = pageShell(
        'Privacy Policy',
        'Last updated: October 2025',
        `
        <div class="static-section">
            <p>This Privacy Policy describes how Techvelo ("we", "our", or "us") handles information in connection with your use of this website. Please read it carefully. If you have any questions, use the <a href="#/contact" style="color:var(--primary-color)">Contact Us</a> page.</p>
        </div>

        <div class="static-section">
            <h2>1. Who We Are</h2>
            <p>Techvelo is a static, browser-based web application that provides free online tools. It does not operate a backend server that processes or stores personal user data as part of normal tool usage.</p>
        </div>

        <div class="static-section">
            <h2>2. Data We Do Not Collect</h2>
            <ul class="static-list">
                <li>We do <strong>not</strong> collect your name, email address, or any personal identifiers as part of tool usage.</li>
                <li>We do <strong>not</strong> have user accounts or authentication.</li>
                <li>We do <strong>not</strong> use advertising tracking, behavioural analytics, or retargeting pixels.</li>
                <li>We do <strong>not</strong> install third-party tracking cookies.</li>
                <li>We do <strong>not</strong> upload your images, PDFs, or documents to any server — all file processing happens locally in your browser.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>3. Local Browser Storage</h2>
            <p>Several student tools (Assignment Planner, Exam Countdown, Flashcard Maker, Research Organizer) save data to your browser's <code>localStorage</code>. This data:</p>
            <ul class="static-list">
                <li>Is stored only on your own device.</li>
                <li>Is never sent to Techvelo or any third party.</li>
                <li>Can be deleted at any time by clearing your browser's site data for this page.</li>
                <li>Is not accessible to other websites or browser tabs.</li>
            </ul>
            <p>The selected light/dark theme preference is also stored in <code>localStorage</code>.</p>
        </div>

        <div class="static-section">
            <h2>4. AI Tools and the OpenAI API</h2>
            <p>Tools such as the AI Text Summarizer, AI Rewriter, Code Explainer, and others offer optional AI-powered features. These work as follows:</p>
            <ul class="static-list">
                <li>You supply your own OpenAI API key directly in the tool's input field.</li>
                <li>Your key is saved to your browser's <code>localStorage</code> on your device only. Techvelo never transmits your key to any Techvelo server.</li>
                <li>When you activate an AI feature, your text input is sent <strong>directly from your browser to the OpenAI API</strong> (api.openai.com) using your own key.</li>
                <li>Your use of OpenAI is subject to <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style="color:var(--primary-color)">OpenAI's Privacy Policy</a>.</li>
                <li>We recommend you do not paste sensitive personal information (medical records, financial data, passwords) into any AI input field.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>5. Third-Party Resources</h2>
            <p>Techvelo loads the following third-party resources to function:</p>
            <ul class="static-list">
                <li><strong>Google Fonts</strong> (fonts.googleapis.com) — delivers the Outfit typeface. Google may log font requests per their standard logging policy.</li>
                <li><strong>Lucide Icons</strong> (unpkg.com) — delivers icon assets via a CDN.</li>
                <li><strong>pdf-lib</strong> and <strong>PDF.js</strong> (via unpkg.com and cdnjs.cloudflare.com) — delivered as JavaScript libraries for PDF processing. These run in your browser; your PDF files are never sent to these CDNs.</li>
            </ul>
            <p>These services may collect basic server request logs (IP address, timestamp, resource requested) in the ordinary course of CDN operation. We do not control those logs.</p>
        </div>

        <div class="static-section">
            <h2>6. Contact Form</h2>
            <p>If you use the Contact form, your submitted name, email address, and message may be processed by a third-party form service (such as Formspree or Web3Forms) if one has been configured. This will be clearly noted when the service is activated. Until then, form submissions are not delivered anywhere.</p>
        </div>

        <div class="static-section">
            <h2>7. Children's Privacy</h2>
            <p>Techvelo is a general-purpose tool website. We do not knowingly collect any data from children under 13 and have no mechanism to do so. If you believe a child has provided personal data through this site, please contact us.</p>
        </div>

        <div class="static-section">
            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, the "Last updated" date at the top of this page will change. Material changes will be noted prominently. Continued use of Techvelo after changes constitutes acceptance of the revised policy.</p>
        </div>

        <div class="static-section">
            <h2>9. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please use the <a href="#/contact" style="color:var(--primary-color)">Contact Us</a> page.</p>
        </div>
        `
    );
    lucide.createIcons();
}

// ------------------------------------
// TERMS & CONDITIONS
// ------------------------------------
function renderTermsPage(container) {
    document.title = 'Terms of Service — Techvelo';
    container.innerHTML = pageShell(
        'Terms of Service',
        'Please read these terms before using Techvelo.',
        `
        <div class="static-section">
            <p>By accessing or using Techvelo ("the website", "the service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use Techvelo.</p>
        </div>

        <div class="static-section">
            <h2>1. Nature of the Service</h2>
            <p>Techvelo is a free, static web application providing browser-based utility tools for personal and educational use. It is offered as-is without any warranty of fitness for a particular purpose or guaranteed availability.</p>
        </div>

        <div class="static-section">
            <h2>2. Permitted Use</h2>
            <p>You may use Techvelo for lawful personal, educational, and professional purposes. You agree not to:</p>
            <ul class="static-list">
                <li>Use the service for any illegal, fraudulent, or harmful activity.</li>
                <li>Attempt to reverse-engineer, copy, or redistribute Techvelo's source code without permission.</li>
                <li>Use automated scripts or bots to scrape or abuse the service.</li>
                <li>Use AI tools on this platform to generate content that violates OpenAI's usage policies.</li>
                <li>Misrepresent AI-generated content as your own original academic work in a way that violates your institution's academic integrity policy.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>3. AI Tool Usage</h2>
            <p>Techvelo's AI-powered tools (Text Summarizer, Rewriter, Code Explainer, etc.) connect to the OpenAI API using a key that you provide. By using these features:</p>
            <ul class="static-list">
                <li>You agree to comply with <a href="https://openai.com/policies/usage-policies" target="_blank" rel="noopener noreferrer" style="color:var(--primary-color)">OpenAI's Usage Policies</a>.</li>
                <li>You are responsible for all API costs incurred by use of your key.</li>
                <li>You understand that AI output may be inaccurate, incomplete, or outdated. Do not rely solely on AI output for medical, legal, financial, or safety-critical decisions.</li>
                <li>Techvelo does not store, review, or take responsibility for any content you input into AI tools.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>4. Academic Integrity</h2>
            <p>Essay Structure Helper, Notes to Study Guide, Quiz Generator, and similar tools are intended as planning and learning aids. You are responsible for ensuring your use of these tools complies with your educational institution's academic integrity and plagiarism policies. Techvelo takes no responsibility for any academic consequences arising from misuse.</p>
        </div>

        <div class="static-section">
            <h2>5. Tool Accuracy</h2>
            <p>Tools such as the GPA Calculator and Citation Generator provide outputs based on standard formulas and formats. These may not perfectly match every university's grading scale or citation requirements. Always verify important outputs with your institution or a qualified professional.</p>
        </div>

        <div class="static-section">
            <h2>6. No Data Guarantee</h2>
            <p>Data stored in your browser's <code>localStorage</code> (assignments, flashcards, exam dates, etc.) is stored solely on your device. Techvelo does not back up this data. Clearing browser data, switching browsers, or using a different device will result in loss of locally stored data. We strongly recommend using the export functions provided in each tool.</p>
        </div>

        <div class="static-section">
            <h2>7. Disclaimer of Warranties</h2>
            <p>Techvelo is provided <strong>"as is"</strong> without warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. Your use of the service is at your sole risk.</p>
        </div>

        <div class="static-section">
            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, Techvelo and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the service.</p>
        </div>

        <div class="static-section">
            <h2>9. Third-Party Links</h2>
            <p>Techvelo may link to external sites (e.g., OpenAI, Formspree). These links are provided for convenience. We are not responsible for the content, accuracy, or privacy practices of any external website.</p>
        </div>

        <div class="static-section">
            <h2>10. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes take effect when posted on this page. Your continued use of Techvelo after changes constitutes your acceptance of the revised Terms.</p>
        </div>

        <div class="static-section">
            <h2>11. Contact</h2>
            <p>If you have questions about these Terms, please use the <a href="#/contact" style="color:var(--primary-color)">Contact Us</a> page.</p>
        </div>
        `
    );
    lucide.createIcons();
}
