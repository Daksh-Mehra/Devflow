"use client"
import Image from 'next/image'
import { Input } from '../ui/input'
import {  useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';


interface Props {
route: string;
imgSrc: string;
placeholder: string;
otherClasses?: string;
}
const LocalSearch = ({imgSrc,placeholder,otherClasses,route}:Props) => {

    const router=useRouter()

    const searchParams=useSearchParams();
    const query=searchParams.get('query');
    const pathname=usePathname()
    
    const [search, setsearch] = useState(query || '');
    const previousSearchRef = useRef(search);
    

    useEffect(() => {
        if (previousSearchRef.current === search) return;

    previousSearchRef.current = search;

    const delayDebounceFn=setTimeout(()=>{

        if(search){
            
            const newUrl=formUrlQuery({params:searchParams.toString(),key:'query',value:search})
            
            router.push(newUrl,{scroll:false})
        }
        else{
            if(pathname===route){
                const newUrl=removeKeysFromUrlQuery({params:searchParams.toString(),keysToRemove:['query']})
                
                router.push(newUrl,{scroll:false})
            }
            
        }
    },300);
    return () => clearTimeout(delayDebounceFn);
        
    },[search,router,searchParams,route])
  return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4
    ${otherClasses}`}>

        <Image
        src={imgSrc}
        width={24}
        height={24}
        alt='Search'
        className='cursor-pointer'
        />
        <Input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e)=>setsearch(e.target.value)}  
            className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-hidden'     
        ></Input>
    </div>
  )
}

export default LocalSearch