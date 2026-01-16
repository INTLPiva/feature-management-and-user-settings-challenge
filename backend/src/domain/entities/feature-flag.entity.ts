export interface FeatureFlag {
  id: string;
  flagKey: string;
  flagName: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
