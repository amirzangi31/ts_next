import { deleteAppointment, getMyAppointment } from '@/services/appointments/appointment'
import { MyAppointmentType } from '@/types/appointment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'


const useMyAppointments = () => {

    const queryClient = useQueryClient()




    const { data, isLoading } = useQuery(["myAppointment"], async () => {
        const result = await getMyAppointment()
        return result
    }, { cacheTime: 5 * 60000 })



    const [futureAppointments, setFutureAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])

    const mutation = useMutation({
        mutationFn: async () => {

        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`myAppointment`],
            });

        },

    })


    type ParamsCancel = {
        calendarId: string,
        index: number,
        physicianProfileUrl: string
    }

    const cancelMutation = useMutation({
        mutationFn: async (params: ParamsCancel) => {
            console.log(params)
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`myAppointment`],
            });

        },

    })
    console.log(data)

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