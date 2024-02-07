import React from 'react'
import SearchSectionPrimary from '../modules/search/SearchSectionPrimary'
import LinkElement from '../elements/LinkElement'
import ChnageCityButton from '../elements/ChangeCityButton'

const PhysiciansPage = () => {
    return (
        <>
            {/* ----------section------------- */}
            {/* serach component */}
            <section className='py-4'>
                <div className='h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative '>
                    <input className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full  md:z-[15]' placeholder='نام پزشک، تخصص ...' />
                    <ChnageCityButton /> 
                </div>
            </section>
            {/* ----------section------------- */}

            {/* ----------header------------- */}
            {/* header */}
            <header className='w-full rounded-sm shadow-shadow_category bg-white p-4'>
                <h1 className='text-xl font-bold text-center' >پزشکان <LinkElement link='/' className='font-bold text-primary underline'>بیمارهای قلبی</LinkElement> برتر استان <LinkElement link='physicians/city/kerman' className='font-bold text-primary underline'>کرمان</LinkElement> در آرناپ</h1>
            </header>
            {/* ----------header------------- */}

            {/* ----------main------------- */}
            <main className='flex justify-between items-start gap-4 mt-4'>

                {/* ----------section------------- */}
                {/* search section */}
                <section>
                    <SearchSectionPrimary />
                </section>
                {/* ----------section------------- */}

                {/* ----------section------------- */}
                {/* Search content */}
                <section className='w-full'>
                   <div className='flex justify-start items-center w-full text-md p-2 bg-white rounded-sm min-h-[2.8125rem]'>
                    <p className='font-bold text-primary'>نتایج فیلتر : </p>

                   </div>
                </section>
                {/* ----------section------------- */}
            </main>
            {/* ----------main------------- */}
        </>
    )
}

export default PhysiciansPage