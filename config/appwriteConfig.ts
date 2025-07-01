import { Client, Databases, Account } from 'appwrite';

const client = new Client();
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
client
  .setEndpoint(endpoint) // Use your endpoint if self-hosting
  .setProject(projectId); // Replace with your Project ID

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
