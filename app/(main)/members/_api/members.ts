import api from '@/lib/axios';

export interface Member {
  _id: string;
  id?: string;
  name: string;
  email: string;
  memberId: string;
  tier: "Basic" | "Pro" | "Elite" | string;
  status: "Active" | "Frozen" | "Overdue" | string;
  avatarUrl?: string;
  phone?: string;
  lastCheckInDate?: string;
  lastCheckInLocation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemberStats {
  totalActive: number;
  newThisMonth: number;
  atRiskOrInactive: number;
  renewalSuccessRate: string;
}

export interface MemberFilters {
  search?: string;
  tier?: string;
  status?: string;
  lastCheckIn?: string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetMembersResponse {
  success: boolean;
  message?: string;
  data: Member[];
  pagination?: PaginationMeta;
}

export interface WaiverSession {
  waiverId: string;
  status: "idle" | "waiting" | "signed";
  signature?: string;
  photoUrl?: string;
  signedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/v1';

// POST: Submit digital waiver
export async function submitWaiver(waiverId: string, signature: string, photoUrl?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await api.post<{ success: boolean; message?: string; data: WaiverSession }>('/member/submit-waiver', {
      waiverId,
      signature,
      photoUrl,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("Error submitting waiver via Axios:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to submit waiver. Please try again.",
    };
  }
}

// POST: Check digital waiver status
export async function getWaiverStatus(waiverId: string): Promise<WaiverSession | null> {
  try {
    const response = await api.post<{ success: boolean; data: WaiverSession }>('/member/waiver-status', {
      waiverId,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error getting waiver status via Axios:", error);
    return null;
  }
}

// POST: Fetch members list using Axios POST request payload
export async function getMembers(filters?: MemberFilters): Promise<{ members: Member[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || "",
      tier: filters?.tier && filters.tier !== "Membership Tier" ? filters.tier : undefined,
      status: filters?.status && filters.status !== "Status" ? filters.status : undefined,
      lastCheckIn: filters?.lastCheckIn && filters.lastCheckIn !== "Last Check-in" ? filters.lastCheckIn : undefined,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetMembersResponse>('/member', payload);
    const data = response.data;

    return {
      members: data.data || [],
      pagination: data.pagination || {
        totalCount: data.data?.length || 0,
        page: filters?.page || 1,
        limit: filters?.limit || 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  } catch (error) {
    console.error("Error fetching members via Axios:", error);
    return {
      members: [],
      pagination: {
        totalCount: 0,
        page: filters?.page || 1,
        limit: filters?.limit || 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

// POST: Fetch member quick insight statistics using Axios
export async function getMemberStats(): Promise<MemberStats | null> {
  try {
    const response = await api.post<{ success: boolean; data: MemberStats }>('/member/stats', {});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching member stats via Axios:", error);
    return null;
  }
}

// POST: Get single member details by ID using Axios
export async function getMemberById(id: string): Promise<Member | null> {
  try {
    const response = await api.post<{ success: boolean; data: Member }>('/member/get-by-id', { id });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching member details via Axios:", error);
    return null;
  }
}

// POST: Create new member using Axios
export async function createMember(memberData: Partial<Member>): Promise<Member | null> {
  try {
    const response = await api.post<{ success: boolean; data: Member }>('/member/create', memberData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating member via Axios:", error);
    return null;
  }
}

// POST: Update existing member using Axios
export async function updateMember(id: string, memberData: Partial<Member>): Promise<Member | null> {
  try {
    const response = await api.post<{ success: boolean; data: Member }>('/member/update', { id, ...memberData });
    return response.data.data;
  } catch (error) {
    console.error("Error updating member via Axios:", error);
    return null;
  }
}

// POST: Delete member using Axios
export async function deleteMember(id: string): Promise<boolean> {
  try {
    const response = await api.post<{ success: boolean }>('/member/delete', { id });
    return response.data.success;
  } catch (error) {
    console.error("Error deleting member via Axios:", error);
    return false;
  }
}
