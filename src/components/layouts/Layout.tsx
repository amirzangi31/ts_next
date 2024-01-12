"use client"

import { ReactNode, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const Layout = ({ children }: { children: ReactNode }) => {
    const [query] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={query}>
            <Header />
            <main className='container py-4 min-h-[calc(100vh-26.5375rem)]'>
                {children}
            </main>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false } />
        </QueryClientProvider>
    )
}

export default Layout