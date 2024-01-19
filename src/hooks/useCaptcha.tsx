import { getCaptcha } from '@/services/captcha/captcha'
import React, { useEffect, useState } from 'react'

const useCaptcha = () => {
    const [captcha, setCaptcha] = useState("")
    const [key, setKey] = useState("")
    const [loading, setLoading] = useState(true)

    const getCaptchaApi = async () => {
        setLoading(true)
        const captcha = await getCaptcha()
        
        setCaptcha(captcha.captchaBase64Data)
        setKey(captcha.key)
        setLoading(false)
    }

    


    useEffect(() => {
        getCaptchaApi()
    }, [])


    return { captcha, key, loading, resetCaptcha: getCaptchaApi }
}

export default useCaptcha