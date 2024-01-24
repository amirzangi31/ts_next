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
      parametrs: {

      },
      query: {
        calendarId: "string",
        index: "number",
        physicianProfileUrl: "string",
      },

    }
  },
  //favorite 
  favorite: {
    getAll: {
      url: "/User/UserFavouritePhysicianProfile/List",
      method: "POST",
      parametrs: {
        input: {
          cityId: "number",
          provinceId: "number",
          physicianSpecialityIds: "number",
          filter: "string"
        },
        pagedListInputDto: {
          pageNumber: "number",
          itemsCountPerPage: "number"
        }
      },
      query: {},
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
          itemsCountPerPage: 0
        }
      },
      query: {}
    }
  },

  //payment 
  payment: {
    payment: {
      url: "/User/Payment/Payment",
      method: "POST",
      parametrs: {
        id: 0,
        amount: 0,
        paymentType: 0
      },
      query: {}
    }
  }
};

export default urls;


