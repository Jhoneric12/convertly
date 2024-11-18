'use client'

import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PrimaryButton from '../ui/buttons/PrimaryButton';
import UploadIcon from '../../assets/images/Upload.png'
import Image from 'next/image';

export default function FileUpload() {

    const [isLoading, setIsLoading] = useState(false)

    const { acceptedFiles, getRootProps, getInputProps, open, fileRejections } = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li className='text-red-500 text-sm' key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
    ));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const form = new FormData();
            acceptedFiles.forEach((file) => {
                form.append('file', file);
            });

            const response = await fetch('https://api.apyhub.com/convert/word-file/pdf-file?output=test-sample.pdf&landscape=false', {
                method: 'POST',
                headers: {
                    'apy-token': process.env.NEXT_PUBLIC_APY_TOKEN as string,
                    // 'content-type': 'multipart/form-data'
                },
                body: form
            });

            console.log(response)

            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                  alert("The converter API reached its daily limit. Please try again later.");
                } else {
                  alert(`Error: ${response.statusText}`);
                }
                return;
              }
          
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "converted.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
          
              URL.revokeObjectURL(url);
        }
        catch (errors) {
            alert(`An error occurd when converting the document: ${errors}`)
        }
        finally {
            setIsLoading(false);
        }
    }

  return (
    <>
        <div className='bg-main-color rounded-lg p-3'>
            <div {...getRootProps({ className: 'dropzone border border-dashed border-gray-200 py-10 px-1 rounded-lg bg-[#C496EF]' })}>
                <input {...getInputProps()}/>
                <div className='flex items-center flex-col gap-2'>
                    <Image src={UploadIcon} alt='Upload icon'/>
                    <PrimaryButton title='Select File' onClick={open}/>
                    <p className='text-white text-sm md:text-base mt-2'>or drop file here</p>
                    <ul>
                        {
                            acceptedFiles.map((file) => (
                                <li className='text-sm text-left text-green-200 font-bold' key={file.path}>
                                    {file.path} - {file.size} bytes
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        <ul className='mt-4 mb-4'>{fileRejectionItems}</ul>
        {
            acceptedFiles.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <PrimaryButton title='Convert' type='submit'/>
                </form>
            )
        }

        {
            isLoading && (
                <div className='absolute inset-0 bg-loading-color z-50'>
                    <div className='flex min-h-screen justify-center items-center'>
                        <h1 className='text-text-color font-bold text-lg'>Converting......</h1>
                    </div>
                </div>
            )
        }
        
    </>
  )
}
