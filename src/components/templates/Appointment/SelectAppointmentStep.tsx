import React, { useEffect, useState } from 'react'
import { Firstppointment, PhysicianProfile, PhysicianProfileCalendar } from '@/types/appointment'
import TurnsIcon from '@/components/icons/menu/TurnsIcon'
import { useTranslations } from 'next-intl';
import convertMonthOfYear from '@/utils/convertMonthOfYear';
import cn from '@/utils/clsxFun';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import DayOfWeekButton from '@/components/elements/DayOfWeekButton';
import convertDayOfWeek from '@/utils/convertDayOfWeek';
import ModalLogin from '@/components/layouts/ModalLogin/ModalLogin';
import useModalLogin from '@/hooks/useModalLogin';
import useUserInfo from '@/hooks/useUserInfo';
import AppointmentRadioButton from '@/components/elements/AppointmentRadioButton';
import useSelectAppointment from '@/hooks/useSelectAppointment';
import BaseCard from '@/components/modules/cards/BaseCard';
import ArrowLeft from '@/components/icons/ArrowLeft';
import Image from 'next/image';
import Checkbox from '@/components/elements/inputs/Checkbox';
import ButtonElement from '@/components/elements/ButtonElement';
import LinkElement from '@/components/elements/LinkElement';
import Timer from '@/components/modules/Timer';


const SelectAppointmentStep = ({ calendar, physician, ramainingTime, times, firstAppointment, changeStep }: { calendar: PhysicianProfileCalendar[], physician: PhysicianProfile, ramainingTime: number, times: string[], firstAppointment: Firstppointment | null, changeStep: (step: 1 | 2) => void }) => {


  const [selectAppointmentBeforeSign, setSelectAppointmentBeforeSign] = useState({
    year: "",
    month: "",
    day: "",
    physicianId: "",
    index: 0,
    calendar: ""
  })



  const t = useTranslations("appointment_page");
  const p = useTranslations("person");


  const [activeTab, setActiveTab] = useState(calendar.findIndex(item => item.available === true) ? calendar.findIndex(item => item.available === true) : 0)
  const [activeMonth, setActiveMonth] = useState<string | number | undefined>(calendar.findIndex(item => item.available === true) ? calendar.find(item => item.available === true)?.calendar.month : calendar.find(item => item.available === false)?.calendar.month)
  const [showWarningRules, setShowWarningRules] = useState(false)

  const showHoursType = !physician.doNotShowMyCalendar


  //Authorization
  const { openModalLogin } = useModalLogin()
  const { isLogin, user } = useUserInfo()
  const [callbackIndex, setCallbackIndex] = useState(0)
  const callbacks = [() => {
    selectAppointment(selectAppointmentBeforeSign.year, selectAppointmentBeforeSign.month, selectAppointmentBeforeSign.day, selectAppointmentBeforeSign.index, selectAppointmentBeforeSign.calendar, selectAppointmentBeforeSign.physicianId)
  }, () => {
    firstAppointmentHandler.mutate({ physicianProfileId: physician.id })

    for (let i = 0; i < calendar.length; i++) {
      if (calendar[i].calendar.id === appointmentInfo.calendarId) {
        setActiveTab(i);
      }
    }
  }, () => { lockedAppointmentHandler.mutate() }]

  //selectAppointment
  const { selectAppointment, isSelectAppointment, selectIndex, selectCalendarId, isRules, rules, acceptRules, isNextStep, lockedAppointmentHandler, firstAppointmentHandler, appointmentInfo } = useSelectAppointment()



  const nextStepHandler = () => {
    if (isLogin === "isLoading") return
    if (isLogin === "unauthorization") {
      openModalLogin()
      setCallbackIndex(2)
      return
    }

    lockedAppointmentHandler.mutate()
  }

  let time = new Date()
  time.setSeconds(time.getSeconds() + ramainingTime)


  const getFirstAppointment = () => {
    if (isLogin === "isLoading") return;
    if (isLogin === "unauthorization") {
      openModalLogin()
      setCallbackIndex(1)
      return
    }
    firstAppointmentHandler.mutate({ physicianProfileId: physician.id })

    for (let i = 0; i < calendar.length; i++) {
      if (calendar[i].calendar.id === appointmentInfo.calendarId) {
        setActiveTab(i);
      }
    }
  }

  const selectHandler = (calendar: PhysicianProfileCalendar, index: number) => {
    if (isLogin === "isLoading") return
    if (isLogin === "unauthorization") {
      setSelectAppointmentBeforeSign({
        year: calendar.calendar.year,
        month: calendar.calendar.month,
        day: calendar.calendar.dayOfMonth,
        index: index,
        calendar: calendar.calendar.id,
        physicianId: physician.id,
      })
      openModalLogin()
      setCallbackIndex(0)
      return
    }


    selectAppointment(calendar.calendar.year, calendar.calendar.month, calendar.calendar.dayOfMonth, index, calendar.calendar.id, physician.id)
  }

  useEffect(() => {
    if (
      showHoursType === false
    ) {

      const timesPanel = document.getElementById(`day-${appointmentInfo.calendarId}`);
      const timeElement: any = document.getElementById(
        `btn-${appointmentInfo.calendarId}-${appointmentInfo.index}`
      );

      timesPanel?.scroll({
        left: timeElement.offsetLeft + 90 - timesPanel.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [isSelectAppointment])



  return (
    <>
      <ModalLogin callbacks={callbacks} isCallback={true} callbacksIndex={callbackIndex} />

      {/* ----------header------------- */}
      <header className=''>
        <div className="mt-4 flex justify-start items-center gap-2">
          <div className="w-[42px] h-[42px] rounded-full bg-white shadow-shadow_category flex justify-center items-center">
            <TurnsIcon active={false} />
          </div>
          <div className="h-[42px] px-2 rounded-3xl text-lg font-bold bg-white shadow-shadow_category flex justify-center items-center">
            نوبت دهی اینترنتی مطب
          </div>
        </div>
      </header>
      {/* ----------header------------- */}

      {/* ----------main------------- */}
      <main>

        {/* ----------section------------- */}
        {/* Tabs section */}
        <section>
          {
            ramainingTime > 0 ? (<div className="flex flex-col gap-3 p-4 bg-white shadow-no_appointment_timer rounded-sm mt-5">
              <div className="flex items-center gap-3">
                <Image
                  width={400}
                  height={400}
                  className="w-[85px] h-[85px]"
                  src={"/Clock.png"}
                  alt="clock-image"
                />
                <p>{t("It-possible-register-appointment")}</p>
              </div>

              <div className="flex">
                <p className="ml-2">{t("You-take-another-turn")}:</p>
                <div className="font-bold">
                  <Timer

                    expiryTimestamp={time}
                    expireHandler={() => window.location.reload()}
                  />
                </div>
              </div>
            </div>
            ) : (
              <div className="mt-8 flex justify-center items-center gap-2">
                <span className="text-lg font-bold">
                  {convertMonthOfYear(activeMonth)} {1402}
                </span>
                <span>
                  <TurnsIcon active={false} />{" "}
                </span>
              </div>
            )
          }


          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => {
              setActiveTab(index)
            }}
            className="mt-6"
          >
            <TabList
              className={cn(
                `flex justify-start items-center appointments_scroll pb-2 gap-1 overflow-x-auto `, {
                "hidden": ramainingTime > 0
              }
              )}
            >
              {calendar.map((item, index) => (
                <Tab
                  key={item.calendar.id}

                  className={"outline-none"}
                  disabled={!item.available}
                >
                  <label htmlFor={item.calendar.id} >
                    <DayOfWeekButton
                      disabled={item.available}
                      selected={activeTab === index}
                      dayOfWeek={convertDayOfWeek(
                        +item.calendar.dayOfWeek
                      )}
                      isAppointment={item.calendar.id === selectCalendarId}
                      dayOfMonth={item.calendar.dayOfMonth}
                    />
                    <input
                      name="day-of-week"
                      type="radio"
                      id={item.calendar.id}
                      value={item.calendar.id}
                      onChange={(e) => {
                        if (item.available === false) return;
                        setActiveTab(index);
                        setActiveMonth(item?.calendar?.month)
                      }}
                      hidden
                    />
                  </label>
                </Tab>
              ))}
            </TabList>
            <div className="mt-6 py-2 relative min-h-[100px]">
              <div
                className={cn(
                  `flex justify-center items-center gap-2 text-center text-lg font-bold mb-4 `,
                  {
                    "text-gray-500": ramainingTime > 0,
                  }
                )}
              >
                {t("Choose-consultation-time")}

              </div>
              {firstAppointment === null && ramainingTime <= 0 && (
                <div className="flex flex-col gap-2 absolute z-[20]  left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-md drop-shadow-[0px_0px_4px_rgba(0,0,0,1)] ">
                    {t("Free-time-not-found")}
                  </p>

                </div>
              )}

              {
                // map in calendar 
                calendar.map((item, indexP) => (
                  <TabPanel key={item.calendar.id}>
                    <div
                      id={`day-${item.calendar.id}`}
                      className={cn(
                        `w-auto flex justify-start items-center gap-2 `,
                        {
                          "flex-wrap grid grid-cols-3 min-[380px]:grid-cols-4 md:grid-cols-6":
                            showHoursType,
                          "overflow-auto appointments_scroll py-2":
                            !showHoursType,
                        }
                      )}

                    >
                      {times.map((time, index) =>
                        calendar[indexP].availableHours[index] === "1" ? (
                          <button
                            type="button"
                            key={index}
                            id={`btn-${item.calendar.id}-${index}`}
                            className={cn(`w-full gap-2 relative`, {
                              "flex justify-start items-center ":
                                !showHoursType,
                            })}
                          >
                            {isLogin === "unauthorization" ? (
                              <span className="absolute top-0 left-0 z-10 block w-full h-full" onClick={() => {
                                selectHandler(item, index)
                              }}></span>
                            ) : null}
                            <AppointmentRadioButton name="Appointment_time" active={true} calendarId={item.calendar.id}
                              handler={() => selectHandler(item, index)}

                              index={index} ramainingTime={ramainingTime} selected={selectIndex === index && selectCalendarId === item.calendar.id} time={times[index]} />
                          </button>

                        ) : calendar[indexP].availableHours[index] ===
                          "2" ||
                          calendar[indexP].availableHours[index] ===
                          "3" ? (
                          <button
                            type="button"
                            key={index}
                            className={cn(` w-full gap-2`, {
                              "flex justify-start items-center cursor-default ":
                                !showHoursType,
                            })}
                            disabled
                          >
                            <AppointmentRadioButton name="Appointment_time" active={false} calendarId={item.calendar.id} handler={() => console.log("first")} index={index} ramainingTime={ramainingTime} selected={false} time={times[index]} />
                          </button>
                        ) : null
                      )}
                    </div>
                  </TabPanel>
                ))
              }
            </div>
          </Tabs>
        </section>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* physician rules */}
        <section className="mt-4">
          <DropInfo
            physician={physician}
          />
        </section>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* accept rules */}
        <section className='mt-6'>
          <div className="flex relative  justify-start items-start flex-col gap-1">
            <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={acceptRules.acceptRuleOneHandler}>

              <Checkbox
                bg={"bg-link"}
                id={"test"}
                checked={rules.ruleOne}
                title={""}
                checkHandler={acceptRules.acceptRuleOneHandler}

              />
              {t("accept-doctor's-conditions")}
            </div>


            <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={acceptRules.acceptRuleTwoHandler}>
              <Checkbox
                bg={"bg-link"}
                id={"test_1"}
                checked={rules.ruleTwo}
                title=''
                checkHandler={acceptRules.acceptRuleTwoHandler}
              />
              <p>
                {" "}
                {t("Terms-and-rules") + " "}
                <span
                  className="text-primary font-bold cursor-pointer"
                // onClick={() => setShowModalRule(true)}
                >
                  {t("arenap")}
                </span>{" "}
                {t("I-accept")}
              </p>
            </div>
            {showWarningRules && (
              <span className="flex justify-start items-center gap-1">
                <Image
                  src={"/warning-icon.png"}
                  width={500}
                  height={500}
                  alt="warning_icon_ruls"
                  className="w-[30px]"
                />
                <p className="text-md text-yellow-500">
                  لطفا شرایط بالا بپذیرید
                </p>
              </span>
            )}
          </div>
        </section>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* buttons */}
        <section className="mt-6  sticky bottom-[20px] w-full left-0 flex justify-center items-center">
          <div className="w-full max-w-[1300px]   gap-2 ">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ButtonElement
                  disabled={
                    ramainingTime > 0 && firstAppointmentHandler.isLoading
                  }
                  fontWeight='bold'
                  loading={firstAppointmentHandler.isLoading}
                  typeButton={
                    ramainingTime > 0 && firstAppointment !== null ? "gray-light" : "primary"
                  }

                  handler={getFirstAppointment}
                >


                  {t("first-turn-empty")}

                </ButtonElement>


              </div>
              <div>
                <ButtonElement
                  disabled={lockedAppointmentHandler.isLoading || ramainingTime > 0 || firstAppointment === null || selectIndex === null || !isRules}
                  typeButton={!isNextStep ? "gray-light" : "primary"}
                  fontWeight='bold'
                  handler={nextStepHandler}
                  loading={lockedAppointmentHandler.isLoading}
                >

                  {t("next-step")}

                </ButtonElement>
              </div>
            </div>
          </div>
        </section>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        <section>
          {
            isLogin === "authorization" && user?.accountBalance < 100000 && (
              <>
                <p className="text-sm md:text-md mt-4 text-center"> میتوانید کیف پول خود را برای دریافت یک  یا چند نوبت شارژ کنید </p>
                <div className="text-center text-sm md:text-md"><LinkElement className="text-primary font-bold" link={`/profile/wallet`}>افزایش اعتبار کیف پول</LinkElement></div>
              </>
            )
          }
        </section>
        {/* ----------section------------- */}

      </main>
      {/* ----------main------------- */}
    </>
  )
}

export default SelectAppointmentStep

const DropInfo = ({ physician }: { physician: PhysicianProfile }) => {
  const t = useTranslations("appointment_page");
  const g = useTranslations("global");
  const [showDrop, setShowDrop] = useState(false);
  const splitTerms = physician?.terms?.split("\n");

  return (
    <BaseCard title={t("Doctor-admission-conditions")}>
      <div onClick={() => setShowDrop(!showDrop)}>
        <ul
          className={cn(
            `flex justify-start items-start flex-col px-2 gap-1  text-md relative `,
            {
              "after:w-full after:h-[25px] after:absolute after:bottom-0 after:left-0 after:bg-white/70":
                !showDrop,
            }
          )}
        >
          <li className="list-disc">
            ساعت اعلام شده تقریبی است و زمان ویزیت شما توسط منشی تعیین میگردد
          </li>
          {physician?.description ? (
            <li className="list-disc">{physician?.description}</li>
          ) : null}

          {showDrop &&
            (splitTerms?.length
              ? splitTerms.map((item: string, index: number) => (
                <li className="list-disc" key={index}>
                  {item}
                </li>
              ))
              : null)}
        </ul>
        <div className=" flex justify-end items-center ">
          <button type="button" className="text-primary font-bold  px-5 py-1 ">
            <span
              className={cn("transition-all duration-500 block", {
                "rotate-90": showDrop,
                "rotate-[270deg]": !showDrop,
              })}
            >
              <ArrowLeft />
            </span>
          </button>
        </div>
      </div>
    </BaseCard>
  );
};