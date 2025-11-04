import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: Props) => (
    <button  disabled={disabled}
      className='cursor-pointer uppercase text-sm font-semibold bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded disabled:bg-slate-100 disabled:hover:bg-slate-100 disabled:cursor-not-allowed' onClick={onClick} >
        {children}
    </button>
)

export default Button
