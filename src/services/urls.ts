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
};

export default urls;
