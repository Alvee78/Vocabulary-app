import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const dbName = 'dictionary.db';

export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  const sqliteFolder = `${FileSystem.documentDirectory}SQLite`;
  const dbFilePath = `${sqliteFolder}/${dbName}`;

  // Ensure folder exists
  const folderInfo = await FileSystem.getInfoAsync(sqliteFolder);
  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(sqliteFolder, { intermediates: true });
  }

  // Copy DB from assets if not already copied
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    const asset = Asset.fromModule(require('../../assets/database/dictionary.db'));
    await asset.downloadAsync();

    if (!asset.localUri) throw new Error('Failed to get localUri of asset');

    await FileSystem.copyAsync({
      from: asset.localUri,
      to: dbFilePath,
    });
  }

  // ✅ Use full path for openDatabaseSync
  return SQLite.openDatabaseSync(dbName);
}
