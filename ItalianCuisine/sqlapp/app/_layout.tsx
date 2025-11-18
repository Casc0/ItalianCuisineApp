import { Stack } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {SQLiteProvider, openDatabaseSync} from 'expo-sqlite'
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import  migrations from "@/drizzle/migrations";
import { addDummyData } from "./addDummyData";

export const DATABASE_NAME = 'recipes';


 export default function RootLayout() {
  //my database
  const expoDb = openDatabaseSync(DATABASE_NAME);
  //the drizzle instance of my database
  const db = drizzle(expoDb);
  //once I have the instance I can run migrations
  const { success, error} = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      addDummyData(db);
      console.log("Migrations applied successfully");
    }
    if (error) {
      console.error("Error applying migrations:", error);
    }
  }, [success, error]);

  return (
    
    <Suspense fallback={<ActivityIndicator size="large"/>}>
      <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{enableChangeListener: true}}
      useSuspense>
          <Stack>
            <Stack.Screen name="index" options={{title: 'Recipes' }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
  );
}