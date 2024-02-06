"use client"
import React, { useEffect } from 'react'
import { editProfileSchema } from '@/utils/validations'
import {
      Formik,
      Form,
      Field,
      FormikProps,
} from 'formik';
import ButtonElement from '@elements/ButtonElement';
import FormControlEdit from '@elements/inputs/FormControlEdit';
import useUserInfo from '@/hooks/useUserInfo';

interface InitialValuesType {
      firstName: string;
      lastName: string;
      notionalNumber: string;
      phoneNumber: string
}


const EditProfilePage = () => {
      const { user , isLogin } = useUserInfo()





      let initialValues: InitialValuesType = {
            firstName: "",
            lastName: "",
            notionalNumber: "",
            phoneNumber: ""
      }


      useEffect(() => {
            initialValues = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  notionalNumber: user.nationalNumber,
                  phoneNumber: user.phoneNumber
            }
      }, [user])


      return (
            <div>
                  <Formik
                        initialValues={initialValues}
                        // validationSchema={editProfileSchema}
                        onSubmit={async (values, actions) => {

                              actions.resetForm()
                        }}

                  >
                        {(props: FormikProps<any>) => (
                              <Form>
                                    <Field name="firstName" type="text" placeholder=" نام خود را وارد کنید" title="نام" component={FormControlEdit} />
                                    <Field name="lastName" type="text" placeholder=" نام خانوادگی خود را وارد کنید" title="نام خانوادگی " component={FormControlEdit} />
                                    <Field name="notionalNumber" type="text" placeholder=" کدملی  خود را وارد کنید" title="کدملی" component={FormControlEdit} />
                                    <Field name="phoneNumber" type="string" disabled={true} placeholder=" شماره همراه خود را وارد کنید" title="شماره همراه" component={FormControlEdit} />
                                    <div className='mt-4'>
                                          <ButtonElement type='submit' typeButton='primary' size='sm' loading={false} >
                                                ارسال
                                          </ButtonElement>
                                    </div>
                              </Form>
                        )}
                  </Formik>
            </div>

      )
}

export default EditProfilePage

