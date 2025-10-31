# FrameLab Setup Guide

## 🎉 Project Status

FrameLab is fully scaffolded with all core features implemented! Here's what's been built:

### ✅ Completed Features

1. **Project Structure**
   - Next.js 14 with App Router
   - TypeScript configuration
   - Tailwind CSS with custom Gen Z color palette
   - PWA configuration files

2. **Core Components**
   - Landing page with aesthetic preview
   - Layout picker (3-strip, 4-collage, 2x2-grid)
   - Frame selector with categories
   - Camera capture with countdown timer
   - Photo review and retake functionality
   - Share options (download, email, social links)

3. **State Management**
   - Zustand store for photobooth state
   - Complete type definitions

4. **Image Processing**
   - Canvas API compositing
   - Filter effects (warm, cool, B&W, film grain)
   - Frame overlay support

5. **PWA Features**
   - Manifest.json
   - Service worker (basic offline support)
   - Installable app configuration

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables (Optional)

If you want email functionality, create a `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [EmailJS](https://www.emailjs.com/). Email feature will gracefully degrade if not configured.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Next Steps

### Required: Add PWA Icons

Create icon files in `public/icons/`:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

You can use a tool like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) to generate these from a single source image.

### Required: Add Frame Assets

Frame overlays should be placed in `public/frames/`:

**Structure:**
```
public/
  frames/
    ribbon-pastel.svg
    sparkle-dreams.svg
    film-grain.svg
    taylor-swift.svg
    sabrina.svg
    olivia.svg
    valentines.svg
    spotify.svg
    classic-white.svg
  frames/preview/
    ribbon-pastel.png
    sparkle-dreams.png
    ...
```

Frame files are referenced in `src/lib/frames.ts`. You can:
1. Use existing SVG/PNG overlays
2. Create custom frame designs
3. Update frame paths in `src/lib/frames.ts` to match your assets

### Recommended: Enhance Service Worker

The current service worker is basic. Consider adding:
- Cache strategies for frame assets
- Offline photo storage
- Background sync for email sending

### Recommended: Add More Features

1. **Limited Edition Series System**
   - Payment integration (Stripe/PayPal)
   - Series unlock mechanism
   - User authentication (optional)

2. **Enhanced Editing**
   - Brightness/contrast sliders
   - Sticker/emoji library
   - Text captions

3. **Social Integration**
   - Web Share API
   - Direct upload to platforms
   - QR code generation for sharing

4. **Analytics**
   - Track user sessions
   - Monitor popular frames
   - Conversion tracking for Limited Edition Series

## 🐛 Known Issues / Limitations

1. **Frame Overlays**: Currently, frame overlays will fail silently if not found. Add proper error handling and fallback frames.

2. **Camera Permissions**: On some browsers/devices, camera access requires HTTPS. Use a local SSL tunnel or deploy to test.

3. **Email Attachments**: EmailJS free tier has limitations. Consider a backend solution for proper image attachments.

4. **Canvas Rounding**: Some browsers may not support `roundRect()` - add polyfill if needed.

## 📱 Testing

### Desktop Testing
- Works in Chrome, Firefox, Safari, Edge
- Requires camera permission
- PWA install via browser menu

### Mobile Testing
- iOS Safari: Supports PWA, camera, install
- Android Chrome: Full PWA support
- Test on real devices for best camera experience

### Browser Compatibility
- Camera: Chrome 63+, Safari 11+, Firefox 36+
- PWA: Chrome 67+, Safari 11.3+, Edge 79+
- Canvas: All modern browsers

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the Gen Z color palette:
```js
colors: {
  'pastel-lavender': '#E6D9F2',
  'pastel-beige': '#F5E6D3',
  // ... add more
}
```

### Layouts
Add new layouts in `src/lib/layouts.ts`:
```ts
{
  id: 'custom-layout',
  name: 'Custom Layout',
  description: 'Your description',
  orientation: 'portrait',
  photoCount: 6,
}
```

### Frames
Add frames in `src/lib/frames.ts` following the existing pattern.

## 📦 Build for Production

```bash
npm run build
npm start
```

For deployment:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting service

## 🆘 Troubleshooting

**Camera not working?**
- Check browser permissions
- Try HTTPS (required for some browsers)
- Test on mobile device

**Icons not showing?**
- Ensure all icon sizes are in `public/icons/`
- Check `manifest.json` paths

**Frames not loading?**
- Verify frame files exist in `public/frames/`
- Check browser console for errors
- Ensure paths in `src/lib/frames.ts` are correct

**PWA not installable?**
- Must be served over HTTPS (except localhost)
- Check `manifest.json` is valid
- Service worker must be registered

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [WebRTC Camera API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [EmailJS Docs](https://www.emailjs.com/docs/)

---

**Need Help?** Check the code comments or refer to the PRD for feature requirements.

