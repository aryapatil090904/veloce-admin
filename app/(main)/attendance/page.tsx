"use client";

import React, { useState, useEffect } from 'react';
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
import { getAttendanceList, AttendanceRecord, PaginationMeta } from './_api/attendance';

export default function AttendancePage() {
  const [historyMember, setHistoryMember] = useState<{name: string, id: string, avatar: string} | null>(null);

  // State for API integration
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [currentlyCheckedIn, setCurrentlyCheckedIn] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationMeta>({
    currentPage: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch attendance list on page/limit/search change
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      const res = await getAttendanceList({
        page,
        limit,
        search: debouncedSearch,
      });
      if (isMounted) {
        setAttendanceData(res.data);
        setCurrentlyCheckedIn(res.currentlyCheckInCount);
        setPagination(res.pagination);
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [page, limit, debouncedSearch]);

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "—";
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

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
              <span className="text-5xl font-black font-headline text-on-surface leading-none">{currentlyCheckedIn}</span>
              <span className="text-[10px] font-bold font-label text-on-surface-variant uppercase mt-1">Checked In Now</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-headline font-bold text-lg">{currentlyCheckedIn} Members</h3>
            <p className="text-sm text-on-surface-variant font-label">Members currently checked in on floor</p>
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
            <input 
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-secondary outline-none text-on-surface placeholder:text-on-surface-variant/50" 
              placeholder="Manual Check-In Search..." 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
              <TableHead>Time / Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership / Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-on-surface-variant">
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    <span>Loading attendance records...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : attendanceData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-on-surface-variant">
                  No attendance records found.
                </TableCell>
              </TableRow>
            ) : (
              attendanceData.map((item) => {
                const isCheckedIn = item.status === "Present" && !item.checkOutTime;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                          {item.memberName.charAt(0).toUpperCase() || "M"}
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface leading-none">{item.memberName || "Unknown Member"}</p>
                          <p className="text-xs text-on-surface-variant mt-1">ID: #{item.id.slice(-5)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-headline font-medium">{formatTime(item.checkInTime)}</p>
                      <p className="text-[10px] text-on-surface-variant font-label">{formatDate(item.attendanceDate)}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-2 text-xs font-black font-headline uppercase italic ${
                        isCheckedIn || item.status === "Present" ? "text-secondary" : "text-error"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isCheckedIn || item.status === "Present"
                            ? "bg-secondary shadow-[0_0_8px_#c3f400]"
                            : "bg-error shadow-[0_0_8px_#ff716c]"
                        }`}></span>
                        {isCheckedIn ? "Checked In" : item.status || "Absent"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                        {item.membershipType || "Member"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2 items-center">
                      {isCheckedIn && (
                        <button className="bg-surface-container-high text-xs font-bold font-label px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-error/50 hover:text-error transition-colors whitespace-nowrap" title="2 hrs auto-checkout if left inside gym">
                          Check Out
                        </button>
                      )}
                      <button 
                        onClick={() => setHistoryMember({ name: item.memberName, id: `#${item.id.slice(-5)}`, avatar: "" })}
                        className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-highest" 
                        title="View Visit History (Member Profile)">
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination 
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalRecords}
          limit={pagination.limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </TableContainer>

      {/* System Alerts / Upcoming */}
      {/* <div className="grid grid-cols-12 gap-6">
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
      </div> */}

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
