import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme } from "../constants/theme";

const DARK_MODE_KEY = "@app:darkMode";

interface ThemeStore {
  isDarkMode: boolean;
  theme: typeof lightTheme;
  setDarkMode: (value: boolean) => void;
  loadDarkMode: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  theme: lightTheme,
  setDarkMode: async (value: boolean) => {
    await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(value));
    set({
      isDarkMode: value,
      theme: value ? darkTheme : lightTheme,
    });
  },
  loadDarkMode: async () => {
    try {
      const stored = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (stored !== null) {
        const value = JSON.parse(stored);
        set({
          isDarkMode: value,
          theme: value ? darkTheme : lightTheme,
        });
      }
    } catch (error) {
      console.error("Error loading dark mode:", error);
    }
  },
}));
