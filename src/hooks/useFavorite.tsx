import { getAllFavorite } from '@/services/favorite/favorite'
import { useQuery } from '@tanstack/react-query'


const useFavorite = () => {

    const { data, isLoading } = useQuery(["myFavorite"], async () => {
        const result = await getAllFavorite()
        return result
    }, { cacheTime: 5 * 60000 })


    return {
        myFavorite: data,
        isLoading,
    }
}

export default useFavorite