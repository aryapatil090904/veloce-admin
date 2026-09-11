"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getMemberById, updateMember, Member } from "../_api/members";

export default function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const memberId = resolvedParams.id;

  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit State & Modal
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tier: "Basic",
    status: "Active",
    avatarUrl: "",
    lastCheckInLocation: "",
    lastCheckInDate: "",
    memberId: "",
  });

  // Active Tab for detailed profile
  const [activeTab, setActiveTab] = useState<"overview" | "membership" | "activity">("overview");

  useEffect(() => {
    // Check if ?edit=true was passed in the query
    if (searchParams.get("edit") === "true") {
      setIsEditing(true);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchMember() {
      if (!memberId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMemberById(memberId);
        if (data) {
          setMember(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            tier: data.tier || "Basic",
            status: data.status || "Active",
            avatarUrl: data.avatarUrl || "",
            lastCheckInLocation: data.lastCheckInLocation || "",
            lastCheckInDate: data.lastCheckInDate || "",
            memberId: data.memberId || "",
          });
        } else {
          setError("Member not found");
        }
      } catch (err) {
        console.error("Failed to load member profile:", err);
        setError("Failed to load member profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMember();
  }, [memberId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const targetId = member._id || member.id || memberId;
      const updated = await updateMember(targetId, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tier: formData.tier,
        status: formData.status,
        avatarUrl: formData.avatarUrl,
        lastCheckInLocation: formData.lastCheckInLocation,
        lastCheckInDate: formData.lastCheckInDate,
        memberId: formData.memberId,
      });

      if (updated) {
        setMember(updated);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Failed to update member profile.");
      }
    } catch (err) {
      console.error("Error updating member:", err);
      alert("An error occurred while updating member profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderTierBadge = (tier: string) => {
    switch (tier) {
      case "Elite":
        return (
          <span className="px-3 py-1 bg-secondary/15 text-secondary text-xs font-black uppercase tracking-widest rounded-full border border-secondary/30 shadow-[0_0_12px_rgba(184,255,0,0.15)]">
            Elite Member
          </span>
        );
      case "Pro":
        return (
          <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-black uppercase tracking-widest rounded-full border border-primary/30 shadow-[0_0_12px_rgba(109,221,255,0.15)]">
            Pro Member
          </span>
        );
      case "Basic":
      default:
        return (
          <span className="px-3 py-1 bg-outline/15 text-on-surface-variant text-xs font-black uppercase tracking-widest rounded-full border border-outline/30">
            {tier || "Basic"} Member
          </span>
        );
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_10px_#c3f400]"></span>
            <span className="text-xs font-headline font-bold text-secondary tracking-wide uppercase">Active</span>
          </div>
        );
      case "Frozen":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_#6dddff]"></span>
            <span className="text-xs font-headline font-bold text-primary tracking-wide uppercase">Frozen</span>
          </div>
        );
      case "Overdue":
      default:
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 border border-error/20 rounded-full">
            <span className="h-2.5 w-2.5 rounded-full bg-error shadow-[0_0_10px_#ff716c]"></span>
            <span className="text-xs font-headline font-bold text-error tracking-wide uppercase">{status || "Overdue"}</span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="font-label text-on-surface-variant text-sm tracking-wider uppercase">
          Loading Member Profile...
        </p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center text-error">
          <span className="material-symbols-outlined text-3xl">person_off</span>
        </div>
        <h2 className="text-2xl font-headline font-bold text-on-surface">
          {error || "Member Not Found"}
        </h2>
        <p className="text-on-surface-variant font-label text-sm">
          The requested member could not be loaded or doesn&apos;t exist.
        </p>
        <Link
          href="/members"
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-label text-sm transition-colors border border-outline-variant/20"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Member Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/members"
            className="p-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface rounded-xl border border-outline-variant/10 transition-colors flex items-center justify-center"
            title="Back to Members"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
              <Link href="/members" className="hover:text-primary transition-colors">Members</Link>
              <span>/</span>
              <span className="text-on-surface">{member.name}</span>
            </div>
            <h1 className="text-2xl font-headline font-bold text-on-surface tracking-tight mt-0.5">
              Member Profile
            </h1>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="text-secondary font-label text-xs flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20 animate-in fade-in">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Changes Saved Successfully
            </span>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(109,221,255,0.3)] transition-all active:scale-95 text-sm"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="glass-card kinetic-gradient p-8 rounded-2xl relative overflow-hidden border border-outline-variant/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="h-24 w-24 rounded-2xl overflow-hidden bg-surface-container-highest border-2 border-outline-variant/30 flex items-center justify-center shadow-xl flex-shrink-0">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-5xl text-on-surface-variant">
                    person
                  </span>
                )}
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-2 -right-2 p-1.5 bg-surface-container-highest border border-outline-variant/40 hover:border-primary text-on-surface rounded-lg shadow-md transition-colors"
                title="Change Avatar"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </button>
            </div>

            {/* Member Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-headline font-bold text-on-surface">
                  {member.name}
                </h2>
                {renderTierBadge(member.tier)}
                {renderStatusBadge(member.status)}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-label text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">badge</span>
                  {member.memberId}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">mail</span>
                  {member.email}
                </span>
                {member.phone && (
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">call</span>
                    {member.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex gap-4 self-stretch md:self-auto border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-6">
            <div className="bg-surface-container-low/70 backdrop-blur-md px-5 py-3 rounded-xl border border-outline-variant/10 text-center flex-1 md:flex-initial">
              <p className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant mb-1">
                Last Check-in
              </p>
              <p className="font-headline font-bold text-base text-on-surface">
                {member.lastCheckInDate || "Oct 24, 2023"}
              </p>
              <p className="text-[10px] font-label text-primary uppercase tracking-wider mt-0.5">
                {member.lastCheckInLocation || "Downtown Hub"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-outline-variant/20 gap-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 text-sm font-headline font-bold transition-all relative ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          General Overview
        </button>
        <button
          onClick={() => setActiveTab("membership")}
          className={`pb-3 text-sm font-headline font-bold transition-all relative ${
            activeTab === "membership"
              ? "text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Membership &amp; Access
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`pb-3 text-sm font-headline font-bold transition-all relative ${
            activeTab === "activity"
              ? "text-primary border-b-2 border-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Attendance &amp; History
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-6 rounded-xl border border-outline-variant/10 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
              <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Personal Information
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-label text-primary hover:text-primary-dim flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit Info
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Full Name</p>
                <p className="font-headline font-medium text-on-surface text-base">{member.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Email Address</p>
                <p className="font-headline font-medium text-on-surface text-base">{member.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Phone Number</p>
                <p className="font-headline font-medium text-on-surface text-base">{member.phone || "Not provided"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Member ID</p>
                <p className="font-headline font-medium text-on-surface text-base">{member.memberId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Member Since</p>
                <p className="font-headline font-medium text-on-surface text-base">
                  {member.createdAt ? new Date(member.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "October 2023"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Last Profile Update</p>
                <p className="font-headline font-medium text-on-surface text-base">
                  {member.updatedAt ? new Date(member.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl border border-outline-variant/10 space-y-6">
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2 border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              Status &amp; Verification
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
                <span className="text-sm font-label text-on-surface-variant">Membership Status</span>
                {renderStatusBadge(member.status)}
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
                <span className="text-sm font-label text-on-surface-variant">Plan Tier</span>
                {renderTierBadge(member.tier)}
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
                <span className="text-sm font-label text-on-surface-variant">Digital Waiver</span>
                <span className="text-xs font-label text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Signed &amp; Valid
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-label text-on-surface-variant">Access Pass</span>
                <span className="text-xs font-label text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">nfc</span>
                  RFID Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "membership" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl border border-outline-variant/10 space-y-6">
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2 border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-primary">card_membership</span>
              Current Plan Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-headline font-bold text-xl text-on-surface">{member.tier} Plan</p>
                  <p className="text-xs text-on-surface-variant font-label mt-0.5">
                    {member.tier === "Elite" ? "All-access including Spa, Recovery, & Personal Trainer" : member.tier === "Pro" ? "Access to all gym zones & classes" : "Standard gym floor access"}
                  </p>
                </div>
                {renderTierBadge(member.tier)}
              </div>
              <div className="pt-4 border-t border-outline-variant/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase font-label tracking-wider text-on-surface-variant">Billing Cycle</p>
                  <p className="font-headline font-bold text-on-surface mt-1">Monthly Auto-Renew</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-label tracking-wider text-on-surface-variant">Next Payment</p>
                  <p className="font-headline font-bold text-on-surface mt-1">1st of next month</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl border border-outline-variant/10 space-y-6">
            <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2 border-b border-outline-variant/10 pb-4">
              <span className="material-symbols-outlined text-secondary">security</span>
              Facility Access
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <span className="text-sm font-label text-on-surface">Downtown Hub Access</span>
                <span className="text-xs font-bold text-secondary font-headline">GRANTED</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <span className="text-sm font-label text-on-surface">Westside Annex Access</span>
                <span className="text-xs font-bold text-secondary font-headline">GRANTED</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <span className="text-sm font-label text-on-surface">East Gate Studio Access</span>
                <span className="text-xs font-bold text-secondary font-headline">GRANTED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="glass-card p-6 rounded-xl border border-outline-variant/10 space-y-6">
          <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2 border-b border-outline-variant/10 pb-4">
            <span className="material-symbols-outlined text-primary">history</span>
            Recent Check-in Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <span className="material-symbols-outlined text-xl">login</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-on-surface">{member.lastCheckInLocation || "Downtown Hub"}</p>
                  <p className="text-xs text-on-surface-variant font-label">Main Entrance Turnstile</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-sm text-on-surface">{member.lastCheckInDate || "Oct 24, 2023"}</p>
                <p className="text-[10px] text-secondary uppercase font-label">Verified Check-in</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card bg-surface-container-low/95 border border-outline-variant/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">
                    Edit Member Profile
                  </h3>
                  <p className="text-xs text-on-surface-variant font-label mt-0.5">
                    Update profile info, membership tier, or gym status
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. s.jenkins@example.com"
                  />
                </div>

                {/* Member ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Member ID
                  </label>
                  <input
                    type="text"
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Tier */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Membership Tier
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Active">Active</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                {/* Last Check-in Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Check-in Location
                  </label>
                  <input
                    type="text"
                    name="lastCheckInLocation"
                    value={formData.lastCheckInLocation}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Downtown Hub"
                  />
                </div>

                {/* Last Check-in Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                    Check-in Date Note
                  </label>
                  <input
                    type="text"
                    name="lastCheckInDate"
                    value={formData.lastCheckInDate}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Oct 24, 2023"
                  />
                </div>
              </div>

              {/* Avatar Image Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {formData.avatarUrl && (
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                      <img src={formData.avatarUrl} alt="Avatar Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prev) => ({
                              ...prev,
                              avatarUrl: reader.result as string,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                    />
                    <p className="text-[10px] text-on-surface-variant mt-1.5">
                      Upload a new square image (JPG, PNG). Max 2MB recommended.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/10">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-headline text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold font-headline flex items-center gap-2 hover:shadow-[0_0_20px_rgba(109,221,255,0.3)] transition-all active:scale-95 text-sm disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">save</span>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
