export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  createdAt: Date;
  emailVerified?: boolean;
  profile?: UserProfile;
  assessmentResults?: AssessmentResults;
  subscription?: SubscriptionInfo;
  wellhub?: WellhubMetadata;
}

export interface UserProfile {
  phoneNumber?: string;
  address?: string;
  medicalHistory?: Record<string, any>;
  preferences?: Record<string, any>;
}

export interface AssessmentResults {
  menopausiaySalud: number;
  psiquico: number;
  sexualidad: number;
  relacionPareja: number;
  total: number;
  date: Date;
}

export interface SubscriptionInfo {
  status: 'active' | 'inactive' | 'trial' | 'cancelled';
  plan: 'free' | 'premium';
  startDate: Date;
  endDate?: Date;
  nextBillingDate?: Date;
  trialEndsAt?: Date;
  cancelledAt?: Date;
  paymentMethod?: {
    type: 'card' | 'paypal';
    last4?: string;
    expiryDate?: string;
  };
  helpText?: string;
  price?: number;
}

export interface WellhubMetadata {
  wellhubUserId: string;
  origin?: string;
  userStatus?: string;
  countryCode?: string;
  registeredAt: Date;
}

export interface WellhubTempUser {
  tempId: string;
  wellhubUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  origin?: string;
  userStatus?: string;
  countryCode?: string;
  createdAt: Date;
  expiresAt: Date;
}