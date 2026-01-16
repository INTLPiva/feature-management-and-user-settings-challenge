import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useThemeStore } from "../../stores/themeStore";

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const TextInputField = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  disabled = false,
}: TextInputFieldProps) => {
  const { theme } = useThemeStore();
  const [localValue, setLocalValue] = useState(value);

  const handleBlur = () => {
    if (localValue !== value) {
      onChangeText(localValue);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
        value={localValue}
        onChangeText={setLocalValue}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
