"use client"

import { usePathname } from 'next/navigation'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import ButtonElement from '../elements/ButtonElement'
import cn from '@/utils/clsxFun'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations("header")

  const pathName = usePathname()

  return (
    <header className='hidden  bg-primary min-h-[5rem] md:flex  justify-center items-center'>
      <div className="container py-2 ">
        <div className='flex items-center w-full '>
          <LinkElement link='/' prefetch={true} >
            <Image src={"/Logo.png"} width={1000} height={1000} alt='Logo website' className='w-[1.875rem]' />
          </LinkElement>
          <nav className='rtl:mr-4 ltr:ml-4 flex-1 ' >
            <ul className='flex justify-start items-center gap-3 text-white  w-full'>
              <li>
                <LinkElement link="/">

                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/' && pathName !== "/en" ? "primary" : pathName === '/' || pathName === "/en" ? "gray" : undefined}


                    size={"sm"} >
                    {t("home")}
                  </ButtonElement>

                </LinkElement>
              </li>
              <li>
                <LinkElement link="/blog">

                  <ButtonElement type={"button"} bgColor={cn(``, { "bg-primary": !pathName.startsWith("/blog") && !pathName.startsWith("/en/blog"), "bg-primary-light": pathName.startsWith("/blog") || pathName.startsWith("/en/blog") })} size={"sm"} >
                    {t("blog")}
                  </ButtonElement>

                </LinkElement>
              </li>
              <li>
                <LinkElement link="/search">

                  <ButtonElement type={"button"} bgColor={cn(``, { "bg-primary": !pathName.startsWith("/search") && !pathName.startsWith("/en/search"), "bg-primary-light": pathName.startsWith("/search") || pathName.startsWith("/en/search") })} size={"sm"} >
                    {t("search")}
                  </ButtonElement>

                </LinkElement>
              </li>
              <li className='rtl:mr-auto ltr:ml-auto'>
                <LinkElement link="/profile">

                  <ButtonElement type={"button"} bgColor={"bg-white"} size={"sm"} textColor='text-primary' width='w-[11.25rem]' border='border-red-200' hover='hover:bg-primary hover:border-white hover:text-white
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    '>
                    {t("profile")}
                  </ButtonElement>

                </LinkElement>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header