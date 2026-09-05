"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlugConnectedIcon from "@/components/icons/plug-connected-icon";

export default function DashboardPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isAtRiskModalOpen, setIsAtRiskModalOpen] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    const bars = chartRef.current.querySelectorAll('.kinetic-bar') as NodeListOf<HTMLElement>;

    const animatePulse = () => {
      bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * (95 - 40 + 1) + 40);
        bar.style.height = `${randomHeight}%`;
      });
    };

    const interval = setInterval(animatePulse, 3000);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('kinetic-bar')) {
        target.style.filter = 'brightness(1.2)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('kinetic-bar')) {
        target.style.filter = 'brightness(1)';
      }
    };

    chartRef.current.addEventListener('mouseover', handleMouseOver);
    chartRef.current.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearInterval(interval);
      if (chartRef.current) {
        chartRef.current.removeEventListener('mouseover', handleMouseOver);
        chartRef.current.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">Command <span className="text-primary italic">Center</span></h2>
          <p className="text-on-surface-variant mt-1 font-body">Real-time facility orchestration and performance analytics.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl border border-outline-variant/10">
            <PlugConnectedIcon className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-label font-bold text-on-surface uppercase tracking-wider">System Live</span>
          </div>
        </div>
      </div>

      {/* Performance Overview (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase font-bold tracking-widest mb-2">Active Members</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-4xl font-bold text-on-surface">1,284</h3>
              <span className="text-secondary font-bold text-sm">+4.2%</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-3xl">trending_up</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase font-bold tracking-widest mb-2">Pending Payments</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-4xl font-bold text-on-surface">42</h3>
              <span className="text-error font-bold text-sm">ACTION REQ</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-3xl">credit_card_off</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase font-bold tracking-widest mb-2">Cancellations</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-4xl font-bold text-on-surface">12</h3>
              <span className="text-on-surface-variant font-bold text-sm">THIS MONTH</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-on-surface-variant text-3xl">person_remove</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-label text-xs uppercase font-bold tracking-widest mb-2">Daily Revenue</p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-headline text-4xl font-bold text-on-surface">₹12.4k</h3>
              <span className="text-primary font-bold text-sm">ON TRACK</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">payments</span>
          </div>
        </div>
      </div>

      {/* Main Bento Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Kinetic Pulse Visualization */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h4 className="font-headline text-2xl font-bold text-on-surface">Class Popularity Tracker</h4>
              <p className="text-on-surface-variant text-sm font-body">Live tracking of class bookings and trainer performance.</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-surface-container-highest px-3 py-1 rounded-lg text-[10px] font-bold text-on-surface hover:bg-primary hover:text-on-primary transition-colors">THIS WEEK</button>
              <button className="bg-surface-container-highest px-3 py-1 rounded-lg text-[10px] font-bold text-on-surface-variant">MONTH</button>
            </div>
          </div>
          <div ref={chartRef} className="h-64 flex items-end justify-between gap-4 relative z-10">
            {/* Chart Bars */}
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="w-full bg-primary/20 rounded-full h-full relative overflow-hidden flex items-end">
                <div className="kinetic-bar w-full bg-primary rounded-full neon-glow-primary" style={{ height: "95%" }}></div>
              </div>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase tracking-tighter text-center leading-tight">HIIT<br/><span className="font-normal opacity-70 text-[8px]">Coach Sarah</span></span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="w-full bg-primary/20 rounded-full h-full relative overflow-hidden flex items-end">
                <div className="kinetic-bar w-full bg-primary rounded-full neon-glow-primary" style={{ height: "82%" }}></div>
              </div>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase tracking-tighter text-center leading-tight">Yoga<br/><span className="font-normal opacity-70 text-[8px]">Master Leo</span></span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="w-full bg-primary/20 rounded-full h-full relative overflow-hidden flex items-end">
                <div className="kinetic-bar w-full bg-primary rounded-full neon-glow-primary" style={{ height: "65%" }}></div>
              </div>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase tracking-tighter text-center leading-tight">CrossFit<br/><span className="font-normal opacity-70 text-[8px]">Coach Mike</span></span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="w-full bg-primary/20 rounded-full h-full relative overflow-hidden flex items-end">
                <div className="kinetic-bar w-full bg-primary rounded-full neon-glow-primary" style={{ height: "50%" }}></div>
              </div>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase tracking-tighter text-center leading-tight">Spin<br/><span className="font-normal opacity-70 text-[8px]">Elena S.</span></span>
            </div>
          </div>
          {/* Ambient Shader Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20"></div>
        </div>

        {/* Operational Quick-Actions */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-2xl p-8">
          <h4 className="font-headline text-2xl font-bold text-on-surface mb-6">Operations</h4>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/onboarding" className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high hover:bg-surface-bright transition-all group border border-transparent hover:border-primary/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">person_add</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-on-surface">Onboard New Member</p>
                <p className="text-[10px] text-on-surface-variant">Registration &amp; tier setup</p>
              </div>
            </Link>
            <button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high hover:bg-surface-bright transition-all group border border-transparent hover:border-primary/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">campaign</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-on-surface">Broadcast Staff Alert</p>
                <p className="text-[10px] text-on-surface-variant">Instant push notifications</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high hover:bg-surface-bright transition-all group border border-transparent hover:border-primary/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">engineering</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-on-surface">Schedule Maintenance</p>
                <p className="text-[10px] text-on-surface-variant">Manage equipment uptime</p>
              </div>
            </button>
            <button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high hover:bg-surface-bright transition-all group border border-transparent hover:border-primary/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">analytics</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-on-surface">Financial Report</p>
                <p className="text-[10px] text-on-surface-variant">P&amp;L and growth metrics</p>
              </div>
            </button>
          </div>
        </div>

        {/* At-Risk Members */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-2xl p-8 border border-error/20 bg-error/5 relative overflow-hidden flex flex-col">
          <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-9xl text-error">warning</span>
          </div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h4 className="font-headline text-xl font-bold text-error">Attendance Alerts</h4>
            <span className="px-2 py-0.5 bg-error/20 text-error text-[10px] font-bold rounded-md uppercase tracking-wider">At Risk</span>
          </div>
          <div className="space-y-4 relative z-10 flex-1">
            {/* At-Risk Item 1 */}
            <div className="flex items-center gap-4 p-3 bg-background/40 rounded-xl hover:bg-surface-container transition-colors border border-outline-variant/5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img alt="Member" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=David+Kim&background=random&color=fff" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">David Kim</p>
                <p className="text-[10px] text-error font-bold uppercase tracking-wider mt-0.5">14 days inactive</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Send SMS">
                <span className="material-symbols-outlined text-sm">sms</span>
              </button>
            </div>
            {/* At-Risk Item 2 */}
            <div className="flex items-center gap-4 p-3 bg-background/40 rounded-xl hover:bg-surface-container transition-colors border border-outline-variant/5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img alt="Member" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random&color=fff" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">Elena Rodriguez</p>
                <p className="text-[10px] text-error font-bold uppercase tracking-wider mt-0.5">18 days inactive</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Send SMS">
                <span className="material-symbols-outlined text-sm">sms</span>
              </button>
            </div>
          </div>
          <button onClick={() => setIsAtRiskModalOpen(true)} className="mt-6 py-2.5 w-full bg-error/10 rounded-xl text-xs font-bold text-error hover:bg-error/20 transition-colors border border-error/20 relative z-10 uppercase tracking-widest">VIEW ALL (12)</button>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="col-span-12 lg:col-span-5 glass-card rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-headline text-xl font-bold text-on-surface">Live Stream</h4>
            <button className="text-primary font-bold font-label text-xs uppercase tracking-widest hover:underline">View History</button>
          </div>
          <div className="space-y-4">
            {/* Activity Item 1 */}
            <div className="flex items-center gap-6 p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                <img alt="Member" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_U3Mku0_XCXR_EREobkYRHhrxop12MM_ye_9Nn0N-8_9_o0-DLhmbNrnKBGcLI0OjeoUjcqlHdCoYGgrYOi9EBrCRBso7rn8BQ4HPibDoWv1rsToXg2iwhJL-wPWX6g5dbgMyTjbxZ8wyKCd8ZeMiMiFLdW-45TL0dReVCFQRuwOZV9okIPwB3pcCK64vmjWqVDECtwtKXowV47Sg6Fur1iRsX-MSk6qG2zOpPnuU8tbLFEmDs_6X" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">Sarah Jenkins <span className="font-normal text-on-surface-variant">checked in for</span> Power HIIT</p>
                <p className="text-[10px] text-on-surface-variant uppercase mt-1">2 mins ago • Studio B</p>
              </div>
              <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">MEMBER</div>
            </div>
            {/* Activity Item 2 (Alert) */}
            <div className="flex items-center gap-6 p-4 bg-error/5 rounded-xl border border-error/10">
              <div className="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center text-error flex-shrink-0">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">Maintenance alert: <span className="text-error">Treadmill 04</span></p>
                <p className="text-[10px] text-on-surface-variant uppercase mt-1">15 mins ago • Cardio Zone</p>
              </div>
              <button className="px-4 py-1.5 bg-error text-white text-[10px] font-bold rounded-lg hover:scale-105 transition-transform">FIX NOW</button>
            </div>
            {/* Activity Item 3 */}
            <div className="flex items-center gap-6 p-4 bg-surface-container-low/50 rounded-xl hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">stars</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">New Membership: <span className="text-primary italic">Elite Tier</span></p>
                <p className="text-[10px] text-on-surface-variant uppercase mt-1">42 mins ago • Online Portal</p>
              </div>
              <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">GROWTH</div>
            </div>
          </div>
        </div>

        {/* Staff Snapshot */}
        <div className="col-span-12 lg:col-span-3 glass-card rounded-2xl p-8 flex flex-col">
          <h4 className="font-headline text-2xl font-bold text-on-surface mb-6">Duty Roster</h4>
          <div className="space-y-6 flex-1">
            {/* Staff Member 1 */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/30">
                  <img alt="Staff" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhl7GXqN4wlI9WYqfI3hOXpEUAfZMqECi96WLsx5dx_9lUZM_ixizdstzbsC_vqk80HgBc-SvPWKURe8bI1SEaeLtKSA4YaE0nU86k4Igq0JP0ZhZPsNMGf56Hu_NbC5QCP7Wt1Ojq9m2RBuH6Yz1x8St7Jnx2i_eZqWvBFMncHvUR0_cwU5tnsoL9ACaoajw0ZPN0pA3q-CH3Ie2uC4XzOrOMUeRuBGtHChcxeFG2Okw5YP6Ehla1" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface leading-none">Coach Mike</p>
                <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">Floor Lead</p>
              </div>
            </div>
            {/* Staff Member 2 */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/30">
                  <img alt="Staff" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuvZkjBlL0vTswyTXRVCZU1-ajxH_Bosgnf4E4Ttmt6skfd5lIkZCFD838EacmAsxE6UrS8NJzWY3JCoUL_o9YgFQPTX9vSlQ-qAoSROt0lyM5kYOkkBeSjIugCnx1wvp32ovbAHJH7q5pPA4M2ApqyPqX8AZ6gT8d_xqyzVbpbYZ8rRTfjokvANTJn-1YCnmsjLb9esPd1jBElrHBz7Snqu8MAsGvWs9KJmKdFWWfo1pIAC4FQ2f1" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface leading-none">Elena S.</p>
                <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">Studio Mgr</p>
              </div>
            </div>
            {/* Staff Member 3 */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/30 grayscale opacity-50">
                  <img alt="Staff" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwudu09QqCFVuaHOJdr04vwr-wtGotFq1iL6dnd28sEfd0GK0j8NUCWSTTBkZku3V0OJb6mBnnLozbWMCnYKHxZMLQfhsbVl7e1Bc5poE9KCulV5dKSoTJ0QhTt63PdhKbB_6d3sp7tgPuoV2_eprbR8_j9dAAIVOuUTVpV63D8S0Eqr1nZUMMAzeeKgjebBsfQ4AlxedvnupHWfzKGcIR2QSxeVAMINUCEtX5wwc3mW2ZmTisicGi" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-outline-variant rounded-full border-2 border-surface"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface-variant leading-none">David L.</p>
                <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">On Break</p>
              </div>
            </div>
          </div>
          <Link href="/staff" className="mt-8 py-3 w-full bg-surface-container-highest rounded-xl text-xs font-bold text-on-surface hover:bg-primary/20 transition-colors border border-outline-variant/10 text-center flex items-center justify-center gap-2 uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">groups</span>
            Full Employee List
          </Link>
        </div>
      </div>

      {/* At-Risk Members Modal Overlay */}
      {isAtRiskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-high w-full max-w-lg rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-error/5 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-9xl text-error">warning</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-error relative z-10">Attendance Alerts (12)</h3>
              <button 
                onClick={() => setIsAtRiskModalOpen(false)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest rounded-full transition-colors relative z-10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 bg-surface-container-lowest">
              {[
                { name: "David Kim", days: 14, img: "https://ui-avatars.com/api/?name=David+Kim&background=random&color=fff" },
                { name: "Elena Rodriguez", days: 18, img: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random&color=fff" },
                { name: "Michael Chang", days: 15, img: "https://ui-avatars.com/api/?name=Michael+Chang&background=random&color=fff" },
                { name: "Sarah Jenkins", days: 21, img: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random&color=fff" },
                { name: "Alex Rivera", days: 16, img: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random&color=fff" },
                { name: "Priya Patel", days: 24, img: "https://ui-avatars.com/api/?name=Priya+Patel&background=random&color=fff" },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl border border-outline-variant/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img alt="Member" className="w-full h-full object-cover" src={member.img} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-on-surface">{member.name}</p>
                    <p className="text-[10px] text-error font-bold uppercase tracking-wider mt-0.5">{member.days} days inactive</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Send SMS">
                    <span className="material-symbols-outlined text-sm">sms</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors" title="Call">
                    <span className="material-symbols-outlined text-sm">call</span>
                  </button>
                </div>
              ))}
              <div className="text-center py-4 text-xs font-label text-on-surface-variant">
                Scroll for more...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
