import { addFavorite, deleteFavorite, getAllFavorite, isFavorite } from '@/services/favorite/favorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const useFavorite = (physicianProfileId: string) => {
    const queryClient = useQueryClient();


    const userFavorite = useQuery(["userFavorite"], async () => {
        const result = await isFavorite(physicianProfileId)
        return result
    })

    const addFavoriteHandler = useMutation({
        mutationFn: async () => {

            const result = await addFavorite(physicianProfileId)

            return result
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`userFavorite`],
            });

        },
    })
    const deleteFavoriteHandler = useMutation({
        mutationFn: async () => {

            const result = await deleteFavorite(physicianProfileId)

            return result
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`userFavorite`],

            });

        },
    })

    return {
        // myFavorite: allFavorite?.data,
        // isLoading: allFavorite?.isLoading,
        userFavorite: userFavorite?.data?.isFavorite,
        isLodingUserFavorite: userFavorite.isLoading,
        addFavorite: addFavoriteHandler?.mutate,
        deleteFavorite: deleteFavoriteHandler?.mutate
    }
}

export default useFavorite