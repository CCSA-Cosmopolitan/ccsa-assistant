"use client"
import React from 'react'
import { useTheme } from 'next-themes';
import { SignUp } from '@clerk/nextjs';

const SignUpForm = () => {

    const { theme } = useTheme();
  return (
    <div className="max-w-md w-full p-6 rounded-lg">
        <SignUp
                  appearance={{
                    variables: {
                      colorPrimary: '#22c55e', // green-500
                      colorBackground: '#ffffff',
                      colorText: '#111827', // gray-900
                      colorTextSecondary: '#4b5563', // gray-600
                      colorInputBackground: '#f9fafb', // gray-50
                      colorInputText: '#111827',
                      borderRadius: '0.5rem',

                    },
                    elements: {
                        socialButtonsIconButton__google: {
                            color: '#4285F4',
                            backgroundColor: theme === 'dark' ? '#000' : '#fff',
                            hoverBackgroundColor: theme === 'dark' ? '#000' : '#fff',
                            hoverColor: theme === 'dark' ? '#fff' : '#000',
                            // color: 'black',
                        },
                        input: {
                            borderColor: '#e5e7eb',
                            borderRadius: '0.5rem',
                            color: '#111827',
                        },
                        socialButtonsBlockButtonText: {
                            color: '#111827',
                        } ,
                      formButtonPrimary: 
                        'bg-green-500 hover:bg-green-600 text-white transition-colors',
                      card: 'shadow-none',
                      headerTitle: 'text-xl font-bold text-gray-900',
                      headerSubtitle: 'text-gray-600',
                    //   socialButtonsBlockButton: 
                    //     'border-2 border-gray-500  hover:border-green-500 transition-colors',
                    //   socialButtonsBlockButtonText: 'font-medium',
                    //   formFieldInput: 
                    //     'rounded-md border-gray-200 focus:border-green-500 focus:ring-green-500',
                      footer: 'hidden',
                    //   dividerLine: 'bg-gray-200',
                    //   dividerText: 'text-gray-500',
                    },
                    layout: {
                    //   socialButtonsPlacement: 'top',
                      logoPlacement: 'inside',
                      logoImageUrl: '', // Add your custom logo URL here
                    },
                  }}
                />
      </div>
  )
}

export default SignUpForm