"use client";

import React, { useState } from 'react';
import veloceCC from "@/app/assets/veloceCC.png";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How do I process a refund for a member?", a: "To process a refund, navigate to the member's profile, click on their Billing tab, select the specific transaction, and click the 'Issue Refund' button. Refunds typically take 3-5 business days to appear on the member's statement." },
    { q: "How do I set up a new class schedule?", a: "Go to the Classes & Bookings tab and click 'Add Slot' on the calendar view. You can set the class type, assigned instructor, maximum capacity, and recurrence rules." },
    { q: "Can I customize the automated onboarding emails?", a: "Yes. Navigate to Settings > Communication > Email Templates. From there, you can edit the HTML and text of all automated emails sent during the onboarding workflow." },
    { q: "My barcode scanner isn't syncing. What should I do?", a: "First, ensure the scanner is connected via USB or Bluetooth. Then go to Settings > Hardware Integration and click 'Run Diagnostic'. If it still fails, restart the Veloce agent application on the front-desk computer." }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">Help & Support</h2>
          <p className="text-on-surface-variant font-label mt-1">Access knowledge base, submit tickets, and contact our team</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary text-on-primary-container font-bold py-2 px-6 rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,195,235,0.2)]">
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            Open a Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Contact Support */}
        <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col justify-between group hover:border-primary/30 transition-colors col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-30 mix-blend-screen pointer-events-none z-0" style={{ backgroundImage: `url(${veloceCC.src})` }}></div>
          <div className="absolute top-0 right-0 p-8 opacity-10 z-0">
            <span className="material-symbols-outlined text-[10rem] text-primary">support_agent</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">Dedicated Admin Support</h3>
            <p className="text-on-surface-variant text-sm mb-8 max-w-md">Our team of Veloce experts is available 24/7 to help you resolve issues, configure your gym, and maximize your software usage.</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-surface-container-highest px-4 py-3 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Phone Support</p>
                  <p className="font-bold text-sm">9326638239</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-surface-container-highest px-4 py-3 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Email Support</p>
                  <p className="font-bold text-sm">admins@veloce.fit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col justify-between hover:border-secondary/30 transition-colors group">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold font-headline text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">dns</span>
                System Status
              </h3>
              <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Online</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 group-hover:border-outline-variant/20 transition-colors">
                <span className="text-xs font-bold text-on-surface-variant">Veloce Cloud API</span>
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 group-hover:border-outline-variant/20 transition-colors">
                <span className="text-xs font-bold text-on-surface-variant">Payment Gateways</span>
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2 group-hover:border-outline-variant/20 transition-colors">
                <span className="text-xs font-bold text-on-surface-variant">Mobile App Services</span>
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface-variant">Hardware Sync (Scanners)</span>
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-widest mt-6 bg-surface-container-highest py-2 rounded-lg">All systems 100% operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-6 border-t border-outline-variant/10">
        {/* Knowledge Base */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-tertiary">library_books</span>
            Knowledge Base
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl hover:bg-surface-container-highest cursor-pointer transition-colors border border-outline-variant/10 group">
              <span className="material-symbols-outlined text-tertiary mb-3 group-hover:scale-110 transition-transform">credit_card</span>
              <p className="font-bold text-sm mb-1">Billing & Payments</p>
              <p className="text-[10px] text-on-surface-variant">Invoices, refunds, gateways</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:bg-surface-container-highest cursor-pointer transition-colors border border-outline-variant/10 group">
              <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform">group</span>
              <p className="font-bold text-sm mb-1">Member Management</p>
              <p className="text-[10px] text-on-surface-variant">Profiles, holds, cancellations</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:bg-surface-container-highest cursor-pointer transition-colors border border-outline-variant/10 group">
              <span className="material-symbols-outlined text-secondary mb-3 group-hover:scale-110 transition-transform">event</span>
              <p className="font-bold text-sm mb-1">Classes & Schedule</p>
              <p className="text-[10px] text-on-surface-variant">Booking rules, trainers</p>
            </div>
            <div className="glass-card p-6 rounded-2xl hover:bg-surface-container-highest cursor-pointer transition-colors border border-outline-variant/10 group">
              <span className="material-symbols-outlined text-error mb-3 group-hover:scale-110 transition-transform">router</span>
              <p className="font-bold text-sm mb-1">Hardware Setup</p>
              <p className="text-[10px] text-on-surface-variant">Scanners, turnstiles, POS</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">live_help</span>
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl border border-outline-variant/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-surface-container-highest transition-colors text-left"
                >
                  <span className="font-bold text-sm">{faq.q}</span>
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-on-surface-variant animate-in slide-in-from-top-2 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
