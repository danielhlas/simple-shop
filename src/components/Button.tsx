import { ReactNode } from 'react';


type Props = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color: "grey" | "blue";
  fullWidth?: boolean;
};

function Button({children, onClick, disabled, color, fullWidth}: Props) {
const colorMap = {
  grey: 'bg-gray-200 hover:bg-gray-300 text-black',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white',
}

  return (
    <button  disabled={disabled}
    className={`cursor-pointer text-sm font-semibold py-2 px-4 rounded-lg disabled:text-black disabled:bg-slate-100 disabled:hover:bg-slate-100 disabled:cursor-not-allowed ${colorMap[color]} ${ fullWidth ? 'w-full' : '' }`}
    onClick={onClick} >
        {children}
    </button>
    
)}

export default Button
