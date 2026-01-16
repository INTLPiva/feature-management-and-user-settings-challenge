export interface Settings {
  id: string;
  receiveNotifications: boolean;
  darkMode: boolean;
  profileSignature?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
