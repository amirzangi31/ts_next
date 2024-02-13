"use client"
import React, { useState } from 'react'
import cn from '@/utils/clsxFun'
import CloseButton from '@elements/CloseButton'
import ArrowLeft from '@icons/ArrowLeft'
import ButtonElement from '@elements/ButtonElement'
import { useRouter } from 'next/navigation'

const SearchSectionPrimary = (props : {showFilters : boolean , closeFilterHandler : () => void}) => {
    const [activeCard, setActiveCard] = useState<null | number>(0)
    const router = useRouter()
    const [titles ,setTitles] = useState({
        speciality : "تخصص"
    })
    const {showFilters , closeFilterHandler} = props

    const openFilterCard = (fitlerIndex: number | null) => {
        setActiveCard(fitlerIndex)
    }

    const radioButtonHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {

        
    }

    const genderContent = [
        { id: 1, value: "0", name: "فرقی نمیکند" },
        { id: 2, value: "1", name: "خانم" },
        { id: 3, value: "2", name: "آقا" },
    ]
    const plans = [
        { id: 1, value: "0", name: "همه پلن ها" },
        { id: 2, value: "1", name: "نوبت دهی اینترنتی" },
        { id: 3, value: "2", name: "مشاوره حضوری" },
        { id: 4, value: "3", name: "مشاوره متنی" },
        { id: 5, value: "4", name: "مشاوره تلفنی فوری" },
    ]


    return (
        <div className={
            cn(
                'fixed -top-full left-0 h-screen w-full  bg-white-200 p-4 bg-bg_content transition-all duration-300',
                "md:static md:h-auto md:w-[18.75rem] md:rounded-sm md:bg-white md:shadow-shadow_category",
                {
                    "top-0 z-[20]" : showFilters
                }
            )
        }>
            <div className='absolute top-4 left-4 md:hidden '>
                <CloseButton closeHanlder={closeFilterHandler} />
            </div>
            <div className='flex justify-between items-center gap-4 font-bold'>
                <p className='text-primary md:min-w-fit  w-full font-bold md:font-normal text-center md:text-right'>فیلتر ها</p>
                <button type='button' className='text-error hidden md:block min-w-fit' onClick={() => {
                    console.log("test")
                    router.push("/physicians")
                } } >حذف فیلترها</button>
            </div>
            <div className='grid grid-cols-1 gap-4 mt-6 md:mt-4'>
                <FilterCard title={titles.speciality} name='name_1' index={1} active={activeCard === 1} openHandler={openFilterCard} />
                {/* <FilterCard title='خدمات' name='name_2' index={2} active={activeCard === 2} openHandler={openFilterCard} /> */}
                {/* <FilterCard title='علائم' name='name_3' index={3} active={activeCard === 3} openHandler={openFilterCard} /> */}
                {/* <FilterCard title='بیماری' name='name_4' index={4} active={activeCard === 4} openHandler={openFilterCard} /> */}
                <FilterCardSecondary inputContent={genderContent} changeInputHandler={radioButtonHandler} title='جنسیت' name='name_5' index={5} active={activeCard === 5} openHandler={openFilterCard} />
                <FilterCardSecondary inputContent={plans} changeInputHandler={radioButtonHandler} title='پلن مشاوره' name='name_6' index={6} active={activeCard === 6} openHandler={openFilterCard} />
            </div>
            <div className='mt-4 grid md:grid-cols-1 grid-cols-2 gap-4'>
                <ButtonElement typeButton='primary' >اعمال فیلتر</ButtonElement>
                <div className='md:hidden'><ButtonElement typeButton='transparent'  >حذف فیلتر</ButtonElement></div>
            </div>
        </div>
    )
}

export default SearchSectionPrimary;


export type FilterCardProps = {
    openHandler: (filterIndex: number | null) => void,
    name: string,
    active: boolean,
    index: number,
    title: string
}

const FilterCard = (props: FilterCardProps) => {

    const { openHandler, active, name, index, title } = props


    return (
        <div className={cn(
            " rounded-sm shadow-shadow_category max-w-full cursor-pointer ",
            "bg-white p-5",
            "md:bg-gray-100 md:py-2 md:px-3 md:text-primary md:font-bold",
        )}
            id={name}
            onClick={() => {
                if (!active) {
                    openHandler(index)
                }
            }}
        >
            <div className={
                cn(
                    'flex justify-between items-center  relative ',
                    "after:absolute after:-right-5 md:after:-right-3 after:rounded-lg after:top-0 after:block after:bg-primary after:w-1 after:h-full"
                )
            }>
                <p>{title} <span className='text-gray-500 text-md'>(test)</span> </p>
                <span className={cn(
                    '', {
                    "-rotate-90": !active,
                    "rotate-90": active
                }
                )}><ArrowLeft /></span>
            </div>
            <div className={cn(
                ' mt-4 relative h-[9.375rem] cursor-auto',
                {
                    "hidden": !active
                }
            )}>
                <div className='bg-gray-100 md:bg-white h-[2.8125rem] md:h-auto rounded-3xl p-1'>
                    <input type="text" className='text-md text-black h-full px-2' placeholder='جستجو' />
                </div>
                <div className='h-[6.25rem] overflow-y-auto mt-2 bg-white rounded-sm p-1 text-md'>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                </div>
            </div>
        </div>
    )
}

export type FilterCardSecondaryProps = {
    openHandler: (filterIndex: number | null) => void,
    name: string,
    active: boolean,
    index: number,
    title: string,
    changeInputHandler: (e: React.ChangeEvent<HTMLInputElement> ) => void,
    inputContent: { id: number, value: number | string, name: string }[]
}

const FilterCardSecondary = (props: FilterCardSecondaryProps) => {
    const { openHandler, active, name, index, title, changeInputHandler, inputContent } = props
    const [titleState , setTitleState ] = useState("")
    return (
        <div className={cn(
            " rounded-sm shadow-shadow_category max-w-full cursor-pointer ",
            "bg-white p-5",
            "md:bg-gray-100 md:py-2 md:px-3 md:text-primary md:font-bold",
        )}
            id={name}
            onClick={() => {
                if (!active) {
                    openHandler(index)
                }
            }}
        >
            <div className={
                cn(
                    'flex justify-between items-center  relative ',
                    "after:absolute after:-right-5 md:after:-right-3 after:rounded-lg after:top-0 after:block after:bg-primary after:w-1 after:h-full"
                )
            }>
                <p>{title} <span className='text-md text-gray-500'>{titleState ? `(${titleState})` : ""}</span> </p>
                <span className={cn(
                    '', {
                    "-rotate-90": !active,
                    "rotate-90": active
                }
                )}><ArrowLeft /></span>
            </div>
            <div className={cn(
                ' mt-4 relative  cursor-auto',
                {
                    "hidden": !active
                }
            )}>
                <div className=' mt-2  rounded-sm   flex justify-start md:justify-between items-center flex-wrap gap-2 text-sm'>
                    {
                        inputContent.map(item => (
                            <label key={item.id} className='flex justify-start items-center  gap-2 cursor-pointer '>
                                <input onChange={(e) => {
                                    changeInputHandler(e )
                                    setTitleState(item.name)
                                }} hidden type="radio" name={name} className='bg-red-200 peer' value={item.value} />
                                <div className={cn(
                                    "size-5 rounded-full bg-gray-100 peer-checked:bg-primary md:bg-white md:peer-checked:bg-primary relative peer-checked:after:block",
                                    "after:absolute after:top-1 after:left-1 after:rounded-full after:bg-white md:after:bg-white after:hidden after:w-3 after:h-3"
                                )}>
                                </div>
                                <span>{item.name}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
