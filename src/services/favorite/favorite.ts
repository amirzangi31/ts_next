import Toastify from "@/components/elements/Toastify"
import { apiDomainNobat } from "../getApiUrl"
import { http } from "../axios"

const getAllFavorite = async () => {
    const dataObj = {
        input: {
            cityId: 0,
            provinceId: 0,
            physicianSpecialityIds: 0,
            filter: ""
        },
        pagedListInputDto: {
            pageNumber: 1,
            itemsCountPerPage: 200
        }
    }

    try {
        const { status, data } = await http.post(`${apiDomainNobat}`, dataObj)
        if (status === 200) {
            return data?.value
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status) {
                Toastify("error", error.response.data.resultMessage)
            }
        }
    }
}



export { getAllFavorite }
