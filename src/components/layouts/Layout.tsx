import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main className='container py-4'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout