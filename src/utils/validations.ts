import * as Yup from "yup";
import {
  phoneNumberValidator,
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";

const sendPhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("شماره همراه الزامی میباشد")
    .min(11, "شماره همراه باید 11 رقم باشد")
    .max(11, "شماره همراه نباید بیشتر از 11 رقم باشد")
    .test("phoneValidation", "شماره همراه معتبر وارد کنید", (value) =>
      phoneNumberValidator(value)
    ),
  captcha: Yup.string().required("کد امنیتی الزامی میباشد"),
});
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required(" نام الزامی میباشد"),
  lastName: Yup.string().required(" نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string().required(" کدملی الزامی میباشد").test("validation_nationalCode", "کدملی معتبر وارد کنید", (value: any): any => {
    const result = verifyIranianNationalId(value)
    return result
  })
});
const signUpCitizensSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی میباشد"),
  lastName: Yup.string().required("نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string().required("کد اتباع الزامی میباشد").min(11 , "کد معتبر وارد کنید").max(11 , "کد معتبر وارد کنید   ")
});

const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی میباشد"),
  lastName: Yup.string().required(" نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string().required(" کدملی الزامی میباشد").test("validation_nationalCode", "کدملی معتبر وارد کنید", (value: any): any => {
    const result = verifyIranianNationalId(value)
    return result
  }),
  phoneNumber: Yup.string()
    .required("شماره همراه الزامی میباشد")
    .min(11, "شماره همراه باید 11 رقم باشد")
    .max(11, "شماره همراه نباید بیشتر از 11 رقم باشد")
    .test("phoneValidation", "شماره همراه معتبر وارد کنید", (value) =>
      phoneNumberValidator(value)
    ),
})



export { sendPhoneSchema, signUpSchema, editProfileSchema, signUpCitizensSchema };
