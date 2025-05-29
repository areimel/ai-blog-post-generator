
import React from 'react';

interface IconProps {
  className?: string;
}

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L9.16 8.33L2 10.5L7.92 15.67L6.08 22L12 18.33L17.92 22L16.08 15.67L22 10.5L14.84 8.33L12 2Z" />
    <path d="M4.5 10.5L6.5 6.5L10.5 4.5L6.5 2.5L4.5 6.5L0.5 4.5L2.5 6.5L0.5 10.5L4.5 8.5L6.5 10.5L8.5 6.5L4.5 8.5Z" transform="translate(12, 2)" />
    <path d="M19.5 13.5L17.5 17.5L13.5 19.5L17.5 21.5L19.5 17.5L23.5 19.5L21.5 17.5L23.5 13.5L19.5 15.5L17.5 13.5L15.5 17.5L19.5 15.5Z" transform="translate(-6, 0)" />
  </svg>
);
