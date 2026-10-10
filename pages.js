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
        'About Us',
        'Making everyday digital tasks easier for everyone.',
        `
        <div class="static-section">
            <h2>Who We Are</h2>
            <p>Techvelo is an online platform designed to make everyday digital tasks easier. We provide useful online tools for students, professionals, and general users, all in one place.</p>
        </div>

        <div class="static-section">
            <h2>Our Goal</h2>
            <p>Our goal is to offer simple, accessible, and user-friendly tools that help people save time, improve productivity, and complete their tasks efficiently.</p>
        </div>

        <div class="about-values-grid">
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="users"></i></div>
                <h3>For Everyone</h3>
                <p>Built for students, professionals, and general users — no sign-up required, no barriers to access.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="zap"></i></div>
                <h3>Save Time</h3>
                <p>Get things done faster with tools designed to streamline repetitive and time-consuming digital tasks.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="layout-grid"></i></div>
                <h3>All in One Place</h3>
                <p>Everything you need in a single platform — no need to jump between multiple websites or apps.</p>
            </div>
            <div class="about-value-card glass-card">
                <div class="about-value-icon"><i data-lucide="trending-up"></i></div>
                <h3>Always Improving</h3>
                <p>We are continuously working to improve our tools and user experience based on real feedback.</p>
            </div>
        </div>

        <div class="static-section">
            <h2>Our Commitment</h2>
            <p>At Techvelo, we are continuously working to improve our tools and user experience. We believe powerful digital tools should be simple, accessible, and free for everyone to use.</p>
            <p>Have a suggestion or found something that could be better? We'd love to hear from you via our <a href="/contact" style="color:var(--primary-color)">Contact Us</a> page.</p>
        </div>
        `
    );
    if (window.lucide) lucide.createIcons();
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

    if (window.lucide) lucide.createIcons();

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
            if (window.lucide) lucide.createIcons();
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
        'Last Updated: October 2026',
        `
        <div class="static-section">
            <h2>Introduction</h2>
            <p>Welcome to Techvelo. Your privacy is important to us. This Privacy Policy explains what information may be collected when you use our website, how it may be used, and the choices available to you.</p>
        </div>

        <div class="static-section">
            <h2>Information We Collect</h2>
            <p>Techvelo may collect information you voluntarily provide, such as your name, email address, or message when you contact us through our contact form. Basic technical information, such as browser type, device information, and pages visited, may also be collected through website services.</p>
        </div>

        <div class="static-section">
            <h2>How We Use Information</h2>
            <p>We may use collected information to:</p>
            <ul class="static-list">
                <li>Respond to user questions and messages.</li>
                <li>Improve our website, tools, and user experience.</li>
                <li>Maintain website security and prevent misuse.</li>
                <li>Understand general website usage and performance.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>Cookies</h2>
            <p>Techvelo or third-party services may use cookies and similar technologies to improve website functionality, understand usage, and support advertising. You can manage or disable cookies through your browser settings. Some website features may not work as intended if cookies are disabled.</p>
        </div>

        <div class="static-section">
            <h2>Google AdSense and Advertising</h2>
            <p>Techvelo may use Google AdSense or other third-party advertising services to display advertisements. These services may use cookies or similar technologies to show ads based on users' visits to this or other websites, subject to their own policies and applicable settings. Users can learn more about Google's advertising practices and manage ad personalization through Google's Ads Settings and privacy resources.</p>
        </div>

        <div class="static-section">
            <h2>Third-Party Services</h2>
            <p>Our website may use third-party services, such as hosting, analytics, contact form processing, or advertising providers. These services may process information according to their own privacy policies. Techvelo does not control the privacy practices of third-party websites or services.</p>
        </div>

        <div class="static-section">
            <h2>Data Security</h2>
            <p>We take reasonable steps to protect information submitted to us. However, no method of transmission or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
        </div>

        <div class="static-section">
            <h2>Children's Privacy</h2>
            <p>Techvelo is a general-purpose website and is not knowingly designed to collect personal information from children. If you believe a child has provided personal information to us, please contact us so we can review the request.</p>
        </div>

        <div class="static-section">
            <h2>External Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the content, security, or privacy practices of those websites. We encourage users to review their privacy policies.</p>
        </div>

        <div class="static-section">
            <h2>Your Choices</h2>
            <p>You may choose not to provide personal information through our contact form. You can also manage cookies through your browser and adjust available advertising personalization settings through the relevant third-party services.</p>
        </div>

        <div class="static-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated revision date.</p>
        </div>

        <div class="static-section">
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how information is handled, please contact us through the <a href="/contact" style="color:var(--primary-color)">Contact Us</a> page on Techvelo.</p>
        </div>
        `
    );
    if (window.lucide) lucide.createIcons();
}

// ------------------------------------
// TERMS & CONDITIONS
// ------------------------------------
function renderTermsPage(container) {
    document.title = 'Terms & Conditions — Techvelo';
    container.innerHTML = pageShell(
        'Terms & Conditions',
        'Last Updated: October 2026',
        `
        <div class="static-section">
            <h2>1. Introduction</h2>
            <p>Welcome to Techvelo. These Terms & Conditions govern your access to and use of the Techvelo website and its online tools. By accessing or using our website, you agree to these terms. If you do not agree, please discontinue using the website.</p>
        </div>

        <div class="static-section">
            <h2>2. Use of Our Website</h2>
            <p>Techvelo provides online tools for students, professionals, and general users. You agree to use the website only for lawful purposes and in a way that does not interfere with other users or the operation and security of the website.</p>
        </div>

        <div class="static-section">
            <h2>3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul class="static-list">
                <li>Use the website for illegal, harmful, or fraudulent activities.</li>
                <li>Attempt to disrupt, damage, or gain unauthorized access to the website.</li>
                <li>Misuse, overload, or interfere with our tools, servers, or services.</li>
                <li>Use our website in a way that violates the rights of others.</li>
            </ul>
        </div>

        <div class="static-section">
            <h2>4. Online Tools</h2>
            <p>Techvelo offers tools intended to help users complete everyday digital tasks. While we aim to keep our tools useful and accurate, we do not guarantee that every result will be error-free, complete, or suitable for every purpose. Users are responsible for reviewing results before relying on them.</p>
        </div>

        <div class="static-section">
            <h2>5. Intellectual Property</h2>
            <p>Unless otherwise stated, the Techvelo website design, branding, original content, and website materials are owned by Techvelo or used with permission. You may use our tools for their intended purposes, but you may not copy, redistribute, or commercially exploit our protected materials without appropriate authorization.</p>
        </div>

        <div class="static-section">
            <h2>6. Third-Party Services and Links</h2>
            <p>Our website may contain links to third-party websites or use third-party services. These services operate under their own terms and policies. Techvelo is not responsible for third-party content, availability, or practices.</p>
        </div>

        <div class="static-section">
            <h2>7. Advertising</h2>
            <p>Techvelo may display advertisements provided by third-party advertising services. Advertisements and their linked products or services are the responsibility of the relevant advertisers or providers.</p>
        </div>

        <div class="static-section">
            <h2>8. Disclaimer</h2>
            <p>The website and its tools are provided on an "as is" and "as available" basis, to the extent permitted by applicable law. We make no guarantee that the website will always be available, uninterrupted, secure, or free from errors.</p>
        </div>

        <div class="static-section">
            <h2>9. Limitation of Liability</h2>
            <p>To the extent permitted by applicable law, Techvelo will not be liable for indirect, incidental, or consequential loss arising from the use of, or inability to use, the website or its tools. Nothing in these terms excludes liability that cannot legally be excluded.</p>
        </div>

        <div class="static-section">
            <h2>10. Changes to These Terms</h2>
            <p>We may update these Terms & Conditions from time to time. Any updates will be published on this page with a revised date. Continued use of the website after changes are published means you accept the updated terms, where permitted by law.</p>
        </div>

        <div class="static-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms & Conditions, please contact us through the <a href="/contact" style="color:var(--primary-color)">Contact Us</a> page on Techvelo.</p>
        </div>
        `
    );
    if (window.lucide) lucide.createIcons();
}
