import React from 'react'
import FileUpload from '../file-upload/FileUpload'

export default function Hero() {
  return (
    <section className='min-h-screen flex justify-center items-center px-2'>
        <div className='flex flex-col gap-4 text-center w-full md:w-[40rem] lg:w-[60rem]'>
            <div>
                <h1 className='text-text-color text-lg md:text-2xl mb-1'>Word to PDF Converter</h1>
                <p className='text-text-color font-light md:text-lg'>
                    Easily convert your Word documents to PDF format. 
                    Our Word to PDF Converter preserves formatting and ensures compatibility across devices.
                </p>
            </div>
            <div>
              <FileUpload/>
            </div>
        </div>
    </section>
  )
}
