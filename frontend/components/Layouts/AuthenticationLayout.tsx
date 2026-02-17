import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AuthenticationProps {
    children: React.ReactNode;
    title?: React.ReactElement;
    subtitle?: string;
    image?: string;
    className?: string;
};

const AuthenticationLayout: React.FC<AuthenticationProps> = ({
    children,
    title = <>Sign in</>,
    subtitle,
    image = 'authentication',
    className = '',
}) => {
    return (
        <div className={twMerge(`grid grid-cols-2 items-center justify-center min-h-screen w-screen bg-gray-100 ${className}`)}>
            <div className='flex flex-col w-full h-full items-center justify-center'>
                <header className='flex flex-col w-[55%] text-left mb-5'>
                    <h1 className='text-h1-large font-bold'>{title}</h1>
                    {subtitle && (
                        <p className='mt-2 text-gray-600 text-sm'>
                            {subtitle}
                        </p>
                    )}
                </header>

                <main className='bg-white rounded-lg p-6 shadow-md w-[55%]'>
                   {children}
                </main>

                <footer className='text-center mt-4 text-gray-400 text-sm'>
                    © {new Date().getFullYear()}
                </footer>
            </div>
            <div className='flex items-center justify-center bg-primary h-full w-full'>
                <img src={`../src/assets/images/${image}.svg`} alt={image} className='object-cover' />
            </div>
        </div>
    );
};

export default AuthenticationLayout;