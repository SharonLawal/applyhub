import React, { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";
import type { ApplyFormData, Application } from "../utils/types";

interface ApplicationContextType {
  applications: Application[];
  addApplication: (data: ApplyFormData) => void;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context)
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  return context;
};

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APH-2025-001",
      projectName: "Tech Education Grant",
      amount: 50000,
      date: "2 days ago",
      status: "Pending",
    },
    {
      id: "APH-2025-002",
      projectName: "Community Health",
      amount: 15000,
      date: "1 week ago",
      status: "Approved",
    },
    {
      id: "APH-2025-003",
      projectName: "AgriTech Initiative",
      amount: 75000,
      date: "2 weeks ago",
      status: "Approved",
    },
  ]);

  const addApplication = (data: ApplyFormData) => {
    const newAppzb: Application = {
      id: `APH-2025-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      projectName: data.projectTitle,
      amount: data.grantAmount,
      date: "Just now",
      status: "Pending",
    };
    setApplications((prev) => [newAppzb, ...prev]);
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "Pending").length,
    approved: applications.filter((a) => a.status === "Approved").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <ApplicationContext.Provider
      value={{ applications, addApplication, stats }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
