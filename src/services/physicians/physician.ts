import urls from "../urls";
import { apiDomainNobat } from "../getApiUrlServer";


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
    const res = await fetch(
      `${apiDomainNobat}${urls.physician.bestPhysician.url}`,
      {
        method: urls.physician.bestPhysician.method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 * 60 * 24 * 7 } //one week ,
      }
    );
    const result = await res.json();
    return result.value.items;
  } catch (error) {
    console.log(error);
  }
};

export { getBestPhysician };
