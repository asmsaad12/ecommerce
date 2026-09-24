import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Check, CreditCard, ShieldCheck, Truck, ArrowRight, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: 'Sophia Montgomery',
    email: 'sophia.montgomery@example.com',
    address: '742 Evergreen Terrace',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [orderId] = useState(() => 'AURA-' + Math.floor(100000 + Math.random() * 900000));

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/60 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold tracking-wider text-stone-900 uppercase">AURA ATELIER</span>
            <span className="text-xs bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full font-semibold uppercase">
              Secure Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step !== 3 && (
          <div className="px-6 py-4 bg-white border-b border-stone-100">
            <div className="flex items-center justify-center space-x-8 max-w-md mx-auto text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-rose-900' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-rose-900 text-white' : 'bg-stone-200'}`}>
                  1
                </span>
                <span>Shipping Address</span>
              </div>
              <div className="h-[2px] w-12 bg-stone-200" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-rose-900' : 'text-stone-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-rose-900 text-white' : 'bg-stone-200'}`}>
                  2
                </span>
                <span>Payment</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleSubmitShipping} className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">Shipping Details</h3>
                <p className="text-xs text-stone-500 font-light">Enter where you would like your dress collection delivered.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Truck className="w-4 h-4 text-rose-800" /> Express Insured Delivery
                </span>
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Simulation */}
          {step === 2 && (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold text-stone-900 mb-1">Payment Method</h3>
                <p className="text-xs text-stone-500 font-light">All transactions are encrypted with 256-bit SSL security.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border rounded-2xl cursor-pointer border-rose-800 bg-rose-50/50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-rose-800" />
                    <div>
                      <p className="text-xs font-semibold text-stone-900">Credit or Debit Card</p>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, Amex, Discover</p>
                    </div>
                  </div>
                  <input type="radio" checked readOnly className="accent-rose-800" />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-3">
                  <label className="block text-stone-600 font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Expiration Date</label>
                  <input
                    type="text"
                    required
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Security Code (CVV)</label>
                  <input
                    type="text"
                    required
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 outline-none focus:border-rose-800"
                  />
                </div>
              </div>

              {/* Order Total Summary Box */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Payment</span>
                  <span className="text-rose-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                >
                  Back to Address
                </button>
                <button
                  type="submit"
                  className="bg-rose-900 hover:bg-rose-800 text-white px-8 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-rose-900/20"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-200" />
                  <span>Place Order (${total.toFixed(2)})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Receipt Confirmation */}
          {step === 3 && (
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-rose-900 font-bold">Order Confirmed</span>
                <h2 className="font-serif text-3xl font-semibold text-stone-900 mt-1">
                  Thank You for Your Order!
                </h2>
                <p className="text-xs text-stone-500 font-light mt-2">
                  Order Reference: <strong className="text-stone-900 font-bold">{orderId}</strong>
                </p>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 max-w-md mx-auto text-left text-xs space-y-3">
                <h4 className="font-serif font-semibold text-stone-900 text-sm border-b border-stone-200 pb-2 flex justify-between items-center">
                  <span>Delivery Summary</span>
                  <button onClick={() => window.print()} className="text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1">
                    <Printer className="w-3 h-3" /> Print Receipt
                  </button>
                </h4>
                <div className="flex justify-between text-stone-600">
                  <span>Recipient:</span>
                  <strong className="text-stone-900">{formData.fullName}</strong>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Destination:</span>
                  <span className="text-stone-800">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Est. Delivery:</span>
                  <span className="text-emerald-700 font-semibold">3-4 Business Days via Express</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-widest shadow-lg transition-colors"
              >
                Return to Boutique
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
