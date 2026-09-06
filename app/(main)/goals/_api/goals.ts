import api from '@/lib/axios';

export interface MemberGoal {
  _id?: string;
  id?: string;
  memberName: string;
  memberAvatar?: string;
  targetType: string;
  currentProgress: number;
  targetValue: number;
  unit?: string;
  progressPercentage: number;
  deadline: string;
  syncType?: string;
  status: 'In Progress' | 'Completed' | 'Behind' | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffKPI {
  _id?: string;
  id?: string;
  staffName: string;
  staffRole: string;
  staffAvatarText?: string;
  kpiTarget: string;
  timeframe: string;
  currentValue: number;
  targetValue: number;
  deadlineStatus: string;
  status: 'Pending' | 'Achieved' | 'Missed' | string;
  managerNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GoalFilters {
  search?: string;
  status?: string;
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

export interface GetMemberGoalsResponse {
  success: boolean;
  message?: string;
  data: MemberGoal[];
  pagination?: PaginationMeta;
}

export interface GetStaffKPIsResponse {
  success: boolean;
  message?: string;
  data: StaffKPI[];
  pagination?: PaginationMeta;
}

// POST: Fetch Member Goals list
export async function getMemberGoalsList(filters?: GoalFilters): Promise<{ goals: MemberGoal[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || '',
      status: filters?.status || undefined,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetMemberGoalsResponse>('/goals', payload);
    const data = response.data;

    return {
      goals: data.data || [],
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
    console.error("Error fetching member goals via Axios:", error);
    return {
      goals: [],
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

// POST: Fetch Staff KPIs list
export async function getStaffKPIList(filters?: GoalFilters): Promise<{ kpis: StaffKPI[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || '',
      status: filters?.status || undefined,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetStaffKPIsResponse>('/goals/staff', payload);
    const data = response.data;

    return {
      kpis: data.data || [],
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
    console.error("Error fetching staff KPIs via Axios:", error);
    return {
      kpis: [],
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

// POST: Create Member Goal
export async function createMemberGoal(goalData: { memberName: string; targetType: string; deadline: string; targetValue?: number; unit?: string }): Promise<MemberGoal | null> {
  try {
    const response = await api.post<{ success: boolean; data: MemberGoal }>('/goals/member/create', goalData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating member goal via Axios:", error);
    return null;
  }
}

// POST: Create Staff KPI
export async function createStaffKPI(kpiData: { staffName: string; kpiTarget: string; timeframe?: string; targetValue?: number }): Promise<StaffKPI | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffKPI }>('/goals/staff/create', kpiData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating staff KPI via Axios:", error);
    return null;
  }
}

// POST: Finalize Staff KPI Review
export async function reviewStaffKPI(id: string, outcome: 'Achieved' | 'Missed', managerNotes?: string): Promise<StaffKPI | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffKPI }>('/goals/staff/review', {
      id,
      outcome,
      managerNotes,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error reviewing staff KPI via Axios:", error);
    return null;
  }
}

// POST: Nudge Member
export async function nudgeMemberGoal(id: string): Promise<boolean> {
  try {
    const response = await api.post<{ success: boolean; message?: string }>('/goals/member/nudge', { id });
    return response.data.success;
  } catch (error) {
    console.error("Error sending nudge via Axios:", error);
    return false;
  }
}

// POST: Update Member Goal Progress
export async function updateMemberGoalProgress(id: string, currentProgress: number): Promise<MemberGoal | null> {
  try {
    const response = await api.post<{ success: boolean; data: MemberGoal }>('/goals/member/update-progress', {
      id,
      currentProgress,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating goal progress via Axios:", error);
    return null;
  }
}
