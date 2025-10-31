'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendPhotoByEmail } from '@/lib/emailService';

interface ShareOptionsProps {
  compositeUrl: string;
  onBack: () => void;
}

export default function ShareOptions({ compositeUrl, onBack }: ShareOptionsProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);
    const success = await sendPhotoByEmail(email, compositeUrl);
    setIsSending(false);
    
    if (success) {
      setEmailSent(true);
    }
  };

  const handleCopyLink = () => {
    // In a real app, you'd upload the image and get a shareable URL
    // For now, we'll copy the data URL (truncated) or suggest download
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    // In a real app, you'd use the Web Share API or platform-specific URLs
    const text = `Check out my FrameLab photo strip! 📸✨`;
    const url = window.location.href;

    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct link sharing, so we'll use download
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'tiktok':
        window.open(`https://www.tiktok.com/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'threads':
        window.open(`https://www.threads.net/?text=${encodeURIComponent(text)}`, '_blank');
        break;
    }
  };

  return (
    <div className="min-h-screen gradient-pastel p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800 underline flex items-center gap-2"
        >
          ← Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Share Your Photo Strip
          </h2>

          {/* Preview */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={compositeUrl}
              alt="Photo strip"
              className="w-full"
            />
          </div>

          {/* Social Sharing */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Share to Social</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'instagram', name: 'Instagram', icon: '📷' },
                { id: 'tiktok', name: 'TikTok', icon: '🎵' },
                { id: 'twitter', name: 'X', icon: '🐦' },
                { id: 'threads', name: 'Threads', icon: '🧵' },
              ].map((platform) => (
                <motion.button
                  key={platform.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => shareToSocial(platform.id)}
                  className="bg-gradient-to-br from-pastel-pink to-pastel-lavender p-4 rounded-2xl text-center hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <div className="text-sm font-semibold">{platform.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Copy Link</h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              className="w-full bg-purple-100 text-purple-700 px-6 py-4 rounded-2xl font-semibold hover:bg-purple-200 transition-all"
            >
              {copied ? '✓ Link Copied!' : '📋 Copy Link'}
            </motion.button>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Email to Yourself</h3>
            {emailSent ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-2xl text-center">
                ✉️ Email sent! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSending}
                  className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Send 📧'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

