"use client"
import React, { useState } from 'react'
import ButtonElement from './ButtonElement'
import LocationIcon from '../icons/LocationIcon'

const ChnageCityButton = () => {
  const [show, setShow] = useState(false)
  const showHandler = () => {
    setShow(true)
  }


  return (
    <>
      <ButtonElement typeButton='primary' handler={showHandler} customStyle='group'>
          <span>انتخاب شهر</span>
          <LocationIcon color='fill-white' /> 
      </ButtonElement>

    </>
  )
}

export default ChnageCityButton