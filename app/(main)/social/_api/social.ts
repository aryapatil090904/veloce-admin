import api from '@/lib/axios';

export interface SocialAuthor {
  name: string;
  handle: string;
  avatar?: string;
  isOfficial?: boolean;
}

export interface SocialReport {
  reason: string;
  reportedBy: string;
  reportedAt: string;
}

export interface SocialPostItem {
  _id: string;
  id?: string;
  author: SocialAuthor;
  location?: string;
  content: string;
  media?: string[];
  mediaType?: "image" | "video" | "none";
  intent?: "general" | "announcement" | "event" | "motivation";
  isPinned?: boolean;
  status: "active" | "reported" | "pending" | "hidden" | "deleted";
  reportsCount?: number;
  reports?: SocialReport[];
  likesCount?: number;
  commentsCount?: number;
  tags?: string[];
  isMutedUser?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SocialStats {
  pendingCount: number;
  reportedCount: number;
  totalCount: number;
}

export interface TrendingTag {
  rank: string;
  tag: string;
  postCount: string;
  surge: string;
  surgeType: "positive" | "neutral" | "negative";
}

export interface CommunityPulseData {
  totalPosts: number;
  activePosts: number;
  reportedCount: number;
  pendingCount: number;
  trendingTags: TrendingTag[];
}

export interface SocialSettingsData {
  _id?: string;
  spamKeywords: string[];
  autoFilterEnabled: boolean;
  requirePostApproval?: boolean;
}

export interface FeedFilters {
  filter?: "all" | "reported" | "pending" | "announcements" | "pinned";
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetSocialFeedResponse {
  success: boolean;
  message?: string;
  data: SocialPostItem[];
  stats: SocialStats;
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// POST: Fetch social feed posts with filters
export async function getSocialFeed(filters?: FeedFilters): Promise<{
  posts: SocialPostItem[];
  stats: SocialStats;
  totalPages: number;
}> {
  try {
    const response = await api.post<GetSocialFeedResponse>('/social/feed', {
      filter: filters?.filter || "all",
      search: filters?.search || "",
      page: filters?.page || 1,
      limit: filters?.limit || 20,
    });

    return {
      posts: response.data.data || [],
      stats: response.data.stats || { pendingCount: 0, reportedCount: 0, totalCount: 0 },
      totalPages: response.data.pagination?.totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching social feed:", error);
    return {
      posts: [],
      stats: { pendingCount: 0, reportedCount: 0, totalCount: 0 },
      totalPages: 1,
    };
  }
}

// POST: Publish gym announcement or post
export async function createAnnouncement(payload: {
  content: string;
  intent: "announcement" | "event" | "motivation" | "general";
  media?: string[];
  isPinned?: boolean;
  location?: string;
}): Promise<{ success: boolean; message?: string; data?: SocialPostItem }> {
  try {
    const response = await api.post<{ success: boolean; message?: string; data: SocialPostItem }>(
      '/social/create',
      payload
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to publish post. Please try again.",
    };
  }
}

// POST: Moderate post (delete, approve, hide, pin, unpin, report)
export async function moderatePost(
  postId: string,
  action: "delete" | "approve" | "hide" | "pin" | "unpin" | "report",
  reason?: string
): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    const response = await api.post<{ success: boolean; message?: string; data: any }>(
      '/social/moderate',
      { postId, action, reason }
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error(`Error performing moderation action '${action}':`, error);
    return {
      success: false,
      message: error?.response?.data?.message || `Failed to perform ${action}.`,
    };
  }
}

// POST: Mute or ban user
export async function muteUser(
  handle: string,
  isMuted: boolean = true
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await api.post<{ success: boolean; message?: string }>('/social/mute-user', {
      handle,
      isMuted,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("Error muting user:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to mute user.",
    };
  }
}

// POST: Fetch Community Pulse & Trending Topics
export async function getCommunityPulse(): Promise<CommunityPulseData | null> {
  try {
    const response = await api.post<{ success: boolean; data: CommunityPulseData }>('/social/pulse', {});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching community pulse:", error);
    return null;
  }
}

// POST: Get Spam Filter settings
export async function getSocialSettings(): Promise<SocialSettingsData | null> {
  try {
    const response = await api.post<{ success: boolean; data: SocialSettingsData }>('/social/settings', {});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching social settings:", error);
    return null;
  }
}

// POST: Update Spam Filter settings
export async function updateSocialSettings(
  spamKeywords: string,
  autoFilterEnabled?: boolean
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await api.post<{ success: boolean; message?: string }>('/social/settings/update', {
      spamKeywords,
      autoFilterEnabled,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("Error updating social settings:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update filter rules.",
    };
  }
}
