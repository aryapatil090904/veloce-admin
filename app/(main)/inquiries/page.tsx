"use client";

import { useState } from "react";
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

// Dummy Data for Inquiries
const INQUIRY_DATA = [
  { id: "INQ-001", name: "Sam Wilson", phone: "+1 (555) 123-4567", email: "sam.w@example.com", status: "Hot", date: "Oct 24", source: "Walk-in", location: "Downtown" },
  { id: "INQ-002", name: "Jessica Lee", phone: "+1 (555) 987-6543", email: "jess.lee@example.com", status: "Warm", date: "Oct 23", source: "Website", location: "Northside" },
  { id: "INQ-003", name: "David Chen", phone: "+1 (555) 555-0100", email: "david.c@example.com", status: "Cold", date: "Oct 20", source: "Instagram", location: "West End" },
];

// Dummy Data for Referrals
const REFERRAL_DATA = [
  { id: "REF-001", referrer: "Elena Rodriguez", invitee: "Maria Garcia", status: "Joined", date: "Oct 22", rewardGranted: false },
  { id: "REF-002", referrer: "Michael Chang", invitee: "Kevin Wu", status: "Pending", date: "Oct 24", rewardGranted: false },
];

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "referrals">("inquiries");
  
  // Inquiry State
  const [inquiries, setInquiries] = useState(INQUIRY_DATA);
  const [isAddInquiryModalOpen, setIsAddInquiryModalOpen] = useState(false);
  const [newInquiryForm, setNewInquiryForm] = useState({
    name: '', phone: '', email: '', status: 'Cold', source: 'Walk-in', location: 'Virar West'
  });

  const [formErrors, setFormErrors] = useState<{name?: string, phone?: string, email?: string}>({});

  const validateForm = () => {
    const errors: {name?: string, phone?: string, email?: string} = {};
    if (!newInquiryForm.name.trim()) errors.name = "Name is required";
    
    const phoneDigits = newInquiryForm.phone.replace(/[\s\-+]/g, '');
    if (!newInquiryForm.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (phoneDigits.length !== 10 || !/^[0-9+\-\s]+$/.test(newInquiryForm.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }

    if (!newInquiryForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newInquiryForm.email)) {
      errors.email = "Invalid email";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newId = `INQ-00${inquiries.length + 1}`;
    setInquiries([{
      id: newId,
      name: newInquiryForm.name,
      phone: newInquiryForm.phone,
      email: newInquiryForm.email,
      status: newInquiryForm.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      source: newInquiryForm.source,
      location: newInquiryForm.location
    }, ...inquiries]);
    setIsAddInquiryModalOpen(false);
    setNewInquiryForm({ name: '', phone: '', email: '', status: 'Cold', source: 'Walk-in', location: 'Virar West' });
    setFormErrors({});
  };
  
  // Referral Reward Modal State
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null);
  const [referrals, setReferrals] = useState(REFERRAL_DATA);
  const [rewardType, setRewardType] = useState("Free Month");

  const openRewardModal = (id: string) => {
    setSelectedReferral(id);
    setIsRewardModalOpen(true);
  };

  const handleGrantReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReferral) return;

    setReferrals(prev => prev.map(ref => 
      ref.id === selectedReferral ? { ...ref, rewardGranted: true } : ref
    ));
    setIsRewardModalOpen(false);
    setSelectedReferral(null);
  };

  const currentReferralData = referrals.find(r => r.id === selectedReferral);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 relative">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tight leading-none mb-2">Inquiries & Referrals</h2>
          <p className="text-on-surface-variant font-label text-lg">Manage leads, member invites, and rewards</p>
        </div>
        
        {/* Custom Tabs */}
        <div className="flex bg-surface-container-high rounded-xl p-1 gap-1">
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`px-6 py-2 rounded-lg font-bold font-headline text-sm transition-all ${
              activeTab === "inquiries" 
                ? "bg-primary text-on-primary shadow-md" 
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
            }`}
          >
            Inquiry List
          </button>
          <button 
            onClick={() => setActiveTab("referrals")}
            className={`px-6 py-2 rounded-lg font-bold font-headline text-sm transition-all ${
              activeTab === "referrals" 
                ? "bg-secondary text-on-secondary shadow-md" 
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
            }`}
          >
            Referrals & Invites
          </button>
        </div>
      </section>

      {/* INQUIRIES TAB CONTENT */}
      {activeTab === "inquiries" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
          
          {/* Inquiries Table */}
          <TableContainer>
            <TableToolbar title="Recent Inquiries">
              <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter Status
              </button>
              <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-sm">download</span>
                Export Logs
              </button>
              <button 
                onClick={() => setIsAddInquiryModalOpen(true)}
                className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_15px_rgba(109,221,255,0.3)] transition-all active:scale-95 text-sm ml-2"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                New Inquiry
              </button>
            </TableToolbar>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img className="h-full w-full object-cover" alt={inquiry.name} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(inquiry.name)}&background=random&color=fff`} />
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface leading-none">{inquiry.name}</p>
                          <p className="text-xs text-on-surface-variant mt-1">ID: {inquiry.id} • {inquiry.date}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-label">
                        <p className="text-on-surface">{inquiry.phone}</p>
                        <p className="text-xs text-on-surface-variant">{inquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">
                        {inquiry.source}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-2 text-xs font-black font-headline uppercase italic ${
                        inquiry.status === 'Hot' ? 'text-primary' : 
                        inquiry.status === 'Warm' ? 'text-tertiary' : 'text-error'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          inquiry.status === 'Hot' ? 'bg-primary shadow-[0_0_8px_#6dddff]' : 
                          inquiry.status === 'Warm' ? 'bg-tertiary shadow-[0_0_8px_#ffb2d9]' : 'bg-error shadow-[0_0_8px_#ff716c]'
                        }`}></span>
                        {inquiry.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-high">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination Footer */}
            <TablePagination />
          </TableContainer>
        </div>
      )}

      {/* REFERRALS TAB CONTENT */}
      {activeTab === "referrals" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <TableContainer>
            <TableToolbar title="Member Referrals">
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
                  <TableHead>Referring Member</TableHead>
                  <TableHead>Invitee Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Rewards</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((ref) => (
                  <TableRow key={ref.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img className="h-full w-full object-cover" alt={ref.referrer} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ref.referrer)}&background=random&color=fff`} />
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface leading-none">{ref.referrer}</p>
                          <p className="text-xs text-secondary mt-1 font-bold">Existing Member</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-headline font-bold text-on-surface">{ref.invitee}</p>
                      <p className="text-xs text-on-surface-variant mt-1">New Prospect</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-label text-on-surface-variant">{ref.date}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                        ref.status === 'Joined' 
                          ? 'bg-secondary/10 text-secondary border-secondary/20' 
                          : 'bg-surface-container-highest text-on-surface-variant border-white/5'
                      }`}>
                        {ref.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {ref.status === 'Joined' ? (
                        ref.rewardGranted ? (
                          <span className="text-xs font-bold text-tertiary flex items-center justify-end gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Reward Granted
                          </span>
                        ) : (
                          <button 
                            onClick={() => openRewardModal(ref.id)}
                            className="bg-secondary/10 text-secondary text-[10px] font-black font-headline px-3 py-1 rounded border border-secondary/20 hover:bg-secondary/20 transition-colors uppercase tracking-widest flex items-center gap-1 ml-auto"
                          >
                            <span className="material-symbols-outlined text-sm">redeem</span>
                            Grant Reward
                          </button>
                        )
                      ) : (
                        <span className="text-xs font-label text-on-surface-variant italic">Waiting for conversion</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination Footer */}
            <TablePagination />
          </TableContainer>
        </div>
      )}

      {/* Grant Reward Modal */}
      {isRewardModalOpen && currentReferralData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-md border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-3xl">redeem</span>
                  Grant Reward
                </h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  Rewarding <span className="font-bold text-secondary">{currentReferralData.referrer}</span> for a successful invite.
                </p>
              </div>
              <button 
                onClick={() => setIsRewardModalOpen(false)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleGrantReward} className="space-y-6">
              <div>
                <label className="block text-sm font-label text-on-surface mb-2">Select Reward for Member</label>
                <select 
                  required
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all outline-none"
                >
                  <option value="Free Month">Free Month Membership</option>
                  <option value="Merchandise Pack">VELOCE Merchandise Pack</option>
                  <option value="PT Session">Free PT Session</option>
                </select>
              </div>
              
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Employee Bonus</p>
                    <p className="text-xs text-on-surface-variant mt-1">The gym employee who processed this sign-up will automatically receive a standard referral commission.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsRewardModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-secondary bg-secondary hover:bg-secondary/90 transition-colors shadow-[0_0_15px_rgba(184,255,0,0.3)]"
                >
                  Confirm & Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Inquiry Modal */}
      {isAddInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-md border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Add New Inquiry</h3>
                <p className="text-on-surface-variant text-sm mt-1">Enter lead details</p>
              </div>
              <button 
                onClick={() => setIsAddInquiryModalOpen(false)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddInquirySubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-label text-on-surface mb-2">Name</label>
                <input 
                  required
                  value={newInquiryForm.name}
                  onChange={(e) => {
                    setNewInquiryForm({...newInquiryForm, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: undefined});
                  }}
                  className={`w-full bg-surface-container-low border ${formErrors.name ? 'border-error/50 focus:ring-error/50' : 'border-outline-variant/30 focus:ring-primary/50'} rounded-xl px-4 py-3 text-on-surface focus:ring-2 outline-none`}
                />
                {formErrors.name && <p className="text-error text-xs mt-1 font-bold">{formErrors.name}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label text-on-surface mb-2">Phone</label>
                  <input 
                    required
                    maxLength={10}
                    value={newInquiryForm.phone}
                    onChange={(e) => {
                      // Only allow numbers to be typed
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setNewInquiryForm({...newInquiryForm, phone: val});
                      if (formErrors.phone) setFormErrors({...formErrors, phone: undefined});
                    }}
                    className={`w-full bg-surface-container-low border ${formErrors.phone ? 'border-error/50 focus:ring-error/50' : 'border-outline-variant/30 focus:ring-primary/50'} rounded-xl px-4 py-3 text-on-surface focus:ring-2 outline-none`}
                  />
                  {formErrors.phone && <p className="text-error text-xs mt-1 font-bold">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-label text-on-surface mb-2">Email</label>
                  <input 
                    type="email"
                    required
                    value={newInquiryForm.email}
                    onChange={(e) => {
                      setNewInquiryForm({...newInquiryForm, email: e.target.value});
                      if (formErrors.email) setFormErrors({...formErrors, email: undefined});
                    }}
                    className={`w-full bg-surface-container-low border ${formErrors.email ? 'border-error/50 focus:ring-error/50' : 'border-outline-variant/30 focus:ring-primary/50'} rounded-xl px-4 py-3 text-on-surface focus:ring-2 outline-none`}
                  />
                  {formErrors.email && <p className="text-error text-xs mt-1 font-bold">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-label text-on-surface mb-2">Neighborhood / Area (For Walk-ins)</label>
                <input 
                  required
                  value={newInquiryForm.location}
                  onChange={(e) => setNewInquiryForm({...newInquiryForm, location: e.target.value})}
                  placeholder="e.g. Virar West, Station Road"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-label text-on-surface mb-2">Source</label>
                  <select 
                    value={newInquiryForm.source}
                    onChange={(e) => setNewInquiryForm({...newInquiryForm, source: e.target.value})}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    <option>Walk-in</option>
                    <option>Website</option>
                    <option>Instagram</option>
                    <option>Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-label text-on-surface mb-2">Status</label>
                  <select 
                    value={newInquiryForm.status}
                    onChange={(e) => setNewInquiryForm({...newInquiryForm, status: e.target.value})}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>Cold</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddInquiryModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(109,221,255,0.3)]"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
