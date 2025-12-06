import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color?: "grey" | "blue" | "danger" | "gradient"; // Added gradient for primary actions
  fullWidth?: boolean;
  className?: string; // Allow custom classes override
};

function Button({ children, onClick, disabled, color = "blue", fullWidth, className = "" }: Props) {
  const colorMap = {
    grey: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 shadow-sm',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg shadow-blue-500/20',
  };

  return (
    <button
      disabled={disabled}
      className={`
        cursor-pointer 
        text-sm font-medium 
        py-2.5 px-5 
        rounded-xl 
        transition-all duration-300 ease-out active:scale-95
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${colorMap[color]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
