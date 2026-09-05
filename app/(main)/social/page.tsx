"use client";

import { useState } from "react";

export default function SocialPage() {
  const [spamKeywords, setSpamKeywords] = useState("crypto, forex, click here, free money, http://bit.ly, 100% guaranteed");

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-on-surface font-headline tracking-tighter mb-2 italic">SOCIAL HUB <span className="text-secondary text-2xl tracking-normal">(Beta)</span></h2>
          <p className="text-on-surface-variant font-medium font-body max-w-xl">Curate your community's energy. Moderate member transformations and broadcast official directives.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Center Column: Moderation Feed */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
              Feed Moderation
              <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full border border-secondary/20">14 Pending</span>
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-bold text-on-surface border border-outline-variant hover:border-secondary/40 transition-all">All Content</button>
              <button className="px-4 py-2 bg-transparent rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-all">Reported</button>
            </div>
          </div>

          {/* Post Card 1 */}
          <div className="glass-card rounded-3xl p-6 relative group overflow-hidden border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/20" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtklBu_RmL8oP1dH4srF1EBj02-T0K65SvHxHKyO1_MwXGoODb8N-UVxWT3xbLYp7KdRixCe-SpyNq-NrN41VPZhROTEbcC-t5VFf5so6Ux1YYqnTFfllAv3KE965vWee4jDy4J8ckp6DnQBAp8NAwwUND1XhwwjDd8cyNBSi6bIqJ8rkzD655ys1j553UTLaSHm8kC2XipF33fAvhG6i-VTVVnfMOqo8bNPeIk602CQ1uFn2t0hUP-lglIYD14uw8PDd9iNghN48" 
                />
                <div>
                  <p className="font-bold text-on-surface leading-none">Sarah_Flex92</p>
                  <p className="text-xs text-on-surface-variant">2 minutes ago • Main Studio</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10" title="Mute/Ban User">
                  <span className="material-symbols-outlined text-[20px]">block</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            </div>
            
            <p className="text-on-surface-variant mb-4 font-medium leading-relaxed font-body">3 months of consistency at <span className="text-secondary">#FitSphere</span> finally paying off! Down 12lbs and feeling explosive. ⚡️</p>
            
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative group">
              <img 
                alt="Post content" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQMmMrqoH7fkhJSdH68NPOC-0n9FnwEMo2BhAFbOKn_waNwUDgm3SKfcZP55Nuobk9sNrsIa1mgkZSNFEVV4QscoT4cEO1Q6jSWJmWc_8sHDUURjP6W097OoOqz3RtxMxWKnPH2XaCKjHHPZ-WeXencud9PeMwM-A80i3H23U72qDc5H_oMm7714sFp3BIUMC-r4XrPbRawTGsW_W6LpTA8JyHDv0GClPCpPZPZfdeFTFF11oYkmyFSJQJAzSLEtoqD94E1xxBow" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/40 backdrop-blur-md text-on-surface text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Preview Mode
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-error-container/20 text-error-dim rounded-xl font-bold hover:bg-error-container/40 transition-all border border-error/10">
                <span className="material-symbols-outlined">delete</span>
                DELETE
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-secondary/10 text-secondary rounded-xl font-bold hover:bg-secondary/20 transition-all border border-secondary/20 shadow-[0_0_15px_rgba(184,255,0,0.05)]">
                <span className="material-symbols-outlined">check_circle</span>
                APPROVE
              </button>
            </div>
          </div>

          {/* Post Card 2 */}
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/20" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD58m1tqMjGFSCFec55yZ9yPaZZUY9LBCk4a2exxqd8zpZJRzoeyapsHQ7BOtbe40ftRQeMJD7N4dAlf3DlgchzU2oAbrIjlMTWF-uz8sjjDiPrw16kRHLiMhp1Uy9lj5E5jn4mJabdn3e0dBe-zerMW6NNdCw0pbsXWNFmahzY6kkSgRihcbE1i1L8fg5PIc3KzgMomfSzyCJFHi8PrsPezv3kueCsyeknqdJMlTCwjPppPnrobldN0Rxo3e6UZjXro_S_tmnoKo0" 
                />
                <div>
                  <p className="font-bold text-on-surface leading-none">Marcus_Iron</p>
                  <p className="text-xs text-on-surface-variant">15 minutes ago • Power Rack</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10" title="Mute/Ban User">
                  <span className="material-symbols-outlined text-[20px]">block</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            </div>
            
            <p className="text-on-surface-variant mb-4 font-medium leading-relaxed font-body">New PR today: 405lb squat. The energy in this place is unmatched! <span className="text-secondary">#PRCity</span> <span className="text-secondary">#LegDay</span></p>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-error-container/20 text-error-dim rounded-xl font-bold hover:bg-error-container/40 transition-all border border-error/10">
                <span className="material-symbols-outlined">delete</span>
                DELETE
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-secondary/10 text-secondary rounded-xl font-bold hover:bg-secondary/20 transition-all border border-secondary/20 shadow-[0_0_15px_rgba(184,255,0,0.05)]">
                <span className="material-symbols-outlined">check_circle</span>
                APPROVE
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Composer & Dashboard */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          
          {/* Official Composer - Gym Announcements */}
          <section className="glass-card rounded-3xl p-8 border border-secondary/20 shadow-[0_0_40px_rgba(184,255,0,0.05)]">
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-6 italic tracking-tight uppercase">Gym Announcements</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest ml-1 font-label">Broadcast Intent</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 px-3 bg-secondary text-on-secondary rounded-lg text-[10px] font-bold tracking-tighter uppercase transition-transform active:scale-95 font-label">Announcement</button>
                  <button className="py-2 px-3 bg-surface-container-highest text-on-surface-variant rounded-lg text-[10px] font-bold tracking-tighter uppercase hover:bg-secondary/10 hover:text-secondary transition-all font-label">Event</button>
                  <button className="py-2 px-3 bg-surface-container-highest text-on-surface-variant rounded-lg text-[10px] font-bold tracking-tighter uppercase hover:bg-secondary/10 hover:text-secondary transition-all font-label">Motivation</button>
                </div>
              </div>
              
              <textarea 
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all min-h-[120px] font-body text-sm" 
                placeholder="Write an official gym update (e.g. holiday hours, new machines) to pin to the top of everyone's feed..."
              ></textarea>
              
              <div className="flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-highest border border-outline-variant/30 rounded-xl text-on-surface font-bold hover:bg-surface-bright transition-all text-sm font-label">
                  <span className="material-symbols-outlined text-sm">image</span>
                  Add Media
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-highest border border-outline-variant/30 rounded-xl text-on-surface font-bold hover:bg-surface-bright transition-all text-sm font-label">
                  <span className="material-symbols-outlined text-sm">push_pin</span>
                  Pin to Top
                </button>
              </div>
              
              <button className="w-full py-4 bg-secondary text-on-secondary rounded-2xl font-black font-headline text-lg tracking-tight shadow-[0_0_30px_rgba(184,255,0,0.2)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">send</span>
                PUBLISH TO FEED
              </button>
            </div>
          </section>

          {/* Spam Filter Settings */}
          <section className="glass-card rounded-3xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-error text-3xl">gpp_bad</span>
              <h3 className="font-headline text-xl font-bold text-on-surface tracking-tight">Spam Filter Settings</h3>
            </div>
            
            <p className="text-sm text-on-surface-variant font-body mb-4">
              Enter forbidden words or links separated by commas. If a member tries to post them, the app will automatically block the content.
            </p>
            
            <div className="space-y-4">
              <textarea 
                value={spamKeywords}
                onChange={(e) => setSpamKeywords(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none transition-all min-h-[100px] font-body text-sm font-medium leading-relaxed" 
                placeholder="e.g. crypto, forex, click here..."
              ></textarea>
              
              <button className="w-full py-3 bg-surface-container-highest rounded-xl text-xs font-bold font-label text-on-surface hover:bg-primary/20 hover:text-primary transition-colors border border-outline-variant/10 uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">save</span>
                Update Filter Rules
              </button>
            </div>
          </section>

          {/* Trending Metrics */}
          <section className="glass-card rounded-3xl p-8 border border-outline-variant/10">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6 uppercase tracking-tight">Community Pulse</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black font-headline text-on-surface/10 group-hover:text-secondary/20 transition-colors">01</div>
                  <div>
                    <p className="font-bold text-on-surface text-lg">#FitSphereChallenge</p>
                    <p className="text-xs text-on-surface-variant font-label">2,482 posts • <span className="text-secondary">+12% surge</span></p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary">trending_up</span>
              </div>
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black font-headline text-on-surface/10 group-hover:text-secondary/20 transition-colors">02</div>
                  <div>
                    <p className="font-bold text-on-surface text-lg">#MidnightMovers</p>
                    <p className="text-xs text-on-surface-variant font-label">1,105 posts • <span className="text-secondary">+5% surge</span></p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary">trending_up</span>
              </div>
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black font-headline text-on-surface/10 group-hover:text-secondary/20 transition-colors">03</div>
                  <div>
                    <p className="font-bold text-on-surface text-lg">#GluteGainz</p>
                    <p className="text-xs text-on-surface-variant font-label">892 posts • <span className="text-tertiary">Stable</span></p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">remove</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
