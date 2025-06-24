import { doc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { WellhubTempUser } from '../types/user';

export const getWellhubTempUser = async (tempId: string): Promise<WellhubTempUser | null> => {
  try {
    const tempUserRef = doc(db, 'wellhubTempUsers', tempId);
    const tempUserSnap = await getDoc(tempUserRef);
    
    if (!tempUserSnap.exists()) {
      console.log('Wellhub temp user not found:', tempId);
      return null;
    }

    const data = tempUserSnap.data();
    
    // Check if the temp user has expired
    const now = new Date();
    const expiresAt = data.expiresAt?.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
    
    if (now > expiresAt) {
      console.log('Wellhub temp user expired:', tempId);
      // Optionally delete expired temp user
      await deleteWellhubTempUser(tempId);
      return null;
    }

    return {
      tempId: data.tempId,
      wellhubUserId: data.wellhubUserId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      origin: data.origin,
      userStatus: data.userStatus,
      countryCode: data.countryCode,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
      expiresAt: expiresAt
    };
  } catch (error) {
    console.error('Error getting Wellhub temp user:', error);
    return null;
  }
};

export const deleteWellhubTempUser = async (tempId: string): Promise<void> => {
  try {
    const tempUserRef = doc(db, 'wellhubTempUsers', tempId);
    await deleteDoc(tempUserRef);
    console.log('Wellhub temp user deleted:', tempId);
  } catch (error) {
    console.error('Error deleting Wellhub temp user:', error);
    throw error;
  }
}; 