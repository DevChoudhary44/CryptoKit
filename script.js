/* ═══════════════════════════════════════════════════════
   KNOWLEDGE BASE (KB) - Sample entries
   Note: Ensure your actual KB array is defined before this file
═══════════════════════════════════════════════════════ */

// If KB is not defined externally, uncomment this:
// var KB = KB || [];


/* ═══════════════════════════════════════════════════════
   CATEGORY RESPONSES
═══════════════════════════════════════════════════════ */

var catResp = {
    tools: {
        t: '<strong>🔧 Available Tools:</strong><br><br>🔑 RSA Key Generator<br>📁 File Integrity Checker<br># Hash Generator<br>🔒 Text Encrypt/Decrypt<br>✍️ Digital Signature<br>🛡️ Password Tools<br><br>Which one do you need?',
        s: ['Hash Generator', 'RSA Keys', 'File Integrity', 'Encryption']
    },
    learn: {
        t: '<strong>📚 Learn Cryptography:</strong><br><br>🔐 What is hashing?<br>🔑 How does RSA work?<br>🔒 What is AES?<br><br>Ask any of these!',
        s: ['What is SHA-256?', 'What is RSA?', 'What is AES?']
    },
    security: {
        t: '<strong>🛡️ Security Advice:</strong><br><br>⚠️ Is MD5 safe?<br>🔑 RSA key size guide<br>💪 Strong password tips<br><br>What is your question?',
        s: ['Is MD5 safe?', 'RSA key size?', 'Password tips']
    },
    premium: {
        t: '<strong>👑 Premium Features:</strong><br><br>🌟 Crypto Security Scanner<br>🔬 Advanced RSA Lab<br>📈 Advanced ECC Suite<br>📚 Batch File Integrity Checker<br>📄 Security Report Generator<br>🎨 Golden VIP theme<br><br>Upgrade to unlock!',
        s: ['View pricing', 'Batch Integrity', 'Security Report', 'Upgrade now']
    },
    help: {
        t: '<strong>❓ I can help with:</strong><br><br>🔧 Finding the right tool<br>📚 Explaining concepts<br>🛡️ Security best practices<br><br>Just type naturally!',
        s: ['All tools', 'Learn crypto', 'Security advice']
    }
};

var fallbacks = [
    'Hmm, I don\'t have that answer yet! 🤔<br><br>Try asking about hashing, encryption, RSA, passwords, or our tools.<br><br><em>Or use the topic chips above!</em>',
    'That\'s outside my knowledge base! 🤖<br><br>I specialize in cryptography. Try browsing by category above!'
];

var premiumFallbacks = [
    '👑 Even VIP intelligence has limits! Try asking about our elite crypto tools like Batch Integrity Checker or Security Report Generator.<br><br><em>Your questions receive priority processing.</em>',
    '⚡ Query not in the gold vault yet. Try asking about advanced encryption, premium tools, RSA Lab, ECC Suite, or exclusive features.'
];


/* ═══════════════════════════════════════════════════════
   PREMIUM STATUS HELPER
═══════════════════════════════════════════════════════ */

function isPremiumUser() {
    return !!localStorage.getItem('cryptokit_premium_tier');
}

function getPremiumTier() {
    return localStorage.getItem('cryptokit_premium_tier') || null;
}


/* ═══════════════════════════════════════════════════════
   PREMIUM TOOL MAP — For quick navigation via chat
   ★ UPDATED: File paths now match the HTML links exactly ★
═══════════════════════════════════════════════════════ */

var PREMIUM_TOOL_MAP = {
    'scanner':          { id: 'ptool-scanner',         name: 'Crypto Security Scanner',       file: 'premium/Crypto-Security-Scanner.html' },
    'rsa-lab':          { id: 'ptool-rsa-lab',         name: 'Advanced RSA Lab',              file: 'premium/advance-rsa-lab.html' },
    'ecc-suite':        { id: 'ptool-ecc-suite',       name: 'Advanced ECC Suite',            file: 'premium/advance-ecc-suite.html' },
    'batch-integrity':  { id: 'ptool-batch-integrity', name: 'Batch File Integrity Checker',  file: 'premium/batch-file-integrity.html' },
    'security-report':  { id: 'ptool-security-report', name: 'Security Report Generator',     file: 'premium/security-report-generator.html' },
    'attack-sim':       { id: 'qtool-attack-sim',      name: 'Cryptographic Attack Simulator',file: 'premium/attack-simulator.html' }
};

function openPremiumTool(key) {
    var tool = PREMIUM_TOOL_MAP[key];
    if (!tool) return;
    if (isPremiumUser()) {
        window.location.href = tool.file;
    } else {
        window.location.href = 'pricing.html';
    }
}
window.openPremiumTool = openPremiumTool;


/* ═══════════════════════════════════════════════════════
   MATCHING ENGINE
═══════════════════════════════════════════════════════ */

function findMatch(q) {
    if (typeof KB === 'undefined' || !KB || !KB.length) return null;
    
    var query = q.toLowerCase().replace(/[?!.,]/g, '').trim();
    var words = query.split(/\s+/);
    var best  = null;
    var bestScore = 0;

    for (var i = 0; i < KB.length; i++) {
        var entry = KB[i];
        var score = 0;

        for (var j = 0; j < entry.kw.length; j++) {
            var kw = entry.kw[j];
            if (query.indexOf(kw) !== -1) {
                score += kw.split(' ').length * 3;
            }
            for (var k = 0; k < words.length; k++) {
                if (kw.indexOf(words[k]) !== -1 && words[k].length > 3) {
                    score += 1;
                }
            }
        }

        if (score > bestScore) {
            bestScore = score;
            best = entry;
        }
    }

    return bestScore >= 2 ? best : null;
}


/* ═══════════════════════════════════════════════════════
   PREMIUM TOOL QUICK MATCH — Detects premium tool queries
   ★ IMPROVED: Better keyword detection for all 5 pro tools ★
═══════════════════════════════════════════════════════ */

function findPremiumToolMatch(q) {
    var query = q.toLowerCase();
    
    // Batch File Integrity Checker
    if ((query.indexOf('batch') !== -1 && (query.indexOf('integrity') !== -1 || query.indexOf('file') !== -1 || query.indexOf('hash') !== -1))
        || query.indexOf('bulk hash') !== -1 || query.indexOf('multiple file') !== -1
        || query.indexOf('parallel hash') !== -1 || query.indexOf('bulk scan') !== -1) {
        return {
            key: 'batch-integrity',
            ans: '<strong>📚 Batch File Integrity Checker</strong> <span style="color:#fbbf24;">👑 Pro</span><br><br>Verify integrity of multiple files simultaneously with:<br>• <strong>Parallel hashing</strong> — process many files at once<br>• <strong>Bulk comparison</strong> — check hashes against manifest<br>• <strong>Diff reports</strong> — see exactly what changed<br><br><em>Perfect for auditing entire directories or software releases.</em>'
        };
    }
    
    // Security Report Generator
    if ((query.indexOf('security report') !== -1) 
        || (query.indexOf('report') !== -1 && (query.indexOf('generator') !== -1 || query.indexOf('pdf') !== -1 || query.indexOf('audit') !== -1))
        || query.indexOf('risk score') !== -1 || query.indexOf('audit report') !== -1
        || query.indexOf('compliance report') !== -1) {
        return {
            key: 'security-report',
            ans: '<strong>📄 Security Report Generator</strong> <span style="color:#fbbf24;">👑 Pro</span><br><br>Generate comprehensive PDF security audit reports with:<br>• <strong>Vulnerability findings</strong> — detailed threat catalog<br>• <strong>Risk scoring</strong> — CVSS-style risk metrics<br>• <strong>Remediation guidelines</strong> — actionable fixes<br>• <strong>Audit trail</strong> — full change history<br><br><em>Enterprise-ready reports for compliance.</em>'
        };
    }
    
    // Crypto Security Scanner
    if ((query.indexOf('scanner') !== -1 || query.indexOf('vuln') !== -1 || query.indexOf('owasp') !== -1)
        && query.indexOf('crypto') !== -1) {
        return {
            key: 'scanner',
            ans: '<strong>🛡️ Crypto Security Scanner</strong> <span style="color:#fbbf24;">👑 Pro</span><br><br>Deep-scan cryptographic implementations for:<br>• <strong>Vulnerabilities</strong> — known CVEs<br>• <strong>Weak ciphers</strong> — MD5, DES, RC4, etc.<br>• <strong>Deprecated protocols</strong> — TLS 1.0/1.1<br>• <strong>OWASP audits</strong> — industry compliance'
        };
    }
    
    // Advanced RSA Lab
    if (query.indexOf('rsa lab') !== -1 || query.indexOf('advanced rsa') !== -1
        || (query.indexOf('rsa') !== -1 && (query.indexOf('prime') !== -1 || query.indexOf('factor') !== -1 || query.indexOf('crt') !== -1))) {
        return {
            key: 'rsa-lab',
            ans: '<strong>🔬 Advanced RSA Lab</strong> <span style="color:#fbbf24;">👑 Pro</span><br><br>Inspect RSA keys at the deepest level:<br>• <strong>Raw prime factors</strong> (p, q, n)<br>• <strong>CRT parameters</strong> speed-up analysis<br>• <strong>OAEP / PSS</strong> padding inspector<br>• <strong>Pollard\'s Rho</strong> factorization simulator'
        };
    }
    
    // Advanced ECC Suite
    if (query.indexOf('ecc') !== -1 || query.indexOf('elliptic') !== -1
        || query.indexOf('ecdh') !== -1 || query.indexOf('ecdsa') !== -1) {
        return {
            key: 'ecc-suite',
            ans: '<strong>📈 Advanced ECC Suite</strong> <span style="color:#fbbf24;">👑 Pro</span><br><br>Elliptic Curve Cryptography toolkit:<br>• <strong>ECDH handshakes</strong> — live key exchange<br>• <strong>ECDSA signatures</strong> — component inspection<br>• <strong>Weierstrass plots</strong> — visualize curves<br>• <strong>Curve comparison</strong> — P-256, P-384, P-521'
        };
    }
    
    // Attack Simulator (Quantum)
    if (query.indexOf('attack') !== -1 && (query.indexOf('sim') !== -1 || query.indexOf('padding') !== -1 || query.indexOf('brute') !== -1)) {
        return {
            key: 'attack-sim',
            ans: '<strong>🎯 Cryptographic Attack Simulator</strong> <span style="color:#a78bfa;">🌌 Quantum</span><br><br>Simulate real-world attacks on custom payloads:<br>• <strong>Padding Oracle</strong> attacks<br>• <strong>Brute Force</strong> simulations<br>• <strong>Length Extension</strong> exploits<br>• <strong>Red Team</strong> testing environment'
        };
    }
    
    return null;
}


/* ═══════════════════════════════════════════════════════
   CHAT STATE & FUNCTIONS
═══════════════════════════════════════════════════════ */

var chatOpen     = false;
var msgCount     = 0;
var currentTheme = 'normal';


/* ── Toggle Chat Window ── */
function toggleChat() {
    chatOpen = !chatOpen;
    var w = document.getElementById('aiChatWindow');
    if (chatOpen) {
        w.classList.add('open');
        if (msgCount === 0) showWelcome();
    } else {
        w.classList.remove('open');
    }
}


/* ── Welcome Message ── */
function showWelcome() {
    var h   = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();
    
    var msg;
    var suggestions;
    
    if (h) {
        if (isPremium) {
            msg = '> ★ ELITE VIP TERMINAL ONLINE ★<br>> GOLD PROTOCOLS LOADED<br>> QUANTUM CHANNEL ACTIVE<br>> KB LOADED [' + (typeof KB !== 'undefined' ? KB.length : 0) + ' entries]<br><br>I am <strong>GHOST VIP</strong> 👑<br>Your elite crypto assistant.<br><em>Type /help for premium commands.</em>';
            suggestions = ['Batch Integrity', 'Security Report', 'RSA Lab', '/vip'];
        } else {
            msg = '> GHOST TERMINAL ONLINE<br>> KB LOADED [' + (typeof KB !== 'undefined' ? KB.length : 0) + ' entries]<br>> SECURE CHANNEL ACTIVE<br><br>I am <strong>GHOST</strong> 👾<br>Ask about encryption, hashing, or tools.<br><em>Type /help for commands.</em>';
            suggestions = ['What is SHA-256?', 'Is MD5 safe?', 'Show all tools', 'What is RSA?'];
        }
    } else {
        if (isPremium) {
            msg = '👑 Welcome, <strong>Premium Member</strong>!<br><br>I\'m <strong>CryptoBot Pro</strong><br><br>✨ Priority responses<br>🔐 Advanced tool access<br>📊 Batch integrity + reports<br>🎯 Personalized guidance<br><br>How may I assist you today?';
            suggestions = ['Batch Integrity Checker', 'Security Report Generator', 'RSA Lab', 'ECC Suite'];
        } else {
            msg = '👋 Hi! I\'m <strong>CryptoBot</strong>!<br><br>🔧 Find the <strong>right tool</strong><br>📚 <strong>Explain</strong> crypto concepts<br>🛡️ <strong>Security advice</strong><br><br>What can I help with?';
            suggestions = ['What is SHA-256?', 'Is MD5 safe?', 'Show all tools', 'What is RSA?'];
        }
    }

    addBot(msg, suggestions);
    msgCount++;
}


/* ── Add Bot Message ── */
function addBot(html, sug, tid, tn) {
    sug = sug || [];
    tid = tid || null;
    tn  = tn  || null;

    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg';

    var avatar = document.createElement('div');
    avatar.className   = 'ai-msg-avatar bot';
    if (isPremium) avatar.classList.add('premium');
    avatar.textContent = h ? (isPremium ? '👑' : '👾') : (isPremium ? '👑' : '🤖');

    var content = document.createElement('div');
    content.className  = 'ai-msg-content bot';
    if (isPremium) content.classList.add('premium');

    var textDiv = document.createElement('div');
    textDiv.innerHTML  = html;
    content.appendChild(textDiv);

    // Tool Navigation Button
    if (tid) {
        var toolBtn = document.createElement('button');
        toolBtn.className = 'ai-tool-btn';
        if (isPremium) toolBtn.classList.add('premium');
        
        var btnIcon = isPremium ? '<i class="fas fa-crown"></i>' : '<i class="fas fa-arrow-right"></i>';
        var btnPrefix = h ? (isPremium ? '> [VIP] OPEN: ' : '> OPEN: ') : (isPremium ? 'Open [VIP] ' : 'Open ');
        toolBtn.innerHTML = btnIcon + ' ' + btnPrefix + tn;
        
        toolBtn.onclick = (function(toolId, isHacker, premiumStatus) {
            return function() {
                // Check if this is a premium tool
                var premiumToolKey = null;
                for (var key in PREMIUM_TOOL_MAP) {
                    if (PREMIUM_TOOL_MAP[key].id === toolId) {
                        premiumToolKey = key;
                        break;
                    }
                }
                
                // If premium tool and user is premium, navigate directly to the tool file
                if (premiumToolKey && premiumStatus) {
                    window.location.href = PREMIUM_TOOL_MAP[premiumToolKey].file;
                    return;
                }
                
                // If premium tool but user is NOT premium, redirect to pricing
                if (premiumToolKey && !premiumStatus) {
                    window.location.href = 'pricing.html';
                    return;
                }
                
                // Standard tool — scroll to element on page
                var el = document.getElementById(toolId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.transition = 'box-shadow 0.4s';
                    
                    if (premiumStatus) {
                        el.style.boxShadow = isHacker
                            ? '0 0 60px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.4), inset 0 0 30px rgba(255, 215, 0, 0.1)'
                            : '0 0 50px rgba(245, 166, 35, 0.6), 0 0 80px rgba(245, 166, 35, 0.3)';
                    } else {
                        el.style.boxShadow = isHacker
                            ? '0 0 40px rgba(0, 255, 65, 0.5)'
                            : '0 0 40px rgba(108, 99, 255, 0.4)';
                    }
                        
                    setTimeout(function() { el.style.boxShadow = ''; }, 2800);
                }
            };
        })(tid, h, isPremium);
        content.appendChild(toolBtn);
    }

    // Suggestion Buttons
    if (sug.length > 0) {
        var sugDiv = document.createElement('div');
        sugDiv.className = 'ai-quick-suggestions';
        for (var i = 0; i < sug.length; i++) {
            var sugBtn = document.createElement('button');
            sugBtn.className   = 'ai-suggestion-btn';
            if (isPremium) sugBtn.classList.add('premium');
            sugBtn.textContent = h ? '> ' + sug[i] : sug[i];
            sugBtn.onclick = (function(s) {
                return function() { sendQuery(s); };
            })(sug[i]);
            sugDiv.appendChild(sugBtn);
        }
        content.appendChild(sugDiv);
    }

    // Feedback Row
    var fb = document.createElement('div');
    fb.className = 'ai-feedback';
    var thanksColor = isPremium ? '#FFD700' : 'var(--success)';
    fb.innerHTML =
        '<span>Helpful?</span>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:' + thanksColor + '>' + (isPremium ? '👑 Thanks, VIP!' : '✅ Thanks!') + '</span>\'">👍</button>' +
        '<button class="ai-fb-btn" onclick="this.parentElement.innerHTML=\'<span style=color:var(--accent)>😔 Try rephrasing.</span>\'">👎</button>';
    content.appendChild(fb);

    wrapper.appendChild(avatar);
    wrapper.appendChild(content);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


/* ── Add User Message ── */
function addUser(text) {
    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-msg user';

    var avatar = document.createElement('div');
    avatar.className   = 'ai-msg-avatar user';
    if (isPremium) avatar.classList.add('premium');
    avatar.textContent = h ? (isPremium ? '⚡' : '💀') : (isPremium ? '⭐' : '👤');

    var content = document.createElement('div');
    content.className  = 'ai-msg-content user';
    if (isPremium) content.classList.add('premium');
    content.textContent = text;

    wrapper.appendChild(content);
    wrapper.appendChild(avatar);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
}


/* ── Typing Indicator ── */
function showTyping() {
    var msgs = document.getElementById('aiMessages');
    var h    = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();

    var d  = document.createElement('div');
    d.className = 'ai-typing';
    d.id        = 'typingInd';

    var av = document.createElement('div');
    av.className   = 'ai-msg-avatar bot';
    if (isPremium) av.classList.add('premium');
    av.textContent = h ? (isPremium ? '👑' : '👾') : (isPremium ? '👑' : '🤖');

    var dots = document.createElement('div');
    dots.className = 'ai-typing-dots';
    if (isPremium) dots.classList.add('premium');
    dots.innerHTML =
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>' +
        '<div class="ai-typing-dot"></div>';

    d.appendChild(av);
    d.appendChild(dots);
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
    var t = document.getElementById('typingInd');
    if (t) t.remove();
}


/* ── Send Message ── */
function sendMessage() {
    var input = document.getElementById('aiInput');
    var q     = input.value.trim();
    if (!q) return;
    input.value        = '';
    input.style.height = 'auto';
    sendQuery(q);
}


/* ── Process Query ── */
function sendQuery(q) {
    var h = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();

    if (h && q.charAt(0) === '/') {
        handleCmd(q);
        return;
    }

    addUser(q);
    showTyping();
    msgCount++;

    // Premium users get faster responses
    var delay = isPremium ? (300 + Math.random() * 200) : (600 + Math.random() * 400);

    setTimeout(function() {
        hideTyping();
        
        // FIRST: Check for premium tool matches (they have highest priority)
        var premiumMatch = findPremiumToolMatch(q);
        if (premiumMatch) {
            var tool = PREMIUM_TOOL_MAP[premiumMatch.key];
            var tid = tool ? tool.id : null;
            var tn  = tool ? tool.name : null;
            var suggestions = isPremium 
                ? ['Batch Integrity', 'Security Report', 'RSA Lab', 'ECC Suite']
                : ['View pricing', 'Show all tools', 'Upgrade now'];
            addBot(premiumMatch.ans, suggestions, tid, tn);
            return;
        }
        
        // SECOND: Standard KB match
        var m = findMatch(q);
        if (m) {
            addBot(m.ans, m.sg || [], m.tid || null, m.tn || null);
        } else {
            var fallbackList = isPremium ? premiumFallbacks : fallbacks;
            var defaultSug = isPremium 
                ? ['Batch Integrity', 'Security Report', 'RSA Lab']
                : ['Show all tools', 'Learn crypto', 'Security advice'];
            addBot(
                fallbackList[Math.floor(Math.random() * fallbackList.length)],
                defaultSug
            );
        }
    }, delay);
}


/* ── Hacker Slash Commands ── */
function handleCmd(cmd) {
    addUser(cmd);
    showTyping();
    var isPremium = isPremiumUser();

    setTimeout(function() {
        hideTyping();
        var c = cmd.toLowerCase().trim();

        if      (c === '/help')    { 
            var helpText = isPremium 
                ? '> ★ VIP COMMANDS ★:<br>/tools /hash /rsa /encrypt /file /pass /sign<br>/scanner /rsalab /ecc /batch /report /attack<br>/vip /premium /elite /clear /about<br><br>Or just type naturally.'
                : '> COMMANDS:<br>/tools /hash /rsa /encrypt /file /pass /sign /clear /about<br><br>Or just type naturally.';
            addBot(helpText, isPremium ? ['/batch', '/report', '/rsalab'] : ['/tools', '/hash', '/rsa']); 
        }
        else if (c === '/tools')   { askCategory('tools'); }
        else if (c === '/hash')    { addBot('> LAUNCHING: Hash Generator...',       [], 'tool-hash',      'Hash Generator'); }
        else if (c === '/rsa')     { addBot('> LAUNCHING: RSA Generator...',        [], 'tool-rsa',       'RSA Key Generator'); }
        else if (c === '/encrypt') { addBot('> LAUNCHING: Encrypt Tool...',         [], 'tool-encrypt',   'Text Encrypt/Decrypt'); }
        else if (c === '/file')    { addBot('> LAUNCHING: File Integrity...',       [], 'tool-integrity', 'File Integrity Checker'); }
        else if (c === '/pass')    { addBot('> LAUNCHING: Password Tools...',       [], 'tool-password',  'Password Tools'); }
        else if (c === '/sign')    { addBot('> LAUNCHING: Digital Signature...',    [], 'tool-signature', 'Digital Signature'); }
        
        /* ── PREMIUM SLASH COMMANDS ── */
        else if (c === '/scanner') {
            if (isPremium) {
                addBot('> ★ LAUNCHING: Crypto Security Scanner...<br>> REDIRECTING TO PREMIUM VAULT...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP.scanner.file; }, 800);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> TOOL LOCKED — PRO TIER REQUIRED<br>> Type /premium to upgrade', ['/premium', '/vip']);
            }
        }
        else if (c === '/rsalab') {
            if (isPremium) {
                addBot('> ★ LAUNCHING: Advanced RSA Lab...<br>> REDIRECTING TO PREMIUM VAULT...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP['rsa-lab'].file; }, 800);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> TOOL LOCKED — PRO TIER REQUIRED<br>> Type /premium to upgrade', ['/premium', '/vip']);
            }
        }
        else if (c === '/ecc') {
            if (isPremium) {
                addBot('> ★ LAUNCHING: Advanced ECC Suite...<br>> REDIRECTING TO PREMIUM VAULT...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP['ecc-suite'].file; }, 800);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> TOOL LOCKED — PRO TIER REQUIRED<br>> Type /premium to upgrade', ['/premium', '/vip']);
            }
        }
        else if (c === '/batch') {
            if (isPremium) {
                addBot('> ★ LAUNCHING: Batch File Integrity Checker...<br>> INITIALIZING PARALLEL HASH ENGINE...<br>> REDIRECTING TO PREMIUM VAULT...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP['batch-integrity'].file; }, 800);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> BATCH INTEGRITY LOCKED — PRO TIER REQUIRED<br>> Type /premium to upgrade', ['/premium', '/vip']);
            }
        }
        else if (c === '/report') {
            if (isPremium) {
                addBot('> ★ LAUNCHING: Security Report Generator...<br>> INITIALIZING PDF ENGINE...<br>> REDIRECTING TO PREMIUM VAULT...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP['security-report'].file; }, 800);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> REPORT GENERATOR LOCKED — PRO TIER REQUIRED<br>> Type /premium to upgrade', ['/premium', '/vip']);
            }
        }
        else if (c === '/attack') {
            if (isPremium && getPremiumTier() === 'enterprise') {
                addBot('> 🌌 LAUNCHING: Cryptographic Attack Simulator...<br>> QUANTUM PROTOCOLS ENGAGED...', []);
                setTimeout(function() { window.location.href = PREMIUM_TOOL_MAP['attack-sim'].file; }, 800);
            } else if (isPremium) {
                addBot('> ⛔ ACCESS DENIED<br>> ATTACK SIMULATOR LOCKED — QUANTUM TIER REQUIRED<br>> Upgrade from Pro to Quantum', ['/vip']);
            } else {
                addBot('> ⛔ ACCESS DENIED<br>> ATTACK SIMULATOR LOCKED — QUANTUM TIER REQUIRED<br>> Type /premium to upgrade', ['/premium']);
            }
        }
        
        else if (c === '/vip' || c === '/premium' || c === '/elite') {
            if (isPremium) {
                var tier = (getPremiumTier() || 'PRO').toUpperCase();
                addBot('> ★ VIP STATUS: ACTIVE ★<br>> TIER: ' + tier + '<br>> GOLD PROTOCOLS: ENABLED<br>> PRIORITY QUEUE: BYPASSED<br><br>Available premium tools:<br>• /scanner — Crypto Security Scanner<br>• /rsalab — Advanced RSA Lab<br>• /ecc — Advanced ECC Suite<br>• /batch — Batch File Integrity<br>• /report — Security Report Gen<br>' + (tier === 'ENTERPRISE' ? '• /attack — Attack Simulator 🌌' : '') + '<br><br>You have full access, Elite.', ['/batch', '/report', '/scanner']);
            } else {
                askCategory('premium');
            }
        }
        else if (c === '/clear')   {
            document.getElementById('aiMessages').innerHTML = '';
            msgCount = 0;
            showWelcome();
        }
        else if (c === '/about')   { sendQuery('about cryptokit'); }
        else                       { addBot('> UNKNOWN: ' + cmd + '<br>> TYPE /help', ['/help']); }
    }, 400);
}


/* ── Browse Category ── */
function askCategory(cat) {
    var r = catResp[cat];
    if (!r) return;
    addUser('Browse: ' + cat);
    showTyping();
    setTimeout(function() {
        hideTyping();
        addBot(r.t, r.s);
    }, 500);
}


/* ── Clear Chat ── */
function clearChat() {
    document.getElementById('aiMessages').innerHTML = '';
    msgCount = 0;
    showWelcome();
}


/* ══════════════════════════════════════════════════════
   ── Update AI Theme ──
   Called every time mode switches OR premium status changes
══════════════════════════════════════════════════════ */
function updateAiTheme(isH) {
    var isPremium = isPremiumUser();

    /* ── Header elements ── */
    var fabIcon  = document.getElementById('fabIcon');
    var aiAvatar = document.getElementById('aiAvatar');
    var aiName   = document.getElementById('aiName');
    var aiStatus = document.getElementById('aiStatusText');
    var aiInput  = document.querySelector('.ai-input');
    var aiFab    = document.getElementById('aiFab');
    var aiWindow = document.getElementById('aiChatWindow');

    /* ── Apply icon / name / status / placeholder ── */
    if (fabIcon)  fabIcon.textContent  = isH ? (isPremium ? '👑' : '👾') : (isPremium ? '👑' : '🤖');
    if (aiAvatar) aiAvatar.textContent = isH ? (isPremium ? '👑' : '👾') : (isPremium ? '👑' : '🤖');
    if (aiStatus) aiStatus.textContent = isH ? (isPremium ? '★ ELITE · SECURE ★' : 'ONLINE · SECURE') : (isPremium ? '👑 PREMIUM · READY' : 'Online · Ready');
    if (aiInput)  aiInput.placeholder  = isH
        ? (isPremium ? '> VIP QUERY OR /help...' : '> TYPE QUERY OR /help...')
        : (isPremium ? 'Ask CryptoBot Pro anything...' : 'Ask me anything about cryptography...');

    /* ── FIX: Force name update with reflow trick ── */
    if (aiName) {
        aiName.textContent   = '';          
        aiName.offsetHeight;                
        aiName.textContent   = isH ? (isPremium ? 'GHOST VIP 👑' : 'GHOST') : (isPremium ? 'CryptoBot Pro' : 'CryptoBot'); 
    }

    /* ── Apply Premium classes to FAB and Chat Window ── */
    if (aiFab) {
        if (isPremium) aiFab.classList.add('premium');
        else aiFab.classList.remove('premium');
    }
    
    if (aiWindow) {
        if (isPremium) aiWindow.classList.add('premium');
        else aiWindow.classList.remove('premium');
    }

    /* ── Update all existing bot avatars already in chat ── */
    var botAvatars = document.querySelectorAll('.ai-msg-avatar.bot');
    for (var i = 0; i < botAvatars.length; i++) {
        botAvatars[i].textContent = isH ? (isPremium ? '👑' : '👾') : (isPremium ? '👑' : '🤖');
        if (isPremium) botAvatars[i].classList.add('premium');
        else botAvatars[i].classList.remove('premium');
    }

    /* ── Update all existing user avatars already in chat ── */
    var userAvatars = document.querySelectorAll('.ai-msg-avatar.user');
    for (var i = 0; i < userAvatars.length; i++) {
        userAvatars[i].textContent = isH ? (isPremium ? '⚡' : '💀') : (isPremium ? '⭐' : '👤');
        if (isPremium) userAvatars[i].classList.add('premium');
        else userAvatars[i].classList.remove('premium');
    }

    /* ── Update suggestion button prefixes ── */
    var sugBtns = document.querySelectorAll('.ai-suggestion-btn');
    for (var i = 0; i < sugBtns.length; i++) {
        var txt = sugBtns[i].textContent;
        if (isH && txt.substring(0, 2) !== '> ') {
            sugBtns[i].textContent = '> ' + txt;
        } else if (!isH && txt.substring(0, 2) === '> ') {
            sugBtns[i].textContent = txt.substring(2);
        }
        if (isPremium) sugBtns[i].classList.add('premium');
        else sugBtns[i].classList.remove('premium');
    }
}


/* ══════════════════════════════════════════════════════
   ── Refresh UI when Premium Status Changes ──
══════════════════════════════════════════════════════ */
function refreshPremiumUI() {
    var isH = (currentTheme === 'hacker');
    var isPremium = isPremiumUser();
    
    updateAiTheme(isH);
    
    if (isPremium) {
        document.body.classList.add('premium-user');
    } else {
        document.body.classList.remove('premium-user');
    }
    
    if (chatOpen) {
        var msgs = document.getElementById('aiMessages');
        if (msgs) msgs.innerHTML = '';
        msgCount = 0;
        showWelcome();
    }
    
    if (isH) {
        mFrameCount = 0;
    }
}

window.refreshPremiumUI = refreshPremiumUI;


/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS — Normal Mode (with Premium Gold particles)
═══════════════════════════════════════════════════════ */

var pCanvas = document.getElementById('particle-canvas');
var pCtx    = pCanvas ? pCanvas.getContext('2d') : null;

function resizePC() {
    if (!pCanvas) return;
    pCanvas.width  = window.innerWidth;
    pCanvas.height = window.innerHeight;
}
if (pCanvas) resizePC();

var particles = [];
var HEX_CHARS = '0123456789ABCDEF';

var standardParticleColors = ['#6C63FF', '#00B4D8'];
var premiumParticleColors = ['#F5A623', '#F76B1C', '#D48000', '#FFD700'];

function createParticle() {
    if (!pCanvas) return {};
    var isPremium = isPremiumUser();
    var colorPool = isPremium ? premiumParticleColors : standardParticleColors;
    
    return {
        x:       Math.random() * pCanvas.width,
        y:       Math.random() * pCanvas.height,
        size:    Math.random() * 10 + 8,
        speed:   Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        char:    HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
        color:   colorPool[Math.floor(Math.random() * colorPool.length)]
    };
}

if (pCanvas) {
    for (var i = 0; i < 60; i++) { particles.push(createParticle()); }
}

var pAnimId;
var pFrameCount = 0;
var pIsPremium = false;

function animateParticles() {
    if (currentTheme !== 'normal' || !pCanvas) return;
    
    if (pFrameCount++ % 30 === 0) {
        var newPremium = isPremiumUser();
        if (newPremium !== pIsPremium) {
            pIsPremium = newPremium;
            particles = [];
            for (var i = 0; i < 60; i++) { particles.push(createParticle()); }
        }
    }
    
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.speed;

        if (p.y > pCanvas.height) {
            particles[i]   = createParticle();
            particles[i].y = 0;
        }

        if (Math.random() < 0.05) {
            p.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
        }

        pCtx.globalAlpha = p.opacity;
        pCtx.fillStyle   = p.color;
        pCtx.font        = p.size + 'px JetBrains Mono';
        pCtx.fillText(p.char, p.x, p.y);
    }

    pAnimId = requestAnimationFrame(animateParticles);
}

if (pCanvas) animateParticles();


/* ═══════════════════════════════════════════════════════
   MATRIX RAIN — Hacker Mode (With Premium Golden Matrix)
═══════════════════════════════════════════════════════ */

var mCanvas = document.getElementById('matrix-canvas');
var mCtx    = mCanvas ? mCanvas.getContext('2d') : null;

function resizeMC() {
    if (!mCanvas) return;
    mCanvas.width  = window.innerWidth;
    mCanvas.height = window.innerHeight;
}
if (mCanvas) resizeMC();

var matrixChars  = 'アイウエオカキクケコサシスセソ0123456789ABCDEF{}[]<>|/*&^%$#@!';
var fontSize     = 14;
var columns      = mCanvas ? Math.floor(mCanvas.width / fontSize) : 0;
var drops        = [];
for (var i = 0; i < columns; i++) drops[i] = 1;

var standardMatrixColors = [
    '#00FF41','#00FF41','#00FF41','#00FF41','#00FF41',
    '#39FF14','#39FF14','#CCFF00','#00E5FF'
];

var premiumMatrixColors = [
    '#FFD700', '#FFD700', '#FFD700', '#FFD700',
    '#FFED4E', '#FFED4E', '#FFA500', '#FFA500',
    '#B39700', '#FFFFFF'
];

var mAnimId;
var mFrameCount = 0;
var mIsPremium  = false;

function drawMatrix() {
    if (currentTheme !== 'hacker' || !mCanvas) return;

    if (mFrameCount++ % 30 === 0) {
        mIsPremium = isPremiumUser();
    }

    var activeColors = mIsPremium ? premiumMatrixColors : standardMatrixColors;

    mCtx.fillStyle = mIsPremium ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.05)';
    mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
    mCtx.font = fontSize + 'px Share Tech Mono';

    for (var i = 0; i < drops.length; i++) {
        var ch = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        mCtx.fillStyle = (drops[i] * fontSize < 50)
            ? '#FFFFFF'
            : activeColors[Math.floor(Math.random() * activeColors.length)];
            
        mCtx.fillText(ch, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    mAnimId = requestAnimationFrame(drawMatrix);
}

window.addEventListener('resize', function() {
    resizePC();
    resizeMC();
    if (mCanvas) {
        columns = Math.floor(mCanvas.width / fontSize);
        drops   = [];
        for (var i = 0; i < columns; i++) drops[i] = 1;
    }
});


/* ═══════════════════════════════════════════════════════
   TERMINAL SYSTEM — Clean Typewriter Animation
═══════════════════════════════════════════════════════ */

var TERMINALS = {
    mac: {
        title:  'cryptokit ~ zsh',
        prompt: '➜ ~',
        lines: [
            { type: 'cmd',     text: 'cryptokit hash --algo SHA-256 --input "Hello World"' },
            { type: 'output',  text: 'Algorithm  : SHA-256' },
            { type: 'output',  text: 'Input      : "Hello World"' },
            { type: 'hash',    text: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b...' },
            { type: 'success', text: '✅  Hash generated in 2ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit rsa --generate --bits 2048' },
            { type: 'info',    text: '⚙  Generating RSA-2048 key pair...' },
            { type: 'output',  text: 'Public  → -----BEGIN PUBLIC KEY-----' },
            { type: 'output',  text: 'Private → -----BEGIN PRIVATE KEY-----' },
            { type: 'success', text: '✅  Keys saved to ./keys/ in 180ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit batch-verify --dir ./releases --manifest sha256.txt' },
            { type: 'info',    text: '📚  Batch scanning 24 files with parallel hashing...' },
            { type: 'output',  text: 'Files verified : 24 / 24' },
            { type: 'output',  text: 'Mismatches     : 0' },
            { type: 'success', text: '✅  Batch integrity confirmed in 340ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit report --scan ./project --output audit.pdf' },
            { type: 'info',    text: '📄  Generating security audit report...' },
            { type: 'output',  text: 'Vulnerabilities : 3 low, 0 critical' },
            { type: 'output',  text: 'Risk Score      : 24 / 100' },
            { type: 'success', text: '✅  Report saved to ./audit.pdf' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit verify --file report.pdf --hash a3f5c8...' },
            { type: 'info',    text: '🔍  Computing SHA-256 of report.pdf...' },
            { type: 'output',  text: 'Expected : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'output',  text: 'Actual   : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'success', text: '✅  File integrity verified — no tampering detected!' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit encrypt --algo AES-256 --file secret.txt' },
            { type: 'info',    text: '🔒  Encrypting with AES-256-CBC...' },
            { type: 'output',  text: 'Output   → secret.txt.enc' },
            { type: 'success', text: '✅  Encryption complete in 5ms' },
            { type: 'blank' },
            { type: 'cursor' }
        ]
    },
    win: {
        title:  'C:\\Users\\CryptoKit> cmd.exe',
        prompt: 'C:\\CryptoKit>',
        lines: [
            { type: 'cmd',     text: 'cryptokit.exe hash /algo:SHA-256 /input:"Hello World"' },
            { type: 'output',  text: 'Algorithm  : SHA-256' },
            { type: 'output',  text: 'Input      : "Hello World"' },
            { type: 'hash',    text: 'A591A6D40BF420404A011733CFB7B190D62C65BF0BCDA32B...' },
            { type: 'success', text: '[OK]  Hash generated in 2ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe rsa /generate /bits:2048' },
            { type: 'info',    text: '[**]  Generating RSA-2048 key pair...' },
            { type: 'output',  text: 'Public  -> -----BEGIN PUBLIC KEY-----' },
            { type: 'output',  text: 'Private -> -----BEGIN PRIVATE KEY-----' },
            { type: 'success', text: '[OK]  Keys saved to .\\keys\\ in 180ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe batch-verify /dir:.\\releases /manifest:sha256.txt' },
            { type: 'info',    text: '[..]  Batch scanning 24 files with parallel hashing...' },
            { type: 'output',  text: 'Files verified : 24 / 24' },
            { type: 'output',  text: 'Mismatches     : 0' },
            { type: 'success', text: '[OK]  Batch integrity confirmed in 340ms' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe report /scan:.\\project /output:audit.pdf' },
            { type: 'info',    text: '[..]  Generating security audit report...' },
            { type: 'output',  text: 'Vulnerabilities : 3 low, 0 critical' },
            { type: 'output',  text: 'Risk Score      : 24 / 100' },
            { type: 'success', text: '[OK]  Report saved to .\\audit.pdf' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe verify /file:report.pdf /hash:a3f5c8...' },
            { type: 'info',    text: '[..]  Computing SHA-256 of report.pdf...' },
            { type: 'output',  text: 'Expected : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'output',  text: 'Actual   : a3f5c8d2e1b4a7f9c2d5e8a1b4c7d0e3' },
            { type: 'success', text: '[OK]  File integrity verified — no tampering detected!' },
            { type: 'blank' },
            { type: 'cmd',     text: 'cryptokit.exe encrypt /algo:AES-256 /file:secret.txt' },
            { type: 'info',    text: '[..]  Encrypting with AES-256-CBC...' },
            { type: 'output',  text: 'Output   -> secret.txt.enc' },
            { type: 'success', text: '[OK]  Encryption complete in 5ms' },
            { type: 'blank' },
            { type: 'cursor' }
        ]
    }
};

var CHAR_DELAYS = {
    cmd:     42,
    output:  18,
    hash:    12,
    success: 22,
    info:    22
};

var LINE_PAUSE = {
    cmd:    480,
    output:  70,
    hash:    70,
    success: 90,
    info:    90,
    blank:  200,
    restart: 2800
};

var termOS      = 'mac';
var termTimerId = null;
var termAlive   = false;


function buildTermLine(type, prompt) {
    var el = document.createElement('div');
    el.className = 'terminal-line tl-' + type;

    switch (type) {
        case 'cmd':
            el.innerHTML =
                '<span class="terminal-prompt">' + prompt + ' </span>' +
                '<span class="terminal-cmd"></span>';
            break;
        case 'output':
            el.innerHTML = '<span class="terminal-output"></span>';
            break;
        case 'hash':
            el.innerHTML = '<span class="terminal-hash"></span>';
            break;
        case 'success':
            el.innerHTML = '<span class="terminal-success"></span>';
            break;
        case 'info':
            el.innerHTML = '<span class="terminal-info"></span>';
            break;
        case 'blank':
            el.innerHTML = '&nbsp;';
            break;
        case 'cursor':
            el.innerHTML =
                '<span class="terminal-prompt">' + prompt + ' </span>' +
                '<span class="terminal-cursor-blink">█</span>';
            break;
    }
    return el;
}


function typeIntoSpan(span, text, charDelay, onDone) {
    var idx = 0;

    function nextChar() {
        if (!termAlive) return;
        if (idx < text.length) {
            span.textContent += text[idx++];
            var body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
            termTimerId = setTimeout(nextChar, charDelay);
        } else {
            onDone();
        }
    }

    nextChar();
}


function renderLine(lines, prompt, idx) {
    if (!termAlive) return;

    if (idx >= lines.length) {
        termTimerId = setTimeout(function() {
            var body = document.getElementById('terminalBody');
            if (body && termAlive) {
                body.innerHTML = '';
                renderLine(lines, prompt, 0);
            }
        }, LINE_PAUSE.restart);
        return;
    }

    var line = lines[idx];
    var body = document.getElementById('terminalBody');
    if (!body) return;

    if (line.type === 'blank') {
        body.appendChild(buildTermLine('blank', prompt));
        body.scrollTop = body.scrollHeight;
        termTimerId = setTimeout(function() {
            renderLine(lines, prompt, idx + 1);
        }, LINE_PAUSE.blank);
        return;
    }

    if (line.type === 'cursor') {
        body.appendChild(buildTermLine('cursor', prompt));
        body.scrollTop = body.scrollHeight;
        termTimerId = setTimeout(function() {
            if (body && termAlive) {
                body.innerHTML = '';
                renderLine(lines, prompt, 0);
            }
        }, LINE_PAUSE.restart);
        return;
    }

    var el   = buildTermLine(line.type, prompt);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;

    var spanClass = {
        cmd:     '.terminal-cmd',
        output:  '.terminal-output',
        hash:    '.terminal-hash',
        success: '.terminal-success',
        info:    '.terminal-info'
    }[line.type];

    var span      = el.querySelector(spanClass);
    var charDelay = CHAR_DELAYS[line.type] || 20;
    var postPause = LINE_PAUSE[line.type]  || 80;

    typeIntoSpan(span, line.text || '', charDelay, function() {
        termTimerId = setTimeout(function() {
            renderLine(lines, prompt, idx + 1);
        }, postPause);
    });
}


function startTerminal(os) {
    termAlive = false;
    clearTimeout(termTimerId);

    var data  = TERMINALS[os];
    var body  = document.getElementById('terminalBody');
    var title = document.getElementById('terminalTitle');

    if (!body || !title || !data) return;

    body.innerHTML    = '';
    title.textContent = data.title;

    termTimerId = setTimeout(function() {
        termAlive = true;
        renderLine(data.lines, data.prompt, 0);
    }, 120);
}


function switchTermOS(os) {
    termOS = os;

    var macBtn = document.getElementById('osMac');
    var winBtn = document.getElementById('osWin');
    if (macBtn) macBtn.classList.toggle('active', os === 'mac');
    if (winBtn) winBtn.classList.toggle('active', os === 'win');

    startTerminal(os);
}


/* ═══════════════════════════════════════════
   THEME TOGGLE — Boot Messages & Transition
═══════════════════════════════════════════ */

var hackerBoot = [
    '> INITIALIZING HACKER MODE...',
    '> LOADING MATRIX PROTOCOLS...',
    '> BYPASSING NORMAL INTERFACE...',
    '> ACTIVATING DARK TERMINAL...',
    '> ENCRYPTING VISUAL LAYER...',
    '> ACCESS GRANTED. WELCOME, HACKER. 🟢'
];

var premiumHackerBoot = [
    '> ★ INITIALIZING VIP ELITE MODE ★',
    '> LOADING QUANTUM GOLD PROTOCOLS...',
    '> BYPASSING ALL FIREWALLS...',
    '> ACTIVATING GOLDEN NEON TERMINAL...',
    '> UNLOCKING PREMIUM ENCRYPTION LAYERS...',
    '> ENGAGING ELITE VISUAL SIGNATURE...',
    '> ★ VIP ACCESS GRANTED. WELCOME, ELITE. 👑 ★'
];

var normalBoot = [
    '> SWITCHING TO NORMAL MODE...',
    '> RESTORING CLEAN INTERFACE...',
    '> DEACTIVATING MATRIX...',
    '> DONE. WELCOME BACK. ✓'
];

var premiumNormalBoot = [
    '> ★ SWITCHING TO PREMIUM NORMAL MODE ★',
    '> RESTORING LUXURY INTERFACE...',
    '> LOADING GOLD ACCENTS...',
    '> DONE. WELCOME, PREMIUM MEMBER. 👑'
];

function showTransition(msgs, callback) {
    var overlay = document.getElementById('themeOverlay');
    var textEl  = document.getElementById('transitionText');
    if (!overlay || !textEl) {
        callback();
        return;
    }
    overlay.classList.add('active');
    textEl.innerHTML = '';
    
    var isPremium = isPremiumUser();
    if (isPremium) {
        textEl.style.color = '#FFD700';
        textEl.style.textShadow = '0 0 20px #FFD700';
    } else {
        textEl.style.color = '';
        textEl.style.textShadow = '';
    }

    var idx = 0;

    function nextLine() {
        if (idx < msgs.length) {
            if (idx > 0) textEl.innerHTML += '<br>';
            textEl.innerHTML += msgs[idx];
            idx++;
            setTimeout(nextLine, 250);
        } else {
            setTimeout(function() {
                callback();
                setTimeout(function() {
                    overlay.classList.remove('active');
                }, 300);
            }, 400);
        }
    }

    nextLine();
}


/* ═══════════════════════════════════════════════════════
   MODE DROPDOWN SELECTOR
═══════════════════════════════════════════════════════ */

function toggleModeDropdown() {
    var dropdown = document.getElementById('modeDropdown');
    var arrow    = document.getElementById('modeArrow');
    if (dropdown) dropdown.classList.toggle('open');
    if (arrow)    arrow.classList.toggle('open');
}

document.addEventListener('click', function(e) {
    var selector = document.getElementById('modeSelector');
    if (selector && !selector.contains(e.target)) {
        var dd = document.getElementById('modeDropdown');
        var ar = document.getElementById('modeArrow');
        if (dd) dd.classList.remove('open');
        if (ar) ar.classList.remove('open');
    }
});

function mobileThemeSwitch() {
    selectMode(currentTheme === 'normal' ? 'hacker' : 'normal');
}


/* ══════════════════════════════════════════════════════
   MAIN MODE SELECTOR
══════════════════════════════════════════════════════ */
function selectMode(mode) {

    var dd = document.getElementById('modeDropdown');
    var ar = document.getElementById('modeArrow');
    if (dd) dd.classList.remove('open');
    if (ar) ar.classList.remove('open');

    if (mode === currentTheme) return;

    var isGoingHacker = (mode === 'hacker');
    var isPremium = isPremiumUser();
    
    var bootMsgs;
    if (isGoingHacker) {
        bootMsgs = isPremium ? premiumHackerBoot : hackerBoot;
    } else {
        bootMsgs = isPremium ? premiumNormalBoot : normalBoot;
    }

    showTransition(bootMsgs, function() {

        if (isGoingHacker) {
            currentTheme = 'hacker';
            document.documentElement.setAttribute('data-theme', 'hacker');
            localStorage.setItem('cryptokit-theme', 'hacker');

            cancelAnimationFrame(pAnimId);
            if (pCtx && pCanvas) pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

            if (mCtx && mCanvas) {
                mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
                columns = Math.floor(mCanvas.width / fontSize);
                drops   = [];
                for (var i = 0; i < columns; i++) drops[i] = 1;
            }
            mFrameCount = 0;
            drawMatrix();

            var mi = document.getElementById('modeIcon');
            var ml = document.getElementById('modeLabel');
            var cn = document.getElementById('checkNormal');
            var ch = document.getElementById('checkHacker');
            if (mi) mi.textContent   = isPremium ? '👑' : '💀';
            if (ml) ml.textContent   = isPremium ? 'Elite' : 'Hacker';
            if (cn) cn.style.display = 'none';
            if (ch) ch.style.display = 'inline';

        } else {
            currentTheme = 'normal';
            document.documentElement.setAttribute('data-theme', 'normal');
            localStorage.setItem('cryptokit-theme', 'normal');

            cancelAnimationFrame(mAnimId);
            if (mCtx && mCanvas) mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);

            pFrameCount = 0;
            animateParticles();

            var mi2 = document.getElementById('modeIcon');
            var ml2 = document.getElementById('modeLabel');
            var cn2 = document.getElementById('checkNormal');
            var ch2 = document.getElementById('checkHacker');
            if (mi2) mi2.textContent   = isPremium ? '⭐' : '☀️';
            if (ml2) ml2.textContent   = isPremium ? 'Premium' : 'Normal';
            if (cn2) cn2.style.display = 'inline';
            if (ch2) ch2.style.display = 'none';
        }

        updateAiTheme(isGoingHacker);
        
        if (isPremium) {
            document.body.classList.add('premium-user');
        } else {
            document.body.classList.remove('premium-user');
        }

        var msgs = document.getElementById('aiMessages');
        if (msgs) msgs.innerHTML = '';
        msgCount = 0;

        if (chatOpen) {
            showWelcome();
        }
    });
}


function toggleTheme() {
    selectMode(currentTheme === 'normal' ? 'hacker' : 'normal');
}


/* ═══════════════════════════════════════════════════════
   NAVBAR & MOBILE MENU
═══════════════════════════════════════════════════════ */

var navbar       = document.getElementById('navbar');
var scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        if (navbar) navbar.classList.add('scrolled');
        if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
});

function toggleMenu() {
    var mm = document.getElementById('mobileMenu');
    if (mm) mm.classList.toggle('open');
}


/* ═══════════════════════════════════════════════════════
   LIVE DEMO
═══════════════════════════════════════════════════════ */

var demoMode = 'hash';

function setDemoTab(btn, mode) {
    var tabs = document.querySelectorAll('.demo-tab');
    for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove('active'); }
    btn.classList.add('active');
    demoMode = mode;

    var sel = document.getElementById('demoAlgo');
    var inp = document.getElementById('demoInput');

    if (mode === 'hash') {
        if (sel) sel.style.display = 'block';
        if (inp) inp.placeholder   = 'Type text to hash...';
    } else if (mode === 'base64') {
        if (sel) sel.style.display = 'none';
        if (inp) inp.placeholder   = 'Type text to encode in Base64...';
    } else {
        if (sel) sel.style.display = 'none';
        if (inp) inp.placeholder   = 'Enter a password to check strength...';
    }

    var res = document.getElementById('demoResult');
    if (res) {
        res.innerHTML = '<span class="demo-result-placeholder">Your result will appear here...</span>';
    }
}

function sha256Hash(msg) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(msg)).then(function(buf) {
        return Array.from(new Uint8Array(buf)).map(function(b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    });
}

function sha512Hash(msg) {
    return crypto.subtle.digest('SHA-512', new TextEncoder().encode(msg)).then(function(buf) {
        return Array.from(new Uint8Array(buf)).map(function(b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    });
}

function fakeMd5(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h).toString(16).padStart(8, '0').repeat(4);
}

function getPassStrength(p) {
    var s = 0;
    if (p.length >= 8)           s++;
    if (p.length >= 12)          s++;
    if (p.length >= 16)          s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[a-z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p))  s++;

    if (s <= 2) return { label: '❌ Very Weak',  color: '#FF4444' };
    if (s <= 3) return { label: '⚠️ Weak',       color: '#FF8C00' };
    if (s <= 4) return { label: '🟡 Fair',        color: '#FFD700' };
    if (s <= 5) return { label: '🟢 Strong',      color: '#00CC66' };
    return            { label: '✅ Very Strong',  color: '#00FF88' };
}

function runDemo() {
    var inputEl = document.getElementById('demoInput');
    var res = document.getElementById('demoResult');
    if (!inputEl || !res) return;

    var val = inputEl.value;

    if (!val.trim()) {
        res.innerHTML = '<span class="demo-result-placeholder">Your result will appear here...</span>';
        return;
    }

    if (demoMode === 'hash') {
        var algoEl = document.getElementById('demoAlgo');
        var algo = algoEl ? algoEl.value : 'sha256';
        var hashPromise;

        if      (algo === 'sha256') hashPromise = sha256Hash(val);
        else if (algo === 'sha512') hashPromise = sha512Hash(val);
        else                        hashPromise = Promise.resolve(fakeMd5(val));

        hashPromise.then(function(hash) {
            var warn = (algo === 'md5')
                ? '<br><small style="color:#FF8C00">⚠️ MD5 is weak. Use SHA-256+ in production.</small>'
                : '';
            res.innerHTML =
                '<span class="demo-result-text">' + hash + warn + '</span>' +
                '<button class="btn-copy" onclick="copyResult(\'' + hash + '\')"><i class="fas fa-copy"></i> Copy</button>';
        });

    } else if (demoMode === 'base64') {
        var encoded = btoa(unescape(encodeURIComponent(val)));
        res.innerHTML =
            '<span class="demo-result-text">' + encoded + '</span>' +
            '<button class="btn-copy" onclick="copyResult(\'' + encoded + '\')"><i class="fas fa-copy"></i> Copy</button>';

    } else {
        var str = getPassStrength(val);
        res.innerHTML =
            '<span class="demo-result-text" style="color:' + str.color + ';font-size:16px;font-weight:600;font-family:inherit;">' + str.label + '</span>' +
            '<span style="font-size:12px;color:var(--text-muted);">' + val.length + ' chars</span>';
    }
}

function copyResult(text) {
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.querySelector('.btn-copy');
        if (btn) {
            var orig = btn.innerHTML;
            btn.innerHTML        = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = 'var(--success)';
            btn.style.color      = '#000';
            setTimeout(function() {
                btn.innerHTML        = orig;
                btn.style.background = '';
                btn.style.color      = '';
            }, 2000);
        }
    });
}


/* ═══════════════════════════════════════════════════════
   PREMIUM UPGRADE HANDLERS
═══════════════════════════════════════════════════════ */

function activatePremium(tier) {
    tier = (tier || 'gold').toLowerCase();
    localStorage.setItem('cryptokit_premium_tier', tier);
    localStorage.setItem('cryptokit_premium_since', new Date().toISOString());
    
    showPremiumUpgradeNotification(tier);
    refreshPremiumUI();
}

function deactivatePremium() {
    localStorage.removeItem('cryptokit_premium_tier');
    localStorage.removeItem('cryptokit_premium_since');
    refreshPremiumUI();
}

window.activatePremium = activatePremium;
window.deactivatePremium = deactivatePremium;
window.isPremiumUser = isPremiumUser;
window.getPremiumTier = getPremiumTier;


function showPremiumUpgradeNotification(tier) {
    var isSilver = (tier === 'silver' || tier === 'pro');
    
    var colorMain  = isSilver ? '#C0C0C0' : '#FFD700';
    var colorLight = isSilver ? '#FFFFFF' : '#FFED4E';
    var colorDark  = isSilver ? '#808080' : '#FFA500';
    var icon       = isSilver ? '🛡️' : '👑';
    var tierName   = isSilver ? 'ADVANCE (SILVER)' : 'QUANTUM (GOLD)';
    var rgbShadow  = isSilver ? '192,192,192' : '255,215,0';
    
    var overlay = document.createElement('div');
    overlay.style.cssText = 
        'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);' +
        'z-index:99999;display:flex;align-items:center;justify-content:center;' +
        'animation:fadeIn 0.4s ease;backdrop-filter:blur(10px);';
    
    var box = document.createElement('div');
    box.style.cssText = 
        'text-align:center;color:' + colorMain + ';font-family:"Space Grotesk",sans-serif;' +
        'padding:60px 40px;border-radius:24px;' +
        'background:linear-gradient(135deg,rgba(20,20,20,0.95),rgba(40,40,40,0.9));' +
        'border:2px solid ' + colorMain + ';' +
        'box-shadow:0 0 80px rgba(' + rgbShadow + ',0.5),inset 0 0 40px rgba(' + rgbShadow + ',0.1);' +
        'max-width:500px;animation:crownPop 0.6s cubic-bezier(0.34,1.56,0.64,1);';
    
    box.innerHTML = 
        '<div style="font-size:80px;margin-bottom:20px;animation:crown-float 2s ease-in-out infinite;">' + icon + '</div>' +
        '<h1 style="font-size:32px;font-weight:800;margin-bottom:12px;letter-spacing:2px;text-shadow:0 0 20px ' + colorMain + ';">WELCOME TO VIP</h1>' +
        '<p style="font-size:16px;opacity:0.9;margin-bottom:30px;color:#fff;">You now have <strong style="color:' + colorLight + ';">' + tierName + '</strong> access</p>' +
        '<button onclick="this.parentElement.parentElement.remove()" style="' +
        'padding:14px 40px;border:none;border-radius:12px;font-family:inherit;font-weight:700;' +
        'background:linear-gradient(135deg,' + colorLight + ',' + colorMain + ',' + colorDark + ');color:#000;cursor:pointer;' +
        'font-size:14px;letter-spacing:2px;text-transform:uppercase;' +
        'box-shadow:0 0 30px rgba(' + rgbShadow + ',0.5);">ENTER</button>';
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    if (!document.getElementById('premium-anim-styles')) {
        var style = document.createElement('style');
        style.id = 'premium-anim-styles';
        style.textContent = 
            '@keyframes fadeIn { from{opacity:0;} to{opacity:1;} }' +
            '@keyframes crownPop { from{transform:scale(0.5);opacity:0;} to{transform:scale(1);opacity:1;} }' +
            '@keyframes crown-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }';
        document.head.appendChild(style);
    }
    
    setTimeout(function() {
        if (overlay.parentElement) overlay.remove();
    }, 5000);
}


/* ═══════════════════════════════════════════════════════
   INTERSECTION OBSERVERS
═══════════════════════════════════════════════════════ */

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, { threshold: 0.1 });

var fadeEls = document.querySelectorAll('.fade-up');
for (var i = 0; i < fadeEls.length; i++) { observer.observe(fadeEls[i]); }

function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';

    if (target === 0) { el.textContent = '0' + suffix; return; }

    var current = 0;
    var step    = target / 60;
    var timer   = setInterval(function() {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
    }, 20);
}

var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var nums = entry.target.querySelectorAll('.stat-number');
            for (var i = 0; i < nums.length; i++) { animateCounter(nums[i]); }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statContainers = document.querySelectorAll('.stats-container');
for (var i = 0; i < statContainers.length; i++) { statsObserver.observe(statContainers[i]); }


/* ═══════════════════════════════════════════════════════
   FEEDBACK FORM
═══════════════════════════════════════════════════════ */

var currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    var stars = document.querySelectorAll('.rating-star');
    for (var i = 0; i < stars.length; i++) {
        if (i < rating) {
            stars[i].textContent = '★';
            stars[i].classList.add('active');
        } else {
            stars[i].textContent = '☆';
            stars[i].classList.remove('active');
        }
    }
}

function submitFeedback(event) {
    event.preventDefault();

    if (currentRating === 0) { alert('Please select a rating!'); return false; }

    var form   = document.getElementById('feedbackForm');
    if (!form) return false;

    var inputs = form.querySelectorAll('input, textarea');
    var name   = inputs[0] ? inputs[0].value : 'User';
    var isPremium = isPremiumUser();

    var wrapper = document.querySelector('.feedback-form-wrapper');
    if (!wrapper) return false;

    var celebrateIcon = isPremium ? '👑' : '🎉';
    var thankyouColor = isPremium ? '#FFD700' : 'var(--text-primary)';
    var thankyouTitle = isPremium ? 'Thank You, VIP ' + name + '!' : 'Thank You, ' + name + '!';
    
    wrapper.innerHTML =
        '<div style="text-align:center;padding:40px 20px;">' +
        '<div style="font-size:48px;margin-bottom:16px;">' + celebrateIcon + '</div>' +
        '<h3 style="font-family:Space Grotesk,sans-serif;font-size:22px;font-weight:700;color:' + thankyouColor + ';margin-bottom:8px;' + (isPremium ? 'text-shadow:0 0 15px #FFD700;' : '') + '">' + thankyouTitle + '</h3>' +
        '<p style="color:var(--text-secondary);font-size:15px;">Your ' + currentRating + '-star feedback has been received.<br>We truly appreciate your input!</p>' +
        '</div>';

    return false;
}


/* ═══════════════════════════════════════════════════════
   PAGE LOAD — Restore saved theme + boot terminal + Auth Checks
═══════════════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', function() {

    /* 1. Boot the terminal (mac by default) */
    setTimeout(function() { startTerminal('mac'); }, 600);

    /* 2. Apply premium class to body if user is premium */
    if (isPremiumUser()) {
        document.body.classList.add('premium-user');
    }

    /* 3. Restore saved theme (silently, no overlay) */
    var savedTheme = localStorage.getItem('cryptokit-theme');
    if (savedTheme && savedTheme !== currentTheme) {
        currentTheme = (savedTheme === 'hacker') ? 'normal' : 'hacker';
        selectMode(savedTheme);
    } else {
        updateAiTheme(currentTheme === 'hacker');
    }
    
    /* 4. Sync Auth Buttons on load */
    if (typeof window.updateAuthButtons === 'function') {
        window.updateAuthButtons();
    }
    
    /* 5. Listen for storage changes (multi-tab sync) */
    window.addEventListener('storage', function(e) {
        if (e.key === 'cryptokit_premium_tier') {
            refreshPremiumUI();
        }
    });

});