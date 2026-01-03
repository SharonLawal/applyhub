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