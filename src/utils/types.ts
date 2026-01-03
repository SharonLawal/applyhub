/**
 * Types & Interfaces Definitions
 * * Centralizes all TypeScript types used across the application.
 * * Key Exports:
 * - ApplyFormData: Inferred type from Zod schemas for the application form.
 * - Application: Interface for the grant application object used in the Dashboard.
 * - ApplicationStatus: Union type for application states.
 */

import { z } from "zod";
import { step1Schema, step2Schema, step3Schema } from "./schemas";

export const combinedSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type ApplyFormData = z.infer<typeof combinedSchema>;

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Application {
  id: string;
  projectName: string;
  amount: number;
  date: string;
  status: ApplicationStatus;
}