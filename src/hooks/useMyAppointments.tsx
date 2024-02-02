import Toastify from '@/components/elements/toasts/Toastify'
import { deleteAppointment, getMyAppointment } from '@/services/appointments/appointment'
import { MyAppointmentType } from '@/types/appointment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'


const useMyAppointments = () => {

    const queryClient = useQueryClient()




    const { data, isLoading } = useQuery(["myAppointment"], async () => {
        const result = await getMyAppointment()
        return result
    } , {cacheTime : 0})



    const [futureAppointments, setFutureAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])

 


    type ParamsCancel = {
        calendarId: string,
        index: number,
        physicianProfileUrl: string
    }

    const cancelMutation = useMutation({
        mutationFn: async (params: ParamsCancel) => {
            const res = await deleteAppointment(params.calendarId, params.index, params.physicianProfileUrl)
            if (res.resultCode === 200) {
                Toastify("error", "نوبت با موفقیت لغو شد")
            }
            return res
        },
        onSuccess: async () => {
            console.log("test")
            const result = await queryClient.invalidateQueries({
                queryKey: [`myAppointment`],
            });

        },

    })

    useEffect(() => {
        if (!isLoading) {
            setFutureAppointments(data?.value?.items.filter((item: MyAppointmentType) => item.passedOrFuture !== "Passed"))
            setPastAppointments(data?.value?.items.filter((item: MyAppointmentType) => item.passedOrFuture === "Passed"))
        }
    }, [isLoading])


    return {
        myAppointments: data?.value?.items,
        futureAppointments,
        pastAppointments,
        isLoading,
        cancelMutation
    }
}

export default useMyAppointments