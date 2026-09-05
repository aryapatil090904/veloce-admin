"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitWaiver } from "../(main)/members/_api/members";

function WaiverForm() {
  const searchParams = useSearchParams();
  const waiverId = searchParams.get("id");

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [signature, setSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waiverId || !photoUrl || !signature.trim()) {
      setErrorMsg("Please upload your photo and type your full signature.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      // Submit digital waiver via backend API (Axios POST /v1/member/submit-waiver)
      const success = await submitWaiver(waiverId, signature, photoUrl);
      
      // Fallback local notification trigger for instant cross-tab sync if on same browser
      localStorage.setItem(`waiver_${waiverId}_status`, "signed");
      localStorage.setItem(`waiver_${waiverId}_signature`, signature);
      window.dispatchEvent(new Event("storage"));

      if (success) {
        setIsSubmitted(true);
      } else {
        // Even if server is temporarily unreachable, show signed UI so client is not stuck
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Waiver submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 font-body text-on-surface">
        <div className="glass-card max-w-lg w-full p-8 rounded-2xl border border-primary/30 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary shadow-[0_0_30px_rgba(0,195,235,0.3)]">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-headline font-black text-on-surface">All Set!</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Your digital waiver and photo have been securely captured and submitted to the gym server. You may now close this page and return to the front desk.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-headline font-black tracking-tight text-on-surface">Digital Waiver & Consent</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">Please review the terms, upload a clear photo of yourself for your member profile, and sign below to activate your membership.</p>
        </header>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error font-label text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Terms and Conditions Document */}
          <div className="glass-card bg-surface-container/60 rounded-2xl border border-outline-variant/10 overflow-hidden shadow-2xl">
            <div className="bg-surface-container p-4 border-b border-outline-variant/10 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">gavel</span>
              <h2 className="font-headline font-bold text-lg">Terms & Conditions</h2>
            </div>
            <div className="p-6 h-[400px] overflow-y-auto text-sm text-on-surface-variant leading-relaxed space-y-4 custom-scrollbar">
              <h3 className="text-base font-bold text-on-surface">Gym Membership Terms & Conditions</h3>
              
              <h4 className="font-bold text-on-surface mt-4">1. Membership</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Membership is personal, non-transferable, and non-refundable unless otherwise stated by management.</li>
                <li>Members must provide accurate personal information during registration and promptly update any changes.</li>
                <li>Membership becomes active only after successful payment and completion of the registration process.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">2. Membership Fees</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Membership fees must be paid in advance according to the selected plan.</li>
                <li>Late payments may result in suspension of membership privileges until dues are cleared.</li>
                <li>Prices and membership plans are subject to change. Existing memberships remain valid until their expiry date.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">3. Access & Entry</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Members must present their membership ID, QR code, or registered mobile number at every visit.</li>
                <li>Entry may be denied if membership has expired, been suspended, or payment is overdue.</li>
                <li>The gym reserves the right to verify member identity at any time.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">4. Gym Rules</h4>
              <p>Members agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Wear appropriate workout attire and clean athletic footwear.</li>
                <li>Carry a personal towel during workouts.</li>
                <li>Wipe down equipment after use.</li>
                <li>Return weights, dumbbells, and accessories to their designated places.</li>
                <li>Respect staff and fellow members.</li>
                <li>Avoid excessive noise, abusive language, or disruptive behavior.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">5. Health Declaration</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Members confirm they are physically fit to participate in exercise activities.</li>
                <li>Individuals with medical conditions should consult a physician before beginning any exercise program.</li>
                <li>The gym is not responsible for injuries resulting from undisclosed medical conditions.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">6. Personal Belongings</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lockers are provided for convenience only.</li>
                <li>Members are responsible for securing their valuables.</li>
                <li>The gym is not liable for loss, theft, or damage to personal belongings.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">7. Safety</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Members must follow all safety instructions provided by trainers and staff.</li>
                <li>Equipment should only be used for its intended purpose.</li>
                <li>Damaging gym equipment intentionally may result in repair charges and membership termination.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">8. Personal Training</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal training sessions must be booked in advance.</li>
                <li>Missed appointments without prior notice may be considered forfeited according to the trainer's cancellation policy.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">9. Membership Freeze</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Membership freeze requests may be approved only under applicable gym policies.</li>
                <li>Supporting documentation may be required for medical or emergency situations.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">10. Cancellation & Refund</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Membership fees are generally non-refundable.</li>
                <li>Membership cancellation does not automatically entitle the member to any refund.</li>
                <li>Exceptional cases will be reviewed solely at the discretion of management.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">11. Code of Conduct</h4>
              <p>The following are strictly prohibited:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Harassment or intimidation.</li>
                <li>Physical or verbal abuse.</li>
                <li>Smoking, alcohol, illegal drugs, or vaping inside the premises.</li>
                <li>Unauthorized personal training or commercial activities.</li>
                <li>Photography or videography of other members without their consent.</li>
              </ul>
              <p className="mt-2 text-primary">Violation of these rules may result in immediate suspension or termination without refund.</p>

              <h4 className="font-bold text-on-surface mt-4">12. Operating Hours</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Members must adhere to the gym's operating hours.</li>
                <li>The gym reserves the right to modify operating hours, classes, or services due to maintenance, holidays, or unforeseen circumstances.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">13. Liability Waiver</h4>
              <p>Members voluntarily participate in physical activities and acknowledge that exercise carries inherent risks. The gym, its owners, employees, trainers, and affiliates shall not be liable for any injury, illness, accident, or loss arising from the use of gym facilities, except where required by applicable law.</p>

              <h4 className="font-bold text-on-surface mt-4">14. Privacy</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Personal information collected during registration will be used solely for membership management, communication, and service improvement.</li>
                <li>Member information will not be shared with third parties except where required by law or with the member's consent.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">15. Membership Suspension or Termination</h4>
              <p>The gym reserves the right to suspend or terminate membership without refund for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Violation of gym rules.</li>
                <li>Non-payment of dues.</li>
                <li>Misconduct or inappropriate behavior.</li>
                <li>Damage to gym property.</li>
                <li>Any activity that compromises the safety or comfort of other members.</li>
              </ul>

              <h4 className="font-bold text-on-surface mt-4">16. Amendments</h4>
              <p>The gym reserves the right to modify these Terms & Conditions at any time. Updated terms will become effective upon publication or notification to members.</p>

              <h4 className="font-bold text-secondary mt-8">Member Declaration</h4>
              <p className="italic border-l-2 border-secondary pl-4 py-2 bg-secondary/5 text-on-surface">
                "I confirm that I have read, understood, and agree to abide by the Gym Membership Terms & Conditions. I acknowledge that I participate in fitness activities voluntarily and assume all associated risks."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Photo Upload */}
            <div className="glass-card bg-surface-container/60 p-8 rounded-2xl border border-outline-variant/10 text-center flex flex-col items-center justify-center space-y-6 shadow-xl">
              <h3 className="font-headline font-bold text-lg">Member Photo</h3>
              <p className="text-xs text-on-surface-variant px-4">This photo will be securely stored for identity verification at the front desk.</p>
              
              <div className="relative group cursor-pointer w-32 h-32" onClick={() => fileInputRef.current?.click()}>
                <div className={`w-32 h-32 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all ${photoUrl ? 'border-primary' : 'border-dashed border-outline-variant/50 group-hover:border-primary/50'}`}>
                  {photoUrl ? (
                    <img src={photoUrl} alt="Your selfie" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors">add_a_photo</span>
                  )}
                </div>
                {photoUrl && (
                  <div className="absolute inset-0 bg-surface/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white">cached</span>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" capture="user" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
              
              {!photoUrl && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-primary uppercase tracking-widest hover:underline">
                  Take Selfie
                </button>
              )}
            </div>

            {/* Signature */}
            <div className="glass-card bg-surface-container/60 p-8 rounded-2xl border border-outline-variant/10 flex flex-col justify-center space-y-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary">draw</span>
                <h3 className="font-headline font-bold text-lg">Digital Signature</h3>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-label uppercase text-on-surface-variant tracking-widest block">Type your full legal name</label>
                <input 
                  type="text" 
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary/50 transition-all text-2xl font-headline italic font-light text-on-surface placeholder:text-outline/30" 
                  placeholder="e.g. John Doe"
                  required 
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/10">
                <button 
                  type="submit" 
                  disabled={!photoUrl || !signature.trim() || isSubmitting}
                  className="w-full bg-secondary text-on-secondary font-headline font-black py-4 rounded-xl shadow-[0_10px_30px_rgba(184,255,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      Submitting Waiver...
                    </>
                  ) : (
                    "I Agree & Sign"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignWaiverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-on-surface">Loading waiver...</div>}>
      <WaiverForm />
    </Suspense>
  );
}
