import { http } from "../axios"
import { apiDomainNobat } from "../getApiUrl"
import urls from "../urls"



// const createAppointment = async (physicianId, calendarId, index) => {

//     try {
//         const data = {
//             physicianProfileId: physicianId,
//             calendarId,
//             index
//         }

//         const res = await http.post(`${apiDomainNobat}/User/UserPhysicianProfileCalendar/Create`, data)
//         return res.data.value
//     } catch (error) {

//         return error
//     }
// }


const createPayment = async (id: number, amount: number, paymentType: number = 1) => {

    try {
        const data = {
            id,
            amount,
            paymentType
        }
        const res = await http.post(`${apiDomainNobat}${urls.payment.payment.url}`, data)
        return res?.data

    } catch (error: any) {

        if (error.response?.status === 400) {
            return
        }
        return error
    }



}

export { createPayment }