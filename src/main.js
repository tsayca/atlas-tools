(function () {
    // --- Data: All Apps ---
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const allApps = [
        // 1. Intelligence Artificielle
        {
            category: "Intelligence Artificielle",
            displayCategory: "Intelligence Artificielle",
            parentFilter: "Development",
            icon: "brain-circuit",
            color: "text-purple-500",
            apps: [
                { id: generateId(), title: "Gemini Pro", desc: "Multimodal AI", url: "https://deepmind.google/technologies/gemini/", isFavorite: true },
                { id: generateId(), title: "ChatGPT", desc: "Conversational AI", url: "https://chat.openai.com", isFavorite: true },
                { id: generateId(), title: "Claude 3", desc: "Anthropic AI", url: "https://anthropic.com" },
                { id: generateId(), title: "Midjourney", desc: "Image Gen", url: "https://midjourney.com" }
            ]
        },
        // 2. Development & Code
        {
            category: "Development",
            displayCategory: "Development & Code",
            parentFilter: "Development",
            icon: "code-2",
            color: "text-blue-500",
            apps: [
                { id: generateId(), title: "GitHub", desc: "Code Hosting", url: "https://github.com", isFavorite: true },
                { id: generateId(), title: "Vercel", desc: "Deployment", url: "https://vercel.com" },
                { id: generateId(), title: "Netlify", desc: "Web Hosting", url: "https://netlify.com" },
                { id: generateId(), title: "VS Code", desc: "Editor", url: "https://code.visualstudio.com" },
                { id: generateId(), title: "Stack Overflow", desc: "Q&A", url: "https://stackoverflow.com" },
                { id: generateId(), title: "Supabase", desc: "Backend", url: "https://supabase.com" }
            ]
        },
        // 3. Design & Creative
        {
            category: "Design",
            displayCategory: "Design & Creative",
            parentFilter: "Development",
            icon: "pen-tool",
            color: "text-pink-500",
            apps: [
                { id: generateId(), title: "Figma", desc: "UI Design", url: "https://figma.com" },
                { id: generateId(), title: "Dribbble", desc: "Inspiration", url: "https://dribbble.com" },
                { id: generateId(), title: "Behance", desc: "Portfolio", url: "https://behance.net" },
                { id: generateId(), title: "Sketch", desc: "Mac Design", url: "https://sketch.com" },
                { id: generateId(), title: "Pinterest", desc: "Ideas", url: "https://pinterest.com" }
            ]
        },
        // 4. Divertissement
        {
            category: "Divertissement",
            displayCategory: "Divertissement",
            parentFilter: "Divertissement",
            icon: "gamepad-2",
            color: "text-green-500",
            apps: [
                { id: generateId(), title: "Netflix", desc: "Streaming", url: "https://netflix.com" },
                { id: generateId(), title: "Spotify", desc: "Music", url: "https://open.spotify.com" },
                { id: generateId(), title: "YouTube", desc: "Video", url: "https://youtube.com" },
                { id: generateId(), title: "Twitch", desc: "Live Stream", url: "https://twitch.tv" },
                { id: generateId(), title: "Steam", desc: "Games", url: "https://store.steampowered.com" }
            ]
        },
        // 5. Banque / Finance
        {
            category: "Finance & Banque",
            displayCategory: "Finance & Banque",
            parentFilter: "SaaS & Productivité",
            icon: "wallet",
            color: "text-amber-500",
            apps: [
                { id: generateId(), title: "Revolut", desc: "Banking", url: "https://revolut.com" },
                { id: generateId(), title: "PayPal", desc: "Payments", url: "https://paypal.com" },
                { id: generateId(), title: "Stripe", desc: "Payments API", url: "https://stripe.com" }
            ]
        },
        // 6. SaaS & Productivité
        {
            category: "SaaS & Productivité",
            displayCategory: "SaaS & Productivité",
            parentFilter: "SaaS & Productivité",
            icon: "briefcase",
            color: "text-indigo-500",
            apps: [
                { id: generateId(), title: "Notion", desc: "Workspace", url: "https://notion.so" },
                { id: generateId(), title: "Linear", desc: "Issues", url: "https://linear.app" },
                { id: generateId(), title: "Slack", desc: "Chat", url: "https://slack.com" },
                { id: generateId(), title: "Google Drive", desc: "Cloud", url: "https://drive.google.com" },
                { id: generateId(), title: "Gmail", desc: "Email", url: "https://gmail.com" }
            ]
        },
        // 7. Veille Tech / Réseaux
        {
            category: "Veille & Social",
            displayCategory: "Veille & Social",
            parentFilter: "all",
            icon: "rss",
            color: "text-orange-500",
            apps: [
                { id: generateId(), title: "Twitter/X", desc: "Social", url: "https://twitter.com" },
                { id: generateId(), title: "LinkedIn", desc: "Network", url: "https://linkedin.com" },
                { id: generateId(), title: "Product Hunt", desc: "New Tools", url: "https://producthunt.com" },
                { id: generateId(), title: "Hacker News", desc: "Tech News", url: "https://news.ycombinator.com" },
                { id: generateId(), title: "TechCrunch", desc: "News", url: "https://techcrunch.com" }
            ]
        }
    ];


    // Mega-categories mapping
    const megaCategories = [
        {
            name: "Admin",
            title: "Administration",
            subtitle: "SaaS & Productivité",
            icon: "briefcase",
            color: "text-indigo-500",
            includes: ["SaaS & Productivité", "Finance & Banque"]
        },
        {
            name: "Divertissement",
            title: "Divertissement",
            subtitle: "Films, Musique & Gaming",
            icon: "gamepad-2",
            color: "text-pink-500",
            includes: ["Divertissement"]
        },
        {
            name: "Dev/Tools",
            title: "Dev / Tools",
            subtitle: "Outils de développement",
            icon: "code-2",
            color: "text-blue-500",
            includes: ["Development"]
        },
        {
            name: "Google",
            title: "Google",
            subtitle: "Services Google",
            icon: "globe",
            color: "text-red-500",
            includes: ["SaaS & Productivité"] // Will filter for Google apps
        },
        {
            name: "Design",
            title: "Design",
            subtitle: "Créativité & UI/UX",
            icon: "palette",
            color: "text-purple-500",
            includes: ["Design"]
        },
        {
            name: "AI",
            title: "AI",
            subtitle: "Intelligence Artificielle",
            icon: "brain",
            color: "text-emerald-500",
            includes: ["Intelligence Artificielle"]
        }
    ];

    // State management
    const state = {
        activeFilter: 'all',
        editingAppId: null,
        readLater: [
            { id: '1', title: 'The Future of AI in 2026', url: 'https://www.google.com/search?q=future+of+ai+2026' },
            { id: '2', title: 'Tailwind CSS v4 Features', url: 'https://tailwindcss.com' },
            { id: '3', title: 'React Server Components Guide', url: 'https://react.dev' }
        ]
    };

    const elements = {
        readLaterList: document.getElementById('read-later-list'),
        addReadLaterBtn: document.getElementById('add-read-later-btn'),
        allAppsContainer: document.getElementById('all-apps-container'),
        sidebarLinks: document.querySelectorAll('.sidebar-link'),

        sidebarAppList: document.getElementById('sidebar-app-list'),
        sidebarFavoritesList: document.getElementById('sidebar-favorites-list'),
        heroAppsContainer: document.getElementById('hero-apps-container'),

        modal: document.getElementById('add-app-modal'),
        openModalBtn: document.getElementById('add-app-sidebar-btn'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        addAppForm: document.getElementById('add-app-form'),
        modalTitle: document.querySelector('#add-app-modal h3'),
        modalSubmitBtn: document.querySelector('#add-app-form button[type="submit"]'),

        pasteArea: document.getElementById('paste-area'),
        pastePreview: document.getElementById('paste-preview'),
        iconUrlInput: document.getElementById('app-icon-url')
    };

    function init() {
        renderReadLater();
        renderSidebarLists();
        renderAllApps();
        renderHeroFavorites();
        attachEventListeners();
        if (window.lucide) window.lucide.createIcons();
    }

    function getFavicon(app) {
        if (app.customIcon) return app.customIcon;
        try {
            const domain = new URL(app.url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch (e) {
            return `https://www.google.com/s2/favicons?domain=google.com&sz=128`;
        }
    }

    function renderHeroFavorites() {
        if (!elements.heroAppsContainer) return;

        let favorites = [];
        allApps.forEach(group => {
            group.apps.forEach(app => {
                if (app.isFavorite) favorites.push(app);
            });
        });

        const top3 = favorites.slice(0, 3);

        if (top3.length === 0) {
            elements.heroAppsContainer.innerHTML = `<div class="col-span-3 text-center text-white/50 italic py-10">Ajoutez des favoris pour les voir ici !</div>`;
            return;
        }

        elements.heroAppsContainer.innerHTML = top3.map(app => `
             <a href="${app.url}" target="_blank" class="flex flex-col items-center justify-center gap-6 cursor-pointer group">
               <div class="hero-app-icon w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-xl">
                    <img src="${getFavicon(app)}" alt="${app.title}" class="w-24 h-24 object-contain">
               </div>
               <span class="font-light text-2xl text-white tracking-wide text-center drop-shadow-lg">${app.title}</span>
            </a>
        `).join('');
    }

    // --- Render All Apps as MEGA CATEGORY BLOCKS ---
    function renderAllApps() {
        if (!elements.allAppsContainer) return;

        // Determine which mega-categories to show based on filter
        let categoriesToShow = megaCategories;

        if (state.activeFilter !== 'all') {
            categoriesToShow = megaCategories.filter(mega =>
                mega.includes.some(cat =>
                    cat === state.activeFilter ||
                    allApps.find(g => g.category === cat && g.parentFilter === state.activeFilter)
                )
            );
        }

        if (categoriesToShow.length === 0) {
            elements.allAppsContainer.innerHTML = `<div class="p-8 text-center text-slate-500">Aucune application trouvée.</div>`;
            return;
        }

        const blocksHtml = categoriesToShow.map(mega => {
            const appsInMega = [];
            mega.includes.forEach(catName => {
                const group = allApps.find(g => g.category === catName);
                if (group) {
                    // Special filtering for Google category
                    if (mega.name === "Google") {
                        const googleApps = group.apps.filter(app =>
                            app.title.toLowerCase().includes('google') ||
                            app.title.toLowerCase().includes('gmail') ||
                            app.url.includes('google.com')
                        );
                        appsInMega.push(...googleApps);
                    } else {
                        appsInMega.push(...group.apps);
                    }
                }
            });

            if (appsInMega.length === 0) return '';

            return `
                <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700">
                    <!-- Block Header -->
                    <div class="flex items-center gap-3 mb-6">
                        <div class="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                            <i data-lucide="${mega.icon}" class="w-6 h-6 text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">${mega.title}</h2>
                            <p class="text-sm text-slate-500 dark:text-slate-400">${mega.subtitle}</p>
                        </div>
                    </div>

                    <!-- Apps Grid -->
                <div class="grid grid-cols-3 gap-4 category-drop-zone" data-category="${mega.name}">
                    ${appsInMega.map(app => `
                        <div class="group flex flex-col items-center gap-2 cursor-pointer draggable-app" 
                             data-app-id="${app.id}" 
                             data-category="${mega.name}">
                            <a href="${app.url}" target="_blank" class="relative aspect-square rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all w-full p-3 flex items-center justify-center pointer-events-none overflow-hidden" title="${app.title}">
                                <img src="${getFavicon(app)}" alt="${app.title}" class="w-full h-full object-cover rounded-xl drop-shadow-sm">
                            </a>
                            
                            <!-- Overlay below app -->
                            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 rounded-lg px-3 py-1.5 pointer-events-none">
                                <span class="text-white text-xs font-medium text-center whitespace-nowrap">${app.title}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                </div>
            `;
        }).join('');

        // Wrap in horizontal grid container with 3 columns (2 rows for 6 categories)
        elements.allAppsContainer.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${blocksHtml}</div>`;

        if (window.lucide) window.lucide.createIcons();
    }

    function renderSidebarLists() {
        if (!elements.sidebarAppList || !elements.sidebarFavoritesList) return;

        let flatApps = [];
        allApps.forEach(group => {
            group.apps.forEach(app => {
                flatApps.push({ ...app, categoryName: group.category });
            });
        });

        flatApps.sort((a, b) => a.title.localeCompare(b.title));

        const favorites = flatApps.filter(app => app.isFavorite);
        const others = flatApps.filter(app => !app.isFavorite);

        const createItemHtml = (app) => `
            <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer group transition-colors sidebar-app-item" 
                 draggable="true" 
                 data-id="${app.id}"
                 title="Drag to move, Click to edit">
                <img src="${getFavicon(app)}" class="w-5 h-5 object-contain rounded-md bg-white dark:bg-slate-700 p-0.5 shadow-sm pointer-events-none" alt="${app.title}">
                <div class="flex-1 min-w-0 pointer-events-none">
                    <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">${app.title}</p>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all edit-app-btn" title="Modifier" onclick="event.stopPropagation();">
                        <i data-lucide="edit-2" class="w-3.5 h-3.5 pointer-events-none"></i>
                    </button>
                    <button class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all delete-app-btn" title="Supprimer" onclick="event.stopPropagation();">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5 pointer-events-none"></i>
                    </button>
                </div>
            </div>
        `;

        if (favorites.length === 0) {
            elements.sidebarFavoritesList.innerHTML = `<div class="text-xs text-slate-400 text-center py-2 italic placeholder">Glissez ici vos favoris</div>`;
        } else {
            elements.sidebarFavoritesList.innerHTML = favorites.map(createItemHtml).join('');
        }

        elements.sidebarAppList.innerHTML = others.map(createItemHtml).join('');

        setupSidebarInteractions();
        if (window.lucide) window.lucide.createIcons();
    }

    function setupSidebarInteractions() {
        const allItems = document.querySelectorAll('.sidebar-app-item');
        allItems.forEach(item => {
            // Click on entire item opens edit modal
            item.addEventListener('click', (e) => {
                if (e.target.closest('.edit-app-btn') || e.target.closest('.delete-app-btn')) {
                    return; // Don't open modal if clicking buttons
                }

                const appId = item.getAttribute('data-id');
                let appToEdit = null;
                let catName = null;
                for (let g of allApps) {
                    const found = g.apps.find(a => a.id === appId);
                    if (found) { appToEdit = found; catName = g.category; break; }
                }

                if (appToEdit) {
                    openModal(appToEdit, catName);
                }
            });

            // Edit button handler
            const editBtn = item.querySelector('.edit-app-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const appId = item.getAttribute('data-id');
                    let appToEdit = null;
                    let catName = null;
                    for (let g of allApps) {
                        const found = g.apps.find(a => a.id === appId);
                        if (found) { appToEdit = found; catName = g.category; break; }
                    }
                    if (appToEdit) {
                        openModal(appToEdit, catName);
                    }
                });
            }

            // Delete button handler
            const deleteBtn = item.querySelector('.delete-app-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const appId = item.getAttribute('data-id');
                    deleteApp(appId);
                });
            }

            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.getAttribute('data-id'));
                e.dataTransfer.effectAllowed = 'move';
                item.classList.add('opacity-50');
            });

            item.addEventListener('dragend', (e) => {
                item.classList.remove('opacity-50');
                elements.sidebarFavoritesList.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/20', 'border-indigo-300');
                elements.sidebarAppList.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/20', 'border-indigo-300');
            });
        });

        [elements.sidebarFavoritesList, elements.sidebarAppList].forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                zone.classList.add('bg-indigo-50', 'dark:bg-indigo-900/20', 'border-indigo-300');
            });

            zone.addEventListener('dragleave', (e) => {
                zone.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/20', 'border-indigo-300');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/20', 'border-indigo-300');

                const appId = e.dataTransfer.getData('text/plain');
                const targetZone = zone.getAttribute('data-drop-zone');
                updateAppFavoriteStatus(appId, targetZone === 'favorites');
            });
        });
    }

    function updateAppFavoriteStatus(appId, isFavorite) {
        let found = false;
        for (let g of allApps) {
            const app = g.apps.find(a => a.id === appId);
            if (app) {
                if (app.isFavorite !== isFavorite) {
                    app.isFavorite = isFavorite;
                    found = true;
                }
                break;
            }
        }

        if (found) {
            renderSidebarLists();
            renderAllApps();
            renderHeroFavorites();
        }
    }

    function deleteApp(appId) {
        let appToDelete = null;
        let groupIndex = -1;
        let appIndex = -1;

        for (let i = 0; i < allApps.length; i++) {
            const idx = allApps[i].apps.findIndex(a => a.id === appId);
            if (idx !== -1) {
                appToDelete = allApps[i].apps[idx];
                groupIndex = i;
                appIndex = idx;
                break;
            }
        }

        if (!appToDelete) return;

        if (confirm(`Supprimer "${appToDelete.title}" ?\n\nCette action est irréversible.`)) {
            allApps[groupIndex].apps.splice(appIndex, 1);

            renderSidebarLists();
            renderAllApps();
            renderHeroFavorites();
        }
    }

    function openModal(appToEdit = null, categoryName = null) {
        if (!elements.modal) return;

        elements.iconUrlInput.value = '';
        elements.pastePreview.classList.add('hidden');
        elements.pastePreview.src = '';

        if (appToEdit) {
            state.editingAppId = appToEdit.id;
            elements.modalTitle.textContent = "Modifier l'application";
            elements.modalSubmitBtn.textContent = "Enregistrer les modifications";

            document.getElementById('app-name').value = appToEdit.title;
            document.getElementById('app-url').value = appToEdit.url;
            document.getElementById('app-category').value = categoryName || 'Development';

            if (appToEdit.customIcon) {
                elements.iconUrlInput.value = appToEdit.customIcon;
                elements.pastePreview.src = appToEdit.customIcon;
                elements.pastePreview.classList.remove('hidden');
            }

        } else {
            state.editingAppId = null;
            elements.modalTitle.textContent = "Ajouter une application";
            elements.modalSubmitBtn.textContent = "Ajouter au Dashboard";
            elements.addAppForm.reset();
        }

        elements.modal.classList.remove('hidden');
        setTimeout(() => {
            elements.modal.classList.remove('opacity-0');
            elements.modal.querySelector('div').classList.remove('scale-95');
        }, 10);

        elements.pasteArea.focus();
    }

    function closeModal() {
        if (!elements.modal) return;
        elements.modal.classList.add('opacity-0');
        elements.modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            elements.modal.classList.add('hidden');
            state.editingAppId = null;
        }, 300);
    }

    function handleAddApp(e) {
        e.preventDefault();
        const name = document.getElementById('app-name').value;
        let url = document.getElementById('app-url').value;
        const iconUrl = document.getElementById('app-icon-url').value;
        const category = document.getElementById('app-category').value;

        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        if (state.editingAppId) {
            let oldGroup = null;
            let appIndex = -1;

            for (let g of allApps) {
                const idx = g.apps.findIndex(a => a.id === state.editingAppId);
                if (idx !== -1) {
                    oldGroup = g;
                    appIndex = idx;
                    break;
                }
            }

            let isFav = false;
            if (oldGroup) {
                isFav = oldGroup.apps[appIndex].isFavorite || false;
                oldGroup.apps.splice(appIndex, 1);
            }

            let targetGroup = allApps.find(g => g.category.includes(category) || g.parentFilter === category);
            if (!targetGroup) targetGroup = allApps[0];

            if (targetGroup) {
                targetGroup.apps.push({
                    id: state.editingAppId,
                    title: name,
                    desc: "User App",
                    url: url,
                    customIcon: iconUrl || null,
                    isFavorite: isFav
                });
            }

        } else {
            let targetGroup = allApps.find(g => g.category.includes(category) || g.parentFilter === category);
            if (!targetGroup) {
                if (category === 'Development') targetGroup = allApps.find(g => g.category === 'Development');
                else if (category === 'Design') targetGroup = allApps.find(g => g.category === 'Design');
                else if (category === 'Divertissement') targetGroup = allApps.find(g => g.category === 'Divertissement');
                else if (category === 'Finance & Banque') targetGroup = allApps.find(g => g.category === 'Finance & Banque');
                else if (category === 'SaaS & Productivité') targetGroup = allApps.find(g => g.category === 'SaaS & Productivité');
                else if (category === 'Veille & Social') targetGroup = allApps.find(g => g.category === 'Veille & Social');
            }

            if (targetGroup) {
                targetGroup.apps.push({
                    id: generateId(),
                    title: name,
                    desc: 'Added User App',
                    url: url,
                    customIcon: iconUrl || null,
                    isFavorite: false
                });
            } else {
                alert('Erreur: Catégorie introuvable.');
                return;
            }
        }

        renderAllApps();
        renderSidebarLists();
        renderHeroFavorites();
        closeModal();
    }

    function handleImagePaste(e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image/')) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function (event) {
                    elements.iconUrlInput.value = event.target.result;
                    elements.pastePreview.src = event.target.result;
                    elements.pastePreview.classList.remove('hidden');
                };
                reader.readAsDataURL(blob);
                e.preventDefault();
                return;
            }
        }
    }

    function renderReadLater() {
        if (!elements.readLaterList) return;
        elements.readLaterList.innerHTML = state.readLater.map(item => `
            <div class="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 relative" onclick="window.open('${item.url}', '_blank')">
                <div class="w-1 h-8 bg-indigo-500 rounded-full"></div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">${item.title}</p>
                    <p class="text-xs text-slate-400 truncate">Added recently</p>
                </div>
                <button onclick="event.stopPropagation(); window.app.deleteReadLater('${item.id}')" class="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `).join('');
        if (window.lucide) window.lucide.createIcons();
    }

    function addReadLater() {
        const title = prompt("Titre de l'article / lien :");
        if (title) {
            state.readLater.unshift({ id: crypto.randomUUID(), title, url: '#' });
            renderReadLater();
        }
    }

    function deleteReadLater(id) {
        if (confirm("Supprimer ce lien ?")) {
            state.readLater = state.readLater.filter(i => i.id !== id);
            renderReadLater();
        }
    }

    window.app = { deleteReadLater, addReadLater };

    function attachEventListeners() {
        if (elements.addReadLaterBtn) {
            elements.addReadLaterBtn.addEventListener('click', addReadLater);
        }

        elements.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                elements.sidebarLinks.forEach(l => {
                    l.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
                    l.classList.add('text-slate-500', 'hover:bg-slate-100');
                });
                const target = e.currentTarget;
                target.classList.remove('text-slate-500', 'hover:bg-slate-100');
                target.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
                state.activeFilter = target.getAttribute('data-filter');
                renderAllApps();
            });
        });

        if (elements.openModalBtn) elements.openModalBtn.addEventListener('click', () => openModal(null));
        if (elements.closeModalBtn) elements.closeModalBtn.addEventListener('click', closeModal);
        if (elements.addAppForm) elements.addAppForm.addEventListener('submit', handleAddApp);

        if (elements.pasteArea) {
            elements.pasteArea.addEventListener('paste', handleImagePaste);
        }

        if (elements.modal) {
            elements.modal.addEventListener('click', (e) => {
                if (e.target === elements.modal) closeModal();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

