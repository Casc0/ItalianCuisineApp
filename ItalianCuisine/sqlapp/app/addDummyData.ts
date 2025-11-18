import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { recipes, tags, recipesToTags } from "@/db/schema";
import AsyncStorage from "expo-sqlite/kv-store";


export const addDummyData = async (db: ExpoSQLiteDatabase) => {
    const value = AsyncStorage.getItemSync('dbInitialized');

    if(value) return;

    console.log("Adding dummy data to the database...");

    await db.insert(recipes).values([
        { name: 'Pesto alla Genovese' },
        { name: 'Risotto Cremoso de Hongos' },
        { name: 'Lasagna Clásica Bolognese' }
    ])

    await db.insert(tags).values([
        { id: 'Pasta'},
        { id: 'Umami'},
        { id: 'Aromatico'},
        { id: 'Salsa'}
    ])

    await db.insert(recipesToTags).values([
        { recipesId: 1, tagId: 'Aromatico' },
        { recipesId: 1, tagId: 'Salsa' },
        { recipesId: 2, tagId: 'Umami' },
        { recipesId: 2, tagId: 'Reconfortante' },
        { recipesId: 3, tagId: 'Reconfortante' },
        { recipesId: 2, tagId: 'Cremoso' },
    ]);

    console.log("Dummy data added to the database.");

    AsyncStorage.setItemSync('dbInitialized', 'true');
}
