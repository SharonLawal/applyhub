/**
 * ActivityItem Component
 * * A row item displayed in the dashboard's "Recent Activity" list.
 * Shows status chips (Pending, Approved) with color coding.
 * * @component
 * @example
 * <ActivityItem
 * title="Tech Grant"
 * date="2 days ago"
 * status="Pending"
 * delay={0.1}
 * />
 */

import { Box, Typography, Chip } from "@mui/material";

interface ActivityItemProps {
  title: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  delay?: number;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  date,
  status,
  delay = 0,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 3,
        borderBottom: 1,
        borderColor: "divider",
        transition: "all 0.3s ease",
        animation: `fadeIn 0.6s ease-out ${delay}s both`,
        "&:hover": {
          transform: "translateX(8px)",
          borderColor: "text.primary",
        },
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 400 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ letterSpacing: "0.05em" }}
        >
          {date}
        </Typography>
      </Box>
      <Chip
        label={status}
        color={getStatusColor()}
        size="small"
        variant="outlined"
      />
    </Box>
  );
};
