/**
 * Central Mail & Communication Utility
 * Ensures 100% reliable email actions across all browsers and operating systems (Windows, Mac, Mobile).
 * Direct mailto: links often fail silently on Windows if no desktop client (like Outlook) is configured.
 * This utility provides direct Gmail web compose URLs, native mailto fallbacks, and clipboard copying.
 */

export const GUNAJ_EMAIL = "gunnajpchugh@gmail.com";

// Determine backend API URL based on environment (defaults to Render production endpoint)
export const BACKEND_API_URL =
  import.meta.env.VITE_BACKEND_URL || "https://gunaj-chugh.onrender.com";

/**
 * Builds a direct Gmail web compose URL.
 * Guaranteed to open in any desktop or mobile browser with Gmail prefilled.
 */
export function getGmailComposeUrl({
  to = GUNAJ_EMAIL,
  subject = "",
  body = "",
}) {
  const encTo = encodeURIComponent(to);
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encTo}&su=${encSubject}&body=${encBody}`;
}

/**
 * Standard mailto: URL for users who have a native desktop mail client (Apple Mail, Outlook, Thunderbird).
 */
export function getMailtoUrl({
  to = GUNAJ_EMAIL,
  subject = "",
  body = "",
}) {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encSubject}&body=${encBody}`;
}

/**
 * Directly opens Gmail compose in a new browser tab.
 */
export function openGmailCompose({
  to = GUNAJ_EMAIL,
  subject = "",
  body = "",
}) {
  const url = getGmailComposeUrl({ to, subject, body });
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Copies text to clipboard with modern navigator API + fallback.
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.warn("Clipboard copy failed:", err);
    return false;
  }
}
