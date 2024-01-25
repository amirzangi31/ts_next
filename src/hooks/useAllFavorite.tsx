import { addFavorite, deleteFavorite, getAllFavorite, isFavorite } from '@/services/favorite/favorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const useAllFavorite = () => {

    const allFavorite = useQuery(["myFavorite"], async () => {

        const result = await getAllFavorite()
        return result

    }, { cacheTime: 5 * 60000 })



    return {
        myFavorite: allFavorite?.data,
        isLoading: allFavorite?.isLoading,
    }
}

export default useAllFavorite