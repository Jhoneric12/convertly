'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'
import PrimaryButton from '../ui/buttons/PrimaryButton';
import UploadIcon from '../../assets/images/Upload.png'
import Image from 'next/image';

export default function FileUpload() {

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

        // const pdf = await response.json();
        const blob = await response.blob()
        const url = URL.createObjectURL(blob);

        if (response.statusText === 'Forbidden' || response.statusText == 'Unauthorized') {
            alert('The converter api reched its daily limit, try again later')
        }
        else {
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
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
        
    </>
  )
}
