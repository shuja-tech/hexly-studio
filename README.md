# Hexly — Web & Design Studio

<div align="center">

[![Production URL](https://img.shields.io/badge/Live%20Demo-hexly--studio.vercel.app-blue?style=for-the-badge)](https://hexly-studio.vercel.app/)

Modern, responsive web & design studio website built with React, Vite, and Tailwind CSS. Features an intelligent AI chat assistant, animated hex grid canvas, and seamless contact form integration.

[Live Demo](https://hexly-studio.vercel.app/) • [Features](#features) • [Tech Stack](#tech-stack) • [Setup Guide](#quick-start) • [Architecture](#architecture)

</div>

---

## 🎯 Features

### 🌐 Responsive Landing Page
- **Modern UI Design** - Clean, professional interface with gradient accents and smooth animations
- **Mobile-First Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Framer Motion-powered transitions and scroll effects
- **Hero Section** - Eye-catching header with hero visual and call-to-action
- **Portfolio Showcase** - Display of past projects with beautiful image galleries
- **Services Showcase** - Organized presentation of services offered:
  - Web Design & Development
  - Branding & Visual Identity
  - UI & Strategy

### 🤖 AI Chat Assistant (Hexly AI)
- **Real-Time Chat Interface** - Interactive conversational widget powered by Dify AI
- **Persistent Conversations** - Conversation history maintained via conversation IDs
- **Voice Integration** - Voice chat capability via Omnidim voice widget
- **Smart Context Awareness** - Tracks user interactions and provides contextual responses
- **Serverless Backend** - Runs on Vercel's serverless functions with zero cold-start latency
- **Production-Ready** - Enterprise-grade error handling and message validation

### 📞 Contact Form
- **Multi-Field Form** - Name, email, subject, and message inputs
- **Form Validation** - Client-side validation for data integrity
- **Email Integration** - Powered by Formspree for reliable email delivery
- **Accessibility** - Semantic HTML and ARIA-compliant form elements

### 🎨 Visual Components
- **Hex Grid Canvas** - Animated, interactive hexagonal grid background
- **Logo Display** - Custom branding with professional logo placement
- **Motion Graphics** - Performance-optimized animations using Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library with hooks and concurrent features
- **Vite 8.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.2** - Utility-first CSS framework with PostCSS integration
- **Framer Motion 12.38** - Advanced animation library for React
- **ESLint 10.2** - Code quality and consistency linting

### Backend
- **Node.js/Express 5.2** - Serverless functions via Vercel (production)
- **Express 5.2** - HTTP server framework (local development)
- **CORS 2.8** - Cross-origin resource sharing middleware
- **Dotenv 17.4** - Environment variable management

### External Services
- **Dify AI API** - Intelligent chatbot backend with conversation management
- **Formspree** - Contact form email delivery service
- **Omnidim** - Voice widget integration for voice chat functionality

### Build & Deployment
- **Vercel** - Serverless deployment platform
- **PostCSS 8.5** - CSS transformations and autoprefixing
- **Autoprefixer 10.5** - Vendor prefix generation

---

## 📂 Project Structure

```
hexly/
├── src/
│   ├── App.jsx                      # Main app component (UI, routing, contact form)
│   ├── main.jsx                     # React entry point
│   ├── index.css                    # Global styles
│   ├── App.css                      # App-specific styles
│   ├── components/
│   │   ├── ChatAgent.jsx            # AI chat widget component
│   │   └── HexGridCanvas.jsx        # Animated hex grid background
│   └── assets/                      # Images and static files
├── api/
│   └── index.js                     # Vercel serverless function for /api/chat endpoint
├── public/                          # Static assets
├── vite.config.js                   # Vite build configuration
├── vercel.json                      # Vercel deployment configuration
├── postcss.config.js                # PostCSS configuration for Tailwind
├── eslint.config.js                 # ESLint rules
├── package.json                     # Dependencies and scripts
├── index.html                       # HTML entry point
└── README.md                        # This file
```

---

## 🏗️ Architecture & How It Works

### Frontend Flow
```
Browser
  ├── index.html (loaded)
  ├── App.jsx (rendered)
  │   ├── HexGridCanvas (animated background)
  │   ├── Service cards (static content)
  │   ├── Portfolio section (image galleries)
  │   ├── Contact form (email submission)
  │   └── ChatAgent widget (AI interaction)
  └── Framer Motion (animations)
```

### AI Chat Flow
```
User Input
  ↓
ChatAgent.jsx (frontend)
  ↓
POST /api/chat (Vercel serverless)
  ↓
api/index.js (Node.js handler)
  ↓
Dify AI API (backend AI service)
  ↓
Response with answer + conversation_id
  ↓
ChatAgent renders message
  ↓
Conversation ID stored for context
```

### Contact Form Flow
```
Form Submission
  ↓
Client-side validation
  ↓
POST to Formspree endpoint
  ↓
Formspree sends email
  ↓
Success message displayed
```

### Deployment Architecture
```
GitHub Repository
  ↓
Vercel Auto-Deploy
  ├── Frontend (React + Vite build → static hosting)
  └── API Routes (api/index.js → serverless functions)
  
Environment Variables (Vercel Dashboard)
  └── DIFY_API_KEY → secure API access
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hexly.git
   cd hexly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional, for local development)
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Development Scripts

```bash
# Start Vite dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint code quality checks
npm lint
```

---

## 🌍 Production Deployment

### Live URL
**[https://hexly-studio.vercel.app/](https://hexly-studio.vercel.app/)**

### Deploying to Vercel

1. **Connect Repository**
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel auto-detects React + Vite configuration

2. **Set Environment Variables**
   In your Vercel project settings, add:
   ```
   DIFY_API_KEY=your_dify_api_key_here
   ```

3. **Configure API Routes**
   - Vercel automatically maps `api/index.js` to `/api/chat` (configured in `vercel.json`)
   - No additional configuration needed

4. **Deploy**
   - Automatic deploys on push to main branch
   - Manual deploys via Vercel dashboard
   - Preview URLs for pull requests

### Verifying Production

After deployment, verify:
- ✅ Landing page loads with animations
- ✅ Chat widget appears and sends messages (check `/api/chat` endpoint)
- ✅ Contact form submits and sends emails
- ✅ Voice chat loads (Omnidim widget)
- ✅ Responsive design works on mobile/tablet

---

## 🔧 Configuration

### API Endpoints

#### Chat Endpoint (`/api/chat`)
- **Method:** POST
- **Request:**
  ```json
  {
    "query": "Your message here",
    "conversation_id": "optional_conversation_id",
    "user": "web_visitor"
  }
  ```
- **Response:**
  ```json
  {
    "answer": "AI response",
    "conversation_id": "persistent_conversation_id"
  }
  ```

### Environment Variables

```env
# Required for production
DIFY_API_KEY=your_dify_api_key

# Optional (auto-detected as 3000 if not set)
PORT=3000
```

### Tailwind CSS Customization

Edit `tailwind.config.js` to customize:
- Color schemes
- Spacing
- Typography
- Breakpoints

---

## 🎨 Customization

### Modify Services
Edit `src/App.jsx` → `services` array to update offered services

### Update Portfolio
Edit `src/App.jsx` → `portfolioItems` array to showcase your projects

### Change Colors
Update Tailwind classes in components (e.g., `bg-blue-600`, `text-slate-300`)

### Add New Sections
Create components in `src/components/` and import into `App.jsx`

---

## 🐛 Troubleshooting

### Chat widget not working
- Check `DIFY_API_KEY` is set in Vercel
- Verify `/api/chat` endpoint responds: `curl https://hexly-studio.vercel.app/api/chat`
- Check browser console for CORS errors

### Contact form not sending
- Verify Formspree account and form setup
- Check email address in form configuration
- Confirm form submission in Formspree dashboard

### Build fails
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 16+)
- Review build logs in Vercel dashboard

### Slow performance
- Check Lighthouse: `npm run build` then `npm run preview`
- Optimize images (use Unsplash/optimized sources)
- Monitor Core Web Vitals in Vercel Analytics

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first
- Include screenshots/error logs when reporting bugs

---

## 🚀 Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Blog/Articles section
- [ ] Team member profiles
- [ ] Client testimonials carousel
- [ ] Analytics dashboard
- [ ] CMS integration

---

<div align="center">

**Made with ❤️ for web & design studios**

[Visit Live Site](https://hexly-studio.vercel.app/) • [Report Bug](https://github.com/yourusername/hexly/issues) • [Request Feature](https://github.com/yourusername/hexly/issues)

</div>

