import { getMyAppointment } from '@/services/appointments/appointment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const useMyAppointments = () => {

    const queryClient = useQueryClient()


    const { data, isLoading } = useQuery(["myAppointment"], async () => {
        const result = await getMyAppointment()
        return result
    }, { cacheTime: 5 * 60000 })


    const mutation = useMutation({
        mutationFn: async () => {

        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`myAppointment`],
            });

        },

    })

    return {
        myAppointments: data,
        isLoading,
        
    }
}

export default useMyAppointments