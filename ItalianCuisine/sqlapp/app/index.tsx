import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Recipe, recipes, tags } from "@/db/schema";
import * as schema from "@/db/schema";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";



export default function index() 
{
  const [data, setData] = useState <Recipe[]> ([]) ;

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  useEffect(() => {
    const load = async () => {
      const data = await drizzleDb.query.recipes.findMany();
      console.log('🚀 ~ load ~ data: ', data);
      setData(data);
    };
    load();
  }, []);

  return (
    <View style = {{flex : 1 }}>
      {data?.map((item) => (
        <Text key = {item.id} > {item.name}</Text>
      ))}
      </View>
  )

}
