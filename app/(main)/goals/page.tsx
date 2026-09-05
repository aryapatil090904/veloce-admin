"use client";

import React, { useState } from 'react';

export default function GoalsPage() {
  const [isMemberGoalModalOpen, setIsMemberGoalModalOpen] = useState(false);
  const [isStaffKPIModalOpen, setIsStaffKPIModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">Goal Management</h2>
          <p className="text-on-surface-variant font-label mt-1">Set, track, and manage targets to keep everyone motivated and accountable.</p>
        </div>
      </div>

      {/* Member Goals Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold font-headline text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">groups</span>
            Member Goals
          </h3>
          <button onClick={() => setIsMemberGoalModalOpen(true)} className="bg-primary/10 text-primary font-bold py-2 px-4 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Create Member Goal
          </button>
        </div>
        
        {/* Member Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {/* Card 1 */}
           <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col justify-between group hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                     <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi3_iyBYC0XnhMB_kmJyZwxyPodKyDbfanHYqGHO_ImJsaLyXJn68QpSrj2830MuHQLQ7OWARjG23CFP2NsY-Y6weKz5Q67rh8EEAoQTdWoEn-ZEksdaI2o87OEnzyfhvh2GmZOo7R5WsS6DXnp2mfgmuM_kCV9Ngpy9sr5k-SOJrhJZCMySyfNs-o5no7abS71-TJbiTXVpeWoLrJJxdwPbcQxGtTE_QW6_ciY7W2UfBognkgdpEtmN7kHNlm4clEBK2j3VIRFNo" alt="Member" />
                   </div>
                   <div>
                     <p className="font-bold text-sm font-headline">Marcus Sterling</p>
                     <p className="text-[10px] text-on-surface-variant uppercase font-label">Deadline: Oct 30</p>
                   </div>
                 </div>
                 <button className="text-primary bg-primary/5 hover:bg-primary/20 rounded-full p-2 transition-colors flex items-center justify-center" title="Send a Nudge">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                 </button>
              </div>
              <div>
                <p className="font-bold font-headline mb-3 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">fitness_center</span>
                  Hit a 100kg Deadlift
                </p>
                <div className="flex justify-between text-xs mb-2 font-label uppercase tracking-wider">
                  <span className="text-on-surface-variant font-bold">85 kg</span>
                  <span className="font-black text-primary">85%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_#6dddff]" style={{ width: '85%' }}></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-[10px] text-on-surface-variant italic">Auto-syncing via app logs</span>
                  <button className="text-[10px] text-on-surface-variant hover:text-on-surface font-bold underline">Manual Update</button>
                </div>
              </div>
           </div>

           {/* Card 2 */}
           <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col justify-between group hover:border-secondary/30 transition-colors">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                     <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-9czXOphA1bL7NFjQJPfozqwBWlgVW_1_gMKYL2ZnKiA0XZNLQG-P07E2-Vtm4KzXlNvoxhk0dS14sx74NZFkMSU4uWb1FIQxtuM0NZm3qnp8tInkOTYVexxm8YwIZB7tILyggOJyPrZRN5ucb9gUVYkaVxfyWapOIh92kwiGikwmj5pNMqdb4HCWzRNY4T-ftq2GCV8ZIV6xHwQ9ZQITZ9GsleEhHOnxpQXQTujf_RSMtwDYRXC4nioL8kAyy117jtEzaJX7bvU" alt="Member" />
                   </div>
                   <div>
                     <p className="font-bold text-sm font-headline">Elena Rodriguez</p>
                     <p className="text-[10px] text-on-surface-variant uppercase font-label">Deadline: Oct 15</p>
                   </div>
                 </div>
                 <button className="text-secondary bg-secondary/5 hover:bg-secondary/20 rounded-full p-2 transition-colors flex items-center justify-center" title="Send a Nudge">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                 </button>
              </div>
              <div>
                <p className="font-bold font-headline mb-3 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">event_available</span>
                  Attend 12 Classes This Month
                </p>
                <div className="flex justify-between text-xs mb-2 font-label uppercase tracking-wider">
                  <span className="text-on-surface-variant font-bold">10 Classes</span>
                  <span className="font-black text-secondary">83%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full shadow-[0_0_10px_#B8FF00]" style={{ width: '83%' }}></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-[10px] text-on-surface-variant italic">Auto-syncing via door scans</span>
                  <button className="text-[10px] text-on-surface-variant hover:text-on-surface font-bold underline">Manual Update</button>
                </div>
              </div>
           </div>

           {/* Card 3 */}
           <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col justify-between group hover:border-tertiary/30 transition-colors">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                     <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZeZet8IqtKb8uYPMw2woHMG0pVwRQh_F9uKUkVA-EQG5GHtcy9nUpbd0qJhbMWFRTX6pM0oarSggngiTmesh9sa-VcIOJkwsdzx0wgVV3Rm82O9y-7e2jWt49htZuvD7EaYVNIl21JZXA57Qd13F1ZxLFsRv4MQ5G2f8FO_1uc1PHABno4v-J8KDXbMWHZ6CiqVMuMAk9Bd0KFfDqg2gX4HvR18yCHmK09aGBL4taO9cHpXxkZK_AS1nB5bH-u_AavBCBZZFF6w" alt="Member" />
                   </div>
                   <div>
                     <p className="font-bold text-sm font-headline">Jordan Kovic</p>
                     <p className="text-[10px] text-on-surface-variant uppercase font-label">Deadline: Nov 01</p>
                   </div>
                 </div>
                 <button className="text-tertiary bg-tertiary/5 hover:bg-tertiary/20 rounded-full p-2 transition-colors flex items-center justify-center animate-pulse" title="Send a Nudge">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                 </button>
              </div>
              <div>
                <p className="font-bold font-headline mb-3 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">monitor_weight</span>
                  Lose 5kg
                </p>
                <div className="flex justify-between text-xs mb-2 font-label uppercase tracking-wider">
                  <span className="text-on-surface-variant font-bold">1.5 kg lost</span>
                  <span className="font-black text-tertiary">30%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2">
                  <div className="bg-tertiary h-2 rounded-full shadow-[0_0_10px_#bf04ff]" style={{ width: '30%' }}></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-[10px] text-tertiary italic">Needs motivation</span>
                  <button className="text-[10px] text-on-surface-variant hover:text-on-surface font-bold underline">Manual Update</button>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Employee Goals Section */}
      <div className="space-y-6 pt-12 border-t border-outline-variant/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-3xl">badge</span>
            <div>
              <h3 className="text-2xl font-bold font-headline text-on-surface">Employee Goals (KPIs)</h3>
              <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mt-1">Management Performance Dashboard</p>
            </div>
          </div>
          <button onClick={() => setIsStaffKPIModalOpen(true)} className="bg-secondary/10 text-secondary font-bold py-2 px-4 rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Set Staff KPI
          </button>
        </div>
        
        {/* Employee Performance Dashboard Table */}
        <div className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">
                <th className="p-6 font-label font-bold">Staff Member</th>
                <th className="p-6 font-label font-bold">KPI Target</th>
                <th className="p-6 font-label font-bold w-1/3">Progress</th>
                <th className="p-6 font-label font-bold text-right">Review Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary font-bold font-headline text-lg">JD</div>
                    <div>
                      <p className="font-bold text-sm font-headline">John Doe</p>
                      <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Personal Trainer</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <p className="text-sm font-bold">Complete 30 PT Sessions</p>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase">By End of Month</p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-surface-container-highest rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full shadow-[0_0_8px_#c3f400]" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs font-black font-headline text-secondary w-12 text-right">24 / 30</span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button onClick={() => setIsReviewModalOpen(true)} className="bg-surface-container hover:bg-surface-container-highest border border-outline-variant/20 px-4 py-2 rounded-lg text-xs font-bold text-on-surface transition-colors uppercase tracking-widest">
                    Review
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold font-headline text-lg">SL</div>
                    <div>
                      <p className="font-bold text-sm font-headline">Sarah Lee</p>
                      <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Front Desk</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <p className="text-sm font-bold">Sell 10 New Memberships</p>
                  <p className="text-[10px] text-error font-label uppercase">Deadline Passed</p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-surface-container-highest rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full shadow-[0_0_8px_#6dddff]" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs font-black font-headline text-primary w-12 text-right">8 / 10</span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button onClick={() => setIsReviewModalOpen(true)} className="bg-error/10 text-error hover:bg-error/20 border border-error/20 px-4 py-2 rounded-lg text-xs font-bold transition-colors uppercase tracking-widest flex items-center justify-end gap-1 ml-auto">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Review Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------- MODALS -------------------- */}

      {/* Create Member Goal Modal */}
      {isMemberGoalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                Create Member Goal
              </h3>
              <button onClick={() => setIsMemberGoalModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsMemberGoalModalOpen(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Select Member</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40" placeholder="Search by name..." required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Target Type</label>
                <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface appearance-none font-body outline-none">
                  <option>Attend 12 classes this month</option>
                  <option>Lose 5kg</option>
                  <option>Hit a 100kg Deadlift</option>
                  <option>Custom Target...</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Deadline</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none color-scheme-dark" type="date" required />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsMemberGoalModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-on-primary-container font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,195,235,0.2)]">Add Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Set Staff KPI Modal */}
      {isStaffKPIModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">assignment_add</span>
                Set Staff KPI
              </h3>
              <button onClick={() => setIsStaffKPIModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsStaffKPIModalOpen(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Select Staff Member</label>
                <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface appearance-none font-body outline-none">
                  <option>John Doe (Personal Trainer)</option>
                  <option>Sarah Lee (Front Desk)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">KPI Target</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40" placeholder="e.g. Sell 10 new memberships" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Timeframe</label>
                  <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface appearance-none font-body outline-none">
                    <option>This Month</option>
                    <option>This Quarter</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Target Value</label>
                  <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface font-body outline-none" type="number" placeholder="10" required />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsStaffKPIModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-secondary text-on-secondary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)]">Assign KPI</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goal Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">rate_review</span>
                KPI Review
              </h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="mb-6 bg-surface-container p-4 rounded-xl border border-outline-variant/10">
              <p className="text-sm font-bold">Sell 10 New Memberships</p>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-on-surface-variant">Progress: 8 / 10</span>
                <span className="text-error font-bold">Deadline Passed</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsReviewModalOpen(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Outcome</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 cursor-pointer hover:bg-surface-container">
                    <input type="radio" name="outcome" className="text-secondary focus:ring-secondary/50 bg-transparent" />
                    <span className="text-sm font-bold">Achieved</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 bg-error/10 p-4 rounded-xl border border-error/20 cursor-pointer hover:bg-error/20">
                    <input type="radio" name="outcome" defaultChecked className="text-error focus:ring-error/50 bg-transparent" />
                    <span className="text-sm font-bold text-error">Missed</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Manager Notes (For Performance Review)</label>
                <textarea className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-tertiary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40 resize-none" rows={4} placeholder="Add a quick note here..."></textarea>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-tertiary text-on-tertiary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(191,0,255,0.2)]">Finalize Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
