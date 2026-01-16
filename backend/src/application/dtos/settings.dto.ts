export interface UpdateSettingDto {
  setting: "receiveNotifications" | "darkMode" | "profileSignature";
  value: boolean | string | null;
}
