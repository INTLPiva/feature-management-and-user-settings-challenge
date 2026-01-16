import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { SettingKey, SettingValue } from "../types";
import Toast from "react-native-toast-message";
import { useThemeStore } from "../stores/themeStore";

export const useSettingsViewModel = () => {
  const queryClient = useQueryClient();
  const { setDarkMode } = useThemeStore();

  const {
    data: featureFlags,
    isLoading: isLoadingFlags,
    error: flagsError,
  } = useQuery({
    queryKey: ["featureFlags"],
    queryFn: async () => {
      const response = await apiService.getFeatureFlags();
      return response.data;
    },
  });

  const {
    data: settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await apiService.getSettings();
      await setDarkMode(response.data.darkMode);
      return response.data;
    },
  });

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
    }
  }, [settings, setDarkMode]);

  const updateSettingMutation = useMutation({
    mutationFn: async ({
      setting,
      value,
    }: {
      setting: SettingKey;
      value: SettingValue;
    }) => {
      const response = await apiService.updateSetting({ setting, value });
      return response.data;
    },
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(["settings"], data);

      if (
        variables.setting === "darkMode" &&
        typeof variables.value === "boolean"
      ) {
        await setDarkMode(variables.value);
      }

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Configuração atualizada com sucesso!",
      });
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.message || "Não foi possível atualizar a configuração",
      });
    },
  });

  const updateSetting = (setting: SettingKey, value: SettingValue) => {
    updateSettingMutation.mutate({ setting, value });
  };

  const isLoading = isLoadingFlags || isLoadingSettings;
  const error = flagsError || settingsError;

  return {
    settings,
    featureFlags,
    isLoading,
    error,
    updateSetting,
    isUpdating: updateSettingMutation.isPending,
  };
};
