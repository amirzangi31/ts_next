"use client"
import { getCities, getProvinces } from '@/services/provicesandcity/province'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'


const useCity = () => {
    const queryClient = useQueryClient();
    const [step, setStep] = useState<1 | 2>(1)
    const [isLoadingCity, setIsLoadingCity] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['cityInfo']);
    const [provinceInfo, setProvinceInfo] = useState({
        provinceId: 0,
        provinceName: ""
    })
    const [cityName, setCityName] = useState("انتخاب شهر")
  

    const getProvincesHandler = async () => {
        const res = await getProvinces()
        return res
    }


    const province = useQuery(["provinces"], getProvincesHandler, { cacheTime: 1000 * 60 * 10 , staleTime : 1000 * 60 * 10  })

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
            provinceName: provinceInfo.provinceName,
            cityId,
            provinceId: provinceInfo.provinceId,
        }, { path: "/" })
        localStorage.setItem("cityInfo", JSON.stringify({
            cityName,
            provinceName: provinceInfo.provinceName,
            cityId,
            provinceId: provinceInfo.provinceId,
        }))

        setCityName(cityName)
    }

    useEffect(() => {
        const cityInfoLocal = localStorage.getItem("cityInfo")
        
        if (typeof cityInfoLocal === "string") {
            let cityInfo = JSON.parse(cityInfoLocal)
            setCityName(cityInfo?.cityName ? cityInfo.cityName : "انتخاب شهر")
        }
        setIsLoadingCity(false)

        return () => {
            setIsLoadingCity(true)
        }
    }, [])




    const priviousHandler = () => {
        setStep(1)
    }

    const setAllProvince = () => {
        setCityName("انتخاب شهر")
        localStorage.removeItem("cityInfo")
        removeCookie("cityInfo", { path: "/" })
    }


    return {
        provinces: province.isLoading ? [] : province?.data?.value,
        isLoadingProvince: province.isLoading,
        step,
        cities,
        priviousHandler,
        cityName,
        setCityHandler,
        isLoadingCity,
        setAllProvince,
    }
}

export default useCity