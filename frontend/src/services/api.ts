import {
  ApiResponse,
  FeatureFlags,
  Settings,
  UpdateSettingDto,
} from "../types";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3333";

class ApiService {
  private async fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getFeatureFlags(): Promise<ApiResponse<FeatureFlags>> {
    return this.fetchApi<ApiResponse<FeatureFlags>>("/api/feature-flags");
  }

  async getSettings(): Promise<ApiResponse<Settings>> {
    return this.fetchApi<ApiResponse<Settings>>("/api/settings");
  }

  async updateSetting(dto: UpdateSettingDto): Promise<ApiResponse<Settings>> {
    return this.fetchApi<ApiResponse<Settings>>("/api/settings", {
      method: "PUT",
      body: JSON.stringify(dto),
    });
  }
}

export const apiService = new ApiService();
