"use client"
import React, { useState } from 'react'
import { SetpLoginType } from './ModalLogin'

import {
  Formik,
  Form,
  Field,
  FormikProps,
} from 'formik';
import FormControl from '@elements/inputs/FormControl';

import Image from 'next/image';
import Loader from '@/components/elements/Loader';
import ButtonElement from '@/components/elements/ButtonElement';
import { sendPhoneSchema } from '@utils/validations';
import useLogin from '@/hooks/useLogin';

interface InitialValuesType {
  phoneNumber: string;
  captcha: string;
}

const SendPhone = ({ changeStep }: SetpLoginType) => {
  
  
  const { sendPhoneHandler, loading, captcha, resetCaptcha, key , loadingButton } = useLogin()




  const initialValues: InitialValuesType = {
    phoneNumber: "",
    captcha: "",
  }




  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={sendPhoneSchema}
        onSubmit={async (values, actions) => {

          const result = await sendPhoneHandler(values.phoneNumber.toString(), values.captcha.toString(), key)
          actions.resetForm()

          if (result.resultCode === 200) {
            changeStep(2)
            actions.resetForm() 
          }

        }
        }
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field name="phoneNumber" type="tel" placeholder="شماره همراه خود را وارد کنید" title="شماره همراه" component={FormControl} />
            <div className='grid grid-cols-2 gap-2 mt-4'>
              <Field name="captcha" type="number" placeholder="کد امنیتی" component={FormControl} />
              <div className="border border-gray rounded-[30px] overflow-hidden flex justify-center items-center">
                {loading ? (
                  <Loader
                    size="size-[2.35rem]"
                    color="border-primary"
                  />
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src={`data:image/jpeg;base64,${captcha}`}
                    alt="captcha"
                    className="h-[2.35rem] w-full cursor-pointer"
                    onClick={resetCaptcha}
                  />
                )}
              </div>
            </div>
            <div className='mt-4'>
              <ButtonElement type='submit' typeButton='primary' size='sm' loading={loadingButton} >
                ارسال
              </ButtonElement>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SendPhone