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
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  getStaffList, 
  getStaffStats, 
  createStaff, 
  updateStaff, 
  deleteStaff,
  assignClientToStaff, 
  StaffMember, 
  StaffStats, 
  PaginationMeta 
} from "./_api/staff";
import { getMembers, Member } from "../members/_api/members";

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<StaffStats>({
    totalActive: 0,
    totalAssignedClients: 0,
    staffOnLeave: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("Filter Roles");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedClientToAssign, setSelectedClientToAssign] = useState("");
  const [selectedMemberIdToAssign, setSelectedMemberIdToAssign] = useState("");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);

  const filteredClients = availableMembers.slice(0, 10);
  
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmittingNewStaff, setIsSubmittingNewStaff] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState<{
    name: string;
    email: string;
    role: string;
    status: string;
    shift: string;
    bio: string;
    assignedClients: { memberId: string; name: string }[];
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

  // Dropdown menu & Action Modals State
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const [viewingStaff, setViewingStaff] = useState<StaffMember | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isUpdatingStaff, setIsUpdatingStaff] = useState(false);
  const [deletingStaffId, setDeletingStaffId] = useState<string | null>(null);
  const [isDeletingStaff, setIsDeletingStaff] = useState(false);

  // Close action dropdown menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeActionMenuId && !(e.target as HTMLElement).closest('.action-menu-container')) {
        setActiveActionMenuId(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeActionMenuId]);

  // Handle Edit Submit
  const handleEditStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    setIsUpdatingStaff(true);
    try {
      const targetId = editingStaff._id || editingStaff.id || editingStaff.staffId || "";
      const updated = await updateStaff(targetId, {
        name: editingStaff.name,
        email: editingStaff.email,
        role: editingStaff.role,
        status: editingStaff.status,
        shift: editingStaff.shift,
        bio: editingStaff.bio,
      });

      if (updated) {
        setEditingStaff(null);
        loadStaff();
        const updatedStats = await getStaffStats();
        if (updatedStats) setStats(updatedStats);
      }
    } catch (err) {
      console.error("Failed to update staff:", err);
    } finally {
      setIsUpdatingStaff(false);
    }
  };

  // Handle Delete Confirm
  const handleDeleteStaffConfirm = async (id: string) => {
    setIsDeletingStaff(true);
    try {
      const success = await deleteStaff(id);
      if (success) {
        setDeletingStaffId(null);
        setActiveActionMenuId(null);
        loadStaff();
        const updatedStats = await getStaffStats();
        if (updatedStats) setStats(updatedStats);
      }
    } catch (err) {
      console.error("Failed to delete staff:", err);
    } finally {
      setIsDeletingStaff(false);
    }
  };

  // Fetch quick insights statistics and initial database members (limit 10) on page mount
  useEffect(() => {
    async function initData() {
      try {
        const [statsData, membersData] = await Promise.all([
          getStaffStats(),
          getMembers({ limit: 10 })
        ]);
        if (statsData) {
          setStats(statsData);
        }
        if (membersData && membersData.members) {
          setAvailableMembers(membersData.members);
        }
      } catch (err) {
        console.error("Failed to fetch staff stats or members:", err);
      }
    }
    initData();
  }, []);

  // Dynamically fetch members matching client search term (limit 10)
  useEffect(() => {
    if (!isModalOpen && !isAddStaffModalOpen) return;

    const timer = setTimeout(async () => {
      try {
        const res = await getMembers({ search: clientSearchTerm, limit: 10 });
        if (res && res.members) {
          setAvailableMembers(res.members);
        }
      } catch (err) {
        console.error("Failed to search members:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [clientSearchTerm, isModalOpen, isAddStaffModalOpen]);

  // Fetch staff list on search, role filter, or pagination changes
  const loadStaff = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getStaffList({
        search,
        role: selectedRoleFilter,
        page,
        limit,
      });

      setStaffList(res.staff || []);

      if (res.pagination) {
        setPaginationMeta(res.pagination);
      }
    } catch (err) {
      console.error("Failed to load staff list:", err);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedRoleFilter, page, limit]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleAddStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewStaff(true);

    try {
      let governmentIdUrl = "";
      let cprCertUrl = "";
      let avatar = "";

      if (idFile) {
        governmentIdUrl = await fileToBase64(idFile);
      }
      if (cprFile) {
        cprCertUrl = await fileToBase64(cprFile);
      }
      if (headshotFile) {
        avatar = await fileToBase64(headshotFile);
      }

      const created = await createStaff({
        name: newStaffForm.name,
        email: newStaffForm.email,
        role: newStaffForm.role,
        status: newStaffForm.status,
        shift: newStaffForm.shift,
        bio: newStaffForm.bio,
        avatar,
        governmentIdUrl,
        cprCertUrl,
        assignedClients: newStaffForm.assignedClients,
      });

      if (created) {
        resetAddStaffModal();
        loadStaff();
        // Refresh stats
        const updatedStats = await getStaffStats();
        if (updatedStats) setStats(updatedStats);
      }
    } catch (err) {
      console.error("Failed to create staff:", err);
    } finally {
      setIsSubmittingNewStaff(false);
    }
  };

  const handleShiftChange = async (staffId: string, newShift: string) => {
    // Optimistic UI update
    setStaffList(prev => prev.map(staff => 
      (staff._id === staffId || staff.id === staffId || staff.staffId === staffId)
        ? { ...staff, shift: newShift } 
        : staff
    ));

    await updateStaff(staffId, { shift: newShift });
  };

  const handleAssignClick = (staffId: string) => {
    setSelectedStaff(staffId);
    setIsModalOpen(true);
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !selectedClientToAssign) return;

    const targetStaff = selectedStaff;
    const clientToAdd = selectedClientToAssign;
    const memberIdToAdd = selectedMemberIdToAssign || selectedClientToAssign;

    // Optimistic UI update
    setStaffList(prev => prev.map(staff => {
      const isTarget = staff._id === targetStaff || staff.id === targetStaff || staff.staffId === targetStaff;
      const clientObj = { memberId: memberIdToAdd, name: clientToAdd };
      if (isTarget) {
        return { ...staff, assignedClients: [...staff.assignedClients, clientObj] };
      }
      return staff;
    }));

    setIsModalOpen(false);
    setSelectedClientToAssign("");
    setSelectedMemberIdToAssign("");
    setSelectedStaff(null);

    await assignClientToStaff(targetStaff, clientToAdd, memberIdToAdd);
    // Refresh stats
    const updatedStats = await getStaffStats();
    if (updatedStats) setStats(updatedStats);
  };

  const selectedStaffData = staffList.find(s => s._id === selectedStaff || s.id === selectedStaff || s.staffId === selectedStaff);

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
            className="px-6 py-3 bg-secondary text-on-secondary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(184,255,0,0.3)] transition-all active:scale-95 cursor-pointer"
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
            <span className="text-4xl font-headline font-bold text-secondary">{stats.totalActive}</span>
            <span className="text-xs text-secondary-dim font-label">Active members</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">handshake</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Assigned Clients</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-primary">{stats.totalAssignedClients}</span>
            <span className="text-xs text-primary-dim font-label">Currently managed</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">event_busy</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Staff on Leave</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-error">{stats.staffOnLeave}</span>
            <span className="text-xs text-error-dim font-label">Coverage required</span>
          </div>
        </div>
      </section>

      {/* Staff Table */}
      <TableContainer>
        <TableToolbar title="Staff Roster">
          <div className="relative min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              className="w-full bg-surface-container-low border-none rounded-lg pl-9 pr-3 py-1.5 text-xs text-on-surface focus:ring-1 focus:ring-primary/50 placeholder:text-outline transition-all"
              placeholder="Search staff..."
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select 
            value={selectedRoleFilter}
            onChange={(e) => {
              setSelectedRoleFilter(e.target.value);
              setPage(1);
            }}
            className="bg-surface-container-low border-none rounded-lg px-3 py-1.5 text-xs text-on-surface font-label focus:ring-1 focus:ring-primary/50 cursor-pointer"
          >
            <option value="Filter Roles">Filter Roles</option>
            <option value="Senior Trainer">Senior Trainer</option>
            <option value="Trainer">Trainer</option>
            <option value="Nutritionist">Nutritionist</option>
            <option value="Physical Therapist">Physical Therapist</option>
            <option value="Front Desk">Front Desk</option>
            <option value="Manager">Manager</option>
          </select>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-on-surface-variant font-label">
                  Loading staff members...
                </TableCell>
              </TableRow>
            ) : staffList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-on-surface-variant font-label">
                  No staff members found.
                </TableCell>
              </TableRow>
            ) : (
              staffList.map((staff) => {
                const targetId = staff._id || staff.id || staff.staffId || "";
                return (
                  <TableRow key={targetId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
                          {staff.avatar ? (
                            <img className="h-full w-full object-cover" alt={staff.name} src={staff.avatar} />
                          ) : (
                            <span className="material-symbols-outlined text-on-surface-variant">person</span>
                          )}
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface leading-none">{staff.name}</p>
                          <p className="text-xs text-on-surface-variant mt-1">ID: {staff.staffId || staff.id || "STF"}</p>
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
                        value={staff.shift || "Morning"}
                        onChange={(e) => handleShiftChange(targetId, e.target.value)}
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
                      <div className="flex flex-wrap gap-1 my-2">
                        {staff.assignedClients && staff.assignedClients.length > 0 ? (
                          staff.assignedClients.map((client, idx) => {
                            const displayName = typeof client === 'object' ? client.name : client;
                            return (
                              <span 
                                key={idx} 
                                className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5 w-fit flex items-center gap-1.5"
                              >
                                {displayName}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-[10px] font-label text-on-surface-variant italic uppercase tracking-widest">No Clients</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-3">
                        <button 
                          onClick={() => handleAssignClick(targetId)}
                          className="bg-primary/10 text-primary text-[10px] font-black font-headline px-3 py-1 rounded border border-primary/20 hover:bg-primary/20 transition-colors uppercase tracking-widest cursor-pointer"
                        >
                          ASSIGN
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (activeActionMenuId === targetId) {
                              setActiveActionMenuId(null);
                              setMenuPosition(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setMenuPosition({
                                top: rect.bottom + 6,
                                right: window.innerWidth - rect.right,
                              });
                              setActiveActionMenuId(targetId);
                            }
                          }}
                          className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-surface-container-highest cursor-pointer"
                        >
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        
        {/* Pagination Footer */}
        <TablePagination
          page={page}
          limit={limit}
          totalCount={paginationMeta.totalCount}
          totalPages={paginationMeta.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </TableContainer>

      {/* Floating Action Menu Portal (escapes all table overflow and clipping) */}
      {activeActionMenuId && menuPosition && (() => {
        const staff = staffList.find(s => (s._id || s.id || s.staffId) === activeActionMenuId);
        if (!staff) return null;
        const targetId = activeActionMenuId;
        return (
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              top: `${menuPosition.top}px`, 
              right: `${menuPosition.right}px` 
            }}
            className="fixed w-44 bg-[#181B20] rounded-xl border border-outline-variant/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] z-[9999] py-1.5 animate-in fade-in zoom-in-95 duration-150 action-menu-container"
          >
            <button 
              onClick={() => {
                setViewingStaff(staff);
                setActiveActionMenuId(null);
                setMenuPosition(null);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-label text-on-surface hover:bg-primary/20 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              View Details
            </button>
            <button 
              onClick={() => {
                setEditingStaff(staff);
                setActiveActionMenuId(null);
                setMenuPosition(null);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-label text-on-surface hover:bg-primary/20 hover:text-primary transition-colors flex items-center gap-2 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Staff
            </button>
            
            <div className="h-px bg-white/10 my-1"></div>

            <button 
              onClick={() => {
                setDeletingStaffId(targetId);
                setActiveActionMenuId(null);
                setMenuPosition(null);
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-label text-error hover:bg-error/20 transition-colors flex items-center gap-2 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete Staff
            </button>
          </div>
        );
      })()}

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
              <div className="space-y-2 relative">
                <label className="block text-sm font-label text-on-surface mb-2">Select Client</label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    value={selectedClientToAssign || clientSearchTerm}
                    onFocus={() => setIsClientDropdownOpen(true)}
                    onChange={(e) => {
                      setClientSearchTerm(e.target.value);
                      setSelectedClientToAssign(e.target.value);
                      setIsClientDropdownOpen(true);
                    }}
                    placeholder="Search & select member..."
                    className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/50 rounded-xl py-3.5 px-4 pr-10 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-xl">
                    arrow_drop_down
                  </span>
                </div>

                {isClientDropdownOpen && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 max-h-52 overflow-y-auto bg-surface-container-high rounded-xl border border-outline-variant/30 shadow-2xl divide-y divide-white/5">
                    {filteredClients.length === 0 ? (
                      <div className="p-4 text-xs text-on-surface-variant italic">No members matching search</div>
                    ) : (
                      filteredClients.map((member) => (
                        <div
                          key={member._id || member.memberId || member.name}
                          onClick={() => {
                            const uniqueMemberId = member.memberId || member._id || member.name;
                            setSelectedClientToAssign(member.name);
                            setSelectedMemberIdToAssign(uniqueMemberId);
                            setClientSearchTerm(member.name);
                            setIsClientDropdownOpen(false);
                          }}
                          className="p-3 hover:bg-primary/10 cursor-pointer transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-sm font-bold font-headline text-on-surface group-hover:text-primary transition-colors">{member.name}</p>
                            {member.email && <p className="text-[10px] text-on-surface-variant">{member.email}</p>}
                          </div>
                          {member.tier && (
                            <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary font-bold px-2 py-0.5 rounded uppercase font-headline">
                              {member.tier}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
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
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(109,221,255,0.3)] cursor-pointer"
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
                        <option>Senior Trainer</option>
                        <option>Trainer</option>
                        <option>Nutritionist</option>
                        <option>Physical Therapist</option>
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
                    {availableMembers.length === 0 ? (
                      <p className="text-xs text-on-surface-variant font-label italic p-2">No members available in database.</p>
                    ) : (
                      availableMembers.map(member => {
                        const mId = member.memberId || member._id || "";
                        const isChecked = newStaffForm.assignedClients.some(c => c.memberId === mId || c.name === member.name);
                        return (
                          <label key={member._id || member.memberId || member.name} className="flex items-center gap-3 p-4 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high cursor-pointer transition-colors group">
                            <div className="relative flex items-center justify-center w-6 h-6 rounded-md border-2 border-on-surface-variant group-hover:border-primary transition-colors">
                              <input 
                                type="checkbox" 
                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewStaffForm({
                                      ...newStaffForm,
                                      assignedClients: [
                                        ...newStaffForm.assignedClients,
                                        { memberId: mId, name: member.name }
                                      ]
                                    });
                                  } else {
                                    setNewStaffForm({
                                      ...newStaffForm,
                                      assignedClients: newStaffForm.assignedClients.filter(c => c.memberId !== mId && c.name !== member.name)
                                    });
                                  }
                                }}
                              />
                              {isChecked && (
                                <span className="material-symbols-outlined text-primary text-sm font-bold bg-surface z-10 w-full h-full flex items-center justify-center rounded-sm">check</span>
                              )}
                            </div>
                            <span className="font-headline font-bold text-on-surface">{member.name}</span>
                          </label>
                        );
                      })
                    )}
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
                  disabled={isSubmittingNewStaff}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-on-secondary bg-secondary hover:bg-secondary/90 transition-colors shadow-[0_0_15px_rgba(184,255,0,0.3)] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingNewStaff ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      Saving...
                    </>
                  ) : currentStep < 4 ? (
                    'Next'
                  ) : (
                    'Complete'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Staff Modal Overlay */}
      {viewingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-lg border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center border-2 border-primary/30">
                  {viewingStaff.avatar ? (
                    <img className="h-full w-full object-cover" alt={viewingStaff.name} src={viewingStaff.avatar} />
                  ) : (
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant">person</span>
                  )}
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">{viewingStaff.name}</h3>
                  <p className="text-xs text-primary font-bold font-label uppercase tracking-widest">{viewingStaff.role} • ID: {viewingStaff.staffId || viewingStaff.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingStaff(null)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 font-body text-sm">
              <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Email</p>
                  <p className="font-bold text-on-surface text-xs truncate mt-0.5">{viewingStaff.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Shift</p>
                  <p className="font-bold text-on-surface text-xs mt-0.5">{viewingStaff.shift || "Morning"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Status</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${viewingStaff.status === 'Active' ? 'text-secondary' : 'text-error'} mt-0.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${viewingStaff.status === 'Active' ? 'bg-secondary' : 'bg-error'}`}></span>
                    {viewingStaff.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Assigned Clients</p>
                  <p className="font-bold text-on-surface text-xs mt-0.5">{viewingStaff.assignedClients?.length || 0} clients</p>
                </div>
              </div>

              {viewingStaff.bio && (
                <div>
                  <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Bio / Profile</p>
                  <p className="text-xs text-on-surface bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 italic">{viewingStaff.bio}</p>
                </div>
              )}

              {(viewingStaff.governmentIdUrl || viewingStaff.cprCertUrl) && (
                <div>
                  <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Compliance Documents</p>
                  <div className="grid grid-cols-2 gap-3">
                    {viewingStaff.governmentIdUrl && (
                      <a 
                        href={viewingStaff.governmentIdUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-outline-variant/30 text-xs font-bold text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">badge</span>
                        Government ID
                      </a>
                    )}
                    {viewingStaff.cprCertUrl && (
                      <a 
                        href={viewingStaff.cprCertUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl border border-outline-variant/30 text-xs font-bold text-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">medical_services</span>
                        CPR / Fitness Cert
                      </a>
                    )}
                  </div>
                </div>
              )}

              {viewingStaff.assignedClients && viewingStaff.assignedClients.length > 0 && (
                <div>
                  <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Client Roster</p>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {viewingStaff.assignedClients.map((client, idx) => (
                      <span key={idx} className="px-3 py-1 bg-surface-container-high text-on-surface text-xs font-bold rounded-full border border-white/5">
                        {typeof client === 'object' ? `${client.name} (${client.memberId || 'ID'})` : client}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setViewingStaff(null)}
                className="w-full py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal Overlay */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-8 rounded-2xl w-full max-w-md border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">Edit Staff Member</h3>
                <p className="text-on-surface-variant text-xs mt-1">ID: {editingStaff.staffId || editingStaff.id}</p>
              </div>
              <button 
                onClick={() => setEditingStaff(null)}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label text-on-surface mb-1.5">Name</label>
                <input 
                  type="text"
                  required
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-label text-on-surface mb-1.5">Email</label>
                <input 
                  type="email"
                  required
                  value={editingStaff.email}
                  onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label text-on-surface mb-1.5">Role</label>
                  <select 
                    value={editingStaff.role}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                  >
                    <option>Front Desk</option>
                    <option>Senior Trainer</option>
                    <option>Trainer</option>
                    <option>Nutritionist</option>
                    <option>Physical Therapist</option>
                    <option>Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label text-on-surface mb-1.5">Shift</label>
                  <select 
                    value={editingStaff.shift || "Morning"}
                    onChange={(e) => setEditingStaff({ ...editingStaff, shift: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label text-on-surface mb-1.5">Status</label>
                <select 
                  value={editingStaff.status}
                  onChange={(e) => setEditingStaff({ ...editingStaff, status: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label text-on-surface mb-1.5">Bio</label>
                <textarea 
                  value={editingStaff.bio || ""}
                  onChange={(e) => setEditingStaff({ ...editingStaff, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUpdatingStaff}
                  className="flex-1 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(109,221,255,0.3)] cursor-pointer text-sm flex items-center justify-center gap-2"
                >
                  {isUpdatingStaff ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Staff Confirmation Modal Overlay */}
      {deletingStaffId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card p-6 rounded-2xl w-full max-w-sm border border-error/30 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <div className="w-12 h-12 rounded-full bg-error/20 text-error flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Delete Staff Member?</h3>
            <p className="text-on-surface-variant text-xs mb-6 font-body">
              Are you sure you want to delete this staff member? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setDeletingStaffId(null)}
                className="flex-1 py-2.5 rounded-xl font-bold text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors text-xs cursor-pointer"
              >
                No, Cancel
              </button>
              <button 
                disabled={isDeletingStaff}
                onClick={() => handleDeleteStaffConfirm(deletingStaffId)}
                className="flex-1 py-2.5 rounded-xl font-bold text-on-error bg-error hover:bg-error/90 transition-colors text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,113,108,0.3)] cursor-pointer"
              >
                {isDeletingStaff ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-xs">progress_activity</span>
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
