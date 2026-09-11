"use client";

import { useEffect, useState, useRef } from "react";
import {
  SocialPostItem,
  SocialStats,
  CommunityPulseData,
  getSocialFeed,
  createAnnouncement,
  moderatePost,
  getCommunityPulse,
  getSocialSettings,
  updateSocialSettings,
} from "./_api/social";

export default function SocialPage() {
  // Feed State
  const [posts, setPosts] = useState<SocialPostItem[]>([]);
  const [stats, setStats] = useState<SocialStats>({ pendingCount: 0, reportedCount: 0, totalCount: 0 });
  const [activeFilter, setActiveFilter] = useState<"all" | "reported" | "announcements" | "pinned">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);

  // Delete Confirmation Modal State
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Big Size Image Lightbox Modal State
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title?: string } | null>(null);

  // Composer State
  const [broadcastIntent, setBroadcastIntent] = useState<"announcement" | "event" | "motivation">("announcement");
  const [announcementText, setAnnouncementText] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [composerSuccess, setComposerSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Spam Filter State
  const [spamKeywords, setSpamKeywords] = useState("");
  const [isSavingFilter, setIsSavingFilter] = useState(false);
  const [filterSuccess, setFilterSuccess] = useState(false);

  // Community Pulse State
  const [pulseData, setPulseData] = useState<CommunityPulseData | null>(null);

  // Action status message
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Load feed and pulse
  const fetchFeedData = async () => {
    setIsLoadingFeed(true);
    try {
      const { posts: feedPosts, stats: feedStats } = await getSocialFeed({
        filter: activeFilter === "all" ? "all" : activeFilter,
        search: searchQuery,
      });
      setPosts(feedPosts);
      setStats(feedStats);
    } catch (err) {
      console.error("Failed to load feed:", err);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [pulse, settings] = await Promise.all([
        getCommunityPulse(),
        getSocialSettings(),
      ]);

      if (pulse) setPulseData(pulse);
      if (settings?.spamKeywords) {
        setSpamKeywords(settings.spamKeywords.join(", "));
      }
    } catch (err) {
      console.error("Failed to load initial social data:", err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchFeedData();
  }, [activeFilter]);

  // Close open dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuPostId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFeedData();
  };

  // Media file select
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected media
  const removeMedia = () => {
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Publish Announcement
  const handlePublish = async () => {
    if (!announcementText.trim()) {
      showNotification("error", "Please write a message to publish.");
      return;
    }

    setIsPublishing(true);
    try {
      const res = await createAnnouncement({
        content: announcementText.trim(),
        intent: broadcastIntent,
        media: mediaPreview ? [mediaPreview] : [],
        isPinned,
        location: "All Branches",
      });

      if (res.success) {
        setAnnouncementText("");
        setMediaPreview(null);
        setIsPinned(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setComposerSuccess(true);
        setTimeout(() => setComposerSuccess(false), 4000);
        showNotification("success", res.message || "Announcement published successfully!");
        fetchFeedData();
      } else {
        showNotification("error", res.message || "Failed to publish.");
      }
    } catch (err) {
      console.error("Publish error:", err);
      showNotification("error", "An error occurred while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Moderate Post (approve, pin, unpin)
  const handleModerate = async (postId: string, action: "delete" | "approve" | "pin" | "unpin") => {
    if (action === "delete") {
      setPostToDelete(postId);
      return;
    }

    try {
      const res = await moderatePost(postId, action);
      if (res.success) {
        showNotification("success", res.message || `Post ${action}d successfully`);
        // Optimistic UI update
        if (action === "approve") {
          setPosts((prev) =>
            prev.map((p) => (p._id === postId || p.id === postId ? { ...p, status: "active", reportsCount: 0 } : p))
          );
        } else if (action === "pin") {
          setPosts((prev) =>
            prev.map((p) => (p._id === postId || p.id === postId ? { ...p, isPinned: true } : p))
          );
        } else if (action === "unpin") {
          setPosts((prev) =>
            prev.map((p) => (p._id === postId || p.id === postId ? { ...p, isPinned: false } : p))
          );
        }
      } else {
        showNotification("error", res.message || `Failed to ${action} post.`);
      }
    } catch (err) {
      console.error("Moderation error:", err);
      showNotification("error", "Failed to perform moderation action.");
    }
  };

  // Confirm and execute post deletion
  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      const res = await moderatePost(postToDelete, "delete");
      if (res.success) {
        showNotification("success", res.message || "Post deleted permanently.");
        setPosts((prev) => prev.filter((p) => p._id !== postToDelete && p.id !== postToDelete));
        setPostToDelete(null);
      } else {
        showNotification("error", res.message || "Failed to delete post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotification("error", "Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };



  // Update Spam Filter Rules
  const handleSaveSpamRules = async () => {
    setIsSavingFilter(true);
    try {
      const res = await updateSocialSettings(spamKeywords, true);
      if (res.success) {
        setFilterSuccess(true);
        setTimeout(() => setFilterSuccess(false), 3500);
        showNotification("success", "Spam filter keywords updated.");
      } else {
        showNotification("error", res.message || "Failed to update filter.");
      }
    } catch (err) {
      console.error("Save filter error:", err);
      showNotification("error", "Failed to update spam filter rules.");
    } finally {
      setIsSavingFilter(false);
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-16">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 border text-sm font-label ${
            feedbackMessage.type === "success"
              ? "bg-surface-container-high text-secondary border-secondary/30 shadow-[0_0_20px_rgba(184,255,0,0.15)]"
              : "bg-surface-container-high text-error border-error/30 shadow-[0_0_20px_rgba(255,113,108,0.15)]"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {feedbackMessage.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="font-semibold">{feedbackMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-on-surface font-headline tracking-tighter mb-2 italic">
            SOCIAL HUB <span className="text-secondary text-2xl tracking-normal">(Beta)</span>
          </h2>
          <p className="text-on-surface-variant font-medium font-body max-w-xl">
            Curate your community&apos;s energy. Moderate member transformations and broadcast official directives.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feed, tags, or members..."
              className="bg-surface-container-low border border-outline-variant/30 rounded-xl pl-9 pr-4 py-2 text-xs text-on-surface focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none w-64 md:w-80"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-surface-container-highest hover:bg-surface-bright text-on-surface text-xs font-bold rounded-xl border border-outline-variant/30 transition-all font-label"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Center Column: Moderation Feed */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Feed Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-outline-variant/10">
            <h3 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
              Feed Moderation
              {stats.reportedCount > 0 && (
                <span className="bg-error/10 text-error text-xs px-2.5 py-1 rounded-full border border-error/20 flex items-center gap-1 font-label font-bold">
                  <span className="material-symbols-outlined text-xs">flag</span>
                  {stats.reportedCount} Reported
                </span>
              )}
              {stats.pendingCount > 0 && (
                <span className="bg-secondary/10 text-secondary text-xs px-2.5 py-1 rounded-full border border-secondary/20 font-label font-bold">
                  {stats.pendingCount} Pending
                </span>
              )}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "all"
                    ? "bg-surface-container-highest text-on-surface border border-secondary/40 shadow-sm"
                    : "bg-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setActiveFilter("reported")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "reported"
                    ? "bg-error/15 text-error border border-error/40 shadow-sm"
                    : "bg-transparent text-on-surface-variant hover:text-error"
                }`}
              >
                Reported {stats.reportedCount > 0 && `(${stats.reportedCount})`}
              </button>
              <button
                onClick={() => setActiveFilter("announcements")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "announcements"
                    ? "bg-secondary/15 text-secondary border border-secondary/40 shadow-sm"
                    : "bg-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Official
              </button>
              <button
                onClick={() => setActiveFilter("pinned")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === "pinned"
                    ? "bg-primary/15 text-primary border border-primary/40 shadow-sm"
                    : "bg-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Pinned
              </button>
            </div>
          </div>

          {/* Feed Content */}
          {isLoadingFeed ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-outline-variant/10">
              <div className="w-10 h-10 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto"></div>
              <p className="font-label text-sm text-on-surface-variant uppercase tracking-wider">
                Loading Feed Activity...
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-outline-variant/10">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant">forum</span>
              <h4 className="font-headline font-bold text-xl text-on-surface">No Posts Found</h4>
              <p className="text-sm text-on-surface-variant font-body max-w-sm mx-auto">
                There are no posts matching the current filter or search query.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-surface-container-highest hover:bg-surface-bright text-xs font-bold text-on-surface rounded-xl border border-outline-variant/20 transition-all font-label"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            posts.map((post) => {
              const isReported = post.status === "reported";
              const postId = post._id || post.id || "";
              return (
                <div
                  key={postId}
                  className={`glass-card rounded-3xl p-6 relative group overflow-hidden border transition-all ${
                    isReported
                      ? "border-error/30 bg-error/5 shadow-[0_0_30px_rgba(255,113,108,0.05)]"
                      : post.isPinned
                      ? "border-secondary/30 bg-secondary/[0.02]"
                      : "border-outline-variant/10"
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      {post.author.avatar ? (
                        <img
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/20"
                          src={post.author.avatar}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-headline font-bold text-lg ring-2 ring-outline-variant/20">
                          {post.author.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-on-surface leading-none">{post.author.handle || post.author.name}</p>
                          {post.author.isOfficial && (
                            <span className="bg-secondary/15 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full border border-secondary/20 uppercase tracking-wider font-label">
                              Official
                            </span>
                          )}
                          {post.isPinned && (
                            <span className="bg-primary/15 text-primary text-[10px] font-black px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider font-label flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[10px]">push_pin</span>
                              Pinned
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1">
                          {formatTimeAgo(post.createdAt)} • {post.location || "Main Studio"}
                        </p>
                      </div>
                    </div>

                    {/* 3-Dots Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuPostId(activeMenuPostId === postId ? null : postId);
                        }}
                        className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container"
                        title="More options"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>

                      {/* Dropdown Options */}
                      {activeMenuPostId === postId && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-full mt-1 z-30 w-48 bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
                        >
                          <button
                            onClick={() => {
                              setActiveMenuPostId(null);
                              handleModerate(postId, post.isPinned ? "unpin" : "pin");
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-label font-semibold text-on-surface hover:bg-surface-container-highest rounded-xl transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-base text-primary">push_pin</span>
                            {post.isPinned ? "Unpin Post" : "Pin to Top"}
                          </button>

                          {isReported && (
                            <button
                              onClick={() => {
                                setActiveMenuPostId(null);
                                handleModerate(postId, "approve");
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-label font-semibold text-secondary hover:bg-secondary/10 rounded-xl transition-colors text-left"
                            >
                              <span className="material-symbols-outlined text-base">check_circle</span>
                              Approve Post
                            </button>
                          )}

                          <div className="h-px bg-outline-variant/15 my-1" />

                          <button
                            onClick={() => {
                              setActiveMenuPostId(null);
                              setPostToDelete(postId);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-label font-semibold text-error hover:bg-error/10 rounded-xl transition-colors text-left"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                            Delete Post
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reported Alert banner */}
                  {isReported && post.reports && post.reports.length > 0 && (
                    <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-xl flex items-start gap-2.5 text-xs text-error font-body">
                      <span className="material-symbols-outlined text-sm mt-0.5">warning</span>
                      <div>
                        <span className="font-bold">Flagged for Review:</span> {post.reports[0]?.reason}
                        {post.reports[0]?.reportedBy && (
                          <span className="text-on-surface-variant ml-1 font-label text-[10px]">
                            (by {post.reports[0].reportedBy})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Content text */}
                  <p className="text-on-surface mb-4 font-medium leading-relaxed font-body whitespace-pre-line text-sm">
                    {post.content}
                  </p>

                  {/* Media Content */}
                  {post.media && post.media.length > 0 && post.media[0] && (
                    <div
                      onClick={() => setLightboxImage({ url: post.media![0], title: `${post.author.name}'s Post Media` })}
                      className="rounded-2xl overflow-hidden mb-6 relative group bg-surface-container-highest/60 border border-outline-variant/10 cursor-pointer flex items-center justify-center"
                    >
                      <img
                        alt="Post content"
                        className="w-full max-h-[420px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                        src={post.media[0]}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-surface/70 backdrop-blur-md text-on-surface text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-label border border-white/10 shadow-md">
                          <span className="material-symbols-outlined text-sm text-secondary">zoom_in</span>
                          Click to View Big Size
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons (Approve if reported) */}
                  {isReported && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleModerate(post._id, "approve")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary/10 text-secondary rounded-xl font-bold hover:bg-secondary/20 transition-all border border-secondary/20 shadow-[0_0_15px_rgba(184,255,0,0.05)] text-xs font-label"
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        APPROVE &amp; RESTORE
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Composer & Dashboard */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          {/* Official Composer - Gym Announcements */}
          <section className="glass-card rounded-3xl p-8 border border-secondary/20 shadow-[0_0_40px_rgba(184,255,0,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface italic tracking-tight uppercase">
                Gym Announcements
              </h3>
              {composerSuccess && (
                <span className="text-secondary font-label text-xs flex items-center gap-1 bg-secondary/10 px-2.5 py-1 rounded-lg border border-secondary/20">
                  <span className="material-symbols-outlined text-xs">check</span>
                  Published
                </span>
              )}
            </div>

            <div className="space-y-6">
              {/* Broadcast Intent Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest ml-1 font-label">
                  Broadcast Intent
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastIntent("announcement")}
                    className={`py-2 px-3 rounded-lg text-[10px] font-bold tracking-tighter uppercase transition-all font-label ${
                      broadcastIntent === "announcement"
                        ? "bg-secondary text-on-secondary shadow-sm scale-[1.02]"
                        : "bg-surface-container-highest text-on-surface-variant hover:bg-secondary/10 hover:text-secondary"
                    }`}
                  >
                    Announcement
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastIntent("event")}
                    className={`py-2 px-3 rounded-lg text-[10px] font-bold tracking-tighter uppercase transition-all font-label ${
                      broadcastIntent === "event"
                        ? "bg-secondary text-on-secondary shadow-sm scale-[1.02]"
                        : "bg-surface-container-highest text-on-surface-variant hover:bg-secondary/10 hover:text-secondary"
                    }`}
                  >
                    Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastIntent("motivation")}
                    className={`py-2 px-3 rounded-lg text-[10px] font-bold tracking-tighter uppercase transition-all font-label ${
                      broadcastIntent === "motivation"
                        ? "bg-secondary text-on-secondary shadow-sm scale-[1.02]"
                        : "bg-surface-container-highest text-on-surface-variant hover:bg-secondary/10 hover:text-secondary"
                    }`}
                  >
                    Motivation
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all min-h-[120px] font-body text-sm"
                placeholder="Write an official gym update (e.g. holiday hours, new machines) to pin to the top of everyone's feed..."
              ></textarea>

              {/* Media Preview if chosen */}
              {mediaPreview && (
                <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-highest/60 group flex items-center justify-center p-2">
                  <img
                    src={mediaPreview}
                    alt="Upload preview"
                    className="w-full max-h-[360px] object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01] rounded-xl"
                    onClick={() => setLightboxImage({ url: mediaPreview, title: "Attached Media Preview" })}
                  />

                  {/* Action Overlays */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLightboxImage({ url: mediaPreview, title: "Attached Media Preview" })}
                      className="p-2 bg-black/70 text-on-surface hover:bg-black/90 hover:text-secondary rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg"
                      title="View Big Size"
                    >
                      <span className="material-symbols-outlined text-base">fullscreen</span>
                    </button>
                    <button
                      type="button"
                      onClick={removeMedia}
                      className="p-2 bg-black/70 text-error hover:bg-black/90 rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg"
                      title="Remove Media"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>

                  {/* Click to expand pill */}
                  <div
                    onClick={() => setLightboxImage({ url: mediaPreview, title: "Attached Media Preview" })}
                    className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md text-on-surface rounded-full text-xs font-label flex items-center gap-1.5 cursor-pointer opacity-85 group-hover:opacity-100 transition-opacity border border-white/10 shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm text-secondary">zoom_in</span>
                    Click to view full size
                  </div>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleMediaUpload}
                className="hidden"
              />

              {/* Media & Pin controls */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl font-bold transition-all text-sm font-label ${
                    mediaPreview
                      ? "bg-secondary/10 text-secondary border-secondary/30"
                      : "bg-surface-container-highest border-outline-variant/30 text-on-surface hover:bg-surface-bright"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {mediaPreview ? "check_circle" : "image"}
                  </span>
                  {mediaPreview ? "Media Attached" : "Add Media"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl font-bold transition-all text-sm font-label ${
                    isPinned
                      ? "bg-primary/20 text-primary border-primary/40 shadow-sm"
                      : "bg-surface-container-highest border-outline-variant/30 text-on-surface hover:bg-surface-bright"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">push_pin</span>
                  {isPinned ? "Pinned to Top" : "Pin to Top"}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={isPublishing}
                onClick={handlePublish}
                className="w-full py-4 bg-secondary text-on-secondary rounded-2xl font-black font-headline text-lg tracking-tight shadow-[0_0_30px_rgba(184,255,0,0.2)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-secondary/30 border-t-on-secondary rounded-full animate-spin"></div>
                    PUBLISHING...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">send</span>
                    PUBLISH TO FEED
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Spam Filter Settings */}
          <section className="glass-card rounded-3xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-3xl">gpp_bad</span>
                <h3 className="font-headline text-xl font-bold text-on-surface tracking-tight">
                  Spam Filter Settings
                </h3>
              </div>
              {filterSuccess && (
                <span className="text-secondary font-label text-xs flex items-center gap-1 bg-secondary/10 px-2.5 py-1 rounded-lg border border-secondary/20">
                  <span className="material-symbols-outlined text-xs">check</span>
                  Saved
                </span>
              )}
            </div>

            <p className="text-sm text-on-surface-variant font-body mb-4">
              Enter forbidden words or links separated by commas. If a member tries to post them, the app will automatically hold the content for moderation.
            </p>

            <div className="space-y-4">
              <textarea
                value={spamKeywords}
                onChange={(e) => setSpamKeywords(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none transition-all min-h-[100px] font-body text-sm font-medium leading-relaxed"
                placeholder="e.g. crypto, forex, click here, free money..."
              ></textarea>

              <button
                type="button"
                disabled={isSavingFilter}
                onClick={handleSaveSpamRules}
                className="w-full py-3 bg-surface-container-highest rounded-xl text-xs font-bold font-label text-on-surface hover:bg-primary/20 hover:text-primary transition-colors border border-outline-variant/10 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSavingFilter ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    Saving Rules...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">save</span>
                    Update Filter Rules
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Trending Metrics / Community Pulse */}
          <section className="glass-card rounded-3xl p-8 border border-outline-variant/10">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6 uppercase tracking-tight flex items-center justify-between">
              Community Pulse
              <span className="text-xs font-label text-secondary font-normal tracking-normal lowercase">
                live trends
              </span>
            </h3>

            <div className="space-y-6">
              {pulseData?.trendingTags && pulseData.trendingTags.length > 0 ? (
                pulseData.trendingTags.map((item) => (
                  <div
                    key={item.tag}
                    onClick={() => {
                      setSearchQuery(item.tag);
                      setActiveFilter("all");
                    }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-surface-container-high/30 p-2 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-black font-headline text-on-surface/10 group-hover:text-secondary/30 transition-colors">
                        {item.rank}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-lg group-hover:text-secondary transition-colors">
                          {item.tag}
                        </p>
                        <p className="text-xs text-on-surface-variant font-label">
                          {item.postCount} •{" "}
                          <span
                            className={
                              item.surgeType === "positive"
                                ? "text-secondary font-semibold"
                                : "text-tertiary"
                            }
                          >
                            {item.surge}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined ${
                        item.surgeType === "positive"
                          ? "text-secondary group-hover:translate-y-[-2px] transition-transform"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {item.surgeType === "positive" ? "trending_up" : "remove"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center space-y-2">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/40">tag</span>
                  <p className="text-sm font-label text-on-surface-variant font-medium">No trending tags yet</p>
                  <p className="text-xs text-on-surface-variant/60 font-body">
                    Hashtags from posts will appear here as members and staff post content.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Custom Confirmation Modal for Deleting Post */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card bg-surface-container-low/95 border border-outline-variant/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-error/10 text-error rounded-xl border border-error/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">delete_forever</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface">Delete Social Post</h3>
                <p className="text-xs text-on-surface-variant font-label">Permanent Moderation Action</p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              Are you sure you want to permanently delete this post? This action cannot be undone and will remove any attached media from the servers.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/10">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-headline text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 bg-error text-on-error hover:bg-error-dim rounded-xl font-bold font-headline text-xs transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,113,108,0.25)] disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-on-error/30 border-t-on-error rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Big Size Image Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between pb-4 text-white z-10"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">photo_size_select_actual</span>
              <span className="font-headline font-bold text-sm tracking-wide">
                {lightboxImage.title || "Full Resolution Image"}
              </span>
            </div>
            <div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white hover:text-error rounded-xl transition-colors border border-white/10 flex items-center justify-center"
                title="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          {/* Full Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/40 animate-in zoom-in-95 duration-200"
          >
            <img
              src={lightboxImage.url}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[80vh] object-contain select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
