"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";

const tiers = [
  {
    id: "basic",
    label: "Standard",
    name: "BASIC",
    price: "4,999",
    features: ["Gym Access", "Locker Use"],
  },
  {
    id: "pro",
    label: "Performance",
    name: "PRO",
    price: "8,999",
    isPopular: true,
    features: ["All Basic +", "Group Classes", "Guest Passes"],
  },
  {
    id: "ultimate",
    label: "Elite",
    name: "ULTIMATE",
    price: "14,999",
    features: ["All Pro +", "Recovery Spa", "Personal Coach"],
  }
];

export default function OnboardingPage() {
  const [selectedTier, setSelectedTier] = useState("pro");
  const [photoUrl, setPhotoUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuCZc6FhRHFtS9-_H8N2l7xMfsLQ-XjxDG4y0TyNehqqyforAuHebDMEQAFgYsTk8H_mxqeLHFerr8KRAS72Sz2Z3HA8fs55jIllUxapqcyx60MPRWcHaVWWLspxpxdI91xcZWksB45_yucLYnSKRzvxhSFW7Qo-tvFx7jSbUn5Zfk_4Dqwdj8AVLwbyCqnouKrcxnM80tSGzFo9hAdTS-HQQ977_Bs4CbfaeyjRMiNYfGKX0POEugcbz6I-r3B60A54chHYSpsHweA");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [waiverStatus, setWaiverStatus] = useState<"idle" | "waiting" | "signed">("idle");
  const [showQRModal, setShowQRModal] = useState(false);
  const [customerSignature, setCustomerSignature] = useState("");
  const [waiverId] = useState(() => Math.random().toString(36).substring(7));

  const selectedTierData = tiers.find(t => t.id === selectedTier) || tiers[1];

  useEffect(() => {
    const handleStorage = () => {
      const status = localStorage.getItem(`waiver_${waiverId}_status`);
      if (status === "signed") {
        setWaiverStatus("signed");
        setCustomerSignature(localStorage.getItem(`waiver_${waiverId}_signature`) || "");
        setPhotoUploaded(true);
        setShowQRModal(false);
      }
    };
    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [waiverId]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
      setPhotoUploaded(true);
    }
  };

  return (
    <>
      <div className="max-w-[1600px] mx-auto animate-in fade-in zoom-in-95 duration-700 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>
      
      <header className="w-full mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-black tracking-tight text-on-surface font-headline">Member Onboarding</h1>
        </div>
      </header>
      
      <section className="py-4">
        {/* Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-16 relative">
          {/* Connecting Lines */}
          <div className="absolute top-6 left-16 right-16 h-[2px] bg-surface-container-highest -translate-y-1/2 z-0"></div>
          <div className="absolute top-6 left-16 w-1/3 h-[2px] bg-secondary -translate-y-1/2 z-0 shadow-[0_0_10px_#c3f400]"></div>
          
          <div className="flex items-start justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 group w-32">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-bold font-headline shadow-[0_0_15px_rgba(195,244,0,0.4)]">1</div>
              <span className="text-xs font-label font-bold uppercase tracking-widest text-secondary text-center">Basic Info</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 group w-32">
              <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-bold font-headline">2</div>
              <span className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant text-center">Digital Waivers</span>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 group w-32">
              <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-bold font-headline">3</div>
              <span className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant text-center">Activation</span>
            </div>
          </div>
        </div>

        {/* Forms and Summary */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="glass-card bg-surface-container/60 p-8 rounded-xl border border-outline-variant/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">person_add</span>
                Basic Info
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">First Name</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="e.g. Marcus" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Last Name</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="e.g. Aurelius" type="text" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="m.aurelius@empire.fit" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Phone Number</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="+91 98765 43210" type="tel" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Emergency Contact</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="Name & Phone" type="tel" />
                </div>
                
                {/* Body Parameters & Invite */}
                <div className="col-span-2 border-t border-outline-variant/10 pt-4 mt-2">
                  <h3 className="text-sm font-bold font-headline text-on-surface mb-4">Body Parameters &amp; Referral</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Start Weight (kg)</label>
                      <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="e.g. 75" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Start Body Fat %</label>
                      <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="e.g. 18" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">Invite Code</label>
                      <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-on-surface placeholder:text-outline/50" placeholder="Optional" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card bg-surface-container/60 p-8 rounded-xl border border-outline-variant/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">military_tech</span>
                Select Tier
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div 
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-6 rounded-xl border-2 transition-all cursor-pointer group relative overflow-hidden ${
                        isSelected 
                          ? 'border-secondary bg-secondary/5 shadow-[0_0_20px_rgba(195,244,0,0.1)]' 
                          : 'border-outline-variant/20 bg-surface-container-low hover:border-secondary/40'
                      }`}
                    >
                      {tier.isPopular && (
                        <div className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-bold px-3 py-1 rounded-bl-lg font-label uppercase">Popular</div>
                      )}
                      <div className="relative z-10">
                        <p className={`text-[10px] font-label font-black uppercase tracking-tighter mb-1 ${isSelected ? 'text-secondary' : 'text-on-surface-variant'}`}>
                          {tier.label}
                        </p>
                        <h3 className="text-xl font-headline font-bold mb-4">{tier.name}</h3>
                        <p className="text-3xl font-headline font-black text-on-surface mb-6">₹{tier.price}<span className="text-sm font-normal text-on-surface-variant">/mo</span></p>
                        <ul className="space-y-3">
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                              <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span> 
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card bg-surface-container/60 p-8 rounded-xl border border-outline-variant/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-headline font-bold text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">devices</span>
                  Digital Waivers &amp; Terms
                </h2>
                {waiverStatus === "signed" && (
                  <span className="text-xs font-label text-secondary font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                  </span>
                )}
              </div>
              
              {waiverStatus === "idle" && (
                <div className="text-center space-y-6 py-4">
                  <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                    Generate a secure link for the customer to review the Terms & Conditions, upload their photo, and sign the digital waiver on their personal device.
                  </p>
                  <button 
                    onClick={() => {
                      const url = `${window.location.origin}/sign-waiver?id=${waiverId}`;
                      navigator.clipboard.writeText(url);
                      setWaiverStatus("waiting");
                      setShowQRModal(true);
                    }}
                    className="bg-primary text-on-primary-container px-6 py-3 rounded-xl font-bold font-headline shadow-[0_10px_30px_rgba(0,195,235,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto uppercase tracking-widest text-sm"
                  >
                    <span className="material-symbols-outlined">qr_code_2</span> Generate Link & Wait
                  </button>
                </div>
              )}

              {waiverStatus === "waiting" && (
                <div className="text-center space-y-6 py-8 relative">
                  <div className="absolute top-0 right-0">
                    <button 
                      onClick={() => setShowQRModal(true)}
                      className="text-[10px] bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-primary/50 text-on-surface flex items-center gap-1 transition-all uppercase font-bold tracking-widest"
                    >
                      <span className="material-symbols-outlined text-[14px]">qr_code</span> Show QR
                    </button>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto"></div>
                  <div>
                    <h3 className="font-headline font-bold text-lg">Waiting for Customer...</h3>
                    <p className="text-xs text-on-surface-variant mt-2 max-w-sm mx-auto">Listening for secure signature transmission from the customer's device.</p>
                  </div>
                </div>
              )}

              {waiverStatus === "signed" && (
                <div className="bg-surface-container-low p-6 rounded-xl border border-secondary/30 space-y-4 shadow-[0_0_20px_rgba(195,244,0,0.1)]">
                  <div className="flex items-center gap-3 text-secondary">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                    <h3 className="font-headline font-bold text-xl">Waiver Signed & Agreed</h3>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/10">
                    <label className="text-[10px] font-label uppercase text-on-surface-variant tracking-widest block mb-1">Authenticated Signature</label>
                    <p className="text-2xl font-headline italic font-light text-on-surface">{customerSignature}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="glass-card bg-surface-container-high/80 p-6 rounded-xl border border-outline-variant/20 sticky top-28">
              <h3 className="text-xs font-label font-black text-on-surface-variant uppercase tracking-[0.2em] mb-6">Onboarding Summary</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/30">
                    <img alt="Profile Preview" className="w-full h-full object-cover" src={photoUrl} />
                  </div>
                  <div>
                    <p className="text-sm font-headline font-bold text-on-surface">Member ID: New</p>
                    <p className={`text-xs ${photoUploaded ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {photoUploaded ? "Photo verified" : "Photo verification pending"}
                    </p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1 hover:text-primary/80 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[12px]">{photoUploaded ? 'cached' : 'add_a_photo'}</span> 
                      {photoUploaded ? "Change Photo" : "Upload Photo"}
                    </button>
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t border-outline-variant/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-on-surface-variant font-label">Membership Tier</span>
                    <span className="text-xs font-bold text-on-surface uppercase">{selectedTierData.label} {selectedTierData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-on-surface-variant font-label">Payment Status</span>
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">To be billed later</span>
                  </div>
                </div>
                <button 
                  disabled={waiverStatus !== "signed"}
                  className="w-full bg-secondary text-on-secondary font-headline font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(184,255,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Complete Registration
                </button>
                <p className="text-[10px] text-center text-on-surface-variant leading-relaxed">
                  Completing registration instantly emails the member their login details and activates their QR code for gym entry.
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-tertiary/10 border border-tertiary/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-tertiary">bolt</span>
                <span className="text-xs font-label font-bold text-tertiary uppercase tracking-widest">Admin Tip</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Elite memberships include a complimentary body composition scan. Remind member to schedule it at the front desk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-surface-container border border-outline-variant/20 rounded-3xl shadow-2xl p-8 max-w-sm w-full relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center space-y-6">
              <h3 className="text-xl font-headline font-bold text-on-surface flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                Scan to Sign
              </h3>
              <p className="text-sm text-on-surface-variant">Ask the customer to scan this QR code with their mobile device to open the digital waiver.</p>
              
              <div className="bg-white p-4 rounded-xl inline-block shadow-[0_0_40px_rgba(0,195,235,0.2)] mx-auto">
                <QRCode 
                  value={`${window.location.origin}/sign-waiver?id=${waiverId}`}
                  size={200}
                  level="Q"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Or share link directly</p>
                <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-lg border border-outline-variant/20">
                  <input 
                    readOnly 
                    value={`${window.location.origin}/sign-waiver?id=${waiverId}`}
                    className="bg-transparent border-none text-xs w-full text-on-surface focus:ring-0 truncate"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/sign-waiver?id=${waiverId}`);
                    }}
                    className="p-2 bg-surface-container-high rounded text-on-surface hover:text-primary transition-colors flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
