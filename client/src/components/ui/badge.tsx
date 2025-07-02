import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      default: 'border-transparent bg-orange-500 text-white hover:bg-orange-600',
      secondary: 'border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300',
      destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
      outline: 'text-gray-950 border-gray-300'
    };
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';