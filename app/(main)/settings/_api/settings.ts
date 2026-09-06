import api from '@/lib/axios';

export interface OperatingHour {
  day: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface GeneralSettings {
  _id?: string;
  facilityName: string;
  contactEmail: string;
  businessAddress: string;
  timezone?: string;
  operatingHours: OperatingHour[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GetGeneralInfoResponse {
  success: boolean;
  message?: string;
  data: GeneralSettings;
}

// POST: Fetch general settings via Axios
export async function getGeneralInfo(): Promise<GeneralSettings | null> {
  try {
    const response = await api.post<GetGeneralInfoResponse>('/settings/get-general-info', {});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching general info via Axios:", error);
    return null;
  }
}

// POST: Set / Update general settings via Axios
export async function setGeneralInfo(data: Partial<GeneralSettings>): Promise<GeneralSettings | null> {
  try {
    const response = await api.post<GetGeneralInfoResponse>('/settings/set-general-info', data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating general info via Axios:", error);
    return null;
  }
}
