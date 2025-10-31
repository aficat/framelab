# FrameLab

**Snap. Style. Share your vibe.**

FrameLab is a cute, Gen Z-style PWA photobooth app that lets users capture aesthetic photo strips or collages in real-time.

## Features

- 📸 Real-time photobooth capture with countdown timer
- 🎨 Curated frame templates (Pop Icons, Gen Z Aesthetic, Seasonal)
- 📱 Multiple layout options (3-frame strip, 4-frame collage, 2x2 grid)
- 🌈 Portrait and landscape orientations
- ✨ Photo editing and filters
- 📥 Download and share functionality
- 📧 Email delivery option (optional)
- 📱 PWA support (offline-ready, installable)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Camera:** react-webcam
- **Image Processing:** Canvas API
- **Email:** (optional)
- **Animations:** Framer Motion

## Project Structure

```
framelab/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── public/
│   ├── frames/           # Frame templates
│   └── icons/            # PWA icons
└── package.json
```

