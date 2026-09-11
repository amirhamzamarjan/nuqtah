import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Contact Nuqtah
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            Direct Concierge & Boutique Location
          </h1>
          <p className="text-sm sm:text-base text-[#5C5247] font-light max-w-lg mx-auto leading-relaxed">
            We welcome inquiries regarding boutique orders, bespoke sizing, media collaborations, or scholarly submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-semibold text-[#241F1B]">NUQTAH SHOP</h2>
            <p className="text-xs sm:text-sm text-[#5C5247] font-light leading-relaxed">
              Our boutique concierge assists with WhatsApp ordering, size verification, and direct order fulfillment.
            </p>

            <div className="space-y-4 pt-2">
              {/* Physical Shop Location */}
              <div className="flex items-start space-x-4 p-5 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm">
                <MapPin className="w-5 h-5 text-[#A6854F] mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-xs">
                  <h4 className="uppercase tracking-widest text-[#877B6E] font-mono font-semibold">Boutique Address</h4>
                  <p className="text-sm font-serif font-medium text-[#241F1B] leading-relaxed">
                    {APP_CONFIG.address.shopNo}, {APP_CONFIG.address.market}<br />
                    {APP_CONFIG.address.area}<br />
                    {APP_CONFIG.address.postalCode}<br />
                    {APP_CONFIG.address.country}
                  </p>
                  <a
                    href={APP_CONFIG.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-[#A6854F] hover:underline font-semibold pt-2"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Concierge */}
              <div className="flex items-start space-x-4 p-5 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm">
                <MessageCircle className="w-5 h-5 text-emerald-800 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-xs">
                  <h4 className="uppercase tracking-widest text-[#877B6E] font-mono font-semibold">WhatsApp Concierge</h4>
                  <div className="text-sm font-mono font-bold text-[#241F1B]">
                    {APP_CONFIG.whatsAppNumber}
                  </div>
                  <a
                    href={`https://wa.me/${APP_CONFIG.whatsAppInternational}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-emerald-800 hover:underline font-semibold pt-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Email Correspondence */}
              <div className="flex items-start space-x-4 p-5 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm">
                <Mail className="w-5 h-5 text-[#A6854F] mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-xs">
                  <h4 className="uppercase tracking-widest text-[#877B6E] font-mono font-semibold">Official Email</h4>
                  <div className="text-sm font-mono text-[#241F1B] font-medium">
                    {APP_CONFIG.supportEmail}
                  </div>
                  <a
                    href={`mailto:${APP_CONFIG.supportEmail}`}
                    className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-[#A6854F] hover:underline font-semibold pt-1"
                  >
                    <span>Send Message</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#FDFBF7] rounded-sm p-6 sm:p-8 border border-[#322C26]/10 shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#A6854F]" />
                <h3 className="text-xl font-serif font-semibold text-[#241F1B]">Message Received</h3>
                <p className="text-xs text-[#5C5247] leading-relaxed max-w-xs font-light">
                  Thank you for reaching out. We will review your correspondence and respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-[#A6854F] underline font-mono font-semibold pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#5C5247] font-mono font-semibold block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#322C26]/15 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none"
                    placeholder="e.g. Marjan Rahman"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[#5C5247] font-mono font-semibold block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#322C26]/15 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[#5C5247] font-mono font-semibold block mb-1.5">
                    Subject / Area
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#322C26]/15 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none"
                    placeholder="Boutique inquiry / Media collaboration"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-[#5C5247] font-mono font-semibold block mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#322C26]/15 rounded-sm text-sm text-[#241F1B] focus:border-[#A6854F] focus:bg-white focus:outline-none"
                    placeholder="Write your note here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#241F1B] hover:bg-[#352E28] text-[#FAF6F0] font-bold text-xs tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>Send Correspondence</span>
                  <Send className="w-3.5 h-3.5 text-[#A6854F]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
