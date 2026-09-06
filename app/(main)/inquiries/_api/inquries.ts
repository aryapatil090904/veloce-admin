import api from '@/lib/axios';

export interface Inquiry {
  _id?: string;
  id?: string;
  inquiryId?: string;
  name: string;
  phone: string;
  email: string;
  status: "Hot" | "Warm" | "Cold" | string;
  source: "Walk-in" | "Website" | "Instagram" | "Referral" | string;
  location?: string;
  dateStr?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Referral {
  _id?: string;
  id?: string;
  referralId?: string;
  referrer: string;
  invitee: string;
  status: "Joined" | "Pending" | string;
  rewardGranted: boolean;
  rewardType?: string;
  dateStr?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InquiryFilters {
  search?: string;
  status?: string;
  source?: string;
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

export interface GetInquiriesResponse {
  success: boolean;
  message?: string;
  data: Inquiry[];
  pagination?: PaginationMeta;
}

export interface GetReferralsResponse {
  success: boolean;
  message?: string;
  data: Referral[];
  pagination?: PaginationMeta;
}

// POST: Fetch lead inquiries list using Axios POST request payload
export async function getInquiryList(filters?: InquiryFilters): Promise<{ inquiries: Inquiry[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || "",
      status: filters?.status && filters.status !== "Filter Status" ? filters.status : undefined,
      source: filters?.source,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetInquiriesResponse>('/inquiry', payload);
    const data = response.data;

    return {
      inquiries: data.data || [],
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
    console.error("Error fetching inquiries list via Axios:", error);
    return {
      inquiries: [],
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

// POST: Retrieve member referrals list using Axios
export async function getReferralList(filters?: InquiryFilters): Promise<{ referrals: Referral[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || "",
      status: filters?.status && filters.status !== "Filter Status" ? filters.status : undefined,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetReferralsResponse>('/inquiry/referrals', payload);
    const data = response.data;

    return {
      referrals: data.data || [],
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
    console.error("Error fetching referrals list via Axios:", error);
    return {
      referrals: [],
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

// POST: Create a new lead inquiry
export async function createInquiry(inquiryData: Partial<Inquiry>): Promise<Inquiry | null> {
  try {
    const response = await api.post<{ success: boolean; data: Inquiry }>('/inquiry/create', inquiryData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating inquiry via Axios:", error);
    return null;
  }
}

// POST: Grant referral reward to a member
export async function grantReferralReward(id: string, rewardType: string): Promise<Referral | null> {
  try {
    const response = await api.post<{ success: boolean; data: Referral }>('/inquiry/grant-reward', {
      id,
      rewardType,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error granting referral reward via Axios:", error);
    return null;
  }
}

// POST: Delete inquiry
export async function deleteInquiry(id: string): Promise<boolean> {
  try {
    const response = await api.post<{ success: boolean }>('/inquiry/delete', { id });
    return response.data.success;
  } catch (error) {
    console.error("Error deleting inquiry via Axios:", error);
    return false;
  }
}
