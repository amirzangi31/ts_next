
import './globals.css'


import iranSans from '@utils/localFonts'

import Layout from '@layouts/Layout'

import StoreProvider from '@/providers/StoreProvider'
import { Suspense } from 'react'
import LoadingPage from './loading'



export const metadata = {

  title: 'آرناپ : نوبت دهی اینترنتی پزشکان | مشاوره و ویزیت آنلاین',
  description: 'با سامانه آنلاین آرناپ از جستجو و دریافت نوبت از پزشکان و کلینیک ها و درمانگاه ها و بیمارستان ها تا مشاوره و ویزیت آنلاین را داشته باشید',
  other: {
    author: "پلتفرم آنلاین آرناپ",
    rating: "Safe For Kids",
    index: "googlebot",
    "DC.creator": "پلتفرم آنلاین آرناپ",
    "DC.publisher": "پلتفرم آنلاین آرناپ",
    designer: "Design By Arenap Team  Co. Tel: 02191096760",
    copyright: "پلتفرم آنلاین آرناپ",
    "revisit-after": "3 Days",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آرناپ : نوبت دهی اینترنتی پزشکان | مشاوره و ویزیت آنلاین',
    description: 'با سامانه آنلاین آرناپ از جستجو و دریافت نوبت از پزشکان و کلینیک ها و درمانگاه ها و بیمارستان ها تا مشاوره و ویزیت آنلاین را داشته باشید',
    creator: 'arenap',
    images: ['https://dev.arenapp.ir/favicon.png'], // Must be an absolute URL
  },


  keywords: ["نوبت دهی آنلاین", " مدیریت مالی مطب", "مدیریت مطب آنلاین پزشک", " مدیریت کلینک، ثبت درمان"],
  icons: {
    icon: '/favIcon.png', // /public path
    apple: "/favIcon.png",
    ohter: {
      rel: 'apple-touch-icon',
      url: '/favicon.png',
      'og:site_name': 'سامانه مدیریت پزشکی آرناپ',
    },

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
