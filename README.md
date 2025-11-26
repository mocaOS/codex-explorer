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
- **Three sort modes**: Ascending, Descending, and True Random
- **Dynamic zoom control** - 0% to 100% zoom slider (10 columns to 1 column)
- **Quality selector** - Switch between 256p, 1024p, and 4K (full IPFS resolution)
- **Sticky control bar** - Controls stay visible while scrolling for quick adjustments
- **Filter toggle** - Show/hide sidebar in both normal and museum modes
- **Optimized image delivery** via Directus asset transformations and IPFS gateway
- **Single API call architecture** - loads entire collection once for blazing-fast performance

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
- **Real-time trait filtering** across 8 categories:
  - Character Type (5 types)
  - Background Style (18 art movements)
  - Background Texture (7 textures)
  - Mood (3 emotional states)
  - DNA Lineage (17 historical collectors)
  - DNA Memetic (17 crypto culture references)
  - DNA Artist Self-Portrait (20 famous artists)
  - DNA MOCA Collection (71 artists from MOCA Genesis)
- **Client-side filtering** for instant results (no loading delays)
- **Combinable filters** - mix and match any traits for precise discovery

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
- **Server-Side Rendering** - Nuxt 3 SSR with Vue 3 Composition API for optimal performance
- **Optimized Data Loading** - Fetches all 10k items in one call (~2-3 seconds)
- **Virtual Pagination** - Displays 36 items at a time, increases on scroll
- **Client-Side Interactivity** - All filtering, sorting, searching, and effects happen instantly
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
1. **Initial Load**: Single API call to `https://api.decc0s.com/items/codex` fetches all 10,000 items with complete metadata (thumbnails for full composite, character-only, and background layers)
2. **Client-Side Processing**: All filtering, sorting, and searching happens in-browser with no additional API calls
3. **Virtual Rendering**: Only visible items (36 at a time) are rendered to the DOM
4. **Infinite Scroll**: Display count increases by 36 as user scrolls
5. **Dynamic Asset Loading**: Images load at current quality setting (256p/1024p/4K) with lazy loading
6. **Interactive State Management**: Hover states, zoom levels, and quality preferences managed client-side
7. **Fullscreen Integration**: Browser Fullscreen API triggered for Museum Mode with state synchronization

### Technology Stack
- **Framework**: Nuxt 3 with Server-Side Rendering (SSR)
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: Vue 3 Composition API with reactive refs
- **Data Fetching**: TanStack Query (Vue Query) for caching and state
- **API Client**: Axios
- **Image Processing**: Directus asset transformations

### Key Components
- `pages/index.vue` - Gallery view with filtering, zoom, quality, and interactive features
- `pages/[tokenId].vue` - Detailed character profile page with hover preview
- `components/filters/FilterSidebar.vue` - Filter controls and search
- `components/ui/*` - Reusable UI components (Table, Button, Input, Skeleton)
- `layouts/default.vue` - App layout with fullscreen state management

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
1. **Loading all data upfront** - Single 10k item fetch (~2-3 seconds) includes all metadata
2. **Virtual pagination** - Only renders visible items (36 at a time)
3. **Pure JavaScript filtering** - No API calls for filter/sort/search changes
4. **Dynamic quality loading** - Starts at 256p for fast initial load, upgradeable to 4K
5. **Optimized asset delivery** - Uses Directus transformations (256px, 1024px) and IPFS for 4K
6. **Client-side caching** - TanStack Query prevents unnecessary re-fetches
7. **Smart zoom adaptation** - Automatically adjusts grid density for fullscreen mode
8. **Reactive state management** - All interactive features update instantly without re-renders

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
To refresh the filter options with latest trait values:

The application includes pre-generated unique trait values in `assets/data/unique-traits.json` for filtering functionality.

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
