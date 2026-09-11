import api from '@/lib/axios';

export interface WebLoginPayload {
  email: string;
  password?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  dob?: string;
  organisationId?: any;
  status?: string;
}

export interface WebLoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
}

export async function loginWebUser(payload: WebLoginPayload): Promise<WebLoginResponse> {
  try {
    const response = await api.post<WebLoginResponse>('/auth/web-login', payload);
    if (response.data.success && response.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
    }
    return response.data;
  } catch (error: any) {
    console.error('Web login error:', error);
    return {
      success: false,
      message: error?.response?.data?.message || 'Login failed. Please check your credentials and try again.',
    };
  }
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  }
}
