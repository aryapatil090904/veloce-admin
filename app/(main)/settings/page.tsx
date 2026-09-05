"use client";

import React, { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General Information', icon: 'storefront' },
    { id: 'billing', name: 'Billing & Payments', icon: 'payments' },
    { id: 'notifications', name: 'Notifications', icon: 'notifications' },
    { id: 'hardware', name: 'Hardware & Access', icon: 'router' },
    { id: 'team', name: 'Team Permissions', icon: 'admin_panel_settings' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black font-headline tracking-tight text-on-surface">System Settings</h2>
          <p className="text-on-surface-variant font-label mt-1">Manage your facility preferences, integrations, and billing</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-surface-container hover:bg-surface-container-highest text-on-surface font-bold py-2 px-6 rounded-xl transition-all border border-outline-variant/20">
             Discard
           </button>
           <button className="bg-primary text-on-primary-container font-bold py-2 px-6 rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,195,235,0.2)]">
             <span className="material-symbols-outlined text-sm">save</span>
             Save Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Settings Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-colors font-bold ${
                 activeTab === tab.id 
                 ? 'bg-surface-container-low border border-primary/20 text-primary shadow-[inset_4px_0_0_0_#6dddff]' 
                 : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-transparent'
               }`}
             >
               <span className="material-symbols-outlined">{tab.icon}</span>
               <span className="font-label tracking-tight">{tab.name}</span>
             </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="col-span-12 lg:col-span-9">
          {activeTab === 'general' && (
             <div className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 animate-in slide-in-from-right-4 duration-300">
               <h3 className="text-2xl font-bold font-headline text-on-surface mb-6">Facility Information</h3>
               
               <div className="space-y-6">
                 {/* Row 1 */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Facility Name</label>
                     <input type="text" defaultValue="Veloce Fitness Downtown" className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Contact Email</label>
                     <input type="email" defaultValue="hello@veloce.fit" className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" />
                   </div>
                 </div>

                 {/* Row 2 */}
                 <div className="space-y-2">
                   <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Business Address</label>
                   <input type="text" defaultValue="123 Neon Avenue, Cyber District, 90210" className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" />
                 </div>

                 <hr className="border-outline-variant/10 my-8" />
                 
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold font-headline text-on-surface">Operating Hours</h3>
                   <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">EST (UTC-5)</span>
                 </div>
                 
                 {/* Row 3 - Hours */}
                 <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                      <div key={day} className="flex items-center justify-between bg-surface-container-low border border-outline-variant/5 p-4 rounded-xl group hover:border-outline-variant/20 transition-colors">
                        <span className="font-bold text-sm w-32">{day}</span>
                        <div className="flex gap-4 flex-1">
                          <input type="time" defaultValue="05:00" className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark" />
                          <span className="text-on-surface-variant self-center text-xs font-bold uppercase tracking-widest">to</span>
                          <input type="time" defaultValue="23:00" className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark" />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_8px_rgba(0,195,235,0)] peer-checked:shadow-[0_0_8px_rgba(0,195,235,0.5)]"></div>
                        </label>
                      </div>
                    ))}
                    <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant/5 p-4 rounded-xl group hover:border-outline-variant/20 transition-colors opacity-60 grayscale">
                      <span className="font-bold text-sm w-32">Saturday</span>
                      <div className="flex gap-4 flex-1">
                        <input type="time" disabled className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark opacity-50" />
                        <span className="text-on-surface-variant self-center text-xs font-bold uppercase tracking-widest">to</span>
                        <input type="time" disabled className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark opacity-50" />
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_8px_rgba(0,195,235,0)] peer-checked:shadow-[0_0_8px_rgba(0,195,235,0.5)]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant/5 p-4 rounded-xl group hover:border-outline-variant/20 transition-colors opacity-60 grayscale">
                      <span className="font-bold text-sm w-32">Sunday</span>
                      <div className="flex gap-4 flex-1">
                        <input type="time" disabled className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark opacity-50" />
                        <span className="text-on-surface-variant self-center text-xs font-bold uppercase tracking-widest">to</span>
                        <input type="time" disabled className="bg-surface-container border-0 rounded-lg py-2 px-4 text-on-surface outline-none color-scheme-dark opacity-50" />
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_8px_rgba(0,195,235,0)] peer-checked:shadow-[0_0_8px_rgba(0,195,235,0.5)]"></div>
                      </label>
                    </div>
                 </div>
               </div>
             </div>
          )}

          {activeTab !== 'general' && (
             <div className="glass-card rounded-[2rem] p-12 border border-outline-variant/15 flex flex-col items-center justify-center text-center animate-in slide-in-from-right-4 duration-300 h-full min-h-[500px]">
               <span className="material-symbols-outlined text-[6rem] text-on-surface-variant/20 mb-6 drop-shadow-2xl">{tabs.find(t => t.id === activeTab)?.icon}</span>
               <h3 className="text-2xl font-bold font-headline text-on-surface mb-3">{tabs.find(t => t.id === activeTab)?.name} Config</h3>
               <p className="text-on-surface-variant max-w-sm mb-8 text-sm">This module is part of the enterprise backend integration. Reach out to your Veloce implementation manager to customize these settings.</p>
               <button onClick={() => setActiveTab('general')} className="bg-surface-container px-6 py-3 rounded-xl hover:bg-surface-container-highest font-bold text-xs uppercase tracking-widest text-on-surface transition-colors border border-outline-variant/10">Return to General</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
