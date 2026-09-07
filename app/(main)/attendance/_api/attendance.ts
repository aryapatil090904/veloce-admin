import api from '@/lib/axios';

export interface AttendanceRecord {
  id: string;
  memberName: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  totalHours: string;
  membershipType: string;
  attendanceDate: string;
  status: string;
}

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AttendanceListFilters {
  page?: number;
  limit?: number;
  search?: string;
  date?: string;
}

export interface GetAttendanceListResponse {
  success: boolean;
  message?: string;
  data: AttendanceRecord[];
  CurrentlyCheckInCount: number;
  pagination: PaginationMeta;
}

export async function getAttendanceList(filters?: AttendanceListFilters): Promise<{
  data: AttendanceRecord[];
  currentlyCheckInCount: number;
  pagination: PaginationMeta;
}> {
  try {
    const payload = {
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      search: filters?.search || "",
      date: filters?.date,
    };

    const response = await api.post<GetAttendanceListResponse>('/attendance/list', payload);
    const resData = response.data;

    return {
      data: resData.data || [],
      currentlyCheckInCount: resData.CurrentlyCheckInCount || 0,
      pagination: resData.pagination || {
        currentPage: filters?.page || 1,
        limit: filters?.limit || 10,
        totalRecords: resData.data?.length || 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error("Error fetching attendance list via Axios:", error);
    return {
      data: [],
      currentlyCheckInCount: 0,
      pagination: {
        currentPage: filters?.page || 1,
        limit: filters?.limit || 10,
        totalRecords: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
