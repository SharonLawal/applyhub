/**
 * Zod Schemas
 * * Defines the validation rules for each step of the application form.
 * * - step1Schema: Personal Information (Name, Email, Phone, etc.)
 * - step2Schema: Organization Details (Name, Type, Website, etc.)
 * - step3Schema: Grant Request (Amount, Project Title, Focus Area, etc.)
 */

import { z } from "zod";

const currentYear = new Date().getFullYear();

export const step1Schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,}$/, "Invalid phone number format"),
  country: z.string().min(1, "Please select a country"),
  role: z.string().min(1, "Please select a role"),
});

export const step2Schema = z.object({
  orgName: z.string().min(1, "Organization name is required"),
  orgType: z.string().min(1, "Please select an organization type"),
  regNumber: z.string().optional(),
  yearFounded: z.coerce
    .number()
    .min(1900, "Year must be after 1900")
    .max(currentYear, "Year cannot be in the future"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  orgDescription: z
    .string()
    .min(100, "Description must be at least 100 characters")
    .max(500, "Description must not exceed 500 characters"),
  employees: z.coerce
    .number()
    .min(1)
    .max(10000, "Must be between 1 and 10,000"),
});

export const step3Schema = z.object({
  grantAmount: z.coerce
    .number()
    .min(1000, "Minimum request is $1,000")
    .max(1000000, "Maximum request is $1,000,000"),
  currency: z.string().min(1, "Select currency"),
  projectTitle: z.string().min(1, "Project title is required"),
  projectDescription: z
    .string()
    .min(200, "Description must be at least 200 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  duration: z.string().min(1, "Select duration"),
  focusArea: z.array(z.string()).min(1, "Select at least one focus area"),
  fileName: z.string().optional(),
});

export const africanCountries = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "South Africa",
  "Egypt",
  "Rwanda",
  "Uganda",
  "Tanzania",
  "Ethiopia",
  "Senegal",
  "Zambia",
  "Zimbabwe",
  "Botswana",
  "Mozambique",
  "Cameroon",
];
