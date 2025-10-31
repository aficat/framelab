import emailjs from '@emailjs/browser';

// Initialize EmailJS (these should be environment variables)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export const sendPhotoByEmail = async (
  email: string,
  photoDataUrl: string,
  subject: string = 'Your FrameLab Photo Strip'
): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error('EmailJS configuration missing');
    return false;
  }

  try {
    // Convert data URL to blob for email attachment (if supported)
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        subject,
        message: 'Check out your FrameLab photo strip!',
        photo_url: photoDataUrl, // Note: EmailJS may need backend for attachments
        from_name: 'FrameLab',
      },
      EMAILJS_PUBLIC_KEY
    );

    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Alternative: Download photo as attachment and open email client
export const openEmailClientWithPhoto = (photoDataUrl: string): void => {
  const link = document.createElement('a');
  link.href = `mailto:?subject=My%20FrameLab%20Photo%20Strip&body=Check%20out%20my%20photo%20strip!%20Attachment%20included.`;
  // For actual attachment, user would need to download and attach manually
  // or use a backend service
  link.click();
};

