import { Stack } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import {SQLiteProvider, openDatabaseSync} from 'expo-sqlite'

export const DATABASE_NAME = 'tasks';
 export default function RootLayout() {
  return (
    <Suspense
      fallback={<ActivityIndicator size="large"/>}>
        <Stack>
          <Stack.Screen name="index" options={{title: 'Tasks' }} />
        </Stack>
      </Suspense>
  );
}
