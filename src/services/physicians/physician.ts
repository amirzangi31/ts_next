import axios from "axios";
import urls from "../urls";

const getBestPhysician = async (
  provinceId: number,
  cityId: number,
  pageNumber: number,
  itemsCountPerPage: number
) => {
  const data = {
    cityId,
    provinceId,
    pageNumber,
    itemsCountPerPage,
  };
  try {
    const res = await axios.post(urls.physician.bestPhysician.url, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getBestPhysician };
