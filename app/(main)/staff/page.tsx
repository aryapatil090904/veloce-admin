"use client";

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
import { useState, useRef } from "react";
import Link from "next/link";

// Dummy Data
const STAFF_DATA = [
  {
    id: "STF-001",
    name: "Alex Johnson",
    email: "alex.j@veloce.com",
    role: "Senior Trainer",
    shift: "Morning",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=alex",
    clients: ["Sarah Jenkins", "Marcus Thorne"]
  },
  {
    id: "STF-002",
    name: "Jordan Lee",
    email: "jordan.l@veloce.com",
    role: "Nutritionist",
    shift: "Evening",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=jordan",
    clients: ["David Kim"]
  },
  {
    id: "STF-003",
    name: "Casey Smith",
    email: "casey.s@veloce.com",
    role: "Physical Therapist",
    shift: "Morning",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/150?u=casey",
    clients: []
  },
];

const AVAILABLE_CLIENTS = [
  "Elena Rodriguez",
  "Michael Chang",
  "Emma Watson",
  "Liam Neeson"
];

export default function StaffPage() {
  const [staffList, setStaffList] = useState(STAFF_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedClientToAssign, setSelectedClientToAssign] = useState("");
  
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newStaffForm, setNewStaffForm] = useState<{
    name: string;
    email: string;
    role: string;
    status: string;
    shift: string;
    bio: string;
    assignedClients: string[];
  }>({ 
    name: '', 
    email: '', 
    role: 'Front Desk', 
    status: 'Active',
    shift: 'Morning',
    bio: '',
    assignedClients: []
  });

  const idFileInputRef = useRef<HTMLInputElement>(null);
  const cprFileInputRef = useRef<HTMLInputElement>(null);
  const headshotFileInputRef = useRef<HTMLInputElement>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [cprFile, setCprFile] = useState<File | null>(null);
  const [headshotFile, setHeadshotFile] = useState<File | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetAddStaffModal = () => {
    setIsAddStaffModalOpen(false);
    setCurrentStep(1);
    setNewStaffForm({ name: '', email: '', role: 'Front Desk', status: 'Active', shift: 'Morning', bio: '', assignedClients: [] });
    setIdFile(null);
    setCprFile(null);
    setHeadshotFile(null);
  };

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `STF-00${staffList.length + 1}`;
    setStaffList([...staffList, {
      id: newId,
      name: newStaffForm.name,
      email: newStaffForm.email,
      role: newStaffForm.role,
      status: newStaffForm.status,
      shift: newStaffForm.shift,
      avatar: `https://i.pravatar.cc/150?u=${newId}`,
      clients: newStaffForm.assignedClients
    }]);
    resetAddStaffModal();
  };

  const handleShiftChange = (staffId: string, newShift: string) => {
    setStaffList(prev => prev.map(staff => 
      staff.id === staffId ? { ...staff, shift: newShift } : staff
    ));
  };

  const handleAssignClick = (staffId: string) => {
    setSelectedStaff(staffId);
    setIsModalOpen(true);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !selectedClientToAssign) return;

    setStaffList(prev => prev.map(staff => {
      if (staff.id === selectedStaff) {
        if (!staff.clients.includes(selectedClientToAssign)) {
          return { ...staff, clients: [...staff.clients, selectedClientToAssign] };
        }
      }
      return staff;
    }));

    setIsModalOpen(false);
    setSelectedClientToAssign("");
    setSelectedStaff(null);
  };

  const selectedStaffData = staffList.find(s => s.id === selectedStaff);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 relative">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tight leading-none mb-2">Staff Management</h2>
          <p className="text-on-surface-variant font-label text-lg">Manage employees, roles, and client assignments</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAddStaffModalOpen(true)}
            className="px-6 py-3 bg-secondary text-on-secondary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(184,255,0,0.3)] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">person_add</span>
            New Staff
          </button>
        </div>
      </section>

      {/* Quick Insights Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">group</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Active Staff</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-secondary">24</span>
            <span className="text-xs text-secondary-dim font-label">Across 3 departments</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">handshake</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Assigned Clients</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-primary">142</span>
            <span className="text-xs text-primary-dim font-label">Currently managed</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">event_busy</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Staff on Leave</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-error">2</span>
            <span className="text-xs text-error-dim font-label">Coverage required</span>
          </div>
        </div>
      </section>

      {/* Staff Table */}
      <TableContainer>
        <TableToolbar title="Staff Roster">
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter Roles
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export List
          </button>
        </TableToolbar>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Clients</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img className="h-full w-full object-cover" alt={staff.name} src={staff.avatar} />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface leading-none">{staff.name}</p>
                      <p className="text-xs text-on-surface-variant mt-1">ID: {staff.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                    {staff.role}
                  </span>
                </TableCell>
                <TableCell>
                  <select 
                    value={(staff as any).shift || "Morning"}
                    onChange={(e) => handleShiftChange(staff.id, e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/30 text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 cursor-pointer focus:ring-1 focus:ring-primary/50 outline-none"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </TableCell>
                <TableCell>
                  <span className={`flex items-center gap-2 text-xs font-black font-headline uppercase italic ${staff.status === 'Active' ? 'text-secondary' : 'text-error'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-secondary shadow-[0_0_8px_#c3f400]' : 'bg-error shadow-[0_0_8px_#ff716c]'}`}></span>
                    {staff.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 my-2">
                    {staff.clients.length > 0 ? (
                      staff.clients.map(client => (
                        <span key={client} className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5 w-fit">
                          {client}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-label text-on-surface-variant italic uppercase tracking-widest">No Clients</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-4">
                    <button 
                      onClick={() => handleAssignClick(staff.id)}
                      className="bg-primary/10 text-primary text-[10px] font-black font-headline px-3 py-1 rounded border border-primary/20 hover:bg-primary/20 transition-colors uppercase tracking-widest"
                    >
                      ASSIGN
                    </button>
                    <button className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-surface-container-highest">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination />
      </TableContainer>

      {/* Assign Client Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-md border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Assign Client</h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  Assigning to <span className="font-bold text-primary">{selectedStaffData?.name}</span>
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAssignSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-label text-on-surface mb-2">Select Client</label>
                <select 
                  required
                  value={selectedClientToAssign}
                  onChange={(e) => setSelectedClientToAssign(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                >
                  <option value="" disabled>Choose a client...</option>
                  {AVAILABLE_CLIENTS.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(109,221,255,0.3)]"
                >
                  Assign Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Modal Overlay */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-md border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Add New Staff</h3>
                <p className="text-on-surface-variant text-sm mt-1">Step {currentStep} of 4</p>
              </div>
              <button 
                onClick={resetAddStaffModal}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={currentStep < 4 ? handleNextStep : handleAddStaffSubmit} className="space-y-6">
              
              {/* STEP 1: Employee Details */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-sm font-label text-on-surface mb-2">Name</label>
                    <input 
                      required
                      value={newStaffForm.name}
                      onChange={(e) => setNewStaffForm({...newStaffForm, name: e.target.value})}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-label text-on-surface mb-2">Email</label>
                    <input 
                      type="email"
                      required
                      value={newStaffForm.email}
                      onChange={(e) => setNewStaffForm({...newStaffForm, email: e.target.value})}
                      placeholder="jane.d@veloce.com"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-label text-on-surface mb-2">Role</label>
                      <select 
                        value={newStaffForm.role}
                        onChange={(e) => setNewStaffForm({...newStaffForm, role: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                      >
                        <option>Front Desk</option>
                        <option>Trainer</option>
                        <option>Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-label text-on-surface mb-2">Status</label>
                      <select 
                        value={newStaffForm.status}
                        onChange={(e) => setNewStaffForm({...newStaffForm, status: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
                      >
                        <option>Active</option>
                        <option>On Leave</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Document Upload */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                  <p className="text-sm font-label text-on-surface-variant mb-4">Please provide mandatory compliance documents.</p>
                  
                  <div 
                    onClick={() => idFileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/30 rounded-xl p-6 text-center hover:bg-surface-container-high transition-colors cursor-pointer group relative"
                  >
                    <input type="file" className="hidden" ref={idFileInputRef} onChange={(e) => setIdFile(e.target.files?.[0] || null)} />
                    {idFile ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm truncate max-w-full">{idFile.name}</p>
                        <p className="text-xs text-primary mt-1 font-bold">Uploaded Successfully</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary">badge</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm">Upload Government ID</p>
                        <p className="text-xs text-on-surface-variant mt-1">Drag and drop or click to browse</p>
                      </>
                    )}
                  </div>

                  <div 
                    onClick={() => cprFileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/30 rounded-xl p-6 text-center hover:bg-surface-container-high transition-colors cursor-pointer group relative"
                  >
                    <input type="file" className="hidden" ref={cprFileInputRef} onChange={(e) => setCprFile(e.target.files?.[0] || null)} />
                    {cprFile ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-secondary/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-secondary">check_circle</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm truncate max-w-full">{cprFile.name}</p>
                        <p className="text-xs text-secondary mt-1 font-bold">Uploaded Successfully</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-secondary">medical_services</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm">Upload CPR / Fitness Cert</p>
                        <p className="text-xs text-on-surface-variant mt-1">Required for trainers and managers</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: App Profile */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                  <p className="text-sm font-label text-on-surface-variant mb-4">Setup the profile visible to members in the app.</p>
                  
                  <div 
                    onClick={() => headshotFileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/30 rounded-xl p-6 text-center hover:bg-surface-container-high transition-colors cursor-pointer group relative"
                  >
                    <input type="file" className="hidden" ref={headshotFileInputRef} accept="image/*" onChange={(e) => setHeadshotFile(e.target.files?.[0] || null)} />
                    {headshotFile ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-tertiary/20 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-tertiary">check_circle</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm truncate max-w-full">{headshotFile.name}</p>
                        <p className="text-xs text-tertiary mt-1 font-bold">Uploaded Successfully</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-tertiary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-tertiary">add_a_photo</span>
                        </div>
                        <p className="font-bold font-headline text-on-surface text-sm">Upload Headshot</p>
                        <p className="text-xs text-on-surface-variant mt-1">Professional portrait recommended</p>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-label text-on-surface mb-2">Staff Bio</label>
                    <textarea 
                      value={newStaffForm.bio}
                      onChange={(e) => setNewStaffForm({...newStaffForm, bio: e.target.value})}
                      placeholder="Brief description of training style and expertise..."
                      rows={3}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Assign Clients */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                  <p className="text-sm font-label text-on-surface-variant mb-4">Assign clients to this staff member (optional).</p>
                  
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {AVAILABLE_CLIENTS.map(client => (
                      <label key={client} className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high cursor-pointer transition-colors group">
                        <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-on-surface-variant group-hover:border-primary transition-colors">
                          <input 
                            type="checkbox" 
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                            checked={newStaffForm.assignedClients.includes(client)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewStaffForm({...newStaffForm, assignedClients: [...newStaffForm.assignedClients, client]});
                              } else {
                                setNewStaffForm({...newStaffForm, assignedClients: newStaffForm.assignedClients.filter(c => c !== client)});
                              }
                            }}
                          />
                          {newStaffForm.assignedClients.includes(client) && (
                            <span className="material-symbols-outlined text-primary text-sm font-bold bg-surface z-10 w-full h-full flex items-center justify-center rounded-sm">check</span>
                          )}
                        </div>
                        <span className="font-headline font-bold text-on-surface">{client}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                {currentStep > 1 ? (
                  <button 
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={resetAddStaffModal}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors"
                  >
                    Cancel
                  </button>
                )}
                
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-secondary bg-secondary hover:bg-secondary/90 transition-colors shadow-[0_0_15px_rgba(184,255,0,0.3)]"
                >
                  {currentStep < 4 ? 'Next' : 'Complete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
