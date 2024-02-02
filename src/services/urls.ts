const urls = {
  //physician
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
    physicianProfile: {
      url: "/PublicServices/PhysicianProfile/Page?url=",
      method: "GET",
      parametrs: {},
      query: {
        url: "physicianProfileUrl",
      },
    },
  },
  //login
  login: {
    sendPhone: {
      url: `/Public/Auth/SendCode`,
      method: "POST",
      parametrs: {
        input: {
          phoneNumber: "string",
        },
        captcha: {
          input: "string",
          key: "string",
        },
      },
      query: {},
    },
    sendOtp: {
      url: `/Public/Auth/VerifyCode`,
      method: "POST",
      parametrs: {
        verificationCode: "number",
        phoneVerificationCodeId: "string",
      },
      query: {},
    },
    signUp: {
      url: `/Public/Auth/Register`,
      method: "POST",
      parametrs: {
        nationalNumber: "string",
        gender: "string",
        cityId: "number",
        firstName: "string",
        lastName: "string",
        sessionId: "string",
      },
      query: {},
    },
    refreshToken: {
      url: "/Public/Auth/RefreshToken",
      method: "POST",
      parametrs: {
        refreshToken: "string",
      },
    },
  },
  //captcha
  captcha: {
    captcha: {
      url: `/Public/Captcha`,
      method: "GET",
      parametrs: {},
      query: {},
    },
  },
  //appointment
  appointment: {
    myAppointment: {
      url: "/User/UserPhysicianProfileCalendar/List",
      method: "POST",
      parametrs: {},
      query: {},
    },
    cancel: {
      url: "/User/UserPhysicianProfileCalendar/DeleteAppointment/",
      method: "POST",
      parametrs: {},
      query: {
        calendarId: "string",
        index: "number",
        physicianProfileUrl: "string",
      },
    },
    calendarPhysician: {
      url: "/PublicServices/PhysicianProfileCalendar/",
      method: "GET",
      parametrs: {},
      query: {
        physicianProfileUrl: "string",
      },
    },
    ramainingTime: {
      url: "/Public/GetCurrentDate/GetRamainingTime",
      method: "GET",
    },
    lockedAppointment: {
      url: "/User/UserPhysicianProfileCalendar/CheckAppointmentStatus/CheckAppointmentStatus",
      method: "POST",
      parametrs: {
        calendarId: "string",
        physicianProfileId: "string",
        index: "number",
      },
      query: {},
    },
    firstAppointment: {
      url: "/User/UserPhysicianProfileCalendar/GetFirstForce/GetFirstForce/",
      method: "POST",
      query: {
        physicianId: "string",
      },
    },
  },
  //favorite
  favorite: {
    getAll: {
      url: "/User/UserFavouritePhysicianProfile/List",
      method: "POST",
      parametrs: {
        pagedListInputDto: {
          pageNumber: "number",
          itemsCountPerPage: "number",
        },
      },
      query: {},
    },
    isFavorite: {
      url: "/User/UserFavouritePhysicianProfile/CheckIfPhysicianIsInFavouriteList/",
      method: "GET",
      parametrs: {},
      query: {
        profileId: "string",
      },
    },
    addFavorite: {
      url: "/User/UserFavouritePhysicianProfile",
      method: "POST",
      parametrs: {
        physicianProfileId: "string",
      },
      query: {},
    },
    deleteFavorite: {
      url: "/User/UserFavouritePhysicianProfile/",
      method: "DELETE",
      parametrs: {
        physicianProfileId: "string",
      },
      query: {
        physicianProfileId: "string",
      },
    },
  },

  //wallet
  wallet: {
    transctions: {
      url: "/User/PaymentHistory/List",
      method: "POST",
      parametrs: {
        pagedListInputDto: {
          pageNumber: 0,
          itemsCountPerPage: 0,
        },
      },
      query: {},
    },
  },

  //payment
  payment: {
    payment: {
      url: "/User/Payment/Payment",
      method: "POST",
      parametrs: {
        id: 0,
        amount: 0,
        paymentType: 0,
      },
      query: {},
    },
    createPaymentAppointment: {
      url: "/User/UserPhysicianProfileCalendar/Create",
      method: "POST",
      parametrs: {
        physicianProfileId: "string",
        calendarId: "string",
        index: "number",
        year: "number",
        month: "number",
        dayOfMonth: "number",
        dayOfWeek: "number",
      },
      query: {},
    },
  },

  //search
  search: {
    searchPrimary: {
      url: "/PublicServices/PhysicianProfile/Search",
      method: "POST",
      parametrs: {
        filter: "string",
        cityId: "number",
        provinceId: "number",
      },
      query: {},
    },
  },
  //provinces
  provinces: {
    provinces: {
      url: "/Public/Address/Provinces",
      method: "GET",
    },
    cities: {
      url: "/Public/Address/Cities?provinceId=",
      method: "GET",
    },
  },

  //price
  price: {
    getPrice: {
      url: "/Public/Captcha",
      method : "POST",
      parametrs : {}
    },
  },
};

export default urls;
