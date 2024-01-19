import * as Yup from "yup";
import { phoneNumberValidator } from "@persian-tools/persian-tools";

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

export { sendPhoneSchema };
