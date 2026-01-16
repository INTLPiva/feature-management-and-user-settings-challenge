export interface Settings {
  id: string;
  receiveNotifications: boolean;
  darkMode: boolean;
  profileSignature: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlags {
  enable_signature: boolean;
  enable_dark_mode: boolean;
  enable_notifications: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type SettingKey =
  | "receiveNotifications"
  | "darkMode"
  | "profileSignature";
export type SettingValue = boolean | string | null;

export interface UpdateSettingDto {
  setting: SettingKey;
  value: SettingValue;
}
