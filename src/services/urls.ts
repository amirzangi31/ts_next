
const urls = {
  physician: {
    bestPhysician: {
      url: `/PublicServices/PhysicianProfile/TopRatedPhysicians`,
      method: "POST",
      parametrs: {
        pageNumber: "number",
        itemsCountPerPage: "number",
        cityId: "number",
        provinceId: "number",
      },
      query: {},
    },
  },
};

export default urls;
