import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Check, Sparkles } from 'lucide-react';
import { InfoModalType } from '../types';

interface FooterProps {
  onOpenInfoModal: (type: InfoModalType) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfoModal, onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1e1b18] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white uppercase block">
              AURA ATELIER
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-md">
              Aura Atelier is a contemporary fashion house dedicated to crafting timeless, elegant dresses and gowns. Designed with luxury fabrics, hand-finished detailing, and a commitment to sustainable craftsmanship.
            </p>

            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription Box */}
          <div className="lg:col-span-7 bg-stone-900/80 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-4">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Join The Atelier VIP List</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
              Enjoy 15% Off Your First Couture Order
            </h3>

            <p className="text-xs text-stone-400 font-light">
              Receive private invitations to seasonal trunk shows, early access to new dress drops, and style guides.
            </p>

            {subscribed ? (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-200 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-rose-300" />
                <span>Thank you! Welcome to Aura Atelier. Your VIP code <strong>AURA15</strong> is active.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-stone-950 border border-stone-700 rounded-2xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:border-rose-800 placeholder:text-stone-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-rose-800 hover:bg-rose-700 text-white px-6 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          <div>
            <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Shop Collections</h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#" className="hover:text-rose-200 transition-colors">Evening Gowns & Galas</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Cocktail & Party Minis</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Summer Floral Maxis</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Organic French Linens</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Bridal & Rehearsal Edit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Client Services</h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><button onClick={() => onOpenInfoModal('shipping')} className="hover:text-rose-200 transition-colors text-left">Shipping & Global Delivery</button></li>
              <li><button onClick={() => onOpenInfoModal('returns')} className="hover:text-rose-200 transition-colors text-left">Returns & Exchange Portal</button></li>
              <li><button onClick={() => onOpenInfoModal('stylist')} className="hover:text-rose-200 transition-colors text-left">Bespoke Fitting Advice</button></li>
              <li><button onClick={() => onOpenInfoModal('sustainability')} className="hover:text-rose-200 transition-colors text-left">Sustainable Silk Ethics</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Sizing & Atelier</h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><button onClick={onOpenSizeGuide} className="hover:text-rose-200 transition-colors text-left">Comprehensive Size Guide</button></li>
              <li><button onClick={() => onOpenInfoModal('sustainability')} className="hover:text-rose-200 transition-colors text-left">Fabric Care & Maintenance</button></li>
              <li><button onClick={() => onOpenInfoModal('stylist')} className="hover:text-rose-200 transition-colors text-left">Book a Virtual Stylist</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Legal & Corporate</h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#" className="hover:text-rose-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-rose-200 transition-colors">Press & Media Inquiries</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Aura Atelier Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Visa</span> • <span>Mastercard</span> • <span>American Express</span> • <span>Apple Pay</span> • <span>PayPal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
