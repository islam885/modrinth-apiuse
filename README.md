# Mod Browser Web 🛠️

A high-performance, strictly minimalist web interface for discovering and managing Minecraft modifications. Powered by the **Modrinth API**, this application provides a professional-grade experience for power users who value speed, clarity, and deep filtering.

## 🌌 Design Philosophy: Strict Dark Minimalism

This project adheres to a uncompromising aesthetic of functional elegance:
- **Palette:** Step-weighted monochrome surfaces starting from background `#0c0c0c` to surface `#2a2a2a`.
- **Separation:** Elements are defined exclusively through sharp `1px solid #222` borders. No shadows, no blurs.
- **Typography:** 
    - **DM Sans** for primary UI interactions with tight letter-spacing on headers.
    - **DM Mono** for all technical data, version numbers, and statistics.
- **Interaction:** Flat, high-response components. No "bounce" animations—only lightning-fast state transitions and clean fade-ins.

## ✨ Key Features

### 🔍 Advanced Discovery
- **Granular Filtering:** Filter by Minecraft version, Mod loader (Fabric, Quilt, NeoForge, Forge, etc.), Categories, Environment (Client/Server), and License (Open Source toggle).
- **Sorted Results:** View mods in a strict 3x3 grid designed for maximum information density without clutter.

### 📜 Total Version Purification
- **Smart Parsing:** An aggressive parsing engine that strips redundant noise (loader suffixes, mod titles, MC prefixes) to show only the clean build number.
- **Stability Logic:** Versions are automatically grouped and color-coded by stability:
    - 🟢 **Release**
    - 🟠 **Beta/Pre-release**
    - 🔴 **Alpha**
- **Priority Sorting:** Intelligent sorting that prioritizes stability (Releases first) and loader relevance (Fabric > Quilt > NeoForge > Forge).

### 🖥️ Premium Detailed View
- **Full-Page Experience:** Deep-dive into mod details with a full-screen layout.
- **Stats Dashboard:** High-visibility counters for downloads and followers using mono-spaced typography.
- **Responsive Controls:** Quick-access buttons for Modrinth integration and a local Favorites system.

## 🛠️ Technical Stack

- **Framework:** [React 18+](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)
- **API:** [Modrinth API v2](https://docs.modrinth.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS3 with custom variables and grid-based layouts.
- **HTTP Client:** [Axios](https://axios-http.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mod-browser-web.git
   ```
2. Navigate to the directory:
   ```bash
   cd mod-browser-web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/App.tsx`: Core application logic, API orchestration, and state management.
- `src/App.css`: Implementation of the Strict Dark Minimalism design system.
- `src/main.tsx`: Application entry point.

---
*Created with a focus on precision and performance.*
