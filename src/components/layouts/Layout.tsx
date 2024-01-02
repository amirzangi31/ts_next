import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main className='container py-4 min-h-[calc(100vh-26.5375rem)]'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout