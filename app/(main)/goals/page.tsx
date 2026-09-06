"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  MemberGoal,
  StaffKPI,
  getMemberGoalsList,
  getStaffKPIList,
  createMemberGoal,
  createStaffKPI,
  reviewStaffKPI,
  nudgeMemberGoal,
  updateMemberGoalProgress
} from './_api/goals';
import { getMembers, Member } from '../members/_api/members';
import { getStaffList, StaffMember } from '../staff/_api/staff';

export default function GoalsPage() {
  const [memberGoals, setMemberGoals] = useState<MemberGoal[]>([]);
  const [staffKPIs, setStaffKPIs] = useState<StaffKPI[]>([]);
  const [loadingMemberGoals, setLoadingMemberGoals] = useState<boolean>(true);
  const [loadingStaffKPIs, setLoadingStaffKPIs] = useState<boolean>(true);

  // Available options from database
  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [availableStaff, setAvailableStaff] = useState<StaffMember[]>([]);
  const [loadingMembersList, setLoadingMembersList] = useState<boolean>(false);
  const [loadingStaffList, setLoadingStaffList] = useState<boolean>(false);

  // Search filter inside modals
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('');
  const [staffSearchQuery, setStaffSearchQuery] = useState<string>('');
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState<boolean>(false);
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState<boolean>(false);

  // Modals
  const [isMemberGoalModalOpen, setIsMemberGoalModalOpen] = useState(false);
  const [isStaffKPIModalOpen, setIsStaffKPIModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedKPIForReview, setSelectedKPIForReview] = useState<StaffKPI | null>(null);

  // Manual update modal state
  const [isManualUpdateOpen, setIsManualUpdateOpen] = useState(false);
  const [selectedGoalForUpdate, setSelectedGoalForUpdate] = useState<MemberGoal | null>(null);
  const [manualProgressValue, setManualProgressValue] = useState<number>(0);

  // Member Goal Form state
  const [memberGoalForm, setMemberGoalForm] = useState({
    memberName: '',
    targetType: 'Hit a 100kg Deadlift',
    deadline: '',
    targetValue: 100,
    unit: 'kg'
  });

  // Staff KPI Form state
  const [staffKPIForm, setStaffKPIForm] = useState({
    staffName: '',
    staffRole: '',
    kpiTarget: '',
    timeframe: 'This Month',
    targetValue: 10
  });

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    outcome: 'Achieved' as 'Achieved' | 'Missed',
    managerNotes: ''
  });

  // Action Loading & Messages
  const [submittingMemberGoal, setSubmittingMemberGoal] = useState(false);
  const [submittingStaffKPI, setSubmittingStaffKPI] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState<string | null>(null);

  const fetchMemberGoals = useCallback(async () => {
    setLoadingMemberGoals(true);
    const res = await getMemberGoalsList({ limit: 50 });
    setMemberGoals(res.goals);
    setLoadingMemberGoals(false);
  }, []);

  const fetchStaffKPIs = useCallback(async () => {
    setLoadingStaffKPIs(true);
    const res = await getStaffKPIList({ limit: 50 });
    setStaffKPIs(res.kpis);
    setLoadingStaffKPIs(false);
  }, []);

  // Fetch real members list for search dropdown
  const fetchAvailableMembers = useCallback(async () => {
    setLoadingMembersList(true);
    const res = await getMembers({ limit: 100 });
    setAvailableMembers(res.members);
    setLoadingMembersList(false);
  }, []);

  // Fetch real staff list for search dropdown
  const fetchAvailableStaff = useCallback(async () => {
    setLoadingStaffList(true);
    const res = await getStaffList({ limit: 100 });
    setAvailableStaff(res.staff);
    setLoadingStaffList(false);
  }, []);

  useEffect(() => {
    fetchMemberGoals();
    fetchStaffKPIs();
    fetchAvailableMembers();
    fetchAvailableStaff();
  }, [fetchMemberGoals, fetchStaffKPIs, fetchAvailableMembers, fetchAvailableStaff]);

  // Handle Nudge Action
  const handleNudge = async (id: string, name: string) => {
    const success = await nudgeMemberGoal(id);
    if (success) {
      setNudgeMessage(`Nudge notification sent to ${name}!`);
      setTimeout(() => setNudgeMessage(null), 3000);
    }
  };

  // Create Member Goal Submit
  const handleCreateMemberGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberGoalForm.memberName.trim()) return;

    setSubmittingMemberGoal(true);
    const newGoal = await createMemberGoal({
      memberName: memberGoalForm.memberName,
      targetType: memberGoalForm.targetType,
      deadline: memberGoalForm.deadline,
      targetValue: Number(memberGoalForm.targetValue) || 100,
      unit: memberGoalForm.unit
    });

    if (newGoal) {
      setIsMemberGoalModalOpen(false);
      setMemberGoalForm({
        memberName: '',
        targetType: 'Hit a 100kg Deadlift',
        deadline: '',
        targetValue: 100,
        unit: 'kg'
      });
      setMemberSearchQuery('');
      fetchMemberGoals();
    }
    setSubmittingMemberGoal(false);
  };

  // Create Staff KPI Submit
  const handleCreateStaffKPI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffKPIForm.staffName.trim()) return;

    setSubmittingStaffKPI(true);
    const newKPI = await createStaffKPI({
      staffName: staffKPIForm.staffName,
      kpiTarget: staffKPIForm.kpiTarget,
      timeframe: staffKPIForm.timeframe,
      targetValue: Number(staffKPIForm.targetValue) || 10
    });

    if (newKPI) {
      setIsStaffKPIModalOpen(false);
      setStaffKPIForm({
        staffName: '',
        staffRole: '',
        kpiTarget: '',
        timeframe: 'This Month',
        targetValue: 10
      });
      setStaffSearchQuery('');
      fetchStaffKPIs();
    }
    setSubmittingStaffKPI(false);
  };

  // Open Review Modal
  const openReviewModal = (kpi: StaffKPI) => {
    setSelectedKPIForReview(kpi);
    setReviewForm({
      outcome: kpi.status === 'Missed' ? 'Missed' : 'Achieved',
      managerNotes: kpi.managerNotes || ''
    });
    setIsReviewModalOpen(true);
  };

  // Submit KPI Review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKPIForReview?._id && !selectedKPIForReview?.id) return;

    setSubmittingReview(true);
    const id = selectedKPIForReview._id || selectedKPIForReview.id || '';
    const updated = await reviewStaffKPI(id, reviewForm.outcome, reviewForm.managerNotes);

    if (updated) {
      setIsReviewModalOpen(false);
      setSelectedKPIForReview(null);
      fetchStaffKPIs();
    }
    setSubmittingReview(false);
  };

  // Open Manual Update Modal
  const openManualUpdate = (goal: MemberGoal) => {
    setSelectedGoalForUpdate(goal);
    setManualProgressValue(goal.currentProgress);
    setIsManualUpdateOpen(true);
  };

  // Submit Manual Progress Update
  const handleManualProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoalForUpdate?._id && !selectedGoalForUpdate?.id) return;

    const id = selectedGoalForUpdate._id || selectedGoalForUpdate.id || '';
    const updated = await updateMemberGoalProgress(id, manualProgressValue);
    if (updated) {
      setIsManualUpdateOpen(false);
      setSelectedGoalForUpdate(null);
      fetchMemberGoals();
    }
  };

  // Filter members list based on query
  const filteredMembers = availableMembers.filter(m => 
    m.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) || 
    (m.email && m.email.toLowerCase().includes(memberSearchQuery.toLowerCase()))
  );

  // Filter staff list based on query
  const filteredStaff = availableStaff.filter(s => 
    s.name.toLowerCase().includes(staffSearchQuery.toLowerCase()) || 
    (s.role && s.role.toLowerCase().includes(staffSearchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Nudge Notification Toast */}
      {nudgeMessage && (
        <div className="fixed top-5 right-5 z-[200] bg-primary text-on-primary-container font-bold px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <span className="material-symbols-outlined">notifications_active</span>
          <span>{nudgeMessage}</span>
        </div>
      )}

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
          <button onClick={() => { setIsMemberGoalModalOpen(true); setIsMemberDropdownOpen(false); }} className="bg-primary/10 text-primary font-bold py-2 px-4 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Create Member Goal
          </button>
        </div>
        
        {/* Member Goals Grid */}
        {loadingMemberGoals ? (
          <div className="text-center py-12 text-on-surface-variant">Loading member goals...</div>
        ) : memberGoals.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl border border-outline-variant/15 text-on-surface-variant">
            No member goals found. Click "Create Member Goal" to add one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {memberGoals.map((goal, idx) => {
              const borderHoverClass = idx % 3 === 0 ? 'hover:border-primary/30' : idx % 3 === 1 ? 'hover:border-secondary/30' : 'hover:border-tertiary/30';
              const textThemeClass = idx % 3 === 0 ? 'text-primary' : idx % 3 === 1 ? 'text-secondary' : 'text-tertiary';
              const bgThemeClass = idx % 3 === 0 ? 'bg-primary' : idx % 3 === 1 ? 'bg-secondary' : 'bg-tertiary';

              return (
                <div key={goal._id || goal.id || idx} className={`glass-card rounded-[2rem] p-6 border border-outline-variant/15 flex flex-col justify-between group ${borderHoverClass} transition-colors`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center">
                        {goal.memberAvatar ? (
                          <img className="w-full h-full object-cover" src={goal.memberAvatar} alt={goal.memberName} />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant">person</span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm font-headline">{goal.memberName}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase font-label">Deadline: {goal.deadline}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleNudge(goal._id || goal.id || '', goal.memberName)}
                      className={`${textThemeClass} bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors flex items-center justify-center`} 
                      title="Send a Nudge"
                    >
                      <span className="material-symbols-outlined text-sm">notifications_active</span>
                    </button>
                  </div>
                  <div>
                    <p className="font-bold font-headline mb-3 text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">fitness_center</span>
                      {goal.targetType}
                    </p>
                    <div className="flex justify-between text-xs mb-2 font-label uppercase tracking-wider">
                      <span className="text-on-surface-variant font-bold">{goal.currentProgress} {goal.unit || ''}</span>
                      <span className={`font-black ${textThemeClass}`}>{goal.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2">
                      <div className={`${bgThemeClass} h-2 rounded-full shadow-sm`} style={{ width: `${Math.min(100, goal.progressPercentage)}%` }}></div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[10px] text-on-surface-variant italic">{goal.syncType || 'Auto-syncing via app logs'}</span>
                      <button 
                        onClick={() => openManualUpdate(goal)}
                        className="text-[10px] text-on-surface-variant hover:text-on-surface font-bold underline"
                      >
                        Manual Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          <button onClick={() => { setIsStaffKPIModalOpen(true); setIsStaffDropdownOpen(false); }} className="bg-secondary/10 text-secondary font-bold py-2 px-4 rounded-xl border border-secondary/20 hover:bg-secondary/20 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Set Staff KPI
          </button>
        </div>
        
        {/* Employee Performance Dashboard Table */}
        <div className="glass-card rounded-[2rem] border border-outline-variant/15 overflow-hidden">
          {loadingStaffKPIs ? (
            <div className="text-center py-12 text-on-surface-variant">Loading staff KPIs...</div>
          ) : staffKPIs.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">No staff KPIs found. Click "Set Staff KPI" to add one!</div>
          ) : (
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
                {staffKPIs.map((kpi, idx) => {
                  const progressPct = Math.min(100, Math.round((kpi.currentValue / (kpi.targetValue || 1)) * 100));
                  const isMissed = kpi.status === 'Missed' || kpi.deadlineStatus === 'Deadline Passed';

                  return (
                    <tr key={kpi._id || kpi.id || idx} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary font-bold font-headline text-lg">
                            {kpi.staffAvatarText || 'ST'}
                          </div>
                          <div>
                            <p className="font-bold text-sm font-headline">{kpi.staffName}</p>
                            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">{kpi.staffRole}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-sm font-bold">{kpi.kpiTarget}</p>
                        <p className={`text-[10px] font-label uppercase ${isMissed ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                          {kpi.deadlineStatus}
                        </p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-surface-container-highest rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${isMissed ? 'bg-error' : 'bg-secondary'}`} 
                              style={{ width: `${progressPct}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-black font-headline w-12 text-right ${isMissed ? 'text-error' : 'text-secondary'}`}>
                            {kpi.currentValue} / {kpi.targetValue}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => openReviewModal(kpi)} 
                          className={
                            isMissed
                              ? "bg-error/10 text-error hover:bg-error/20 border border-error/20 px-4 py-2 rounded-lg text-xs font-bold transition-colors uppercase tracking-widest flex items-center justify-end gap-1 ml-auto"
                              : "bg-surface-container hover:bg-surface-container-highest border border-outline-variant/20 px-4 py-2 rounded-lg text-xs font-bold text-on-surface transition-colors uppercase tracking-widest ml-auto"
                          }
                        >
                          {isMissed && <span className="material-symbols-outlined text-[14px]">warning</span>}
                          {kpi.status === 'Pending' ? (isMissed ? 'Review Now' : 'Review') : `Status: ${kpi.status}`}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
            <form className="space-y-6" onSubmit={handleCreateMemberGoal}>
              {/* Searchable Select for Members */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Select Member</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40"
                    placeholder={loadingMembersList ? "Loading members..." : "Search & select member..."}
                    value={memberGoalForm.memberName || memberSearchQuery}
                    onFocus={() => setIsMemberDropdownOpen(true)}
                    onChange={(e) => {
                      setMemberSearchQuery(e.target.value);
                      setMemberGoalForm({ ...memberGoalForm, memberName: e.target.value });
                      setIsMemberDropdownOpen(true);
                    }}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">
                    arrow_drop_down
                  </span>
                </div>

                {/* Dropdown Options List */}
                {isMemberDropdownOpen && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto bg-surface-container-high rounded-xl border border-outline-variant/20 shadow-xl divide-y divide-white/5">
                    {filteredMembers.length === 0 ? (
                      <div className="p-4 text-xs text-on-surface-variant italic">No members matching search query</div>
                    ) : (
                      filteredMembers.map((member) => (
                        <div
                          key={member._id || member.memberId}
                          onClick={() => {
                            setMemberGoalForm({ ...memberGoalForm, memberName: member.name });
                            setMemberSearchQuery(member.name);
                            setIsMemberDropdownOpen(false);
                          }}
                          className="p-3 hover:bg-primary/10 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-bold font-headline text-on-surface">{member.name}</p>
                            {member.email && <p className="text-[10px] text-on-surface-variant">{member.email}</p>}
                          </div>
                          <span className="text-[10px] bg-primary/20 text-primary font-bold px-2 py-0.5 rounded uppercase">
                            {member.tier || 'Member'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Target Type</label>
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40" 
                  placeholder="e.g. Hit a 100kg Deadlift" 
                  value={memberGoalForm.targetType}
                  onChange={(e) => setMemberGoalForm({ ...memberGoalForm, targetType: e.target.value })}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Target Value</label>
                  <input 
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" 
                    type="number"
                    value={memberGoalForm.targetValue}
                    onChange={(e) => setMemberGoalForm({ ...memberGoalForm, targetValue: Number(e.target.value) })}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Unit</label>
                  <input 
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" 
                    placeholder="e.g. kg, Classes" 
                    value={memberGoalForm.unit}
                    onChange={(e) => setMemberGoalForm({ ...memberGoalForm, unit: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Deadline</label>
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none color-scheme-dark" 
                  type="text"
                  placeholder="e.g. Oct 30"
                  value={memberGoalForm.deadline}
                  onChange={(e) => setMemberGoalForm({ ...memberGoalForm, deadline: e.target.value })}
                  required 
                />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsMemberGoalModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" disabled={submittingMemberGoal} className="flex-1 bg-primary text-on-primary-container font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,195,235,0.2)]">
                  {submittingMemberGoal ? 'Adding...' : 'Add Goal'}
                </button>
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
            <form className="space-y-6" onSubmit={handleCreateStaffKPI}>
              {/* Searchable Select for Staff */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Select Staff Member</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40"
                    placeholder={loadingStaffList ? "Loading staff..." : "Search & select staff member..."}
                    value={staffKPIForm.staffName || staffSearchQuery}
                    onFocus={() => setIsStaffDropdownOpen(true)}
                    onChange={(e) => {
                      setStaffSearchQuery(e.target.value);
                      setStaffKPIForm({ ...staffKPIForm, staffName: e.target.value });
                      setIsStaffDropdownOpen(true);
                    }}
                    required
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">
                    arrow_drop_down
                  </span>
                </div>

                {/* Dropdown Options List */}
                {isStaffDropdownOpen && (
                  <div className="absolute z-50 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto bg-surface-container-high rounded-xl border border-outline-variant/20 shadow-xl divide-y divide-white/5">
                    {filteredStaff.length === 0 ? (
                      <div className="p-4 text-xs text-on-surface-variant italic">No staff members matching search query</div>
                    ) : (
                      filteredStaff.map((staff) => (
                        <div
                          key={staff._id || staff.id || staff.staffId}
                          onClick={() => {
                            setStaffKPIForm({ ...staffKPIForm, staffName: staff.name, staffRole: staff.role });
                            setStaffSearchQuery(staff.name);
                            setIsStaffDropdownOpen(false);
                          }}
                          className="p-3 hover:bg-secondary/10 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-bold font-headline text-on-surface">{staff.name}</p>
                            <p className="text-[10px] text-on-surface-variant">{staff.role}</p>
                          </div>
                          <span className="text-[10px] bg-secondary/20 text-secondary font-bold px-2 py-0.5 rounded uppercase">
                            {staff.status || 'Active'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">KPI Target</label>
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40" 
                  placeholder="e.g. Sell 10 new memberships" 
                  value={staffKPIForm.kpiTarget}
                  onChange={(e) => setStaffKPIForm({ ...staffKPIForm, kpiTarget: e.target.value })}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Timeframe</label>
                  <select 
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface appearance-none font-body outline-none"
                    value={staffKPIForm.timeframe}
                    onChange={(e) => setStaffKPIForm({ ...staffKPIForm, timeframe: e.target.value })}
                  >
                    <option value="This Month">This Month</option>
                    <option value="This Quarter">This Quarter</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Target Value</label>
                  <input 
                    className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-secondary rounded-xl py-4 px-6 text-on-surface font-body outline-none" 
                    type="number" 
                    value={staffKPIForm.targetValue}
                    onChange={(e) => setStaffKPIForm({ ...staffKPIForm, targetValue: Number(e.target.value) })}
                    required 
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsStaffKPIModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" disabled={submittingStaffKPI} className="flex-1 bg-secondary text-on-secondary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,255,0,0.2)]">
                  {submittingStaffKPI ? 'Assigning...' : 'Assign KPI'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goal Review Modal */}
      {isReviewModalOpen && selectedKPIForReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">rate_review</span>
                KPI Review - {selectedKPIForReview.staffName}
              </h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="mb-6 bg-surface-container p-4 rounded-xl border border-outline-variant/10">
              <p className="text-sm font-bold">{selectedKPIForReview.kpiTarget}</p>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-on-surface-variant">Progress: {selectedKPIForReview.currentValue} / {selectedKPIForReview.targetValue}</span>
                <span className="text-error font-bold">{selectedKPIForReview.deadlineStatus}</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleReviewSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Outcome</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 cursor-pointer hover:bg-surface-container">
                    <input 
                      type="radio" 
                      name="outcome" 
                      checked={reviewForm.outcome === 'Achieved'}
                      onChange={() => setReviewForm({ ...reviewForm, outcome: 'Achieved' })}
                      className="text-secondary focus:ring-secondary/50 bg-transparent" 
                    />
                    <span className="text-sm font-bold">Achieved</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 bg-error/10 p-4 rounded-xl border border-error/20 cursor-pointer hover:bg-error/20">
                    <input 
                      type="radio" 
                      name="outcome" 
                      checked={reviewForm.outcome === 'Missed'}
                      onChange={() => setReviewForm({ ...reviewForm, outcome: 'Missed' })}
                      className="text-error focus:ring-error/50 bg-transparent" 
                    />
                    <span className="text-sm font-bold text-error">Missed</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Manager Notes (For Performance Review)</label>
                <textarea 
                  className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-tertiary rounded-xl py-4 px-6 text-on-surface font-body outline-none placeholder:text-on-surface-variant/40 resize-none" 
                  rows={4} 
                  placeholder="Add a quick note here..."
                  value={reviewForm.managerNotes}
                  onChange={(e) => setReviewForm({ ...reviewForm, managerNotes: e.target.value })}
                ></textarea>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" disabled={submittingReview} className="flex-1 bg-tertiary text-on-tertiary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(191,0,255,0.2)]">
                  {submittingReview ? 'Finalizing...' : 'Finalize Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Progress Update Modal */}
      {isManualUpdateOpen && selectedGoalForUpdate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-8 border border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit</span>
                Manual Progress Update
              </h3>
              <button onClick={() => setIsManualUpdateOpen(false)} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="mb-6 bg-surface-container p-4 rounded-xl border border-outline-variant/10">
              <p className="text-sm font-bold">{selectedGoalForUpdate.memberName} - {selectedGoalForUpdate.targetType}</p>
              <p className="text-xs text-on-surface-variant mt-1">Target: {selectedGoalForUpdate.targetValue} {selectedGoalForUpdate.unit || ''}</p>
            </div>

            <form className="space-y-6" onSubmit={handleManualProgressSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest ml-2">Current Progress</label>
                <input 
                  className="w-full bg-surface-container-low border-0 focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body outline-none" 
                  type="number"
                  step="any"
                  value={manualProgressValue}
                  onChange={(e) => setManualProgressValue(Number(e.target.value))}
                  required
                />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsManualUpdateOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-on-primary-container font-bold py-4 rounded-xl hover:brightness-110 transition-all">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
