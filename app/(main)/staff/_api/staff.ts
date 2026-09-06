import api from '@/lib/axios';

export interface StaffMember {
  _id?: string;
  id?: string;
  staffId?: string;
  name: string;
  email: string;
  role: string;
  shift: "Morning" | "Evening" | "Night" | string;
  status: "Active" | "On Leave" | "Inactive" | string;
  avatar?: string;
  bio?: string;
  assignedClients: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffStats {
  totalActive: number;
  totalAssignedClients: number;
  staffOnLeave: number;
}

export interface StaffFilters {
  search?: string;
  role?: string;
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

export interface GetStaffResponse {
  success: boolean;
  message?: string;
  data: StaffMember[];
  pagination?: PaginationMeta;
}

// POST: Fetch staff/employee list using Axios POST request payload
export async function getStaffList(filters?: StaffFilters): Promise<{ staff: StaffMember[]; pagination: PaginationMeta }> {
  try {
    const payload = {
      search: filters?.search || "",
      role: filters?.role && filters.role !== "Filter Roles" ? filters.role : undefined,
      status: filters?.status && filters.status !== "Status" ? filters.status : undefined,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
    };

    const response = await api.post<GetStaffResponse>('/employee', payload);
    const data = response.data;

    return {
      staff: data.data || [],
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
    console.error("Error fetching staff list via Axios:", error);
    return {
      staff: [],
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

// POST: Fetch quick insight statistics for staff
export async function getStaffStats(): Promise<StaffStats | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffStats }>('/employee/stats', {});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching staff stats via Axios:", error);
    return null;
  }
}

// POST: Create a new staff member
export async function createStaff(staffData: Partial<StaffMember>): Promise<StaffMember | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffMember }>('/employee/create', staffData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating staff member via Axios:", error);
    return null;
  }
}

// POST: Update staff details / shift / role
export async function updateStaff(id: string, staffData: Partial<StaffMember>): Promise<StaffMember | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffMember }>('/employee/update', {
      id,
      ...staffData,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating staff member via Axios:", error);
    return null;
  }
}

// POST: Assign a client to a staff member
export async function assignClientToStaff(staffId: string, clientName: string): Promise<StaffMember | null> {
  try {
    const response = await api.post<{ success: boolean; data: StaffMember }>('/employee/assign-client', {
      staffId,
      clientName,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error assigning client to staff via Axios:", error);
    return null;
  }
}

// POST: Delete staff member
export async function deleteStaff(id: string): Promise<boolean> {
  try {
    const response = await api.post<{ success: boolean }>('/employee/delete', { id });
    return response.data.success;
  } catch (error) {
    console.error("Error deleting staff member via Axios:", error);
    return false;
  }
}
