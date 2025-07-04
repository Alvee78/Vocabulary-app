// import { Asset } from "expo-asset";
// import * as FileSystem from "expo-file-system";

// export const loadSqliteDatabase = async () => {
//     const dbName = "dictionary.db";
//     const dbAsset = require("../assets/database/dictionary.db");
//     const dbUri = Asset.fromModule(dbAsset).uri;
//     const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//     const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

//     //Always replace: delete if exists [----FOR DEBUG----]
//     if (fileInfo.exists) {
//         await FileSystem.deleteAsync(dbFilePath, { idempotent: true });
//     }
    
//     //Initialize data using asset
//     if(!fileInfo.exists){
//         await FileSystem.makeDirectoryAsync(
//             `${FileSystem.documentDirectory}SQLite/`,
//             {intermediates: true}
//         )
//         await FileSystem.downloadAsync(dbUri, dbFilePath);
//     }
// };
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export const loadSqliteDatabase = async () => {
  const dbName = "dictionary.db";
  const dbAsset = require("../assets/database/dictionary.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const dirPath = `${FileSystem.documentDirectory}SQLite/`;
  await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });

  // Always replace for debug
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  //For debug uncomment [----FOR DEBUG----]
//   if (fileInfo.exists) {
//     await FileSystem.deleteAsync(dbFilePath, { idempotent: true });
//   }

  // ❗ REFRESH file info after delete
  const asset = Asset.fromModule(dbAsset);
  await asset.downloadAsync(); // Ensure it's available
  if(!fileInfo.exists) //For debug uncomment [----FOR DEBUG----]
    await FileSystem.copyAsync({
        from: asset.localUri!,
        to: dbFilePath,
    });
};
