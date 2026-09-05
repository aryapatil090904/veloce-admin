"use client";

import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableToolbar,
  TablePagination
} from "@/components/ui/table";

export default function AttendancePage() {
  const [historyMember, setHistoryMember] = useState<{name: string, id: string, avatar: string} | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">Attendance &amp; Activity Center</h2>
          <p className="text-on-surface-variant font-label mt-1">Real-time gym floor analytics, check-ins, and staff activity</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl border border-outline-variant/10">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-label font-bold text-on-surface uppercase tracking-wider">Live Status</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Real-time Occupancy Meter */}
        <div className="col-span-12 lg:col-span-4 glass-card bg-surface-container/60 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold font-label text-secondary px-2 py-1 rounded bg-secondary/10 uppercase tracking-tighter">Live Status</span>
          </div>
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
              <circle className="text-surface-container-highest/30" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="url(#primaryGradient)" strokeDasharray="502.6" strokeDashoffset="125" strokeLinecap="round" strokeWidth="12"></circle>
              <defs>
                <linearGradient id="primaryGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#6dddff" }}></stop>
                  <stop offset="100%" style={{ stopColor: "#bf04ff" }}></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black font-headline text-on-surface leading-none">75%</span>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase mt-1">Capacity</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-headline font-bold text-lg">182 / 240</h3>
            <p className="text-sm text-on-surface-variant font-label">Members currently on floor</p>
          </div>
          {/* Ambient Glow */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 blur-[60px] rounded-full"></div>
        </div>

        {/* Peak Times Analysis */}
        <div className="col-span-12 lg:col-span-8 glass-card bg-surface-container/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold font-headline mb-1">Peak Attendance Patterns</h3>
              <p className="text-sm text-on-surface-variant font-label">Last 24 hours high-energy windows</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-surface-container-highest px-3 py-1 rounded-md text-[10px] font-bold text-on-surface-variant font-label uppercase">Day</button>
              <button className="bg-secondary/10 px-3 py-1 rounded-md text-[10px] font-bold text-secondary font-label uppercase">Week</button>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 gap-4 px-2">
            {/* Bars with different heights representing peaks */}
            <div className="flex-1 bg-surface-container-highest/40 rounded-t-lg relative group h-[20%] transition-all hover:bg-primary/20">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">06:00</div>
            </div>
            <div className="flex-1 bg-secondary rounded-t-lg relative group h-[85%] transition-all hover:brightness-110">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">09:00</div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-secondary font-headline opacity-0 group-hover:opacity-100 transition-opacity">MAX</div>
            </div>
            <div className="flex-1 bg-surface-container-highest/40 rounded-t-lg relative group h-[45%] transition-all hover:bg-primary/20">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">12:00</div>
            </div>
            <div className="flex-1 bg-surface-container-highest/40 rounded-t-lg relative group h-[30%] transition-all hover:bg-primary/20">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">15:00</div>
            </div>
            <div className="flex-1 bg-primary rounded-t-lg relative group h-[95%] transition-all hover:brightness-110 shadow-[0_0_20px_rgba(109,221,255,0.3)]">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">18:00</div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-primary font-headline opacity-0 group-hover:opacity-100 transition-opacity">PEAK</div>
            </div>
            <div className="flex-1 bg-surface-container-highest/40 rounded-t-lg relative group h-[55%] transition-all hover:bg-primary/20">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">21:00</div>
            </div>
            <div className="flex-1 bg-surface-container-highest/40 rounded-t-lg relative group h-[15%] transition-all hover:bg-primary/20">
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant">00:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Check-in Log */}
      <TableContainer>
        <TableToolbar title="Live Check-in Log">
          <div className="relative mr-auto w-64 ml-4 hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-secondary outline-none text-on-surface placeholder:text-on-surface-variant/50" placeholder="Manual Check-In Search..." type="text" />
          </div>
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter Status
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Logs
          </button>
        </TableToolbar>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi3_iyBYC0XnhMB_kmJyZwxyPodKyDbfanHYqGHO_ImJsaLyXJn68QpSrj2830MuHQLQ7OWARjG23CFP2NsY-Y6weKz5Q67rh8EEAoQTdWoEn-ZEksdaI2o87OEnzyfhvh2GmZOo7R5WsS6DXnp2mfgmuM_kCV9Ngpy9sr5k-SOJrhJZCMySyfNs-o5no7abS71-TJbiTXVpeWoLrJJxdwPbcQxGtTE_QW6_ciY7W2UfBognkgdpEtmN7kHNlm4clEBK2j3VIRFNo" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Marcus Sterling</p>
                    <p className="text-xs text-on-surface-variant mt-1">ID: #89211</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-headline font-medium">14:52:10</p>
                <p className="text-[10px] text-on-surface-variant font-label">2 minutes ago</p>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2 text-secondary text-xs font-black font-headline uppercase italic">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#c3f400]"></span>
                  Checked In
                </span>
              </TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Elite Performance</span>
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2 items-center">
                <button className="bg-surface-container-high text-xs font-bold font-label px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-error/50 hover:text-error transition-colors whitespace-nowrap" title="2 hrs auto-checkout if left inside gym">
                  Check Out
                </button>
                <button 
                  onClick={() => setHistoryMember({ name: "Marcus Sterling", id: "#89211", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi3_iyBYC0XnhMB_kmJyZwxyPodKyDbfanHYqGHO_ImJsaLyXJn68QpSrj2830MuHQLQ7OWARjG23CFP2NsY-Y6weKz5Q67rh8EEAoQTdWoEn-ZEksdaI2o87OEnzyfhvh2GmZOo7R5WsS6DXnp2mfgmuM_kCV9Ngpy9sr5k-SOJrhJZCMySyfNs-o5no7abS71-TJbiTXVpeWoLrJJxdwPbcQxGtTE_QW6_ciY7W2UfBognkgdpEtmN7kHNlm4clEBK2j3VIRFNo" })}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" title="View Visit History (Member Profile)">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                </button>
              </TableCell>
            </TableRow>
            {/* Row 2 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-9czXOphA1bL7NFjQJPfozqwBWlgVW_1_gMKYL2ZnKiA0XZNLQG-P07E2-Vtm4KzXlNvoxhk0dS14sx74NZFkMSU4uWb1FIQxtuM0NZm3qnp8tInkOTYVexxm8YwIZB7tILyggOJyPrZRN5ucb9gUVYkaVxfyWapOIh92kwiGikwmj5pNMqdb4HCWzRNY4T-ftq2GCV8ZIV6xHwQ9ZQITZ9GsleEhHOnxpQXQTujf_RSMtwDYRXC4nioL8kAyy117jtEzaJX7bvU" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Elena Rodriguez</p>
                    <p className="text-xs text-on-surface-variant mt-1">ID: #89452</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-headline font-medium">14:48:05</p>
                <p className="text-[10px] text-on-surface-variant font-label">6 minutes ago</p>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2 text-secondary text-xs font-black font-headline uppercase italic">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#c3f400]"></span>
                  Checked In
                </span>
              </TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-widest rounded-full border border-tertiary/20">Standard Hub</span>
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2 items-center">
                <button className="bg-surface-container-high text-xs font-bold font-label px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-error/50 hover:text-error transition-colors whitespace-nowrap" title="2 hrs auto-checkout if left inside gym">
                  Check Out
                </button>
                <button 
                  onClick={() => setHistoryMember({ name: "Elena Rodriguez", id: "#89452", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-9czXOphA1bL7NFjQJPfozqwBWlgVW_1_gMKYL2ZnKiA0XZNLQG-P07E2-Vtm4KzXlNvoxhk0dS14sx74NZFkMSU4uWb1FIQxtuM0NZm3qnp8tInkOTYVexxm8YwIZB7tILyggOJyPrZRN5ucb9gUVYkaVxfyWapOIh92kwiGikwmj5pNMqdb4HCWzRNY4T-ftq2GCV8ZIV6xHwQ9ZQITZ9GsleEhHOnxpQXQTujf_RSMtwDYRXC4nioL8kAyy117jtEzaJX7bvU" })}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" 
                  title="View Visit History (Member Profile)"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                </button>
              </TableCell>
            </TableRow>
            {/* Row 3 */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="h-full w-full object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZeZet8IqtKb8uYPMw2woHMG0pVwRQh_F9uKUkVA-EQG5GHtcy9nUpbd0qJhbMWFRTX6pM0oarSggngiTmesh9sa-VcIOJkwsdzx0wgVV3Rm82O9y-7e2jWt49htZuvD7EaYVNIl21JZXA57Qd13F1ZxLFsRv4MQ5G2f8FO_1uc1PHABno4v-J8KDXbMWHZ6CiqVMuMAk9Bd0KFfDqg2gX4HvR18yCHmK09aGBL4taO9cHpXxkZK_AS1nB5bH-u_AavBCBZZFF6w" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-none">Jordan Kovic</p>
                    <p className="text-xs text-on-surface-variant mt-1">ID: #89110</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-headline font-medium">14:45:12</p>
                <p className="text-[10px] text-on-surface-variant font-label">9 minutes ago</p>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2 text-error text-xs font-black font-headline uppercase italic">
                  <span className="w-1.5 h-1.5 rounded-full bg-error shadow-[0_0_8px_#ff716c]"></span>
                  Flagged Account
                </span>
              </TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">Trial Membership</span>
              </TableCell>
              <TableCell className="text-right flex justify-end gap-2 items-center">
                <button className="bg-error/10 text-error text-[10px] font-black font-headline px-3 py-1 rounded border border-error/20 hover:bg-error/20 transition-colors uppercase tracking-widest whitespace-nowrap">RESOLVE</button>
                <button 
                  onClick={() => setHistoryMember({ name: "Jordan Kovic", id: "#89110", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZeZet8IqtKb8uYPMw2woHMG0pVwRQh_F9uKUkVA-EQG5GHtcy9nUpbd0qJhbMWFRTX6pM0oarSggngiTmesh9sa-VcIOJkwsdzx0wgVV3Rm82O9y-7e2jWt49htZuvD7EaYVNIl21JZXA57Qd13F1ZxLFsRv4MQ5G2f8FO_1uc1PHABno4v-J8KDXbMWHZ6CiqVMuMAk9Bd0KFfDqg2gX4HvR18yCHmK09aGBL4taO9cHpXxkZK_AS1nB5bH-u_AavBCBZZFF6w" })}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" title="View Visit History (Member Profile)">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination />
      </TableContainer>

      {/* System Alerts / Upcoming */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6 glass-card bg-surface-container/60 border border-white/5 rounded-2xl p-6 relative">
          <h4 className="font-headline font-black text-xs uppercase tracking-widest text-on-surface-variant mb-6">Upcoming Classes (In 30m)</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border-l-4 border-primary">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <span className="material-symbols-outlined">sprint</span>
              </div>
              <div className="flex-1">
                <p className="font-bold font-headline">HIIT Velocity</p>
                <p className="text-xs text-on-surface-variant font-label">Lead: Coach Sarah • 18/20 Enrolled</p>
              </div>
              <span className="text-xs font-black font-headline text-on-surface-variant">15:30</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border-l-4 border-tertiary">
              <div className="bg-tertiary/10 p-3 rounded-lg text-tertiary">
                <span className="material-symbols-outlined">self_improvement</span>
              </div>
              <div className="flex-1">
                <p className="font-bold font-headline">Deep Recovery Yoga</p>
                <p className="text-xs text-on-surface-variant font-label">Lead: Zen Master Leo • 12/15 Enrolled</p>
              </div>
              <span className="text-xs font-black font-headline text-on-surface-variant">15:30</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-6 glass-card bg-surface-container/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-headline font-black text-xs uppercase tracking-widest text-on-surface-variant mb-4">Equipment Monitoring</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-highest/40 p-4 rounded-xl border border-white/5">
                <p className="text-3xl font-black font-headline text-secondary leading-none">94%</p>
                <p className="text-[10px] font-bold font-label text-on-surface-variant uppercase mt-1">Smart Racks Ready</p>
              </div>
              <div className="bg-surface-container-highest/40 p-4 rounded-xl border border-white/5">
                <p className="text-3xl font-black font-headline text-primary leading-none">88%</p>
                <p className="text-[10px] font-bold font-label text-on-surface-variant uppercase mt-1">Cardio Deck Online</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-[10px] font-label text-on-surface-variant italic">Next Maintenance: Saturday, 04:00 AM</p>
            <button className="text-primary text-[10px] font-black font-headline uppercase tracking-widest hover:underline">View Diagnostics</button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* Employee Attendance & Activity Section */}
      {/* ---------------------------------------------------- */}
      <div className="pt-8 mt-8 border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h3 className="text-3xl font-black font-headline tracking-tight text-on-surface">Employee Attendance &amp; Activity</h3>
            <p className="text-on-surface-variant font-label mt-1">Staff timeclock, task lists, and shift logs</p>
          </div>
          <button className="bg-primary text-on-primary-container font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,195,235,0.3)]">
            <span className="material-symbols-outlined">schedule</span>
            <span>Clock In / Start Shift</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Employee Timesheets & Search */}
          <div className="xl:col-span-2 space-y-8">
            {/* Manager Timesheets */}
            <TableContainer>
              <TableToolbar title="Manager Timesheets">
                <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter Week
                </button>
                <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export Payroll
                </button>
              </TableToolbar>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">JD</div>
                        <div>
                          <p className="font-headline font-bold text-on-surface text-sm">John Doe</p>
                          <p className="text-[10px] text-on-surface-variant">Personal Trainer</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-headline font-medium text-sm">09:00 AM - 05:00 PM</p>
                      <p className="text-[10px] text-on-surface-variant font-label">Today</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-on-surface">8h 00m</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" title="Edit Time">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">SL</div>
                        <div>
                          <p className="font-headline font-bold text-on-surface text-sm">Sarah Lee</p>
                          <p className="text-[10px] text-on-surface-variant">Front Desk</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-headline font-medium text-sm">06:00 AM - 02:00 PM</p>
                      <p className="text-[10px] text-on-surface-variant font-label">Today</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-on-surface">8h 00m</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" title="Edit Time">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Trainer Shift Logs */}
            <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-headline text-xl font-bold">Trainer Shift Logs</h4>
                <span className="text-xs font-label text-on-surface-variant">Auto-generated timeline</span>
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/20 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-secondary text-on-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="material-symbols-outlined text-sm">login</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-card border border-outline-variant/10 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold font-headline text-sm text-secondary">Clocked In</h5>
                      <span className="text-[10px] font-label text-on-surface-variant">09:00 AM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">John Doe arrived for shift.</p>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-primary text-on-primary-container shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="material-symbols-outlined text-sm">fitness_center</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-card border border-outline-variant/10 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold font-headline text-sm text-primary">Held PT Session</h5>
                      <span className="text-[10px] font-label text-on-surface-variant">09:15 AM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">Session with client: Alex Rivera.</p>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-tertiary text-on-tertiary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="material-symbols-outlined text-sm">groups</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl glass-card border border-outline-variant/10 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold font-headline text-sm text-tertiary">Taught Spin Class</h5>
                      <span className="text-[10px] font-label text-on-surface-variant">10:30 AM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">24 members attended.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-8">
            {/* Daily Task List */}
            <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col">
              <h4 className="font-headline text-xl font-bold mb-4">Daily Task List</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/5 cursor-pointer hover:bg-surface-container transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-outline-variant/30 text-secondary focus:ring-secondary/50 bg-transparent" />
                  <span className="text-sm font-label text-on-surface">Wipe down treadmills</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/5 cursor-pointer hover:bg-surface-container transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-outline-variant/30 text-secondary focus:ring-secondary/50 bg-transparent" />
                  <span className="text-sm font-label text-on-surface">Restock towels</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/5 cursor-pointer hover:bg-surface-container transition-colors opacity-60">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-outline-variant/30 text-secondary focus:ring-secondary/50 bg-transparent line-through" />
                  <span className="text-sm font-label text-on-surface line-through">Check locker rooms</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/5 cursor-pointer hover:bg-surface-container transition-colors opacity-60">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-outline-variant/30 text-secondary focus:ring-secondary/50 bg-transparent line-through" />
                  <span className="text-sm font-label text-on-surface line-through">Sanitize weights area</span>
                </label>
              </div>
            </div>
            
            {/* Activity Reports */}
            <div className="glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-headline text-xl font-bold">Activity Reports</h4>
                <button className="text-[10px] uppercase font-bold text-primary tracking-widest hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant font-label">John Doe (Sessions)</span>
                    <span className="font-bold">4 / 5</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant font-label">Sarah Lee (Tasks)</span>
                    <span className="font-bold">2 / 4</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visit History Modal */}
      {historyMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-xl rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <img src={historyMember.avatar} alt="Avatar" className="w-14 h-14 rounded-xl object-cover border border-outline-variant/20" />
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">{historyMember.name}</h3>
                  <p className="text-on-surface-variant font-label mt-1">Visit History (Last 30 Days) • {historyMember.id}</p>
                </div>
              </div>
              <button onClick={() => setHistoryMember(null)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Simple Calendar View */}
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
              <div className="grid grid-cols-7 gap-2 mb-4 text-center text-[10px] font-bold text-on-surface-variant uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {/* Generate 30 days grid */}
                {Array.from({ length: 30 }).map((_, i) => {
                  // Simulate random check-in times
                  const checkedIn = Math.random() > 0.4;
                  return (
                    <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 border ${checkedIn ? 'bg-secondary/10 border-secondary/20' : 'bg-surface-container border-transparent opacity-50'}`}>
                      <span className={`text-sm font-bold ${checkedIn ? 'text-secondary' : 'text-on-surface-variant'}`}>{i + 1}</span>
                      {checkedIn && <span className="text-[8px] text-secondary/80 leading-tight">14:00</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center text-xs font-label text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-secondary/10 border border-secondary/20"></span>
                <span>Checked In</span>
              </div>
              <button onClick={() => setHistoryMember(null)} className="font-bold hover:text-on-surface transition-colors py-2 px-4 bg-white/5 rounded-lg hover:bg-white/10">Close History</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
