
import './globals.css'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import iranSans from '@utils/localFonts'
import { isRtlLang } from 'rtl-detect'
import Layout from '@layouts/Layout'
import { NextIntlClientProvider } from 'next-intl'


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
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const local = useLocale()
  const isRtl = isRtlLang(local)

  if (locale !== local) {
    notFound()
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} >
      <body className={iranSans.className} data-theme="Arenap_theme">
        <NextIntlClientProvider locale={local} messages={messages}>
          <Layout>
            {children}
          </Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
