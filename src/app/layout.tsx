
import './globals.css'


import iranSans from '@utils/localFonts'

import Layout from '@layouts/Layout'

import StoreProvider from '@/providers/StoreProvider'
import { Suspense } from 'react'
import LoadingPage from './loading'


export const metadata = {

  title: 'نرم افزار مدیریت مطب|مدیریت کلینیک|نوبت دهی آنلاین آرناپ ',
  description: 'بهترین نرم افزار مدیریت مطب آنلاین پزشک و مدیریت کلینک، نوبت دهی آنلاین از طریق اپلیکیشن موبایل، ثبت درمان و ایجاد پرونده الکترونیک با سرعت بالا توسط پزشک، ثبت پرونده الکترونیک سلامت، مدیریت مالی مطب، جستجوی پزشکان، نوبتدهی اینترنتی و تلفنی آرناپ',
  other: {
    author: "طراحان سیستم پنام",
    rating: "Safe For Kids",
    index: "googlebot",
    "DC.creator": "طراحان سیستم پنام",
    "DC.publisher": "طراحان سیستم پنام",
    designer: "Design By Penam system designers  Co. Tel: 03432467009",
    copyright: "طراحان سیستم پنام",
    "revisit-after": "3 Days",
  },
  keywords: ["نوبت دهی آنلاین", " مدیریت مالی مطب", "مدیریت مطب آنلاین پزشک", " مدیریت کلینک، ثبت درمان"],
  icons: {
    icon: '/favIcon.png', // /public path
    ohter: {
      'og:site_name': 'سامانه مدیریت پزشکی آرناپ',
    }
  },


}

export default async function RootLayout({
  children,

}: {
  children: React.ReactNode,

}) {




  return (
    <html lang='fa' dir='rtl' >
      <body className={iranSans.className} data-theme="Arenap_theme">

        <Suspense fallback={<LoadingPage />}>
          <StoreProvider>
            <Layout>
              {children}
            </Layout>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  )
}