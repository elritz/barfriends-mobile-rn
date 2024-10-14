import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite/legacy";

export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + "SQLite",
  );

  if (!db.exists) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite",
    );
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(require("../../SQLite/database.db")).uri,
    FileSystem.documentDirectory + "SQLite/database.db",
  );
  return SQLite.openDatabase("SQLite/database.db");
}
