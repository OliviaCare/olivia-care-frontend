import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  Timestamp 
} from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { db } from '../lib/firebase';
import { User } from '../types/user';

const handleFirebaseError = (error: any) => {
  console.error('Firebase error:', error);
  if (error.code === 'auth/invalid-credential') {
    throw new Error('La contraseña actual es incorrecta');
  }
  if (error.code === 'auth/weak-password') {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
  if (error.code === 'auth/requires-recent-login') {
    throw new Error('Por favor, vuelve a iniciar sesión para cambiar tu contraseña');
  }
  if (error.code === 'auth/network-request-failed') {
    throw new Error('Error de conexión. Por favor, verifica tu conexión a internet.');
  }
  if (error.code === 'permission-denied') {
    throw new Error('No tienes permisos para realizar esta acción');
  }
  throw error;
};

export const createOrUpdateUser = async (userId: string, userData: Partial<User>) => {
  try {
    console.log('Creating/updating user with data:', userData);
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    const userDataToSave = {
      ...userData,
      updatedAt: Timestamp.now(),
    };

    if (!userSnap.exists()) {
      userDataToSave.createdAt = Timestamp.now();
      userDataToSave.role = 'PATIENT';
      userDataToSave.emailVerified = false;
      await setDoc(userRef, userDataToSave);
    } else {
      Object.keys(userDataToSave).forEach(key => 
        userDataToSave[key] === undefined && delete userDataToSave[key]
      );
      await updateDoc(userRef, userDataToSave);
    }
    
    return userId;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    handleFirebaseError(error);
  }
};

export const updateUserProfile = async (userId: string, profileData: Partial<User>) => {
  try {
    console.log('Updating user profile:', profileData);
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    const dataToUpdate = {
      ...profileData,
      updatedAt: Timestamp.now()
    };

    Object.keys(dataToUpdate).forEach(key => {
      if (dataToUpdate[key] === undefined) {
        delete dataToUpdate[key];
      }
    });

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...dataToUpdate,
        createdAt: Timestamp.now(),
        role: 'PATIENT',
        emailVerified: false
      });
    } else {
      await updateDoc(userRef, dataToUpdate);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    handleFirebaseError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    console.log('Getting user by ID:', userId);
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User data retrieved:', userData);
      return {
        id: userSnap.id,
        ...userData,
        createdAt: userData.createdAt?.toDate(),
        updatedAt: userData.updatedAt?.toDate(),
        assessmentResults: userData.assessmentResults ? {
          ...userData.assessmentResults,
          date: userData.assessmentResults.date?.toDate()
        } : null
      } as User;
    }
    console.log('No user data found');
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    handleFirebaseError(error);
    return null;
  }
};

export const updateUserPassword = async (user: any, currentPassword: string, newPassword: string) => {
  try {
    if (!currentPassword) {
      throw new Error('Debes proporcionar tu contraseña actual');
    }

    if (newPassword.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return true;
  } catch (error) {
    console.error('Error updating password:', error);
    handleFirebaseError(error);
  }
};