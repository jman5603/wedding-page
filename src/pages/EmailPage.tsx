import React, { useState } from 'react';
import '../styles/EmailPage.css';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3001';

export function convertTextToHtml(text: string): string {
  if (!text) return '';
  // Split on two-or-more newlines into paragraphs
  const paragraphs = text.split(/\n{2,}/g).map(p => p.trim()).filter(Boolean);
  const html = paragraphs.map(p => {
    // Replace single newlines with <br /> within a paragraph
    const withBreaks = p.replace(/\n/g, '<br />');
    return `<p>${withBreaks}</p>`;
  }).join('\n');
  return html;
}

const EmailPage: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSuccess(null);
    setError(null);

    // Simple validation
    if (!recipient.trim()) { setError('Recipient is required.'); return; }
    if (!subject.trim()) { setError('Subject is required.'); return; }
    if (!body.trim()) { setError('Body is required.'); return; }

    const html = convertTextToHtml(body);
    const payload = { recipient: recipient.trim(), subject: subject.trim(), messageBody: body, html };

    setSending(true);
    try {
      const res = await fetch(`${BACKEND_API_URL}/api/send-guest-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to send message');
      }
      setSuccess('Message sent successfully.');
      setRecipient('');
      setSubject('');
      setBody('');
    } catch (err: any) {
      setError(err?.message || 'Error sending message');
    }
    setSending(false);
  };

  return (
    <div className="Page email-page">
      <div className="email-container">
        <h2>Email Guest</h2>
        <form className="email-form" onSubmit={handleSend}>
          <label htmlFor="recipient">Recipient</label>
          <input
            id="recipient"
            type="email"
            placeholder="guest@example.com"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            placeholder={`Write your message here...`}
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={10}
          />

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-actions">
            <button type="submit" className="send-button" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPage;
