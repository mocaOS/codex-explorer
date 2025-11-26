<div align="center">
  <img src="https://codex.decc0s.com/social.jpg" alt="Art DeCC0s - Museum of Crypto Art" />
</div>

# Codex Explorer

### *Where 10,000 Digital Souls Meet Art History*

**Art DeCC0s** aren't just NFTs—they're living characters, each carrying fragments of art history, crypto culture, and human personality into a new creative commons. Born from the [Museum of Crypto Art](https://museumofcryptoart.com)'s mission to preserve and celebrate the crypto art movement, these 10,000 entities represent something unprecedented: **fully open, richly characterized, AI-ready digital beings** that anyone can use, remix, and build with.

Each DeCC0 is a **composite identity**—blending a character silhouette with masterworks from MOCA's collection, creating unique personas that reference everything from Slovenian kings to crypto Twitter memes, from Byzantine aesthetics to the artists who pioneered crypto art. They speak in distinct voices, have favorite colors and books, dislike certain art movements, and carry biographical depth that rivals traditional literature.

### The Journey

What started as a simple collection browser evolved into an **immersive art-centric experience** designed for exploration and discovery. We wanted builders, artists, and collectors to *feel* the magic of these characters—to hover over a DeCC0 and watch the background fade away, revealing just the character. To zoom from a bird's-eye view of all 10,000 down to a single soul filling the screen. To dive deep into who they are, what they believe, and how they speak.

**The result?** A blazing-fast, feature-rich explorer that loads the entire collection in seconds, lets you swap between composite and character-only views with a hover, adjust quality from web-friendly to 4K, and enter an immersive museum mode that takes over your entire screen. It's part gallery, part database, part easter egg hunt—and it's all **CC0**, meaning every piece of code, every character, every image belongs to everyone.

### Why This Matters

The Museum of Crypto Art isn't just archiving the past—it's **seeding the future**. Art DeCC0s are designed to be:
- **AI Agent Characters** - Complete with ElizaOS profiles, system prompts, and conversation examples
- **Storytelling Tools** - Rich biographies and personalities for writers and worldbuilders
- **Art Assets** - Layered components (character + background) for remixing
- **Cultural References** - Deep metadata connecting crypto art history with broader culture
- **Community Commons** - Free to use by anyone, for anything, forever

**We're building in public, releasing features as we discover them, and inviting you to build with us.** Whether you're creating AI agents, writing stories, building games, or simply exploring art history through a new lens—these 10,000 characters are yours to discover.

> **✨ Beta Features Active**: This release includes interactive features like hover-to-swap mode (easter egg), dynamic zoom control, quality switching, and immersive museum mode with fullscreen support!

**🔗 External Resources**
- **API Documentation**: [docs.decc0s.com](https://docs.decc0s.com)
- **Codex Backend**: [github.com/mocaOS/codex](https://github.com/mocaOS/codex)
- **Live Application**: [codex.decc0s.com](https://codex.decc0s.com)

---

## ✨ Key Features

### 🖼️ Gallery Experience
- **10,000 Art DeCC0s** displayed in a responsive grid layout
- **Instant infinite scroll** with virtual pagination
- **Three sort modes**: Ascending, Descending, and True Random (client-side sorting)
- **Dynamic zoom control** - 0% to 100% zoom slider (10 columns to 1 column)
- **Quality selector** - Switch between 256p, 1024p, and 4K (full IPFS resolution)
- **Sticky control bar** - Controls stay visible while scrolling for quick adjustments
- **Filter toggle** - Show/hide sidebar in both normal and museum modes
- **Optimized image delivery** via Directus asset transformations and IPFS gateway
- **Zero-refetch architecture** - loads entire collection once, then instant filtering with zero API calls

### ✨ Interactive Features (Beta)
- **🎭 Hover-to-Swap Mode** (Easter Egg)
  - Hover over any decc0 to reveal character-only view (no background)
  - Hover again to swap back to full composite
  - Toggle feature on/off with sparkles icon ✨
  - Purple border indicates swapped images
  - **Activates after 30 seconds** - let the magic reveal itself!
  - **Smart cooldown** - 3 second pause during fullscreen transitions to prevent confusion

- **🖥️ Museum Mode**
  - Full browser fullscreen experience
  - Immersive viewing with floating controls
  - Smart zoom adjustment maintains consistent decc0 size
  - Access zoom, quality, and easter egg controls
  - Exit with ESC key or close button

- **📐 Smart Zoom System**
  - Real-time grid adjustment (0%-100%)
  - Automatically adapts to fullscreen for optimal viewing
  - Remembers your preferred zoom level
  - 5 columns default (55% zoom)

### 🔍 Advanced Search & Filtering
- **Smart search bar** - searches by Token ID (exact match) or Character Name (partial match)
- **Multi-select checkboxes** with occurrence counts displayed
- **Real-time trait filtering** across 8 categories:
  - Character Type (7 types including ultra-rare Alien & Ape)
  - Background Style (16 art movements)
  - Background Texture (7 textures)
  - Mood (3 emotional states)
  - DNA Lineage (17 historical collectors)
  - DNA Memetic (17 crypto culture references)
  - DNA Artist Self-Portrait (20 famous artists)
  - DNA MOCA Collection (71 artists from MOCA Genesis)
- **Smart OR/AND Logic**:
  - **Within a category** (OR): Selecting multiple options shows tokens matching ANY selection
    - Example: Character "Alien + Ape" = 33 results (9 + 24)
  - **Between categories** (AND): Must match selections from all active categories
    - Example: Character "Alien" AND Background "Surrealism" = only Alien DeCC0s with Surrealism backgrounds
- **Client-side filtering** for instant results (no loading delays)
- **Rarity-sorted options** - rarest traits appear first in each dropdown
- **Live result counter** - shows exact match count with animated loading state

### 📖 Rich Character Profiles
Each Art DeCC0 includes extensive metadata:
- **Biography & Story** - Detailed character backstories and confessions
- **Visual Appearance** - Character summaries and paired art descriptions
- **Identity & Philosophy** - Cultural affiliations, ancestors, self-identity
- **Artistic Preferences** - Loved/liked/disliked art styles, crypto art focus
- **Favorite Things** - Books, crypto artists, colors, animals
- **Writing Behavior** - Communication style, metaphor domains, unique vocabulary
- **ElizaOS Agent Profile** - Complete AI agent configuration including system prompts, bio, topics, knowledge, and conversation examples

### 🎨 Technical Highlights
- **Server-Side Rendering** - Nuxt 3 SSR with Vue 3 Composition API for instant page shells
- **Client-Only Data Fetching** - API calls happen in browser for optimal server performance
- **Optimized Data Loading** - Fetches all 10k items in one call (~2-3 seconds), cached permanently
- **Virtual Pagination** - Displays 36 items at a time, increases on scroll
- **Zero-Refetch Architecture** - Static query key ensures no unnecessary API calls on filter/sort changes
- **Instant Client-Side Filtering** - Optimized Set-based filtering for real-time results
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Direct IPFS Access** - Download full-resolution images and access component layers
- **Interactive Grid** - Real-time zoom, quality switching, and hover effects
- **Fullscreen API Integration** - Native browser fullscreen for immersive viewing
- **Smart State Management** - Synchronized controls across normal and museum modes
- **Multi-Resolution Support** - Dynamic asset loading from 256p to 4K

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/codex-explorer.git
cd codex-explorer

# Install dependencies
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

**Performance Note**: On first load, the page becomes interactive in ~400ms, then loads all 10,000 tokens in the background (~2-3 seconds). After initial load, all filtering/sorting happens instantly with zero API calls.

### Production Build

This application uses **Nuxt 3 with Server-Side Rendering (SSR)** for optimal performance and SEO.

```bash
# Build for production (SSR)
npm run build

# Preview production build locally
npm run preview

# Start production server
node .output/server/index.mjs
```

The SSR build generates a Node.js server in `.output/server/` that handles both server-side rendering and API routes. Deploy this to any Node.js-compatible hosting platform (Vercel, Netlify, DigitalOcean, AWS, etc.).

---

## 🏗️ Architecture

### Data Flow
1. **Server-Side Rendering**: Server renders page shell instantly (no data fetching during SSR)
2. **Client Hydration**: Vue app becomes interactive in ~400ms after page load
3. **Data Fetching**: Single API call to `https://api.decc0s.com/items/codex` fetches all 10,000 items with complete metadata (thumbnails for full composite, character-only, and background layers)
4. **Permanent Caching**: Data stored in TanStack Query cache with static key - never refetches during session
5. **Client-Side Processing**: All filtering, sorting, and searching happens in-browser using optimized algorithms
6. **Virtual Rendering**: Only visible items (36 at a time) are rendered to the DOM
7. **Infinite Scroll**: Display count increases by 36 as user scrolls
8. **Dynamic Asset Loading**: Images load at current quality setting (256p/1024p/4K) with lazy loading
9. **Interactive State Management**: Hover states, zoom levels, and quality preferences managed client-side
10. **Fullscreen Integration**: Browser Fullscreen API triggered for Museum Mode with state synchronization

### Technology Stack
- **Framework**: Nuxt 3 with Server-Side Rendering (SSR) for instant page shells
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: Vue 3 Composition API with reactive refs and computed memoization
- **Data Fetching**: TanStack Query (Vue Query) configured for zero-refetch performance
- **API Client**: Axios
- **Image Processing**: Directus asset transformations
- **Performance**: Client-side data loading, Set-based filtering, virtual pagination

### Key Components
- `pages/index.vue` - Gallery view with filtering, zoom, quality, and interactive features
- `pages/[tokenId].vue` - Detailed character profile page with hover preview
- `components/filters/FilterSidebar.vue` - Filter controls and search with multi-select checkboxes
- `components/ui/*` - Reusable UI components (Table, Button, Input, Skeleton)
- `layouts/default.vue` - App layout with fullscreen state management
- `plugins/vue-query.ts` - TanStack Query configuration optimized for performance

### Interactive Controls
The gallery includes a comprehensive control bar with:
- **Zoom Slider**: Real-time grid density adjustment (0%-100%)
- **Quality Toggle**: Switch between 256p, 1024p, and 4K quality
- **Easter Egg Toggle** (✨): Enable/disable hover-to-swap mode
- **Museum Mode** (🖥️): Enter fullscreen immersive viewing
- **Sort Dropdown**: Ascending, Descending, or Random order

In Museum Mode, controls appear as floating overlay at the top center.

### Performance Strategy
The Codex Explorer achieves exceptional performance by:
1. **Client-side data fetching** - API call only happens in browser (not during SSR) for fast page loads
2. **Single 10k item fetch** - One API call (~2-3 seconds) loads entire collection with all metadata
3. **Static query key** - Data cached permanently per session, zero refetches on filter/sort changes
4. **Virtual pagination** - Only renders visible items (36 at a time), increases on scroll
5. **Pure client-side filtering** - Instant results using optimized Set lookups and single-pass filtering
6. **Dynamic quality loading** - Starts at 256p for fast initial load, upgradeable to 4K on-demand
7. **Optimized asset delivery** - Uses Directus transformations (256px, 1024px) and IPFS for 4K
8. **Smart zoom adaptation** - Automatically adjusts grid density for fullscreen mode
9. **Reactive state management** - All interactive features update instantly without re-renders

---

## 🎯 User Guide

### Browsing the Collection
1. **Gallery View**: Browse all Art DeCC0s in a responsive grid
2. **Zoom Control**: Adjust slider (0%-100%) to change grid density
   - 0% = Maximum density (10 columns)
   - 55% = Default balanced view (5 columns)
   - 100% = Maximum size (1 column)
3. **Quality Toggle**: Click to cycle through 256p → 1024p → 4K
4. **Sort Options**: Choose Ascending, Descending, or Random order
5. **Infinite Scroll**: Scroll down to load more items automatically

### Interactive Features
- **✨ Hover Mode (Easter Egg)**:
  - Hover over decc0s to swap between full composite and character-only views
  - Click sparkles icon to toggle this feature on/off
  - Purple border indicates images in character-only mode

- **🖥️ Museum Mode**:
  - Click fullscreen icon to enter immersive viewing mode
  - Browser goes fullscreen with floating controls
  - Zoom automatically adjusts to maintain decc0 size
  - Exit with ESC key or close button

### Searching for DeCC0s
- **By ID**: Type a number (e.g., `420`) to find exact token
- **By Name**: Type text (e.g., `Chayachi`) to find all matching names
- Search results update instantly as you type

### Filtering by Traits
1. Open the filter sidebar (visible on desktop, toggle on mobile)
2. Select any combination of traits
3. Results update instantly
4. Click "Reset Filters" to clear all selections

### Viewing Details
1. Click any Art DeCC0 in the gallery
2. View comprehensive character information
3. Explore biography, personality, and agent profiles
4. Download full-resolution IPFS images
5. View component layers (character and background)
6. Access external links (Raster.art marketplace)

### Keyboard Shortcuts
- **ESC** - Exit Museum Mode and fullscreen
- **Scroll** - Trigger infinite loading of more items

### Tips & Tricks
- **Beta Easter Egg**: The hover-to-swap feature is enabled by default! Try hovering over decc0s to discover the character-only views
- **Quality Management**: Start at 256p for fast browsing, switch to 4K when you find favorites
- **Museum Mode**: Perfect for presentations or deep exploration - go fullscreen and adjust zoom to your preference
- **Character Collection**: Use hover mode to "paint" your favorite character-only views across the grid

---

## 📚 API & Documentation

This frontend consumes the **MOCA Codex API** built on Directus. For comprehensive API documentation, field definitions, and backend architecture:

- **API Documentation**: [docs.decc0s.com](https://docs.decc0s.com)
- **Backend Repository**: [github.com/mocaOS/codex](https://github.com/mocaOS/codex)
- **OpenAPI Spec**: See `llm.json` in this repository for endpoint details

### Key API Endpoints Used
- `GET /items/codex` - Fetch all Art DeCC0 metadata with nested thumbnail objects (full composite, character-only, background)
- `GET /items/codex/{id}` - Fetch single Art DeCC0 by token ID (includes owner information and all thumbnails)
- `GET /assets/{id}?key={preset}` - Fetch optimized images with Directus transformations
  - `?key=s256` - 256px preset (default quality)
  - `?key=s512` - 512px preset
  - `?key=s1024` - 1024px preset (high quality)
- **IPFS Gateway** - Full resolution images for 4K quality mode

---

## 🛠️ Configuration

### Updating Trait Data

The application uses two data files for filtering functionality:

1. **`assets/data/unique-traits.json`** - Contains lists of all possible trait values
2. **`assets/data/trait-counts.json`** - Contains occurrence counts for each trait (generated by script)

To refresh trait counts with the latest API data:

```bash
# Install Python dependencies (if needed)
pip3 install requests

# Run the trait count generator script
python3 scripts/generate-trait-counts.py
```

This script:
- Fetches all 10,000 Art DeCC0 tokens from the API
- Counts occurrences of each trait value across all categories
- Generates `assets/data/trait-counts.json` with counts for display in filters
- Handles the special case where Alien/Ape are in `background_category` but displayed as Characters
- Prints a summary of the rarest traits

The filter dropdowns automatically display counts next to each option (e.g., "Alien (9)", "Ape (24)").

---

### ⚠️ Data Model Inconsistency: Alien & Ape

**Important Note for Forkers**: There is an intentional data inconsistency in how Alien and Ape tokens are handled.

#### The Issue
In the MOCA Codex API, tokens have two relevant fields:
- `decc0_type` - Stores character types: "DeCC0", "Pixel DeCC0", "Toter DeCC0", "Trad. Art DeCC0", "XCOPY DeCC0"
- `background_category` - Stores background art movements AND the special "Alien"/"Ape" character types

**Alien (9 tokens)** and **Ape (24 tokens)** are ultra-rare and stored in `background_category`, not `decc0_type`.

#### Why We Override This
Because Aliens and Apes are **character types** (not background art movements) and incredibly rare, we made the UX decision to:
1. Display them in the **Character filter** dropdown (not Background)
2. Sort all filters by rarity, putting them at the top where collectors can find them easily
3. Allow multi-select with **OR logic** - selecting "Alien + Ape + XCOPY DeCC0" shows all 53 tokens (9 + 24 + 20)

#### Multi-Select OR Logic Behavior
The Character filter uses **OR logic** within the category:
- **Selecting one**: Shows only that character type
- **Selecting multiple**: Shows tokens matching **ANY** of the selected types (additive)
- **Example**: Alien (9) + Ape (24) = 33 total results
- **Example**: Alien (9) + Ape (24) + XCOPY DeCC0 (20) = 53 total results

This applies to ALL filter categories. Selections within the same category use OR logic, while filters across different categories use AND logic.

#### How It Works
Special handling code exists in **two places**:

**1. Frontend Filtering** (`pages/index.vue`, lines ~597-611):
```javascript
if (characterSet) {
  // Check if token matches ANY of the selected characters (OR logic)
  const matchesAlien = characterSet.has('Alien') && token.background_category === 'Alien';
  const matchesApe = characterSet.has('Ape') && token.background_category === 'Ape';
  const matchesNormalChar = characterSet.has(token.decc0_type);
  
  // Token must match at least one selected character
  if (!matchesAlien && !matchesApe && !matchesNormalChar) {
    return false;
  }
}
```

**2. Trait Count Generation** (`scripts/generate-trait-counts.py`, lines ~74-81):
```python
bg_value = token.get("background_category")
if bg_value:
    # Special case: Alien and Ape go to characters, not backgrounds
    if bg_value in ["Alien", "Ape"]:
        counts["characters"][bg_value] += 1
    else:
        counts["backgrounds"][bg_value] += 1
```

#### How to Disable This (Standard API Behavior)

If you fork this project and want standard filtering that matches the raw API fields:

**Step 1:** Move Alien/Ape back to backgrounds in `assets/data/unique-traits.json`:
```json
{
  "backgrounds": [
    "Abstract Expressionism",
    "African Textile",
    "Alien",           // ← Add back here
    "Ape",             // ← Add back here
    "Architecture",
    ...
  ],
  "characters": [
    "DeCC0",
    "Pixel DeCC0",
    "Toter DeCC0",
    "Trad. Art DeCC0",
    "XCOPY DeCC0"
    // Remove Alien and Ape
  ]
}
```

**Step 2:** Remove special case from `pages/index.vue` (~line 597):
```javascript
// Replace the character filter block:
if (characterSet) {
  // Check if token matches ANY of the selected characters (OR logic)
  const matchesAlien = characterSet.has('Alien') && token.background_category === 'Alien';
  const matchesApe = characterSet.has('Ape') && token.background_category === 'Ape';
  const matchesNormalChar = characterSet.has(token.decc0_type);
  
  if (!matchesAlien && !matchesApe && !matchesNormalChar) {
    return false;
  }
}

// With standard filtering (no Alien/Ape special case):
if (characterSet && !characterSet.has(token.decc0_type)) return false;
```

**Step 3:** Remove special case from `scripts/generate-trait-counts.py` (~line 74):
```python
# Replace this:
bg_value = token.get("background_category")
if bg_value:
    if bg_value in ["Alien", "Ape"]:
        counts["characters"][bg_value] += 1
    else:
        counts["backgrounds"][bg_value] += 1

# With standard counting:
bg_value = token.get("background_category")
if bg_value:
    counts["backgrounds"][bg_value] += 1
```

**Step 4:** Regenerate trait counts:
```bash
python3 scripts/generate-trait-counts.py
```

This will restore standard API field mapping where Alien/Ape appear as background options.

---

## 🤝 Contributing

**We're building in public and we need you!** Whether you're fixing a typo or adding a major feature, every contribution helps make the Codex Explorer better for everyone.

### Ways to Contribute
- 🐛 **Report bugs** - Found something broken? Let us know!
- 💡 **Suggest features** - Have an idea for better UX? Share it!
- 🎨 **Improve design** - Make it more beautiful or accessible
- ⚡ **Optimize performance** - Help us go even faster
- 📝 **Improve docs** - Better explanations help everyone
- 🔧 **Submit PRs** - Code speaks louder than words

### Development Guidelines
1. **Follow Vue 3 Composition API patterns** - Keep it clean and reactive
2. **Use TypeScript** - Type safety prevents bugs
3. **Component-first** - Reusable, focused, testable
4. **Test everywhere** - Desktop, tablet, mobile—all should shine
5. **Performance matters** - 10k items should feel instant
6. **Ship features** - Beta mindset: build, test, iterate, improve

### The Spirit
We're not just building a collection browser—we're creating a **playground for exploration**. Every interaction should feel magical. Every feature should serve the art and the characters. If it excites you, it'll probably excite others too.

---

## 🙏 Acknowledgments

Built with ❤️ for the Museum of Crypto Art community by builders who believe in the power of creative commons and open culture.

- **Art DeCC0s Collection + Codex**: [Museum of Crypto Art](https://museumofcryptoart.com)
- **Community**: All DeCC0 holders, artists, and contributors
- **Inspiration**: Every crypto artist who pioneered this movement
- **You**: For discovering these characters and building with them

## 🚀 Join the Journey

The Codex Explorer is just the beginning. We're building in public and shipping features as we discover them. Want to contribute? Have ideas for new interactions? Building something with Art DeCC0s?

- **Open an Issue**: Share bugs, ideas, or feature requests
- **Submit a PR**: Improve the code, add features, fix things
- **Build with DeCC0s**: Use these characters in your projects—they're CC0!
- **Share Your Creations**: Show us what you build with these 10,000 souls

---

**Questions or feedback?** Visit [docs.decc0s.com](https://docs.decc0s.com) or open an issue on GitHub.

**Built by builders, for builders. Art DeCC0s are CC0—use them, remix them, build with them. 🎨✨**
