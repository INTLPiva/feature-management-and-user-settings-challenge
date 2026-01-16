import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSettingsViewModel } from "../src/viewmodels/useSettingsViewModel";
import { Toggle } from "../src/views/components/Toggle";
import { TextInputField } from "../src/views/components/TextInputField";
import { useThemeStore } from "../src/stores/themeStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "../src/views/components/Loading";

export default function SettingsScreen() {
  const { theme } = useThemeStore();
  const {
    settings,
    featureFlags,
    isLoading,
    error,
    updateSetting,
    isUpdating,
  } = useSettingsViewModel();

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.error }]}>
            Erro ao carregar configurações
          </Text>
          <Text style={[styles.errorSubtext, { color: theme.textSecondary }]}>
            {error instanceof Error
              ? error.message
              : "Tente novamente mais tarde"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!settings || !featureFlags) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {featureFlags.enable_notifications && (
          <Toggle
            label="Receber Notificações"
            value={settings.receiveNotifications}
            onValueChange={(value) =>
              updateSetting("receiveNotifications", value)
            }
            disabled={isUpdating}
          />
        )}

        {featureFlags.enable_dark_mode && (
          <Toggle
            label="Modo Dark"
            value={settings.darkMode}
            onValueChange={(value) => updateSetting("darkMode", value)}
            disabled={isUpdating}
          />
        )}

        {featureFlags.enable_signature && (
          <TextInputField
            label="Assinatura do Perfil"
            value={settings.profileSignature || ""}
            onChangeText={(text) =>
              updateSetting("profileSignature", text || null)
            }
            placeholder="Digite sua assinatura personalizada"
            disabled={isUpdating}
          />
        )}

        {isUpdating && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Atualizando...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
  loadingOverlay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
