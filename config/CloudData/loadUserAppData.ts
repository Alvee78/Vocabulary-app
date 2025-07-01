import { databases } from '../appwriteConfig';
import { Query } from 'appwrite';

export const loadUserAppData = async (userId) => {
  try {
    const response = await databases.listDocuments(   
      '685f8fea0025ff7c48e7',// Database ID
      '685f973000094f61b81f',   // Collection ID
      [
        Query.equal('userId', userId),
        Query.equal('key', 'appData')
      ]
    );

    if (response.documents.length > 0) {
      const stored = response.documents[0];
      const parsedData = JSON.parse(stored.value);
      return parsedData;
    } else {
      console.warn('No data found for user.');
      return null;
    }
  } catch (error) {
    console.error('Failed to load user data:', error.message);
    return null;
  }
};
