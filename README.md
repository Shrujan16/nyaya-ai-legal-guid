# NyayaAI – Legal Help Made Simple with AI

**NyayaAI** is an AI-powered legal assistant web application designed to make legal help accessible, understandable, and simple for everyone. Users can ask legal questions, generate essential legal documents, and educate themselves on their fundamental rights—all in one centralized, user-friendly platform.

🌍 **Live Application:** [nyayaaiworld.com](https://nyayaaiworld.com)

## ✨ Core Features

- **🤖 AI Legal Assistant (`/chat`):** Chat interactively with an AI trained to answer legal queries, provide guidance, and clarify complex legal jargon.
- **📄 Document Generation (`/documents`):** Effortlessly generate standardized legal documents and templates.
- **⚖️ Know Your Rights (`/rights`):** A dedicated educational hub for users to learn about their fundamental rights and civic duties.
- **📱 Responsive Design:** A fully responsive, modern user interface that works flawlessly across desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

This project is built using a modern, robust web development stack:

- **Frontend Framework:** React 18 with Vite and TypeScript
- **Styling:** Tailwind CSS, `tailwindcss-animate`
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Routing:** React Router DOM
- **State Management & Data Fetching:** React Query (`@tanstack/react-query`)
- **Backend & Database:** Supabase (`@supabase/supabase-js`)
- **Form Handling & Validation:** React Hook Form, Zod
- **Icons:** Lucide React

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A package manager like `npm`, `yarn`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shrujan16/nyaya-ai-legal-guid.git
   cd nyaya-ai-legal-guid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the necessary environment variables for Supabase:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: Check the existing `.env` or `.env.example` file if available for any additional required variables).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available locally at `http://localhost:5173`.

## 📁 Project Structure

```text
├── public/               # Static assets (images, icons, etc.)
├── src/
│   ├── assets/           # Application assets
│   ├── components/       # Reusable React components (UI components, Navbar, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Third-party API and service integrations (e.g., Supabase)
│   ├── lib/              # Utility functions and library wrappers
│   ├── pages/            # Application routes (Home, Chat, Documents, Rights, etc.)
│   ├── App.tsx           # Main application component and routing configuration
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global CSS and Tailwind directives
├── supabase/             # Supabase configuration and edge functions
├── index.html            # Vite entry HTML
├── package.json          # Project metadata and dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```
