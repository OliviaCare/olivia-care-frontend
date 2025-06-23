import { Request, Router } from 'express';

export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  wellhubUserId?: string;
  wellhubPlanId?: string;
  wellhubCompanyId?: string;
  wellhubSubscriptionStartDate?: Date;
  wellhubSubscriptionEndDate?: Date;
}

export interface WellhubTempUser {
  id: string;
  wellhubUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  wellhubPlanId: string;
  wellhubCompanyId: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface WellhubEvent {
  id: string;
  eventType: 'subscription.created' | 'subscription.cancelled' | 'subscription.plan_changed';
  userId?: string;
  wellhubUserId: string;
  data: Record<string, any>;
  processedAt: Date;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  scheduledDateTime: Date;
  duration: number;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  meetingLink?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Symptom {
  id: string;
  userId: string;
  description: string;
  severity: number;
  category: string;
  recordedAt: Date;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  createdAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: User & { isAdmin?: boolean };
}

export type AppRouter = Router; 