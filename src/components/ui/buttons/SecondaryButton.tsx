import React from 'react'
import { ButtonProps } from '@/types/components/ButtonProps'

export default function SecondaryButton({ title, onClick } : ButtonProps) {
  return (
    <button onClick={ onClick } className='text-center hover:opacity-50 text-sm text-main-color py-1 font-medium'>
        { title }
    </button>
  )
}
