"use client";

import { useEffect, useState, useCallback } from "react";
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
import Link from "next/link";
import { getMembers, getMemberStats, Member, MemberStats, PaginationMeta } from "./_api/members";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<MemberStats>({
    totalActive: 0,
    newThisMonth: 0,
    atRiskOrInactive: 0,
    renewalSuccessRate: "0%",
  });
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState("Membership Tier");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedLastCheckIn, setSelectedLastCheckIn] = useState("Last Check-in");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Fetch quick insight statistics ONLY ONCE on page mount
  useEffect(() => {
    async function fetchStats() {
      try {
        const statsData = await getMemberStats();
        if (statsData) {
          setStats(statsData);
        }
      } catch (err) {
        console.error("Failed to fetch member stats:", err);
      }
    }
    fetchStats();
  }, []);

  // Fetch members list on search, filter, or pagination changes
  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const membersData = await getMembers({
        search,
        tier: selectedTier,
        status: selectedStatus,
        lastCheckIn: selectedLastCheckIn,
        page,
        limit,
      });

      setMembers(membersData.members || []);

      if (membersData.pagination) {
        setPaginationMeta(membersData.pagination);
      }
    } catch (err) {
      console.error("Failed to load members data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedTier, selectedStatus, selectedLastCheckIn, page, limit]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTierChange = (value: string) => {
    setSelectedTier(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setPage(1);
  };

  const handleLastCheckInChange = (value: string) => {
    setSelectedLastCheckIn(value);
    setPage(1);
  };

  const renderTierBadge = (tier: string) => {
    switch (tier) {
      case "Elite":
        return (
          <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full border border-secondary/20">
            Elite
          </span>
        );
      case "Pro":
        return (
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
            Pro
          </span>
        );
      case "Basic":
      default:
        return (
          <span className="px-3 py-1 bg-outline/10 text-outline text-[10px] font-black uppercase tracking-widest rounded-full border border-outline/20">
            {tier || "Basic"}
          </span>
        );
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_#c3f400]"></span>
            <span className="text-sm font-label text-on-surface">Active</span>
          </div>
        );
      case "Frozen":
        return (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#6dddff]"></span>
            <span className="text-sm font-label text-on-surface">Frozen</span>
          </div>
        );
      case "Overdue":
      default:
        return (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-error shadow-[0_0_8px_#ff716c]"></span>
            <span className="text-sm font-label text-on-surface">{status || "Overdue"}</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tight leading-none mb-2">Member Directory</h2>
          <p className="text-on-surface-variant font-label text-lg">
            {stats.totalActive ? stats.totalActive.toLocaleString() : paginationMeta.totalCount.toLocaleString()} Active Members across all regions
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/onboarding" className="px-6 py-3 bg-secondary text-on-secondary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(184,255,0,0.3)] transition-all active:scale-95">
            <span className="material-symbols-outlined">person_add</span>
            New Member
          </Link>
        </div>
      </section>

      {/* Quick Insights Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">trending_up</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">New This Month</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-secondary">+{stats.newThisMonth}</span>
            <span className="text-xs text-secondary-dim font-label">↑ 12%</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">warning</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">At Risk/Inactive</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-error">{stats.atRiskOrInactive}</span>
            <span className="text-xs text-error-dim font-label">Action Required</span>
          </div>
        </div>
        <div className="glass-card kinetic-gradient p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">verified</span>
          </div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Renewal Success Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-primary">{stats.renewalSuccessRate}</span>
            <span className="text-xs text-primary-dim font-label">Peak Performance</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="glass-card p-4 rounded-xl flex flex-col lg:flex-row gap-4 border border-outline-variant/10">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full bg-surface-container-low border-none rounded-lg pl-12 pr-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 placeholder:text-outline transition-all"
            placeholder="Search by name, ID, or email..."
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]"
            value={selectedTier}
            onChange={(e) => handleTierChange(e.target.value)}
          >
            <option value="Membership Tier">Membership Tier</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
          </select>
          <select
            className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]"
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Status">Status</option>
            <option value="Active">Active</option>
            <option value="Frozen">Frozen</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select 
            className="bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm text-on-surface font-label focus:ring-2 focus:ring-primary/50 min-w-[140px]"
            value={selectedLastCheckIn}
            onChange={(e) => handleLastCheckInChange(e.target.value)}
          >
            <option value="Last Check-in">Last Check-in</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="Inactive > 30 Days">Inactive &gt; 30 Days</option>
          </select>
        </div>
      </section>

      {/* Member Table */}
      <TableContainer>
        <TableToolbar title="Member List">
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">sms</span>
            Bulk SMS
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 text-xs font-label text-secondary hover:text-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export
          </button>
        </TableToolbar>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Check-in</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-on-surface-variant font-label">
                  Loading members...
                </TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-on-surface-variant font-label">
                  No members found.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member._id || member.memberId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high flex items-center justify-center">
                        {member.avatarUrl ? (
                          <img className="h-full w-full object-cover" alt="Member" src={member.avatarUrl} />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant">person</span>
                        )}
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface leading-none">{member.name}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-label text-sm text-on-surface-variant">{member.memberId}</TableCell>
                  <TableCell>
                    {renderTierBadge(member.tier)}
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(member.status)}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-label text-on-surface">{member.lastCheckInDate || "Oct 24, 2023"}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{member.lastCheckInLocation || "Downtown Hub"}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send SMS"><span className="material-symbols-outlined text-lg">sms</span></button>
                      <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Send Email"><span className="material-symbols-outlined text-lg">mail</span></button>
                      <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="View Profile"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Edit Member"><span className="material-symbols-outlined text-lg">edit</span></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
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
    </div>
  );
}
