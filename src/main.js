// src/main.js
(function () {
    // --- SUPABASE CONFIGURATION ---
    // ⚠️ IMPORTANT: REPLACE THESE WITH YOUR OWN SUPABASE PROJECT DETAILS
    const SUPABASE_URL = 'https://ppotwdhgdmxnbhtkuuya.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwb3R3ZGhnZG14bmJodGt1dXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NjU0MzIsImV4cCI6MjA4NjE0MTQzMn0.IiHHRqwn8ksRLTblxpsRvZEjrWvKYTxY9uHvTausjk0';

    // Initialize Client
    let supabase = null;
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.error("Supabase SDK not loaded");
    }

    // State
    const state = {
        tools: [],
        categories: [
            'All', 'AI', 'Design', 'Development', 'SaaS', 'Payments', 'Automation', 'Inspiration', 'Utilities'
        ],
        activeCategory: 'All',
        editingId: null
    };

    // DOM Elements
    const elements = {
        grid: document.getElementById('tools-grid'),
        categoryScroller: document.getElementById('category-scroller'),
        addBtn: document.getElementById('add-tool-btn'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalTitle: document.getElementById('modal-title'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        form: document.getElementById('tool-form'),
        inpId: document.getElementById('tool-id'),
        inpTitle: document.getElementById('inp-title'),
        inpCategory: document.getElementById('inp-category'),
        inpUrl: document.getElementById('inp-url'),
        inpLogo: document.getElementById('inp-logo'),
        inpDesc: document.getElementById('inp-desc')
    };

    // --- Initialization ---
    async function init() {
        await loadData(); // Now async
        renderCategories();
        renderCategoryOptions();
        renderGrid();
        attachEventListeners();
    }

    // --- Data Handling (Supabase) ---
    async function loadData() {
        if (!supabase) {
            alert("ERREUR : Supabase SDK non chargé !");
            return;
        }

        console.log("Loading data from Supabase...");

        // Fetch data from 'tools' table
        const { data, error, count } = await supabase
            .from('tools')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error loading tools:", error);
            alert("ERREUR SUPABASE : " + error.message + "\n\nVérifiez que la table 'tools' existe bien dans votre base de données !");
            return;
        }

        console.log("Data received:", data);

        if (data && data.length > 0) {
            state.tools = data;
        } else {
            console.log("No data found. Attempting to seed...");
            // First run? Seed database if empty
            await seedSupabase();
        }
    }

    // Helper to seed Supabase once
    async function seedSupabase() {
        console.log("Seeding Database...");
        const initialTools = [
            // AI
            { id: crypto.randomUUID(), title: 'ChatGPT', description: 'Advanced AI language model for conversation and coding.', url: 'https://chat.openai.com', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Claude', description: 'Next-generation AI assistant with large context window.', url: 'https://claude.ai', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Gemini', description: 'Google’s most capable and general AI model.', url: 'https://deepmind.google/technologies/gemini/', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Midjourney', description: 'Generative AI for creating stunning photorealistic images.', url: 'https://midjourney.com', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Perplexity', description: 'AI-powered answer engine with real-time web search.', url: 'https://perplexity.ai', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Runway', description: 'AI tools for filmmaking, video editing, and content creation.', url: 'https://runwayml.com', category: 'AI' },
            { id: crypto.randomUUID(), title: 'ElevenLabs', description: 'The most realistic AI audio and speech generation.', url: 'https://elevenlabs.io', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Suno', description: 'Make any song in any style with AI.', url: 'https://suno.com', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Lovable', description: 'AI-powered tool to turn ideas into apps.', url: 'https://lovable.dev', category: 'AI' },
            { id: crypto.randomUUID(), title: 'Bolt', description: 'AI web development agent.', url: 'https://bolt.new', category: 'AI' },

            // Design
            { id: crypto.randomUUID(), title: 'Figma', description: 'Collaborative interface design tool.', url: 'https://figma.com', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Spline', description: 'Design and collaborate in 3D directly in the browser.', url: 'https://spline.design', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Rive', description: 'Build interactive animations that run anywhere.', url: 'https://rive.app', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Linear', description: 'A better way to build products. Issue tracking built for speed.', url: 'https://linear.app', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Framer', description: 'Design and publish your dream site. Zero code.', url: 'https://framer.com', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Webflow', description: 'Build with the power of code — without writing any.', url: 'https://webflow.com', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Lummi', description: 'Free AI-generated stock photos and royalty-free images.', url: 'https://www.lummi.ai', category: 'Design' },
            { id: crypto.randomUUID(), title: 'Canva', description: 'Free design tool: presentations, video, social media.', url: 'https://canva.com', category: 'Design' },
            { id: crypto.randomUUID(), title: 'DesignJoy', description: 'Design implementation as a subscription service.', url: 'https://designjoy.co', category: 'Design' },

            // Development
            { id: crypto.randomUUID(), title: 'Vercel', description: 'Develop. Preview. Ship. The frontend cloud.', url: 'https://vercel.com', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Supabase', description: 'The open source Firebase alternative.', url: 'https://supabase.com', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Cursor', description: 'The AI-first code editor built for speed.', url: 'https://cursor.sh', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Resend', description: 'Email for developers. The best API to reach humans.', url: 'https://resend.com', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Replit', description: 'Collaborative browser-based IDE.', url: 'https://replit.com', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Railway', description: 'Instant deployments for any project.', url: 'https://railway.app', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Turso', description: 'The Edge Database based on libSQL.', url: 'https://turso.tech', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Firecrawl', description: 'Turn websites into LLM-ready data.', url: 'https://firecrawl.dev', category: 'Development' },
            { id: crypto.randomUUID(), title: '21st.dev', description: 'The npm for design engineers. UI Library.', url: 'https://21st.dev', category: 'Development' },
            { id: crypto.randomUUID(), title: 'Baseten', description: 'The fastest way to run machine learning models.', url: 'https://www.baseten.co', category: 'Development' },
            { id: crypto.randomUUID(), title: 'CloudCode', description: 'Cloud IDE and development environment.', url: 'https://cloudcode.google', category: 'Development' },

            // SaaS & Payments
            { id: crypto.randomUUID(), title: 'Stripe', description: 'Financial infrastructure for the internet.', url: 'https://stripe.com', category: 'Payments' },
            { id: crypto.randomUUID(), title: 'Lemon Squeezy', description: 'Payments, tax, and subscriptions for SaaS.', url: 'https://lemonsqueezy.com', category: 'Payments' },
            { id: crypto.randomUUID(), title: 'Typeform', description: 'People-friendly forms and surveys.', url: 'https://typeform.com', category: 'SaaS' },
            { id: crypto.randomUUID(), title: 'Notion', description: 'The all-in-one workspace for notes and docs.', url: 'https://notion.so', category: 'SaaS' },
            { id: crypto.randomUUID(), title: 'Airtable', description: 'The platform for building collaborative apps.', url: 'https://airtable.com', category: 'SaaS' },
            { id: crypto.randomUUID(), title: 'Vault', description: 'Secure secrets management for teams.', url: 'https://hashicorp.com/products/vault', category: 'SaaS' },

            // Automation
            { id: crypto.randomUUID(), title: 'Zapier', description: 'Automate your workflows by connecting apps.', url: 'https://zapier.com', category: 'Automation' },
            { id: crypto.randomUUID(), title: 'Make', description: 'Visual platform to design and build workflows.', url: 'https://make.com', category: 'Automation' },
            { id: crypto.randomUUID(), title: 'n8n', description: 'Workflow automation for technical people.', url: 'https://n8n.io', category: 'Automation' },

            // Inspiration
            { id: crypto.randomUUID(), title: 'Mobbin', description: 'Discover the latest mobile design patterns.', url: 'https://mobbin.com', category: 'Inspiration' },
            { id: crypto.randomUUID(), title: 'Godly', description: 'Astronomically good web design inspiration.', url: 'https://godly.website', category: 'Inspiration' },
            { id: crypto.randomUUID(), title: 'Awwwards', description: 'The awards for design, creativity and innovation.', url: 'https://awwwards.com', category: 'Inspiration' },
            { id: crypto.randomUUID(), title: 'Dribbble', description: 'The world’s leading destination for design.', url: 'https://dribbble.com', category: 'Inspiration' },
            { id: crypto.randomUUID(), title: 'View Source', description: 'Curated collection of the best websites.', url: 'https://viewsource.com', category: 'Inspiration' }
        ];

        // Insert in batches to avoid payload limits if necessary, though 50 is fine.
        const { error } = await supabase.from('tools').insert(initialTools);

        if (!error) {
            console.log("Database seeded successfully!");
            state.tools = initialTools; // Update local state immediately
            renderGrid();
        } else {
            console.error("Error seeding tools:", error);
        }
    }

    // --- CRUD Operations ---

    async function createTool(tool) {
        // Optimistic UI update
        state.tools.unshift(tool);
        renderGrid();

        const { error } = await supabase
            .from('tools')
            .insert([tool]);

        if (error) {
            console.error("Error creating tool:", error);
            // Revert on error?
            alert("Failed to save tool to database.");
        }
    }

    async function updateTool(updatedTool) {
        // Optimistic UI update
        const index = state.tools.findIndex(t => t.id === updatedTool.id);
        if (index !== -1) {
            state.tools[index] = { ...state.tools[index], ...updatedTool };
            renderGrid();
        }

        const { error } = await supabase
            .from('tools')
            .update({
                title: updatedTool.title,
                category: updatedTool.category,
                url: updatedTool.url,
                logo_url: updatedTool.logo_url,
                description: updatedTool.description
            })
            .eq('id', updatedTool.id);

        if (error) console.error("Error updating tool:", error);
    }

    async function deleteTool(id) {
        if (confirm('Are you sure you want to delete this tool?')) {
            // Optimistic UI update
            state.tools = state.tools.filter(t => t.id !== id);
            renderGrid();

            const { error } = await supabase
                .from('tools')
                .delete()
                .eq('id', id);

            if (error) console.error("Error deleting tool:", error);
        }
    }

    // --- Rendering (Same as before) ---
    function renderCategories() {
        elements.categoryScroller.innerHTML = state.categories.map(cat => `
            <button 
                class="chip ${cat === state.activeCategory ? 'active' : ''}" 
                onclick="window.app.setCategory('${cat}')"
            >
                ${cat}
            </button>
        `).join('');
    }

    function renderCategoryOptions() {
        const options = state.categories.filter(c => c !== 'All');
        elements.inpCategory.innerHTML = options.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    function renderGrid() {
        const filtered = state.activeCategory === 'All'
            ? state.tools
            : state.tools.filter(t => t.category === state.activeCategory);

        if (filtered.length === 0) {
            elements.grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-secondary);">
                    <p>No tools found.</p>
                </div>
            `;
            return;
        }

        elements.grid.innerHTML = filtered.map(tool => {
            // Logic for logo: Custom URL > Favicon > Fallback (hidden)
            const logoSrc = tool.logo_url && tool.logo_url.trim() !== ''
                ? tool.logo_url
                : `https://www.google.com/s2/favicons?domain=${tool.url}&sz=64`;

            return `
            <article class="card">
                <div class="card-header">
                    <span class="tag" style="${getCategoryColor(tool.category)}">${tool.category}</span>
                    <div class="card-actions">
                        <button class="icon-btn" onclick="window.app.edit('${tool.id}')" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        </button>
                        <button class="icon-btn delete" onclick="window.app.delete('${tool.id}')" title="Delete">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="card-identity">
                    <img src="${logoSrc}" alt="${tool.title}" class="tool-logo" onerror="this.src='https://via.placeholder.com/32?text=?'">
                    <h3 class="card-title">${tool.title}</h3>
                </div>
                <p class="card-desc">${tool.description}</p>
                
                <div class="card-footer">
                    <a href="${tool.url}" target="_blank" class="visit-link">
                        Visit Site
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </article>
        `}).join('');
    }

    function getCategoryColor(cat) {
        const colorMap = {
            'AI': 'background-color: #d7effe; color: #005cbb;',
            'Design': 'background-color: #ffd8d6; color: #bf0031;',
            'Development': 'background-color: #c4eed0; color: #07471f;',
            'SaaS': 'background-color: #ffeba4; color: #845d00;',
            'Payments': 'background-color: #ffdbcf; color: #8e1f0b;',
            'Automation': 'background-color: #e6d6f9; color: #530096;',
            'Inspiration': 'background-color: #f2d7ff; color: #7800ab;',
            'Utilities': 'background-color: #e2e3e5; color: #1e1e1e;'
        };
        return colorMap[cat] || 'background-color: #f1f3f4; color: #444746;';
    }

    // --- Modal Logic ---

    function openModal(editingId = null) {
        state.editingId = editingId;
        if (editingId) {
            const tool = state.tools.find(t => t.id === editingId);
            if (tool) {
                elements.modalTitle.textContent = 'Edit Tool';
                elements.inpId.value = tool.id;
                elements.inpTitle.value = tool.title;
                elements.inpCategory.value = tool.category;
                elements.inpUrl.value = tool.url;
                if (elements.inpLogo) elements.inpLogo.value = tool.logo_url || '';
                elements.inpDesc.value = tool.description;
            }
        } else {
            elements.modalTitle.textContent = 'Submit a Tool';
            elements.form.reset();
            elements.inpId.value = '';
        }
        elements.modalOverlay.classList.remove('hidden');
        elements.modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        elements.modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            state.editingId = null;
            elements.form.reset();
        }, 300);
    }

    // --- Event Exposure (Global) ---
    window.app = {
        setCategory: (cat) => {
            state.activeCategory = cat;
            renderCategories();
            renderGrid();
        },
        edit: (id) => openModal(id),
        delete: (id) => deleteTool(id)
    };

    // --- Event Listeners ---
    function attachEventListeners() {
        elements.addBtn.addEventListener('click', () => openModal(null));
        elements.closeModalBtn.addEventListener('click', closeModal);
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) closeModal();
        });

        elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(elements.form);
            const toolData = {
                title: formData.get('title'),
                category: formData.get('category'),
                url: formData.get('url'),
                logo_url: formData.get('logo_url'), // New field
                description: formData.get('description')
            };

            if (state.editingId) {
                updateTool({ id: state.editingId, ...toolData });
            } else {
                createTool({
                    id: crypto.randomUUID(),
                    // Supabase handles 'created_at' usually, but safe to send if column matches
                    created_at: new Date().toISOString(),
                    ...toolData
                });
            }
            closeModal();
        });
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
