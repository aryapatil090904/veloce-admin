"use client";

import { useState } from "react";
import { TableToolbar } from "@/components/ui/table";

export default function BookingsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tight font-headline text-on-surface">
            Classes &amp; <span className="text-secondary">Bookings</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Manage weekly schedules, instructor assignments, and member attendance.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-3 rounded-xl border border-outline-variant/10 flex flex-col items-center">
            <span className="text-2xl font-bold font-headline text-primary italic">94%</span>
            <span className="text-[10px] uppercase font-label text-on-surface-variant">Avg Occupancy</span>
          </div>
          <div className="glass-card px-6 py-3 rounded-xl border border-outline-variant/10 flex flex-col items-center">
            <span className="text-2xl font-bold font-headline text-secondary">42</span>
            <span className="text-[10px] uppercase font-label text-on-surface-variant">Classes Weekly</span>
          </div>
        </div>
      </section>

      {/* Weekly Schedule Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-7 gap-4">
        {/* Day Column: Monday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2">MON</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-secondary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">HIIT</span>
              <span className="text-xs text-on-surface-variant font-label">06:00 AM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Explosive Cardio</p>
            <p className="text-[10px] text-on-surface-variant font-label">Coach Marcus</p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">STRENGTH</span>
              <span className="text-xs text-on-surface-variant font-label">05:30 PM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Power Lifting 101</p>
            <p className="text-[10px] text-on-surface-variant font-label">Coach Sarah</p>
          </div>
        </div>

        {/* Day Column: Tuesday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2">TUE</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-tertiary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">YOGA</span>
              <span className="text-xs text-on-surface-variant font-label">07:00 AM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Flow &amp; Release</p>
            <p className="text-[10px] text-on-surface-variant font-label">Yogi Elena</p>
          </div>
        </div>

        {/* Day Column: Wednesday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2">WED</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-secondary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">HIIT</span>
              <span className="text-xs text-on-surface-variant font-label">06:00 AM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Kettlebell Core</p>
            <p className="text-[10px] text-on-surface-variant font-label">Coach Marcus</p>
          </div>
          <button className="w-full h-24 rounded-xl border border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all group">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-[10px] font-label font-bold uppercase">Add Slot</span>
          </button>
        </div>

        {/* Day Column: Thursday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2">THU</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">STRENGTH</span>
              <span className="text-xs text-on-surface-variant font-label">06:00 PM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Deadlift Masterclass</p>
            <p className="text-[10px] text-on-surface-variant font-label">Coach Sarah</p>
          </div>
        </div>

        {/* Day Column: Friday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2">FRI</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-secondary"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">HIIT</span>
              <span className="text-xs text-on-surface-variant font-label">06:00 AM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Full Body Blitz</p>
            <p className="text-[10px] text-on-surface-variant font-label">Coach Marcus</p>
          </div>
        </div>

        {/* Day Column: Saturday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2 text-secondary">SAT</h3>
          <div className="glass-card p-4 rounded-xl border border-outline-variant/10 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-1 h-full bg-error"></div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-label font-bold text-error bg-error/10 px-2 py-0.5 rounded">EVENT</span>
              <span className="text-xs text-on-surface-variant font-label">09:00 AM</span>
            </div>
            <p className="font-headline font-bold text-sm leading-tight text-on-surface">Outdoor Bootcamp</p>
            <p className="text-[10px] text-on-surface-variant font-label">All Coaches</p>
          </div>
        </div>

        {/* Day Column: Sunday */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface-variant text-center border-b border-outline-variant/10 pb-2 text-secondary">SUN</h3>
          <div className="flex items-center justify-center h-48">
            <span className="text-[10px] font-label text-on-surface-variant italic">Gym Closed</span>
          </div>
        </div>
      </section>

      {/* Bookings & Attendance Section */}
      <section className="space-y-6">
        <TableToolbar title="Real-Time Bookings">
          <div className="flex items-center gap-2 bg-surface-container-high p-1 rounded-full border border-outline-variant/10">
            <button className="px-4 py-1.5 rounded-full text-xs font-bold font-label bg-secondary text-on-secondary shadow-sm">All</button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold font-label text-on-surface-variant hover:text-on-surface">HIIT</button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold font-label text-on-surface-variant hover:text-on-surface">Strength</button>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold font-label text-on-surface-variant hover:text-on-surface">Yoga</button>
          </div>
          <button className="px-4 py-2 bg-surface-container-highest rounded-xl text-xs font-bold font-label text-on-surface border border-outline-variant/20 hover:bg-surface-bright transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Export List
          </button>
        </TableToolbar>

        {/* Custom Interactive Table */}
        <div className="glass-card rounded-2xl border border-outline-variant/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Class Type</th>
                <th className="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-4 text-xs font-bold font-label text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img alt="Member Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIyWORK2-CXt1fVpSvrEJegElw0Fdj8cvzm68tcPjX6MdweUS4xBxRr69ltZAvwhwiVwD3-5bzTrjo570rb_Ka5zqYtA4e08GBA2DdbZ0650hnOknq3oZ8axmqnoYTK415nNATzqyad0_euGVw25Xgy_gG4dJEmxT6Nk-6fc1H-APnnW9TO4ukLyEgXIZI0CSEt8hrcgqF4V31L0TDioDZ4InePUM4pfPHZOsvWsHBVYFAgv4YChhVi_vc9B84-IX3diMIzMZ2uuM" />
                    </div>
                    <div>
                      <p className="font-bold font-headline text-on-surface">Elena Rodriguez</p>
                      <p className="text-[10px] text-on-surface-variant font-label">Platinum Member</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold font-label px-3 py-1 rounded-full bg-secondary/10 text-secondary">Explosive Cardio</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-xs font-bold text-on-surface font-label">Today, 06:00 AM</p>
                    <p className="text-[10px] text-on-surface-variant font-label">Confirmed</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="text-xs font-bold font-label text-on-surface">Auto-Pay Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Check-in Manually">
                      <span className="material-symbols-outlined text-lg">how_to_reg</span>
                    </button>
                    <button className="p-2 hover:bg-error/20 hover:text-error rounded-lg transition-colors" title="Remove Member">
                      <span className="material-symbols-outlined text-lg">person_remove</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img alt="Member Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL21shazXcJBqNbXkNsNSFSfDrJPtf_pQTqOb-6_ZLK6VeIJghDal3PQXrhG3tfqkLGW8DIE4xz2tnja62CYBSDqYbOs3wzBS4wt0b3D4Rbn40DLMr4Y0I_WYr_mT-4wWKR5DF6nCpEPjRvK01AFJOqlSZ8T-VvEXitw9JYfjDyd6uJXkT3-P63k5uRx4jzNUxkPc8h2VXkGSygBiBHFMYxPHgCW5F-T5joaOg96HbNjwDyMUx2_tAS7annP-gxRIE_vhTZKBsQrs" />
                    </div>
                    <div>
                      <p className="font-bold font-headline text-on-surface">Jackson Thorne</p>
                      <p className="text-[10px] text-on-surface-variant font-label">Standard Plan</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold font-label px-3 py-1 rounded-full bg-primary/10 text-primary">Power Lifting</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-xs font-bold text-on-surface font-label">Tomorrow, 05:30 PM</p>
                    <p className="text-[10px] text-on-surface-variant font-label">Waitlisted #1</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-error"></div>
                    <span className="text-xs font-bold font-label text-on-surface">Payment Pending</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Check-in Manually">
                      <span className="material-symbols-outlined text-lg">how_to_reg</span>
                    </button>
                    <button className="p-2 hover:bg-error/20 hover:text-error rounded-lg transition-colors" title="Remove Member">
                      <span className="material-symbols-outlined text-lg">person_remove</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img alt="Member Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUbeK1JorBZE5Dy--FqTtIHl2YklL9XvXI-E9_McIFpNMFVMKlD53_UQPc4H5_VNStdO9pz_c4DocXDkjR1ZwT77wlDi6CHa5ATGmCUHkArOrtwTJg_xbiIljARnItQk_RM1NYg618VcMI545tkuvZo6COwOF3OaWoenr_oiYgQWqMNIykoCOFiPstCVLw472bC3Z7Ht2Z6lpykGPzzJmd4udYXO5amhwzzfw3Wrc2nE-JQht-uJ1cqGfqY800Id4KgosK2uQ1rv0" />
                    </div>
                    <div>
                      <p className="font-bold font-headline text-on-surface">Maya Sterling</p>
                      <p className="text-[10px] text-on-surface-variant font-label">Platinum Member</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold font-label px-3 py-1 rounded-full bg-tertiary/10 text-tertiary">Flow &amp; Release</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-xs font-bold text-on-surface font-label">Wed, 07:00 AM</p>
                    <p className="text-[10px] text-on-surface-variant font-label">Confirmed</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span className="text-xs font-bold font-label text-on-surface">Paid via Credits</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Check-in Manually">
                      <span className="material-symbols-outlined text-lg">how_to_reg</span>
                    </button>
                    <button className="p-2 hover:bg-error/20 hover:text-error rounded-lg transition-colors" title="Remove Member">
                      <span className="material-symbols-outlined text-lg">person_remove</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-label">Showing 1-10 of 124 bookings</span>
            <div className="flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-on-surface disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="text-xs font-bold text-on-surface font-label">Page 1 of 13</span>
              <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
