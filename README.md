# ATLAS Dashboard - Documentation UI

## 📋 Vue d'Ensemble

ATLAS est un dashboard personnel moderne et ergonomique pour gérer vos applications web préférées. Design responsive, élégant et intuitif avec support du dark mode.

## 🎨 Design System

### Couleurs
```css
/* Light Mode */
--bg-primary: #F9FAFB (gray-50)
--bg-secondary: #FFFFFF (white)
--text-primary: #0F172A (slate-900)
--text-secondary: #64748B (slate-500)
--accent: #4F46E5 (indigo-600)

/* Dark Mode */
--bg-primary-dark: #0F172A (slate-900)
--bg-secondary-dark: #1E293B (slate-800)
--text-primary-dark: #F1F5F9 (slate-100)
--text-secondary-dark: #94A3B8 (slate-400)
```

### Espacements (Ergonomiques)
```css
/* Padding Principal */
Mobile: 24px (p-6)
Tablet: 32px (md:p-8)
Desktop: 48px (lg:p-12)

/* Gaps */
Apps: 24px (gap-6)
Catégories: 32-40px (gap-8 lg:gap-10)

/* Cards Padding */
Apps: 16-20px (p-4 md:p-5)
Catégories: 32px (p-8)
```

### Typographie
```css
/* Hiérarchie */
H1 (Page): text-2xl md:text-3xl (24-30px)
H2 (Catégorie): text-3xl (30px)
Body: text-sm md:text-base (14-16px)

/* Police */
font-family: system-ui, -apple-system, sans-serif
```

### Grilles Responsive
```css
/* Apps Grid */
Mobile: grid-cols-2
Desktop (1280px+): grid-cols-3
Gap: 24px uniforme

/* Catégories Grid */
Mobile: grid-cols-1
Desktop (1280px+): grid-cols-2
Gap: 32-40px
```

## 🏗️ Structure du Dashboard

### Layout Principal
```
┌─────────────────────────────────────────┐
│  Sidebar (Fixe)    │   Main Content     │
│  - Logo            │   - Header         │
│  - Navigation (7)  │   - Hero Card      │
│  - Favoris         │   - Read Later     │
│  - Toutes Apps     │   - Categories (6) │
│  - Add Button      │                    │
└─────────────────────────────────────────┘
```

### Sidebar (w-64 lg:w-20 xl:w-64)
- **Logo**: SVG ATLAS sans background
- **Navigation**: 7 catégories filtrables
  - Accueil (toutes apps)
  - Admin (SaaS & Productivité)
  - Divertissement
  - Dev/Tools
  - Google
  - Design
  - AI
- **Favoris**: Liste scrollable
- **Toutes Apps**: Liste scrollable
- **Bouton Add**: Modal d'ajout

### Main Content Area
1. **Header**
   - Titre: "Dashboard de Théo"
   - Subtitle: "Bienvenue sur ton espace personnel"
   - Espacement: mb-10

2. **Hero Card** (Gemini Gradient)
   - Gradient multi-couleur
   - Barre de recherche Google
   - 3 apps favorites dynamiques
   - Lien Gemini

3. **Read Later**
   - Liste scrollable
   - Delete icons
   - Add button

4. **Categories** (6 blocs)
   - Grid 2 colonnes max desktop
   - Chaque bloc: Header + Apps Grid
   - Border dashed avec hover effect

## 📊 Architecture des Données

### Structure App
```javascript
{
  id: string,
  title: string,
  url: string,
  category: string,
  customIcon: string | null,
  isFavorite: boolean
}
```

### Mega Categories
```javascript
{
  name: string,           // "Admin", "Divertissement", etc.
  title: string,          // Titre affiché
  subtitle: string,       // Description courte
  icon: string,           // Nom icône Lucide
  includes: string[],     // Catégories incluses
  filterGoogle: boolean   // Filtre spécial Google
}
```

### Exemples de Catégories
- **Admin**: SaaS & Productivité (Notion, Linear, Airtable...)
- **Divertissement**: Films, Musique & Gaming (Netflix, Spotify, Steam...)
- **Dev/Tools**: Outils de développement (GitHub, Vercel, Railway...)
- **Google**: Services Google (Drive, Gmail, Calendar...)
- **Design**: Créativité & UI/UX (Figma, Framer, Dribbble...)
- **AI**: Intelligence Artificielle (ChatGPT, Claude, Gemini...)

## 🎯 Fonctionnalités

### Navigation & Filtrage
- Clic sur catégorie sidebar → Filtre apps
- "Accueil" → Affiche toutes apps
- Filtrage temps réel
- State management avec `activeFilter`

### Gestion des Apps
- **Ajout**: Modal avec formulaire
  - Nom (requis)
  - URL (requis)
  - Icône (paste image)
  - Catégorie (dropdown)
- **Edition**: Clic item sidebar
- **Suppression**: Delete icon
- **Favori**: Drag & drop sidebar

### Icons
- **Favicon Auto**: Google Favicon API
- **Custom Icon**: Paste image (base64)
- **Fallback**: Google s2/favicons service

### Interactions
- **Hover**: Shadow-xl sur apps
- **Overlay**: Nom app au hover
- **No Select**: user-select: none
- **Links**: target="_blank"

## 📱 Responsive Design

### Mobile (< 1024px)
- Sidebar: Off-canvas avec toggle
- Apps: 2 colonnes
- Catégories: 1 colonne
- Padding: 24px
- Menu hamburger fixe

### Tablet (1024px - 1280px)
- Sidebar: Icons-only (w-20)
- Apps: 2 colonnes
- Catégories: Transition vers 2 cols
- Padding: 32px

### Desktop (1280px+)
- Sidebar: Full (w-64)
- Apps: 3 colonnes
- Catégories: 2 colonnes
- Padding: 48px

### Touch Targets
- Minimum: 44px
- Apps: 60px+ sur mobile
- Buttons: 48px minimum
- Sidebar links: 44px+ padding

## 🎨 Composants UI

### App Card
```html
<a class="aspect-square rounded-2xl bg-white p-4 md:p-5
          border hover:shadow-xl transition-all">
  <img class="w-full h-full object-cover rounded-xl" />
</a>
```

### Category Block
```html
<div class="border-2 border-dashed rounded-3xl p-8
            bg-white/50 backdrop-blur-sm
            hover:border-indigo-300">
  <!-- Header -->
  <div class="flex items-center gap-3 mb-8">
    <div class="p-3 bg-gradient-to-br from-indigo-500 
                to-purple-600 rounded-2xl">
      <i data-lucide="icon" class="w-6 h-6 text-white"></i>
    </div>
    <div>
      <h2 class="text-3xl font-bold">Titre</h2>
      <p class="text-sm text-slate-500">Subtitle</p>
    </div>
  </div>
  <!-- Grid Apps -->
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Apps -->
  </div>
</div>
```

### Modal
```html
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm
            flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-[24px] p-6 md:p-8
              max-w-md max-h-[90vh] overflow-y-auto">
    <!-- Form -->
  </div>
</div>
```

## 🔧 Technologies

### Frontend
- **HTML5**: Structure sémantique
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Icon system
- **Vanilla JS**: Logique application

### APIs
- **Google Favicon**: `https://www.google.com/s2/favicons?domain=...&sz=128`
- **LocalStorage**: Persistance données

### Features
- **Dark Mode**: Classes dark: variants
- **Responsive**: Mobile-first breakpoints
- **Accessibility**: ARIA labels, keyboard nav
- **Performance**: Lazy icon rendering

## 📦 Structure Fichiers

```
ATLAS/
├── index.html          # Structure principale
├── src/
│   └── main.js        # Logique application
├── SVG Favicon.svg    # Logo ATLAS
└── README.md          # Cette documentation
```

## 🚀 Mise en Place

### 1. Structure HTML
- Sidebar avec navigation
- Main content area
- Modal add app
- Import Lucide icons

### 2. Data Structure
```javascript
const tools = [
  { id, title, url, category, customIcon, isFavorite }
];
const megaCategories = [
  { name, title, subtitle, icon, includes }
];
```

### 3. Render Functions
- `renderAllApps()`: Catégories filtrées
- `renderHeroFavorites()`: 3 premiers favoris
- `renderSidebarLists()`: Favoris + All apps
- `renderReadLater()`: Liste lecture

### 4. Event Handlers
- Sidebar filtering
- Modal open/close
- Add/Edit/Delete apps
- Image paste
- Mobile menu toggle

## 🎨 Principes Ergonomiques

### Loi de Fitts
- Zones tactiles grandes (60px+)
- Espacement généreux (gap-6)
- Targets faciles à atteindre

### Loi de Proximité
- Groupes visuels clairs
- Plus d'espace entre catégories
- Moins d'espace dans catégorie

### Breathing Room
- Padding généreux partout
- White space intentionnel
- Gaps 2x standards

### Hiérarchie Claire
- Titres 3xl (30px)
- Espacement vertical proportionnel
- Contraste visuel évident

## 📊 Métriques Clés

### Espacement
- Apps gap: **24px** (2x standard)
- Category gap: **32-40px**
- Main padding: **24-48px**
- Card padding: **16-20px**

### Densité
- Mobile: 2 apps/row
- Tablet: 2 apps/row (50% plus grandes)
- Desktop: 3 apps/row
- Categories: Max 2 colonnes

### Touch Targets
- App cards: **60px+ minimum**
- Sidebar links: **44px+ minimum**
- Buttons: **48px minimum**
- Icons: **20-24px**

## 🎯 Best Practices

### Performance
- Lazy load icons avec Lucide
- LocalStorage pour cache
- Debounce sur search
- Minimal re-renders

### Accessibilité
- Labels sémantiques
- ARIA attributes
- Keyboard navigation
- Color contrast WCAG AA

### UX
- Feedback immédiat
- Transitions smooth (0.3s)
- Error handling gracieux
- Progressive enhancement

### Code Quality
- Functions pures
- Single responsibility
- Clear naming
- Comments explicatifs

## 🔄 Workflow Utilisateur

1. **Arrivée**: Dashboard "Accueil" avec toutes apps
2. **Navigation**: Clic catégorie → Filtrage apps
3. **Recherche**: Google search bar dans Hero
4. **Favoris**: Drag app vers favoris sidebar
5. **Hero Sync**: 3 premiers favoris affichés
6. **Ajout**: Modal → Paste icon → Save
7. **Edition**: Clic sidebar item → Modal edit
8. **Suppression**: Delete icon → Confirm

## 📝 Checklist Implémentation

- [ ] Structure HTML base
- [ ] Import Tailwind CSS
- [ ] Import Lucide Icons  
- [ ] Data structure (tools + categories)
- [ ] Render functions
- [ ] Sidebar navigation
- [ ] Category filtering
- [ ] Modal add/edit
- [ ] Image paste handling
- [ ] LocalStorage persistence
- [ ] Favorites drag & drop
- [ ] Hero sync favorites
- [ ] Responsive breakpoints
- [ ] Dark mode
- [ ] Touch targets optimization
- [ ] Accessibility audit

## 🎨 Customization

### Couleurs
Modifier les classes Tailwind:
- Accent: `indigo-600` → votre couleur
- Gradient: `from-indigo-500 to-purple-600`
- Borders: `border-slate-300`

### Espacements
Ajuster les valeurs:
- Gaps: `gap-6` → `gap-8` pour plus d'espace
- Padding: `p-6` → `p-8` pour cards plus spacieuses

### Grilles
Modifier colonnes:
- Apps: `grid-cols-2 lg:grid-cols-3` → vos valeurs
- Categories: `grid-cols-1 lg:grid-cols-2` → vos valeurs

## 📚 Ressources

- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Google Fonts**: https://fonts.google.com
- **Favicon API**: https://www.google.com/s2/favicons

---

**Version**: 2.0  
**Dernière mise à jour**: Février 2026  
**Auteur**: ATLAS Team
