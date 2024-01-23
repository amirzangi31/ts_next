"use client";
import React, { useEffect, useRef, useState } from "react";
import TitlePageMobile from "../../modules/titleComponents/TitlePageMobile";
import BaseCard from "../../modules/cards/BaseCard";
import ButtonElement from "../../elements/buttons/ButtonElement";
import Image from "next/image";
import Modal from "../../modules/modal/Modal";
import ContentModalCenter from "../../modules/modal/ContentModalCenter";
import CloseButtonCom from "../../elements/buttons/CloseButtonCom";
import { priceSplitter } from "@/helper/priceSplitter";
import useAuth from "@/hooks/useAuth";
import Skeleton from "react-loading-skeleton";

import moment from "jalali-moment";


import { useTranslations } from "next-intl";
import CustomCheckBox from "@/components/elements/CustomCheckBox";
import { createPayment } from "@/services/payment/payment";
import Toastify from "@/components/elements/Toastify";
import Loader from "@/components/elements/Loader";
import SwiperFreeModeModule from "@/components/modules/SwiperFreeModeModule";
import { SwiperSlide } from "swiper/react";
import cn from "@/helper/cnFun";
import useTransactions from "@/hooks/useTransactions";


const WalletPage = (props) => {
  const { params } = props;
  const { transactions, loading } = useTransactions(true)

  const t = useTranslations("wallet_page");

  const { isLogin, user } = useAuth();

  const [showModalIncrease, setShowModalIncrease] = useState(false);
  const [showSuccessDepositModal, setShowSuccessDepositModal] = useState(false);
  const [showFailureDepositModal, setShowFailureDepositModal] = useState(false);
  const [price, setPrice] = useState(params?.amount ? +params.amount : "");
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [disabledButtonPayment, setDisabledButtonPayment] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingPayment, setLoddingPayment] = useState(false);


  const showModalIncreaseHandler = () => {
    setShowModalIncrease(true);
  };

  // const getTransactionsHandle = async () => {
  //   const data = await getTransactions(page, 50);
  //   setTransactions(data?.value?.items);
  // };

  useEffect(() => {
    if (params?.Status === "Fail") {
      setShowFailureDepositModal(true);
    }
    if (params.Status === "Success") {
      setShowSuccessDepositModal(true);
      setDate({
        year: params.date.slice(0, 4),
        month: params.date.slice(4, 6),
        day: params.date.slice(6, 8),
      });
    }
  }, []);

  // useEffect(() => {
  //   getTransactionsHandle();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);





  const [activePrice, setActivePrice] = useState(1)
  const [showCount, setShowCount] = useState(false)
  const [totalPrice, setTotalPrice] = useState(10000)
  const [countAppointment, setCountAppointment] = useState("")
  const inputRef = useRef(null)

  const activePriceHandler = (count) => {
    setCountAppointment("")
    setDisabledButtonPayment(false)
    setShowCount(false)
    setTotalPrice(count * 10000)
    setActivePrice(count)
  }

  const changeCountAppointmentHandler = (e) => {
    if (+e.target.value > 500) {
      setCountAppointment(500)
      setTotalPrice(500 * 10000)
      setDisabledButtonPayment(false)
      return
    }
    if (+e.target.value > 0) {
      setCountAppointment(+e.target.value)
      setTotalPrice(+e.target.value * 10000)
      setDisabledButtonPayment(false)
    } else {
      setCountAppointment("")
      setTotalPrice("")
      setDisabledButtonPayment(true)
    }
  }
  useEffect(() => {
    if (showCount === false) return;
    inputRef.current.focus()
  }, [showCount]);

  const paymentHandler = async (price) => {

    setLoddingPayment(true);
    if (price >= 50000000) {
      Toastify("error", "حداکثر مبلغ مجاز برای پرداخت پنج میلیون تومان میباشد")
      return
    }
    try {
      const res = await createPayment(0, price, 0);
      if (res !== undefined) {
        window.location.href = res;
      }
    } catch (error) {
      Toastify("error", error?.response?.data?.resultMessage);
    }
    setLoddingPayment(false);
  };

  // const tryAgainPayment = async () => {
  //   setLoddingPayment(true)
  //   try {
  //     const res = await createPayment(0, +price * 10, 0);
  //     if (res !== undefined) {
  //       window.location.href = res;
  //     }
  //   } catch (error) {
  //     Toastify("error", error?.response?.data?.resultMessage);
  //   }
  //   setLoddingPayment(false)
  // }


  return (
    <>
      <TitlePageMobile title={t("title")} />
      <div className="container mt-4">
        <header>
          <BaseCard title={t("title")}>
            <div className="py-4 px-6 bg-gray-100 rounded-sm mt-4">
              <div className="flex justify-start items-center gap-2 ">
                <span>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.4116 14.3957H18.2851C16.77 14.3948 15.5419 13.1909 15.541 11.7045C15.541 10.218 16.77 9.01409 18.2851 9.01318H22.4116"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      inejoin="round"
                    />
                    <path
                      d="M18.7522 11.6429H18.4345"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      inejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.25224 3H17.0625C20.0165 3 22.4114 5.34951 22.4114 8.24766V15.4247C22.4114 18.3229 20.0165 20.6724 17.0625 20.6724H8.25224C5.29817 20.6724 2.90332 18.3229 2.90332 15.4247V8.24766C2.90332 5.34951 5.29817 3 8.25224 3Z"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      inejoin="round"
                    />
                    <path
                      d="M7.52637 7.5382H13.0295"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      inejoin="round"
                    />
                  </svg>
                </span>

                <p className="font-bold text-md flex justify-start gap-2 items-center ">
                  {t("Wallet-balance")}:
                  {isLogin === "isLoading" && (
                    <span className="w-[100px] block">
                      <Skeleton className="h-20px" />{" "}
                    </span>
                  )}
                  <span className="font-normal">
                    {isLogin === "authorization" &&
                      `${+user.accountBalance === 0
                        ? 0
                        : priceSplitter(+user.accountBalance / 10)
                      } ${t("Toman")}`}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-[120px] absolute top-4 ltr:right-4 rtl:left-4">
              <ButtonElement
                bg={"bg-primary"}
                fontW={"font-bold"}
                textC={"text-white"}
                clickHandler={showModalIncreaseHandler}
              >
                {t("Increase-credit")}
              </ButtonElement>
            </div>
          </BaseCard>
        </header>
        <section className="mt-4">
          {transactions?.length === 0 && !loading ? (
            <div className="h-[calc(100vh-320px)] flex justify-center items-center flex-col gap-8">
              <div>
                <Image
                  src={"/noTransactions.png"}
                  width={500}
                  height={500}
                  alt="noTransactions"
                  className="w-full"
                />
              </div>
              <div className="flex justify-start items-center gap-4 flex-col">
                <p className="text-md ">{t("No-transaction")}!</p>
                <p className="text-sm ">{t("Log-in-search")} </p>
                <div className="w-[220px]">
                  <ButtonElement
                    bg={"bg-primary"}
                    fontW={"font-bold"}
                    textC={"text-white"}
                    clickHandler={showModalIncreaseHandler}
                  >
                    {t("Increase-credit")}
                  </ButtonElement>
                </div>
              </div>
            </div>
          ) : null}
          {!loading && transactions.length > 0 ?
            <BaseCard title={t("Transaction-history")}>
              <div className="flex justify-start items-center flex-col gap-2">
                {transactions?.map((item, index) => (
                  <TransactionCard key={item.id} {...item} />
                ))}
              </div>
            </BaseCard>
            : null
          }

          {
            loading ?
              <BaseCard title={t("Transaction-history")}>


                <div className="flex justify-start items-center gap-2 flex-col">
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                </div>
              </BaseCard> : null
          }
        </section>
        <div>
          <Modal
            show={showModalIncrease}
            closeHandler={() => setShowModalIncrease(false)}
          >
            <ContentModalCenter show={showModalIncrease}>
              <div>
                <span className="absolute top-[30px] rtl:left-[15px] ltr:right-[15px] xs:rtl:left-[30px] xs:ltr:right[30px]">
                  <CloseButtonCom
                    closeHanlder={() => setShowModalIncrease(false)}
                  />
                </span>
                <p className="text-md font-bold">{t("Wallet-balance")} : <span className={cn("   ", {
                  "text-error": +user.accountBalance < 100000,
                  "text-primary": +user.accountBalance > 0
                })}>{+user.accountBalance === 0
                  ? 0
                  : priceSplitter(+user.accountBalance / 10)} تومان</span></p>
                <div className="mt-4 flex justify-start items-center gap-3 py-3">
                  <p className="text-center text-md w-full font-bold">برای چند نوبت میخوای شارژ کنی؟</p>
                </div>
                <div className="py-2">

                  <SwiperFreeModeModule gap={10}>
                    <SwiperSlide className="w-auto-important ">
                      <button type="button" onClick={() => activePriceHandler(1)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[100px] border text-md border-primary", {
                        "bg-primary text-white ": activePrice === 1
                      })} >
                        یک نوبت
                      </button>
                    </SwiperSlide>
                    <SwiperSlide className="w-auto-important ">
                      <button type="button" onClick={() => activePriceHandler(3)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[100px] border text-md border-primary", {
                        "bg-primary text-white ": activePrice === 3
                      })} >
                        سه نوبت
                      </button>
                    </SwiperSlide>
                    <SwiperSlide className="w-auto-important ">
                      <button type="button" onClick={() => activePriceHandler(5)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[100px] border text-md border-primary", {
                        "bg-primary text-white ": activePrice === 5
                      })} >
                        پنج نوبت
                      </button>
                    </SwiperSlide>
                    <SwiperSlide className="w-auto-important ">
                      <button type="button" onClick={() => activePriceHandler(10)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[100px] border text-md border-primary", {
                        "bg-primary text-white ": activePrice === 10
                      })} >
                        ده نوبت
                      </button>
                    </SwiperSlide>
                    <SwiperSlide className="w-auto-important ">
                      <button type="button" onClick={() => {
                        setShowCount(true)
                        setActivePrice(0)
                        setTotalPrice(0)
                        setDisabledButtonPayment(true)
                      }} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[100px] border text-md border-primary", {
                        "bg-primary text-white ": showCount
                      })} >
                        تعداد دلخواه
                      </button>
                    </SwiperSlide>

                  </SwiperFreeModeModule>
                </div>
                {
                  showCount ?
                    <div className="py-4 flex justify-between items-center gap-2">
                      <p className="text-md">تعداد نوبت : </p>
                      <input type="number" ref={inputRef} placeholder="تعداد نوبت " value={countAppointment} onChange={changeCountAppointmentHandler} className="border border-primary flex-1 p-1 rounded-3xl px-2 text-center placeholder:text-sm text-primary text-md " style={{ direction: "ltr" }} />
                    </div> : null
                }

                {/* <div className="mt-4">
                  <p>{t("Increasing-balance")}: </p>

                  <div className="mt-4 w-full border border-gray-200 rounded-3xl  h-[45px]">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-full px-4 placeholder:text-md"
                      placeholder={t("Enter-desired-amount")}
                    />
                  </div>
                </div> */}
                <div className="mt-4">
                  <ButtonElement
                    bg={disabledButtonPayment ? "bg-gray-400" : "bg-primary"}
                    fontW={"font-bold"}
                    textC={"text-white"}
                    disabled={disabledButtonPayment}
                    clickHandler={() => paymentHandler(+totalPrice * 10)}
                  >
                    {loadingPayment ? (
                      <Loader
                        width={"w-[40px]"}
                        height={"h-[40px]"}
                        color={"border-white"}
                      />
                    ) : (
                      <p>{t("Record")} <span className="text-sm">({priceSplitter(totalPrice)} تومان)</span></p>
                    )}
                  </ButtonElement>
                </div>
              </div>
            </ContentModalCenter>
          </Modal>
        </div>
        <div>
          <Modal
            show={showSuccessDepositModal}
            closeHandler={() => {
              setShowSuccessDepositModal(false);
            }}
          >
            <div className="w-full h-full flex justify-center items-center">
              <div className="bg-white p-5 w-[370px] rounded-sm max-w-full relative">
                <div className="flex justify-end items-center absolute left-[20px] top-[20px]">
                  <CloseButtonCom
                    closeHanlder={() => {
                      setShowSuccessDepositModal(false);
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Image
                    width={500}
                    height={500}
                    className="w-[155px] h-[148px]"
                    src="/SuccessfulDepositInfo.png"
                    alt="پرداخت موفقیت آمیز"
                  />
                  <p>پرداخت شما با موفقیت انجام شد</p>
                  <div className="w-full p-1 bg-gray-100 rounded-sm flex gap-2 justify-center items-center">
                    <label htmlFor="paid">
                      <CustomCheckBox
                        id="paid"
                        defaultChecked={true}
                        bg="bg-primary"
                        disabled
                      />
                    </label>
                    <p className="font-bold">
                      مبلغ {priceSplitter(price)} ریال
                    </p>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-md">
                      <span className="font-bold">تاریخ انجام: </span>
                      <span>
                        {date.year}/{date.month}/{date.day}
                      </span>
                    </p>
                    <p className="text-md">
                      <span className="font-bold">شماره تراکنش: </span>
                      <span>{params["transaction-number"]}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            show={showFailureDepositModal}
            closeHandler={() => {
              setShowFailureDepositModal(false);
            }}
          >
            <div className="w-full h-full flex justify-center items-center px-4">
              <div className="bg-white p-5 w-[370px] rounded-sm max-w-full relative">
                <div className="flex justify-end items-center absolute left-[20px] top-[20px]">
                  <CloseButtonCom
                    closeHanlder={() => {
                      setShowFailureDepositModal(false);
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Image
                    width={500}
                    height={500}
                    className="w-[155px] h-[135]"
                    src="/FailureDepositInfo.png"
                    alt="پرداخت ناموفق"
                  />
                  <p className="font-bold">پرداخت شما با مشکل مواجه شده!</p>
                  <p className="text-center">
                    در صورت کسر مبلغ، تا 72 ساعت آینده هزینه به حساب شما برگشت
                    داده خواهد شد.
                  </p>
                  <div className="w-full">
                    <ButtonElement
                      bg="bg-primary"
                      fontW="font-bold"
                      textC="text-white"
                      clickHandler={() => paymentHandler(+price * 10)}
                    >
                      {loadingPayment ? (
                        <Loader
                          width={"w-[40px]"}
                          height={"h-[40px]"}
                          color={"border-white"}
                        />
                      ) : (
                        "تلاش مجدد"
                      )}
                    </ButtonElement>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default WalletPage;

const TransactionCard = (props) => {
  const t = useTranslations("wallet_page");

  return (
    <div className="p-4 rounded-sm border border-gray-200  flex justify-between items-center w-full">
      <div>
        <p className="text-md">
          <span className="font-bold">{t("Amount")} :</span>{" "}
          {priceSplitter(props.amount / 10)}
          {t("Toman")}
        </p>
      </div>
      <div>
        <p className="text-md font-bold">
          {moment(props.createdAt).format("jYYYY/jMM/jDD")}
        </p>
      </div>
      <div>
        {/* {
                    paymentActionType(props.actionType)?.isPositive ?
                        <span className={`bg-link-light text-link py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}>{t(paymentActionType(props.actionType)?.title)}</span>
                        :
                        <span className={`bg-error-light text-error-100 py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}>
                            {t(paymentActionType(props.actionType)?.title)}
                        </span>
                    } */}
        {props.actionType === 3 || props.actionType === 0 && props.isSuccess ? (
          <span
            className={`bg-link-light text-link py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            {t("deposit")}
          </span>
        ) : null}
        {props.actionType === 2 && (
          <span
            className={`bg-error-light text-error-100 py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            {t("withdrawal")}
          </span>
        )}
        {props.isSuccess === null && (
          <span
            className={`bg-error-light bg-error/20 text-error py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            {t("cancel")}
          </span>
        )}
      </div>
    </div>
  );
};
const TransactionCardLoading = () => {
  return (
    <div className="p-4 rounded-sm border border-gray-200  gap-2  w-full grid grid-cols-3">
      <div className="text-md ">
        <Skeleton className="h-[20px]" />{" "}
      </div>

      <div className="text-md font-bold ">
        <Skeleton className="h-[20px]" />{" "}
      </div>

      <div className="">
        <Skeleton className="h-[20px]" />{" "}
      </div>
    </div>
  );
};
