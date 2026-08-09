<div align="center">
  <img src="public/icon.svg" width="100" height="100" alt="Nazar Logo" />
  <h1>Nazar</h1>
  <p><em>India's Consumer Opportunity Radar</em></p>
  
  <br/>
  
  <p>
    <a href="https://nazar-liard.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-View_Project-purple?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/TailwindCSS-Styled-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Status-Active Prototype-success?style=flat-square" alt="Status" />
  </p>
</div>

<br/>

## 🎯 What is Nazar?

Nazar is a comprehensive AI-powered consumer intelligence and market research platform tailored specifically for the Indian market. It aggregates, analyzes, and synthesizes consumer signals from across the web (such as social chatter, search intent, and product reviews) to detect emerging patterns, consumer tensions, and unmet needs *before* they become mainstream.

Designed for venture studios, product managers, and brand builders, Nazar converts raw internet noise into structured, evidence-backed product opportunities.

---

## ✨ Core Features & Capabilities

### 1. The Ask Nazar AI Workspace
A premium, conversational AI interface that acts as a dedicated market research analyst.
* **Conversational Discovery:** Ask open-ended questions like *"What are the unmet needs of Gen-Z in Tier-2 cities?"* and receive structured, synthesized answers.
* **Smart Composers:** Built-in toggles for **Web Search** and **Deep Research** modes to adjust the depth of the AI's analysis.
* **Conversation History:** Seamlessly caches and resumes past research sessions in the sidebar.

### 2. Opportunity Detection Engine
Nazar moves beyond raw data to provide actionable business opportunities.
* **Opportunity Scoring:** Opportunities are scored out of 100 based on search intent, price sensitivity gaps, repeat purchase intent, and regional spread.
* **Dynamic Dashboards:** View trending signals, tracking momentum (e.g., +34% growth this month) across various consumer categories like *Food & Beverage* and *Beauty & Personal Care*.

### 3. Deep Evidence Tracking
Every insight in Nazar is fully transparent and traceable.
* **Signal Breakdowns:** See exactly where the data came from (Google Trends, Reddit, YouTube, e-commerce reviews).
* **Consumer Quotes:** Read actual verbatim complaints and requests from consumers to understand the *why* behind the data.
* **Competitor Mapping:** Understand the current market landscape and where existing products are failing.

### 4. Regional & Tier-2 Focus
Recognizing that India's fastest growth is outside its metro hubs, Nazar provides dedicated regional filtering to track signal momentum in Tier-2 and Tier-3 cities (e.g., Ahmedabad, Surat).

---

## 🏗️ Architecture & Tech Stack

Nazar is built as a highly responsive, modern Single Page Application (SPA) utilizing modern React paradigms.

### Tech Stack
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (with complex custom micro-interactions in `globals.css`)
* **UI Primitives:** Radix UI / shadcn/ui components
* **Icons:** Lucide React

### Project Structure
<details>
<summary>Click to expand folder structure</summary>

```text
nazar/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── ask/              # Ask Nazar AI Workspace route
│   ├── categories/       # Category exploration routes
│   ├── cities/           # Regional & Tier-2 tracking routes
│   ├── opportunities/    # Deep dive opportunity routes
│   └── page.tsx          # Main Dashboard
├── components/           # Reusable UI Components
│   ├── app-shell.tsx     # Global layout wrapper, header, and search
│   ├── app-sidebar.tsx   # Collapsible global navigation sidebar
│   ├── ask/              # AI Chat specific components (Message bubbles, etc.)
│   ├── dashboard/        # Charts and signal drawers
│   └── ui/               # Core UI primitive components (Buttons, Inputs, etc.)
├── lib/                  # Utilities & Data
│   ├── mock-data.ts      # Comprehensive mock database (Opportunities, Signals, Chat logic)
│   └── utils.ts          # Tailwind merge utilities (cn function)
└── public/               # Static assets (Logos, SVGs)
```
</details>

---

## 🎨 UI & UX Philosophy

Nazar employs a **Premium, Dark-Themed Aesthetic** designed to feel like a high-end enterprise tool:
* **Glassmorphism & Blurs:** Heavy use of backdrop blurs (`backdrop-blur-sm`), semi-transparent overlays (`bg-primary/10`), and subtle borders to create depth.
* **Micro-interactions:** Custom CSS transitions (like `.card-hover` bulging effects and `.animate-fade-in` typing effects) make the interface feel alive and highly responsive.
* **Clean Layouts:** A focus on typography (Inter/system fonts), ample whitespace, and strict alignment to make dense data easily readable.

---

## 🚀 Getting Started

To run the Nazar prototype locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/Manwikkk/nazar.git
cd nazar
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 🔌 Future Integration Roadmap

Currently, Nazar operates as a **Frontend Prototype** utilizing a robust mock data layer (`lib/mock-data.ts`). To transition this to a fully production-ready application, the following backend architecture is recommended:

1. **AI Integration:** Swap the `generateMockResponse` function in `mock-data.ts` with server actions that query the OpenAI API (GPT-4o) or Anthropic Claude API via Vercel AI SDK.
2. **Database:** Migrate the `opportunities` and `weeklySignals` arrays to a PostgreSQL database (e.g., Supabase or Neon).
3. **Real-time Signals:** Implement a web-scraping/API aggregation microservice (using Python/Scrapy or Apify) to pull live Reddit, Twitter, and Google Trends data into the database.
4. **Authentication:** Integrate NextAuth.js or Clerk to manage user profiles (replacing the static "Keya Trivedi" placeholder) and secure saved insights.

<br/>

<div align="center">
  <hr/>
  <p><sub>Developed for the future of Indian Consumer Intelligence.</sub></p>
</div>
