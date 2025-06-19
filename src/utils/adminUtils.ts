import { auth, db } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

export const cleanupUsers = async () => {
  try {
    // 1. Get all users from Firestore
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    // 2. Delete each user's data and auth account
    const deletionPromises = snapshot.docs.map(async (document) => {
      const userId = document.id;
      
      try {
        // Delete Firestore document
        await deleteDoc(doc(db, 'users', userId));
        
        // Delete related collections
        await deleteUserRelatedData(userId);
        
        console.log(`Successfully deleted user data for ID: ${userId}`);
      } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
      }
    });

    await Promise.all(deletionPromises);
    console.log('Database cleanup completed successfully');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
    throw error;
  }
};

const deleteUserRelatedData = async (userId: string) => {
  const collections = ['symptoms', 'healthProfile', 'appointments', 'payments'];
  
  for (const collectionName of collections) {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    const deletions = snapshot.docs
      .filter(doc => doc.data().userId === userId)
      .map(doc => deleteDoc(doc.ref));
    
    await Promise.all(deletions);
  }
};