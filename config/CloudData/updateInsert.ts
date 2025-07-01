import { databases } from '../appwriteConfig'
import { ID, Query } from 'appwrite';

export const updateinsertUserAppData = async (userId, newData) => {
  try {
    // Step 1: Check if a document exists for this user
    const res = await databases.listDocuments(
      '685f8fea0025ff7c48e7',
      '685f973000094f61b81f',
      [
        Query.equal('userId', userId),
        Query.equal('key', 'appData')
      ]
    );

    const stringifiedValue = JSON.stringify(newData);

    if (res.documents.length > 0) {
      // Step 2: Document found → update it
      const existingDocId = res.documents[0].$id;

      const updated = await databases.updateDocument(
      '685f8fea0025ff7c48e7',
      '685f973000094f61b81f',
        existingDocId,
        {
          value: stringifiedValue
        }
      );
      console.log('Document updated:', updated);
    } else {
      // Step 3: Not found → create a new one
      const created = await databases.createDocument(
      '685f8fea0025ff7c48e7',
      '685f973000094f61b81f',
        ID.unique(),
        {
          key: 'appData',
          userId: userId,
          value: stringifiedValue
        }
      );
      console.log('Document created:', created);
    }
    return true;
  } catch (error) {
    console.log('Error during upsert:', error.message);
    return false;
  }
};
