import Toastify from '@elements/Toastify';
import { apiDomainNobat } from '@/services/getApiUrl';
import urls from '@/services/urls';
import axios from 'axios';


const useLogin = (isCallback: boolean = false, indexCallback: number = 0, callbacks: Function[] = []) => {

    const sendPhoneHandler = async (
        phoneNumber: string,
        captcha: string,
        key: string
    ) => {
        const obj = {
            input: {
                phoneNumber: phoneNumber,
            },
            captcha: {
                input: captcha,
                key,
            },
        };

        try {
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.sendPhone.url}`,
                obj
            );
            const data = res.data;
            return data;
        } catch (error: any) {
            Toastify("error", error.response.data.resultMessage);
        }
    };


    const sendOtpHandler = async (verificationCode: number, phoneVerificationCodeId: string) => {
        const obj = {
            verificationCode,
            phoneVerificationCodeId
        };
        try {
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.sendOtp.url}`,
                obj
            );
            const data = res.data;

            if (data.resultCode !== 1200 && isCallback) {
                callbacks[indexCallback]()
            }
            return data;
        } catch (error: any) {
            Toastify("error", error.response.data.resultMessage);
        }
    }

    const signUpHandler = async (
        nationalNumber: string,
        gender: string,
        cityId: number,
        firstName: string,
        lastName: string,
        sessionId: string,
    ) => {
        const obj = {
            nationalNumber,
            gender,
            cityId,
            firstName,
            lastName,
            sessionId,
        };
        try {
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.signUp.url}`,
                obj
            );
            const data = res.data;
            if (isCallback) {
                callbacks[indexCallback]()
            }
            return data;
        } catch (error: any) {
            Toastify("error", error.response.data.resultMessage);
        }
    }


    return { sendPhoneHandler, sendOtpHandler, signUpHandler }
}

export default useLogin