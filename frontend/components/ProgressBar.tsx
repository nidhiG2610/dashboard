import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  colorClass?: string; // Tailwind color override
  height?: string; // e.g. 'h-2', 'h-4'
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className = '',
  colorClass = 'bg-green-500',
  height = 'h-4',
}) => {
  return (
    <div className={`w-full bg-gray-900 rounded ${height} overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={`${colorClass} ${height} transition-all duration-300`} 
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
