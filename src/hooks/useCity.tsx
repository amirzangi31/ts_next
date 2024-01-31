"use client"
import { getCities, getProvinces } from '@/services/provicesandcity/province'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useCookies } from 'react-cookie'


const useCity = () => {
    const queryClient = useQueryClient();
    const [step, setStep] = useState<1 | 2>(1)
    const [cookies, setCookie, removeCookie] = useCookies(['cityInfo']);
    const [provinceInfo, setProvinceInfo] = useState({
        provinceId: 0,
        provinceName: ""
    })
    const [cityName, setCityName] = useState(cookies.cityInfo ? cookies.cityInfo.cityName : "انتخاب شهر" )


    const getProvincesHandler = async () => {
        const res = await getProvinces()
        return res
    }
    

    const provice = useQuery(["provinces"], getProvincesHandler, { cacheTime: 1000 * 60 * 10 })

    const cities = useMutation({
        mutationFn: async ({ provinceId, provinceName }: { provinceId: number, provinceName: string }) => {
            const result = await getCities(provinceId)
            setProvinceInfo({
                provinceId,
                provinceName
            })
            setStep(2)
            return result
        },

    })

    const setCityHandler = (cityName: string, cityId: number) => {
        setCookie("cityInfo", {
            cityName,
            provinceName : provinceInfo.provinceName,
            cityId,
            provinceId : provinceInfo.provinceId,
        }, { path: "/" })
        setCityName(cityName)
    }


    const priviousHandler = () => {
        setStep(1)
    }

    const setAllProvince = () => {
        setCityName("انتخاب شهر")

    }

    const changeStep = () => {
        
    }
    return {
        provinces: provice.isLoading ? [] : provice.data.value,
        isLoadingProvince: provice.isLoading,
        step,
        cities,
        priviousHandler,
        cityName,
        setCityHandler
    }
}

export default useCity