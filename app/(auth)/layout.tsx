import SocialAuthForm from '@/components/forms/SocialAuthForm'
import Image from 'next/image'
import React from 'react'
import { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-cover bg-center bg-auth-light dark:bg-auth-dark px-4 py-10'>

      <section className='light-border background-light800_dark200 shadow-light100_dark100 px-4 py-10 border min-w-full shadow-md sm:min-w-[520px] sm:px-8 round-[10px]'>
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Join DevFlow</h1>
            <p className="paragraph-regular text-dark500_light400">
              To get your questions answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt="DevFlow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
 
        {children}

        <SocialAuthForm/>
      </section>
    </main>
    

  )
}

export default AuthLayout