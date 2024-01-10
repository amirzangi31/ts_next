"use client"
import Image from 'next/image'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import LinkElement from '@elements/LinkElement'
import ButtonElement from '@elements/ButtonElement'


const Header = () => {
  const t = useTranslations("header")
  const pathName = usePathname()

  return (
    <header className='  bg-primary min-h-[5rem] md:flex  justify-center items-center'>
      <div className="container py-2 hidden md:block">
        <div className='flex items-center w-full '>

          {/* Logo */}
          <LinkElement link='/' prefetch={true} >
            <Image src={"/Logo.png"} width={1000} height={1000} alt='Logo website' className='w-[1.875rem]' />
          </LinkElement>
          {/* Navbar */}
          <nav className='rtl:mr-4 ltr:ml-4 flex-1 ' >
            <ul className='flex justify-start items-center gap-3 text-white  w-full'>
              <li>
                <LinkElement link="/">

                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/' && pathName !== "/en" ? "primary" : pathName === '/' || pathName === "/en" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='w-[7rem]'
                  >
                    {t("home")}
                  </ButtonElement>

                </LinkElement>
              </li>
              <li>
                <LinkElement link="/blog">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/blog' && pathName !== "/en/blog" ? "primary" : pathName === '/blog' || pathName === "/en/blog" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='w-[7rem]'
                  >
                    {t("blog")}
                  </ButtonElement>
                </LinkElement>
              </li>
              <li>
                <LinkElement link="/search">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/search' && pathName !== "/en/search" ? "primary" : pathName === '/search' || pathName === "/en/search" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='w-[7rem]'
                  >
                    {t("search")}
                  </ButtonElement>
                </LinkElement>
              </li>
              <li className='rtl:mr-auto ltr:ml-auto'>
                <LinkElement link="/profile">
                  <ButtonElement type={"button"}
                    typeButton={"secondary"}
                    size={"sm"}
                    variant='contained'
                    width='w-[7rem]'
                  >
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