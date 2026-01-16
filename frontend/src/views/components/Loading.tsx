import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useThemeStore } from "../../stores/themeStore";

export function Loading() {
  const { theme } = useThemeStore();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.text}
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    transform: [{ scale: 2 }],
  },
});
