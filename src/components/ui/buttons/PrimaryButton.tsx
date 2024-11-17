import React from 'react'
import { ButtonProps } from '@/types/components/ButtonProps'

export default function PrimaryButton({ title, onClick, type }: ButtonProps) {
  return (
    <button className='bg-main-color text-white px-8 py-2 rounded-lg text-sm font-medium hover:opacity-90' type={type} onClick={ onClick }>
        { title }
    </button>
  )
}
