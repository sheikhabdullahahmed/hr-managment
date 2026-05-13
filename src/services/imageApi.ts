// Backend Base URL
const API_BASE_URL = 'http://localhost:3000';

// API response interfaces
export interface SignedImageResponse {
  id: string;
  url: string;
  signature: string;
  timestamp: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// Get signed image API
export const getSignedImage = async (): Promise<SignedImageResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-signed-image`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching signed image:', error);
    throw error;
  }
};

// Login API
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Signup API
export const signupUser = async (userData: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Signup failed: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Mock data for development - remove this when API is ready
export const getMockSignedImage = (): SignedImageResponse => {
  return {
    id: 'sign-' + Math.random().toString(36).substr(2, 9),
    url: 'https://via.placeholder.com/300x150?text=Signed+Image',
    signature: 'sig_' + Math.random().toString(36).substr(2, 16),
    timestamp: new Date().toISOString(),
    expiresIn: 3600,
  };
};
