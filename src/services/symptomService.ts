import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SymptomLog {
  userId: string;
  date: Date;
  symptoms: Record<string, number>;
  notes?: string;
  triggers?: string[];
  activities?: Array<{
    id: string;
    details?: string;
  }>;
}

export const logSymptoms = async (symptomData: SymptomLog) => {
  try {
    const symptomsRef = collection(db, 'symptoms');
    const docRef = await addDoc(symptomsRef, {
      ...symptomData,
      date: Timestamp.fromDate(symptomData.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error logging symptoms:', error);
    throw error;
  }
};

export const getSymptomHistory = async (userId: string, startDate?: Date, endDate?: Date) => {
  try {
    const symptomsRef = collection(db, 'symptoms');
    let q = query(
      symptomsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    if (startDate) {
      q = query(q, where('date', '>=', Timestamp.fromDate(startDate)));
    }
    if (endDate) {
      q = query(q, where('date', '<=', Timestamp.fromDate(endDate)));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    }));
  } catch (error) {
    console.error('Error getting symptom history:', error);
    throw error;
  }
};