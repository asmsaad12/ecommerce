import React, { useState } from 'react';
import { InfoModalType } from '../types';
import { X, Truck, RotateCcw, ShieldCheck, UserCheck, Check } from 'lucide-react';

interface InfoModalsProps {
  type: InfoModalType;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  const [stylistSubmitted, setStylistSubmitted] = useState(false);
  const [stylistName, setStylistName] = useState('');
  const [stylistEmail, setStylistEmail] = useState('');

  const handleStylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stylistName && stylistEmail) {
      setStylistSubmitted(true);
      setTimeout(() => {
        setStylistSubmitted(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 rounded-t-3xl">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
            {type === 'shipping' && <Truck className="w-5 h-5 text-rose-800" />}
            {type === 'returns' && <RotateCcw className="w-5 h-5 text-rose-800" />}
            {type === 'sustainability' && <ShieldCheck className="w-5 h-5 text-rose-800" />}
            {type === 'stylist' && <UserCheck className="w-5 h-5 text-rose-800" />}
            <span>
              {type === 'shipping' && 'Global Express Shipping'}
              {type === 'returns' && '30-Day Returns & Exchanges'}
              {type === 'sustainability' && 'Artisanal Silk & Sustainable Ethics'}
              {type === 'stylist' && 'Book a Virtual Fitting Stylist'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-stone-700 leading-relaxed">
          {type === 'shipping' && (
            <div className="space-y-4">
              <p className="font-light">
                Aura Atelier offers insured worldwide express delivery. Every garment is hand-packaged in our signature velvet luxury garment bag to prevent creasing.
              </p>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between font-semibold text-stone-900">
                  <span>Standard Insured Shipping (3-5 days)</span>
                  <span>$15.00 (FREE over $150)</span>
                </div>
                <div className="flex justify-between font-semibold text-stone-900">
                  <span>DHL Express Worldwide (1-2 days)</span>
                  <span>$35.00</span>
                </div>
              </div>
            </div>
          )}

          {type === 'returns' && (
            <div className="space-y-4">
              <p className="font-light">
                We want you to feel extraordinary in your dress. If the fit isn't perfect, we accept unworn returns with original tags attached within 30 days of delivery.
              </p>
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-2 text-rose-950 font-medium">
                <p>• Complimentary size exchanges with pre-paid return shipping label.</p>
                <p>• Full refunds issued to original payment method within 3 business days of return receipt.</p>
              </div>
            </div>
          )}

          {type === 'sustainability' && (
            <div className="space-y-4">
              <p className="font-light">
                Our dresses are crafted using 100% organic mulberry silk, French flax linen, and recycled lining fabrics. We partner exclusively with certified ethical mills that pay fair living wages.
              </p>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <p className="font-semibold text-stone-900">Zero-Waste Pattern Cutting Guarantee</p>
                <p className="text-stone-500 font-light">
                  Fabric offcuts are repurposed into matching silk hair scrunchies and dust bags.
                </p>
              </div>
            </div>
          )}

          {type === 'stylist' && (
            <div>
              {stylistSubmitted ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <Check className="w-8 h-8 mx-auto text-emerald-600" />
                  <h4 className="font-serif font-semibold text-sm">Consultation Requested!</h4>
                  <p className="text-xs font-light">An Atelier stylist will email you within 24 hours to schedule your video fitting.</p>
                </div>
              ) : (
                <form onSubmit={handleStylistSubmit} className="space-y-4">
                  <p className="font-light">
                    Schedule a complimentary 1-on-1 virtual styling session to discuss dress sizing, color matching, and gala accessories.
                  </p>
                  <div>
                    <label className="block font-semibold text-stone-900 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={stylistName}
                      onChange={(e) => setStylistName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-900 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={stylistEmail}
                      onChange={(e) => setStylistEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-rose-900 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-rose-800"
                  >
                    Request Private Styling Appointment
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
