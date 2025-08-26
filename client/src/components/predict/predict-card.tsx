import React from "react";
import { Card, CardHeader, CardTitle, cn } from "@cartridge/ui";

interface PredictCardProps {
  image: string;
  title: string;
  subtitle?: string;
  user1Name: string;
  user1Score: number;
  user2Name: string;
  user2Score: number;
  price: string;
  time: string;
  className?: string;
}

// Simple sword icon component
const SwordIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="14.5,17.5 3,6 3,3 6,3 17.5,14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </svg>
);

// Simple trophy icon component
const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="m5 7 1 12h12l1-12" />
    <path d="M12 8a5 5 0 0 0-5-5v3h10V3a5 5 0 0 0-5 5Z" />
  </svg>
);

// Simple clock icon component
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

export const PredictCard: React.FC<PredictCardProps> = ({
  image,
  title,
  subtitle,
  user1Name,
  user1Score,
  user2Name,
  user2Score,
  price,
  time,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-gray-800 border-gray-700 p-4 w-full max-w-sm",
        className,
      )}
    >
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-lg font-semibold truncate">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-gray-300 text-sm truncate">{subtitle}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <div className="space-y-3">
        {/* User scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SwordIcon className="w-4 h-4 text-gray-300" />
              <span className="text-white font-medium">{user1Name}</span>
            </div>
            <span className="text-yellow-400 font-semibold text-lg">
              {user1Score}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SwordIcon className="w-4 h-4 text-gray-300" />
              <span className="text-white font-medium">{user2Name}</span>
            </div>
            <span className="text-yellow-400 font-semibold text-lg">
              {user2Score}%
            </span>
          </div>
        </div>

        {/* Price and time */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm">{price}</span>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm">{time}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictCard;
