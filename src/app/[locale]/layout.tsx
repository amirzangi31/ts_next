
import { useLocale } from 'next-intl'
import './globals.css'
import { notFound } from 'next/navigation'
import iranSans from '@utils/localFonts'
import { isRtlLang } from 'rtl-detect'


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
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

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body className={iranSans.className}>{children}</body>
    </html>
  )
}
