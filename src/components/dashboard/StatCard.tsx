/**
 * StatCard Component
 * * Displays a single key metric (statistic) in a card format.
 * Includes a fade-in animation that can be staggered using the delay prop.
 * * @component
 * @example
 * <StatCard 
 * label="Total Revenue" 
 * value="$50,000" 
 * delay={0.2} 
 * />
 */

import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface StatCardProps {
  label: string;
  value: number;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delay = 0,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          borderColor: theme.palette.mode === "light" ? "#000" : "#fff",
        },
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
        "@keyframes fadeInUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 3,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 200,
            fontSize: "4rem",
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
