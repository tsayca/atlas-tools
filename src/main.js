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
        if (!supabase) return;

        // Fetch data from 'tools' table
        const { data, error } = await supabase
            .from('tools')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error loading tools:", error);
            return;
        }

        if (data && data.length > 0) {
            state.tools = data;
        } else {
            // First run? Seed database if empty? 
            // Optional: You could uncomment this to auto-seed Supabase
            // seedSupabase(); 
            state.tools = [];
        }
    }

    // Optional: Helper to seed Supabase once
    /*
    async function seedSupabase() {
        const initialTools = [ ... ]; // Your list here
        const { error } = await supabase.from('tools').insert(initialTools);
        if(!error) loadData();
    }
    */

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

        elements.grid.innerHTML = filtered.map(tool => `
            <article class="card">
                <div class="card-header">
                    <span class="tag" style="background:${getCategoryColor(tool.category)}">${tool.category}</span>
                    <div class="card-actions">
                        <button class="icon-btn" onclick="window.app.edit('${tool.id}')" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                        </button>
                        <button class="icon-btn delete" onclick="window.app.delete('${tool.id}')" title="Delete">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <h3 class="card-title">${tool.title}</h3>
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
        `).join('');
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
