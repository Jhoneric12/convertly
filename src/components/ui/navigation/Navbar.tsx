'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../assets/images/converly-logo.png'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const handleNavbar = () => {
        setIsOpen(!isOpen)
    }

  return (
    <>
        <nav className='px-2 md:px-10 border border-b-gray-200 z-10 absolute w-full'>
            <div className='flex gap-4 items-center hover:cursor-default relative justify-between z-20'>
                <div className='flex gap-2 items-center py-4'>
                    <Image src={Logo} alt='Convertly Logo' className='w-10 h-6'/>
                    <h1 className='font-bold text-accent-color text-sm md:text-base'>Convertly.</h1>
                </div>
                <div className='hover:cursor-default focus:cursor-default w-[5rem] absolute left-[8rem] md:left-[10rem] flex items-center justify-center h-full border-b-2 border-main-color'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-main-color text-xs md:text-sm font-medium'>All Tools</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-main-color font-bold">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <div onClick={handleNavbar} className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className='gap-10 hidden lg:flex'>
                    <SecondaryButton title='Log in'/>
                    <PrimaryButton title='Free Trial'/>
                </div>
            </div>
        </nav>
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div 
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className={'absolute h-screen gap-4 w-full items-center bg-page-color z-20 shadow-sm'}
                    >
                        <div className='flex h-screen justify-center relative'>
                            <div className='flex flex-col items-center gap-4 py-20'>
                                <SecondaryButton title='Log in'/>
                                <PrimaryButton title='Free Trial'/>
                                <svg onClick={handleNavbar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 absolute top-5 right-3 md:top-7 md:right-11 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    </>
  )
}
