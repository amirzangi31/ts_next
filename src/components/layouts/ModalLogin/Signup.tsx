import React from 'react'
import { SetpLoginType } from './ModalLogin'
import {
  Formik,
  Form,
  Field,
  FormikProps,
} from 'formik';
import { signUpSchema } from '@/utils/validations';
import useLogin from '@/hooks/useLogin';
import ButtonElement from '@/components/elements/ButtonElement';
import FormControl from '@/components/elements/inputs/FormControl';

interface InitialValuesType {
  firstName: string;
  lastName: string;
  notionalNumber: string;
}



const Signup = ({ changeStep , callbacks, isCallback, callbacksIndex = 0 }: SetpLoginType) => {
  const { loadingButton, loginVerifications, signUpHandler } = useLogin()


  const initialValues: InitialValuesType = {
    firstName: "",
    lastName: "",
    notionalNumber: ""
  }



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {

        const result = await signUpHandler(values.notionalNumber, values.firstName.toString(), values.lastName.toString(), loginVerifications.sessionId)
        actions.resetForm()

        if (result.resultCode === 200) {
          actions.resetForm()
          changeStep(1)
        }
        if (result.resultCode === 200 && isCallback) {
          callbacks?.[callbacksIndex]()
        }
      }
      }
    >
      {(props: FormikProps<any>) => (
        <Form>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            <Field name="firstName" type="text" placeholder=" نام خود را وارد کنید" title="نام" component={FormControl} />
            <Field name="lastName" type="text" placeholder=" نام خانوادگی خود را وارد کنید" title="نام خانوادگی " component={FormControl} />
          </div>
          <Field name="notionalNumber" type="text" placeholder=" کدملی  خود را وارد کنید" title="کدملی" component={FormControl} />
          <div className='mt-4'>
            <ButtonElement type='submit' typeButton='primary' size='sm' loading={loadingButton} >
              ارسال
            </ButtonElement>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Signup