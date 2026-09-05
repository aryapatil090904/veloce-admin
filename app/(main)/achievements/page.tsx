"use client";

import React, { useState } from 'react';

export default function AchievementsPage() {
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">Achievements Tracker</h2>
          <p className="text-on-surface-variant font-label mt-1">Gamification and member rewards monitoring</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="hidden lg:flex gap-6 text-sm">
            <span className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">Active Members: 1,284</span>
            <span className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300">Staff on Duty: 12</span>
            <span className="text-primary font-bold border-b-2 border-primary pb-1">System Health: Optimal</span>
          </div>
          <button
            onClick={() => setIsRewardsModalOpen(true)}
            className="bg-secondary text-on-secondary font-bold py-2 px-6 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)]"
          >
            <span className="material-symbols-outlined">redeem</span>
            <span>Configure Rewards</span>
          </button>
        </div>
      </div>

      {/* Hero Analytics Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Engagement Chart Card */}
        <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 border border-outline-variant/15 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface mb-2">Engagement Pulse</h3>
              <p className="text-on-surface-variant font-body">Gamification interaction over the last 30 days</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-surface-container px-4 py-2 rounded-full text-xs font-label text-secondary border border-secondary/20 font-bold">LIFETIME HIGH</span>
            </div>
          </div>
          {/* Simplified Visual Chart Placeholder */}
          <div className="h-64 flex items-end gap-3 relative z-10">
            <div className="flex-1 bg-surface-container-highest rounded-t-xl group-hover:bg-secondary/20 transition-all duration-500" style={{ height: "40%" }}></div>
            <div className="flex-1 bg-surface-container-highest rounded-t-xl group-hover:bg-secondary/40 transition-all duration-500" style={{ height: "65%" }}></div>
            <div className="flex-1 bg-secondary rounded-t-xl shadow-[0_0_20px_rgba(184,255,0,0.3)]" style={{ height: "85%" }}></div>
            <div className="flex-1 bg-surface-container-highest rounded-t-xl group-hover:bg-secondary/40 transition-all duration-500" style={{ height: "55%" }}></div>
            <div className="flex-1 bg-surface-container-highest rounded-t-xl group-hover:bg-secondary/20 transition-all duration-500" style={{ height: "95%" }}></div>
            <div className="flex-1 bg-tertiary rounded-t-xl shadow-[0_0_20px_rgba(191,0,255,0.3)]" style={{ height: "75%" }}></div>
            <div className="flex-1 bg-surface-container-highest rounded-t-xl group-hover:bg-secondary/40 transition-all duration-500" style={{ height: "45%" }}></div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Circular Stat Card */}
        <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col justify-between">
          <div>
            <h4 className="font-headline text-xl font-bold mb-6">Badge Completion</h4>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle className="text-surface-container-highest/30" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
                <circle cx="96" cy="96" fill="transparent" r="80" stroke="url(#neonGradient)" strokeDasharray="502.6" strokeDashoffset="125" strokeLinecap="round" strokeWidth="12"></circle>
                <defs>
                  <linearGradient id="neonGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#B8FF00", stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: "#BF00FF", stopOpacity: 1 }}></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-headline font-black text-on-surface">75%</span>
                <span className="text-[10px] font-label text-on-surface-variant uppercase">Unlocked Rate</span>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-xl">
              <span className="text-xs font-label">Most Unlocked: "First Sweat"</span>
              <span className="text-secondary font-bold text-xs">92%</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-xl">
              <span className="text-xs font-label">Rarest: "Iron Titan"</span>
              <span className="text-tertiary font-bold text-xs">0.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Create New Badge Interface */}
        <div className="xl:col-span-1 glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-secondary text-3xl">workspace_premium</span>
            <h3 className="font-headline text-2xl font-bold">Forge New Badge</h3>
          </div>
          <form className="space-y-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Badge Identity</label>
              <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/30 font-body" placeholder="e.g. 5am Warrior" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Achievement Criteria</label>
              <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface appearance-none font-body">
                <option>Workout Frequency</option>
                <option>Total Weight Lifted</option>
                <option>Class Attendance</option>
                <option>Personal Record</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Value</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface" placeholder="20" type="number" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Tier</label>
                <div className="flex bg-surface-container-low rounded-xl p-1 h-full">
                  <button className="flex-1 bg-secondary text-on-secondary rounded-lg text-xs font-bold py-2" type="button">Epic</button>
                  <button className="flex-1 text-on-surface-variant text-xs font-bold py-2" type="button">Rare</button>
                </div>
              </div>
            </div>
            <div className="pt-6 flex-1">
              <div className="w-full h-full min-h-[140px] border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-secondary/50 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary">upload_file</span>
                <span className="text-xs font-label text-on-surface-variant">Upload Vector Icon (SVG)</span>
              </div>
            </div>
            <button className="w-full bg-secondary text-on-secondary font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform mt-6 shadow-[0_0_25px_rgba(184,255,0,0.2)]">
              <span className="material-symbols-outlined">auto_fix_high</span>
              <span>Generate Achievement</span>
            </button>
          </form>
        </div>

        {/* Member Search & Badge Table */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          {/* Search Header */}
          <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container-lowest border-0 rounded-full py-4 pl-12 pr-6 text-on-surface focus:ring-2 focus:ring-secondary/50 transition-all font-body outline-none" placeholder="Search members by username or badge status..." type="text" />
            </div>
            <div className="flex gap-2">
              <button className="p-4 bg-surface-container rounded-full text-on-surface-variant hover:text-secondary border border-outline-variant/10"><span className="material-symbols-outlined">filter_list</span></button>
              <button className="p-4 bg-surface-container rounded-full text-on-surface-variant hover:text-secondary border border-outline-variant/10"><span className="material-symbols-outlined">download</span></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            {/* Member Specific Achievements Grid */}
            <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 overflow-hidden flex flex-col">
              <h4 className="font-headline text-xl font-bold mb-6">Recent Unlock Performance</h4>
              <div className="space-y-4 flex-1">
                {/* Row 1 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                    <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIWapdL_iFN69M1QaxV8fJTyj4enNvz2gRBHRpx17gS25sKOF0A9jXWsobew73KVVcG5R8YYvLYGPv-JEWzlZKsETfkNVh78my5aOlodKAjyV63I5TkLL6VYnDYprAGhJPwICwdShgF_JYhzzAIBajDJbVixVqDHLo2d6OHZ1iaDXQ4WP3QwE2w6jK70S38iOMyAg2LVCyB97d2Iq3UBQ_PnS2iQA8z6k7-_DNQ4A4ZfshC6ixg4gjREffC8GHiMDgE0WD305YGwk" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">Alex Rivera</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Elite • 142 Badges</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                    <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-secondary">+2.4k XP</div>
                    <div className="text-[10px] text-on-surface-variant">2m ago</div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                    <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUDiPJiAgP83v_xfOg83HeZT8b7wcwiSw_zfST15LqdiEIznp77KVpiCiiAFZ1X8cqPNCxiZ1dmIT18VHZe-sKgfNc1ejQFezHwKZAtKxaEpI8eln30Ve4uyefT9cL8wRT33zG43KeD8P74AOwznwtvzJqVB_tQicIdnaBcGnZRvlLJyj1p1XewvkBLQPDHClMv6CXfgWBuV14_rClvAyY_Ai_WNx2XWhi3ORaP-F6gzvsV2DEmj47XKGKbNZm2igTKqpRyQ6ghWg" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">Marcus Chen</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Adv. • 89 Badges</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-secondary">+1.1k XP</div>
                    <div className="text-[10px] text-on-surface-variant">14m ago</div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                    <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByvj-Y7TM4D5zlcailYX3RcdHO3rWKnvp1TXW7P70alo958iG7Qk8QhQ4TfJFTCjoAfJmuRzeDQuek7oxp3yJ0JH903omgDnbtd1ZMuK7EHX7s5E1-3WIa2lYVkZq3EJec3VcoDMCMAz3rjuZlVz1JSRWN2ZZBfKscrmEY9ryOFH6j7QRJx7XCIFm0BJY44ZIFPziyykectb9c4jYuutr-ATSBCthao3PPXl6AzNuiZgjENDeveC5_3jZ2dKsbkBGpm8Ex-py3mz0" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">Sarah Jenkins</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Starter • 12 Badges</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-secondary">+350 XP</div>
                    <div className="text-[10px] text-on-surface-variant">45m ago</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-4 text-[10px] font-label text-on-surface-variant hover:text-secondary uppercase tracking-[0.2em] transition-colors border-t border-outline-variant/10">View Global Leaderboard</button>
            </div>

            {/* Attendance Streaks Grid */}
            <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-headline text-xl font-bold">Active Streaks</h4>
                <button className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-full p-2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">more_horiz</span>
                </button>
              </div>
              <div className="space-y-4 flex-1">
                {/* Streak 1 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0 border border-error/20">
                    <span className="material-symbols-outlined text-error text-2xl group-hover:scale-110 transition-transform">local_fire_department</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">David Kim</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Consistency King</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-error font-headline">42 <span className="text-xs text-on-surface-variant font-medium">Days</span></div>
                  </div>
                </div>
                {/* Streak 2 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0 border border-error/20">
                    <span className="material-symbols-outlined text-error text-2xl group-hover:scale-110 transition-transform">local_fire_department</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">Emma Watson</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Morning Warrior</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-error font-headline">28 <span className="text-xs text-on-surface-variant font-medium">Days</span></div>
                  </div>
                </div>
                {/* Streak 3 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 border border-secondary/20">
                    <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">bolt</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold font-headline">James Lee</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase font-label">Rising Star</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-secondary font-headline">14 <span className="text-xs text-on-surface-variant font-medium">Days</span></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-4 text-[10px] font-label text-on-surface-variant hover:text-primary uppercase tracking-[0.2em] transition-colors border-t border-outline-variant/10">View All Streaks</button>
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Stats Ticker */}
      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex-shrink-0 glass-card rounded-2xl p-6 border border-outline-variant/15 w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
            </div>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Growth Velocity</span>
          </div>
          <div className="text-3xl font-headline font-black text-on-surface">+24.5%</div>
          <div className="h-1 w-full bg-surface-container mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-2/3 shadow-[0_0_10px_#B8FF00]"></div>
          </div>
        </div>

        <div className="flex-shrink-0 glass-card rounded-2xl p-6 border border-outline-variant/15 w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-sm">social_leaderboard</span>
            </div>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Daily XP Pool</span>
          </div>
          <div className="text-3xl font-headline font-black text-on-surface">1.2M</div>
          <div className="h-1 w-full bg-surface-container mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-tertiary w-1/2 shadow-[0_0_10px_#BF00FF]"></div>
          </div>
        </div>

        <div className="flex-shrink-0 glass-card rounded-2xl p-6 border border-outline-variant/15 w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">diversity_3</span>
            </div>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Co-op Badges</span>
          </div>
          <div className="text-3xl font-headline font-black text-on-surface">14</div>
          <div className="h-1 w-full bg-surface-container mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/4 shadow-[0_0_10px_#6dddff]"></div>
          </div>
        </div>

        <div className="flex-shrink-0 glass-card rounded-2xl p-6 border border-outline-variant/15 w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-sm">energy_savings_leaf</span>
            </div>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Recovery Streak</span>
          </div>
          <div className="text-3xl font-headline font-black text-on-surface">8.4k</div>
          <div className="h-1 w-full bg-surface-container mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-3/4 shadow-[0_0_10px_#B8FF00]"></div>
          </div>
        </div>
      </div>

      {/* Leaderboard Management Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-8">
        {/* Create a Challenge */}
        <div className="xl:col-span-1 glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">add_task</span>
            <h3 className="font-headline text-2xl font-bold">Create a Challenge</h3>
          </div>
          <form className="space-y-6 flex-1 flex flex-col">
            <div className="space-y-2">
              <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Challenge Title</label>
              <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/30 font-body" placeholder="e.g. April 50km Run Challenge" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Metric to Track</label>
              <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface appearance-none font-body">
                <option>Distance (km)</option>
                <option>Workouts Logged</option>
                <option>Class Attendance</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Start Date</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface" type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">End Date</label>
                <input className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface" type="date" />
              </div>
            </div>
            <div className="pt-6 mt-auto">
              <button className="w-full bg-primary text-on-primary-container font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_25px_rgba(0,195,235,0.2)]">
                <span className="material-symbols-outlined">rocket_launch</span>
                <span>Launch Challenge</span>
              </button>
            </div>
          </form>
        </div>

        {/* Active Challenges & Leaderboard (Manage Entries & Scores, Award Prizes) */}
        <div className="xl:col-span-2 flex flex-col space-y-8">
          <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Challenge</span>
                  <span className="text-xs text-on-surface-variant font-label">Ends in 2 days</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">April 50km Run Challenge</h3>
              </div>
              <button 
                onClick={() => setIsFinalizeModalOpen(true)}
                className="bg-secondary text-on-secondary font-bold py-2 px-6 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)] shrink-0"
              >
                <span className="material-symbols-outlined">social_leaderboard</span>
                <span>Finalize &amp; Award Prizes</span>
              </button>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {/* Leaderboard rows with manual edit */}
              <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black font-headline text-secondary w-8 text-center">1</div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIWapdL_iFN69M1QaxV8fJTyj4enNvz2gRBHRpx17gS25sKOF0A9jXWsobew73KVVcG5R8YYvLYGPv-JEWzlZKsETfkNVh78my5aOlodKAjyV63I5TkLL6VYnDYprAGhJPwICwdShgF_JYhzzAIBajDJbVixVqDHLo2d6OHZ1iaDXQ4WP3QwE2w6jK70S38iOMyAg2LVCyB97d2Iq3UBQ_PnS2iQA8z6k7-_DNQ4A4ZfshC6ixg4gjREffC8GHiMDgE0WD305YGwk" alt="Member" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold font-headline">Alex Rivera</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase">48.2 km logged</p>
                  </div>
                </div>
                <button className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" title="Manual Score Adjustment">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span className="text-xs font-bold font-label">Adjust Score</span>
                </button>
              </div>

              <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black font-headline text-on-surface w-8 text-center">2</div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUDiPJiAgP83v_xfOg83HeZT8b7wcwiSw_zfST15LqdiEIznp77KVpiCiiAFZ1X8cqPNCxiZ1dmIT18VHZe-sKgfNc1ejQFezHwKZAtKxaEpI8eln30Ve4uyefT9cL8wRT33zG43KeD8P74AOwznwtvzJqVB_tQicIdnaBcGnZRvlLJyj1p1XewvkBLQPDHClMv6CXfgWBuV14_rClvAyY_Ai_WNx2XWhi3ORaP-F6gzvsV2DEmj47XKGKbNZm2igTKqpRyQ6ghWg" alt="Member" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold font-headline">Marcus Chen</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase">42.5 km logged</p>
                  </div>
                </div>
                <button className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" title="Manual Score Adjustment">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span className="text-xs font-bold font-label">Adjust Score</span>
                </button>
              </div>

              <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black font-headline text-tertiary w-8 text-center">3</div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuByvj-Y7TM4D5zlcailYX3RcdHO3rWKnvp1TXW7P70alo958iG7Qk8QhQ4TfJFTCjoAfJmuRzeDQuek7oxp3yJ0JH903omgDnbtd1ZMuK7EHX7s5E1-3WIa2lYVkZq3EJec3VcoDMCMAz3rjuZlVz1JSRWN2ZZBfKscrmEY9ryOFH6j7QRJx7XCIFm0BJY44ZIFPziyykectb9c4jYuutr-ATSBCthao3PPXl6AzNuiZgjENDeveC5_3jZ2dKsbkBGpm8Ex-py3mz0" alt="Member" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold font-headline">Sarah Jenkins</h5>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase">38.0 km logged</p>
                  </div>
                </div>
                <button className="p-2 bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2" title="Manual Score Adjustment">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <span className="text-xs font-bold font-label">Adjust Score</span>
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/10 text-center">
              <span className="text-xs font-label text-on-surface-variant italic">Admins can manually adjust scores directly if a member missed logging.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configure Rewards Modal */}
      {isRewardsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">redeem</span>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Configure Rewards</h3>
              </div>
              <button onClick={() => setIsRewardsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsRewardsModalOpen(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Task Type</label>
                <div className="relative">
                  <input
                    list="task-types"
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/30 font-body outline-none"
                    placeholder="Select or type a custom task..."
                    required
                  />
                  <datalist id="task-types">
                    <option value="7-Day Gym Streak" />
                    <option value="Class Attendance" />
                    <option value="Hit a new Personal Record" />
                    <option value="Refer a Friend" />
                  </datalist>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Reward Configuration</label>
                <div className="relative">
                  <input
                    list="reward-types"
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/30 font-body outline-none"
                    placeholder="e.g. 500 XP, Free Protein Shake..."
                    required
                  />
                  <datalist id="reward-types">
                    <option value="500 XP" />
                    <option value="Free Protein Shake" />
                    <option value="1 Month Free Membership" />
                    <option value="Gym Bag Merch" />
                  </datalist>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsRewardsModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-secondary text-on-secondary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)]">
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Finalize Challenge Modal */}
      {isFinalizeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">emoji_events</span>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Award Prizes &amp; Finalize</h3>
              </div>
              <button onClick={() => setIsFinalizeModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsFinalizeModalOpen(false); }}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Prize Type</label>
                <select className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface appearance-none font-body">
                  <option>Push Digital Winner Badges</option>
                  <option>Physical Prize (Announce on Feed)</option>
                  <option>Custom Reward from Gym</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Custom Note / Announcement (Optional)</label>
                <textarea className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface-variant/30 font-body resize-none" placeholder="e.g. Stop by the front desk to claim your Gym Merch!" rows={3}></textarea>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsFinalizeModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-secondary text-on-secondary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)]">
                  Finalize &amp; Notify Winners
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
