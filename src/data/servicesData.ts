export type ServicesDataType = {
      id : number,
      title : string,
      image : string,
      disabled : boolean,
      link : string
}
const servicesData : ServicesDataType[] = [
    
      {
            id : 2 ,
            title : "نوبت دهی پزشکان",
            link :"physicians",
            image : "/services_2.png",
            disabled : false
      },
      {
            id : 1 ,
            title : "پنل پزشکان",
            link :"/dr.arenap.ir/Dashboard",
            image : "/services_1.png",
            disabled : false
      },
      {
            id : 3 ,
            title : "مشاوره آنلاین",
            link :"physician",
            image : "/services_3.png",
            disabled : true
      },
      {
            id : 4 ,
            title : "نوبت دهی کلینیک ها",
            link :"physician",
            image : "/services_4.png",
            disabled : true
      },
]
export default servicesData