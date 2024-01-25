"use client";




import BaseCard from "@modules/cards/BaseCard"







import PencilIcon from "@icons/PencilIcon";
// import PhysicianCommentCard from "@modules/cards/PhysicianCommentCard";
// import ConsultationPlanItemCard from "@modules/cards/ConsultationPlanItemCard";
import { useEffect, useState } from "react";
import ProfileSummaryCard from "@modules/cards/ProfileSummaryCard";
import Link from "next/link";





import useModalLogin from "@/hooks/useModalLogin";



// import ContentModalCenter from "../modules/modal/ContentModalCenter";
// import FunctionalStarRateModule from "../modules/FunctionalStarRateModule";
// import CustomRadioButton from "../elements/CustomRadioButton";
import UpThumbIcon from "../icons/UpThumbIcon";
import DownThumbIcon from "../icons/DownThumbIcon";




import { useLocale } from "next-intl";

// import convertWaitingTime from "@/helper/convertWaitingTime";
// import createComment from "@/services/comment/createComment";
import Toastify from "../elements/toasts/Toastify";





import useFavorite from "@/hooks/useFavorite";
import Loader from "../elements/Loader";
import { PhysicainProfileType } from "@/types/physicianProfile";
import TitlePagesMobile from "../modules/titles/TitlePagesMobile";

import TitlePrimary from "../modules/titles/TitlePrimary";
import ToastWarning from "../elements/toasts/ToastWarning";
import ModalLogin from "../layouts/ModalLogin/ModalLogin";
import cn from "@/utils/clsxFun";
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import Modal from "../modules/modals/Modal";
import CloseButton from "../elements/CloseButton";
import useUserInfo from "@/hooks/useUserInfo";
import ButtonElement from "../elements/ButtonElement";
import OfficeCard from "../modules/cards/OfficeCard";
import PhysicianProfileCard from "../modules/cards/Physicain/PhysicianProfileCard";
import LinkElement from "../elements/LinkElement";
import SwiperContainerFreeMode from "../modules/swiper/SwiperContianerFreeMode";
import PhysicainCardPrimary from '../modules/cards/Physicain/PhysicianCardPrimary';
import BottomSheetAndCenterContent from "../modules/modals/BottomSheetAndCenterContent";

const PhysicianProfilePage = ({ physician }: { physician: PhysicainProfileType }) => {


  const local = useLocale();





  let waitingTimeArray = [0, 0, 0, 0];

  for (let item of physician?.comments) {
    waitingTimeArray[item.waitingTime] += 1;
  }
  const watingTimeProgressPercent = waitingTimeArray.map((item: number) =>

    (item / waitingTimeArray.reduce((partialSum: number, a: number) => partialSum + a, 0)) *
    100

  );
  const waitingTimeAvg = Math.round(
    (waitingTimeArray[0] * 7.5 +
      waitingTimeArray[1] * 30 +
      waitingTimeArray[2] * 67.5 +
      waitingTimeArray[3] * 90) /
    waitingTimeArray.reduce((partialSum, a) => partialSum + a, 0)
  );

  const { isLogin, getUser } = useUserInfo();
  const { isShow, openModalLogin } = useModalLogin();

  const [isPresent, setIsPresent] = useState(false);
  const [showVisitQuestionModal, setShowVisitQuestionModal] = useState(false);
  const [showVisitTypeQuestionModal, setShowVisitTypeQuestionModal] =
    useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [rate, setRate] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [recommendation, setRecommendation] = useState<boolean | null>(null);
  const [commentText, setCommentText] = useState("");

  const consultationList: {
    id: string,
    url: string,
    title: string,
    price: number | null,
    firstDescription?: string | null,
    secondDescription?: string | null,
    active: boolean,
    status: boolean | null,
  }[] = [
      {
        id: "appointment",
        url: `/appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "دریافت نوبت اینترنتی",
        price: 1000 ? 1000 : null,
        // firstDescription: waitingTimeAvg ? `میانگین زمان انتظار ${waitingTimeAvg} دقیقه` : null,
        // secondDescription: physician.clinic ? `نوبت در ${physician.clinic}` : null,
        active: physician.onlineAppointment,
        status: null,
      },
      {
        id: "emergencyPhoneConsultation",
        url: `/appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی فوری",
        price: 1000 ? 100 : null,
        // firstDescription: physician.emergencyPhoneConsultationDuration ? `${physician.emergencyPhoneConsultationDuration} دقیقه گفتگو` : null,
        // secondDescription: physician.emergencyphoneWaitingTime ? `پاسخ دهی کمتر از ${physician.phoneWaitingTime} دقیقه` : null,
        active: physician.immediateConsultation,
        status: physician.immediateConsultation,
      },
      {
        id: "phoneConsultation",
        url: `/appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی",
        price: 1000 ? 100 : null,
        // firstDescription: physician.phoneConsultationDuration ? `${physician.phoneConsultationDuration} دقیقه گفتگو` : null,
        // secondDescription: physician.phoneWaitingTime ? `پاسخ دهی بین ${physician.phoneWaitingTime[0]} تا ${physician.phoneWaitingTime[1]} دقیقه` : null,
        active: physician.voiceConsultation,
        status: null,
      },
      {
        id: "textConsultation",
        url: `/appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره متنی",
        price: 1000 ? 100 : null,
        // firstDescription: physician.textConsultationWaitingTimeAvg ? `میانگین زمان انتظار ${physician.textConsultationWaitingTimeAvg} دقیقه` : null,
        // secondDescription: physician.maximumTextConsultationDuration ? `حداکثر مدت زمان مکالمه ${physician.maximumTextConsultationDuration} دقیقه` : null,
        active: physician.textConsultation,
        status: null,
      },
    ];

  const [buttonText, setButtonText] = useState(
    consultationList.find((item) => item.active)?.title
  );

  const [buttonLink, setButtonLink] = useState<string | undefined>(
    consultationList.find((item) => item.active)?.url
  );

  const [activeConsultation, setActiveConsultation] = useState(
    consultationList.find((item) => item.active)?.id
  );

  useEffect(() => {
    const findName = consultationList.find(
      (item) => item.id === activeConsultation && item.active === true
    );

    if (findName) setButtonText(findName.title);
    if (findName) setButtonLink(findName.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConsultation]);





  const visitQuestionModalHandler = () => {
    if (isLogin === "unauthorization") {
      openModalLogin();
      setCallbackIndex(1)
      return;
    }

    setRate(0);
    setWaitingTime(0);
    setRecommendation(null);
    setCommentText("");

    setShowVisitTypeQuestionModal(false);
    setShowFormModal(false);
    setShowVisitQuestionModal(true);
  };
  const visitTypeQuestionModalHandler = () => {
    setShowVisitQuestionModal(false);
    setShowFormModal(false);
    setShowVisitTypeQuestionModal(true);
  };

  const newCommentModalHandler = (isPresent: boolean) => {
    setIsPresent(isPresent);
    setShowVisitQuestionModal(false);
    setShowVisitTypeQuestionModal(false);
    setShowFormModal(true);
  };

  const rateHandler = (value: number) => {
    setRate(value);
  };

  const waitingTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaitingTime(+e.target.value);
  };


  const [loadingButtonComment, setLoadingButtonComment] = useState(false)



  const submitCommentHandler = async () => {
    if (commentText.length === 0) {
      Toastify("error", "لطفا متن نظر خود را وارد نمائید");
      return;
    }

    setLoadingButtonComment(true)
    try {
      // const res = await createComment(
      //   physician.id,
      //   null,
      //   rate,
      //   waitingTime,
      //   recommendation,
      //   commentText
      // );
      // console.log(res)
    } catch (error: any) {

    }

    setRate(0)
    setWaitingTime(0)
    setRecommendation(null)
    setCommentText("")
    setShowFormModal(false)
    setLoadingButtonComment(false)
  };

  const { userFavorite, addFavorite, deleteFavorite } = useFavorite(physician.id)

  // const { isFavorite, deleteFovoritePhysician, addFavoritePhysician } = useFavorite(physician.id)

  const favoritePhysicianHandler = async () => {
    if (isLogin === "isLoading") return;
    if (isLogin === "unauthorization") {
      openModalLogin();
      setCallbackIndex(0)
      return;
    }

    if (!userFavorite) {
      const res = addFavorite();

    } else {
      const status = deleteFavorite();

    }
  };





  //callbacks index
  const [callbackIndex, setCallbackIndex] = useState(0)




  const callbacks = [async () => {
    // if (!isFavorite) {
    //   const res = await addFavoritePhysician(physician.id);
    // } else {
    //   const status = await deleteFovoritePhysician(physician.id);
    // }
  }, () => setShowVisitQuestionModal(true)]


  return (
    <>
      <TitlePagesMobile title={`صفحه ی اختصاصی دکتر ${physician.firstName} ${physician.lastName}`} />
      <ModalLogin isCallback={true} callbacks={callbacks} callbacksIndex={callbackIndex} />

      {/* ----------content------------- */}
      <div className="container relative md:pb-5 flex flex-wrap ">
        {/* ----------section------------- */}
        {/* Button */}
        {consultationList.find((item) => item.active) && (
          <div className="sticky  bottom-[1.25rem] left-0 order-[13]  w-full flex justify-center items-center z-[19] pt-4">
            <div className=" w-full ">
              <LinkElement link={buttonLink as string} className="block w-full">
                <ButtonElement
                  typeButton="primary"
                  fontWeight="bold"
                >
                  {buttonText}
                </ButtonElement>
              </LinkElement>
            </div>
          </div>
        )}
        {/* ----------section------------- */}


        {/* ----------section------------- */}
        {/* Physician Card  */}
        <div className="w-full order-0">
          <PhysicianProfileCard
            profileURL={physician.hasImage ? getUrlImage(physician.id) : "/noImage.jfif"}
            name={`دکتر ${physician.firstName} ${physician.lastName}`}
            speciality={physician.physicianSpecialities[0]?.specialityTitle}
            rate={{ rate: physician.rate, count: physician.comments.length }}
            services={{
              appointment: physician.onlineAppointment,
              textConsultation: physician.textConsultation,
              phoneConsultation: physician.voiceConsultation,
              emergencyPhoneConsultation: physician.immediateConsultation,
            }}
            MENumber={physician.medicalSystemCode}
            city={physician.cityName}
            liked={userFavorite}
            status={physician.immediateConsultation}
            addFavorite={favoritePhysicianHandler}
          />
        </div>
        {/* ----------section------------- */}

        {/* <div className="w-full mt-4 order-1">
          <BaseCard title={"پلن مشاوره"}>
            {consultationList?.map((consultation) => (
              <label
                className="block mb-3"
                htmlFor={consultation?.id}
                key={consultation.id}
              >
                <ConsultationPlanItemCard
                  icon={consultation?.id}
                  title={consultation?.title}
                  price={consultation?.price}
                  firstDescription={consultation?.firstDescription}
                  secondDescription={consultation?.secondDescription}
                  selected={activeConsultation === consultation?.id}
                  active={consultation?.active}
                  status={
                    consultation?.status !== null ? consultation?.status : null
                  }
                />
                <input
                  onChange={(e) => setActiveConsultation(e.target.value)}
                  type="radio"
                  name="consultation-plan"
                  id={consultation?.id}
                  value={consultation?.id}
                  hidden
                  disabled={!consultation?.active}
                />
              </label>
            ))}
          </BaseCard>
        </div> */}
        {/* ----------section------------- */}
        {/* physicianSpecialities */}
        {physician.physicianSpecialities.length > 0 && (
          <div className="w-full mt-4 order-2">
            <BaseCard title={"تخصص ها "}>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {physician.physicianSpecialities.map((item, index) => (
                  <Link
                    href={`/${local}/search?specialities=${item.specialityTitle}`}
                    key={index}
                    className="bg-gray-100 w-auto px-3 py-1 rounded-sm text-md transition-all duration-300 hover:bg-gray-400 hover:text-white"
                  >
                    {item.specialityTitle}
                  </Link>
                ))}
              </div>
            </BaseCard>
          </div>
        )}
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* Physician Description */}
        {physician.description && (
          <div className="w-full mt-4 order-3">
            <BaseCard title={"درباره پزشک"}>{physician.description}</BaseCard>
          </div>
        )}
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* Office card */}
        <div className={cn(`mt-4 order-5 md:h-[13.125rem] w-full`, { "md:w-1/2 md:rtl:pr-2 md:ltr:pl-2": physician.comments.length > 0 })}>
          <OfficeCard
            title={"اطلاعات مطب"}
            address={physician.address}
            numbers={"۳۴۳۴***-۰۹۱۳۴۲****"}
            latitude={physician.latitude}
            longitude={physician.longitude}
          />
        </div>
        {/* ----------section------------- */}



        {/* <div className="w-full mt-4 order-6 ">
          <TitleSection
            title={"مقالات پزشک"}
            textLink={"مشاهده بیشتر"}
            link={"/"}
            btn={true}
            prefix={true}
          />
          <div className="mt-4">
            <SwiperFreeModeModule
              gap={15}
            // autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              {articleData.map((item) => (
                <SwiperSlide key={item.id} className="w-auto-important">
                  <ArticleCard
                    freeMode={true}
                    link={`blog/${item.id}`}
                    title={item.title}
                    description={item.description}
                    author={item.author}
                    image={item.image}
                    date={item.date}
                  />
                </SwiperSlide>
              ))}

            </SwiperFreeModeModule>
          </div>
        </div> */}


        {/* ----------section------------- */}
        {/* waitingTimeAvg */}
        {physician.comments.length > 0 && (
          <div className="mt-4 order-7 md:order-4 md:h-[13.125rem] w-full md:w-1/2 md:rtl:pl-2 md:ltr:pr-2">
            <BaseCard title={"مدت زمان انتظار در مطب"}>
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between">
                <div className="rounded-sm bg-gray-100 p-3 text-center rtl:ml-5 ltr:mr-5 w-full xs:w-auto mb-5 xs:mb-0">
                  <p className="text-[#342E2E]">میانگین زمان انتظار</p>
                  <p className="text-[1.25rem] font-bold text-[#342E2E] my-1">
                    {waitingTimeAvg}
                  </p>
                  <p className="text-[#342E2E]">دقیقه</p>
                </div>
                <div className="flex flex-col gap-3 w-full xs:w-auto justify-center">
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      0 تا 15 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div
                        style={{ width: `${watingTimeProgressPercent[0]}%` }}
                        className="rounded-lg bg-[#30C018] h-[.5rem] absolute"
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap text-right">
                      {waitingTimeArray[0]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      15 تا 45 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div
                        style={{ width: `${watingTimeProgressPercent[1]}%` }}
                        className="rounded-lg bg-[#30C018] h-[.5rem] absolute"
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[1]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      45 تا 90 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div
                        style={{ width: `${watingTimeProgressPercent[2]}%` }}
                        className="rounded-lg bg-[#30C018] h-[.5rem] absolute"
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[2]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      بیش از 90 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div
                        style={{ width: `${watingTimeProgressPercent[3]}%` }}
                        className="rounded-lg bg-[#30C018] h-[.5rem] absolute"
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[3]} نفر
                    </p>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>
        )}
        {/* ----------section------------- */}


        {/* ----------section------------- */}
        {/* relatedPhysicians Slider */}
        <div className="w-full mt-4 order-8">
          <TitlePrimary
            title={"پزشکان مرتبط"}
            textLink={"مشاهده بیشتر"}
            link={`/${local}/search?specialities=${physician.physicianSpecialities[0]?.specialityTitle}`}
            btn={true}
            prefix={true}
          />
          <div className="mt-4 order-9">
            <SwiperContainerFreeMode data={physician.relatedPhysicians} gap={10} CardComponent={PhysicainCardPrimary} />
          </div>
        </div>
        {/* ----------section------------- */}


        {/* ----------section------------- */}
        {/* Comments */}
        <div className="w-full mt-4 order-10" id="comment">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold rtl:mr-[1.25rem] ltr:ml-[1.25rem] relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
              نظرات کاربران{" "}
              <span className="text-md text-gray-500 font-normal">
                ({physician.comments.length}نظر)
              </span>
            </h3>
            <div className="w-[11.25rem]">
              <ButtonElement
                typeButton="primary"
                fontWeight="bold"
                type={"button"}
                size="sm"
                handler={visitQuestionModalHandler}
              >
                <span className="ml-3">ثبت نظر جدید</span>
                <PencilIcon />
              </ButtonElement>
            </div>
          </div>
          {physician.comments.length > 0 ? (
            physician.comments.map((item) => (
              <div key={item.id} className="mb-4">
                {/* <PhysicianCommentCard
                  name={`${item.firstName} ${item.lastName}`}
                  waitingTime={convertWaitingTime(item.waitingTime)}
                  rate={item.rate}
                  recommended={item.isSuggested}
                >
                  {item.message}
                </PhysicianCommentCard> */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">
              تا کنون نظری ثبت نشده!
            </p>
          )}
        </div>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* Profile summary */}
        <div className="w-full mt-4 order-11">
          <ProfileSummaryCard
            physician={physician}
            tags={["مغزواعصاب", "اطفال"]}
            title={"خلاصه پروفایل"}
            subTitle={"هشتگ های مرتبط"}
          />

        </div>
        {/* ----------section------------- */}



      </div>
      {/* ----------content------------- */}

      {/* ----------modal------------- */}
      <Modal
        show={showVisitQuestionModal}
        closeHandler={() => {
          setShowVisitQuestionModal(false);
        }}
      >
        <div className="w-full h-full flex justify-center items-center  ">
          <div className="bg-white p-5 w-[18.75rem] rounded-sm max-w-full">
            <div className="flex justify-end items-center ">
              <CloseButton
                closeHanlder={() => setShowVisitQuestionModal(false)}
              />
            </div>
            <div className="mt-1">
              {`آیا تا بحال توسط دکتر ${physician.firstName} ${physician.lastName} ویزیت شده اید؟`}
            </div>
            <div className="mt-8 flex justify-between items-center gap-2 ">
              <ButtonElement
                typeButton="primary"
                size={"sm"}
                handler={visitTypeQuestionModalHandler}
              >
                بله
              </ButtonElement>
              <ButtonElement
                typeButton="transparent"
                fontWeight="bold"


                size={"sm"}
                handler={() => {
                  ToastWarning("امکان ثبت نظر برای شما وجود ندارد", "بعد از ویزیت شما توسط پزشک نظر خود را ثبت کنید", 3000)
                  setShowVisitQuestionModal(false);
                }}
              >
                خیر
              </ButtonElement>
            </div>
          </div>
        </div>
      </Modal>
      {/* ----------modal------------- */}
      {/* ----------modal------------- */}
      <Modal
        show={showVisitTypeQuestionModal}
        closeHandler={() => {
          setShowVisitTypeQuestionModal(false);
        }}
      >
        <div className="w-full h-full flex justify-center items-center  ">
          <div className="bg-white p-5 w-[18.75rem] rounded-sm max-w-full">
            <div className="flex justify-end items-center ">
              <CloseButton
                closeHanlder={() => setShowVisitTypeQuestionModal(false)}
              />
            </div>
            <div className="mt-1">نوع ویزیت شما به چه شکل بوده است؟</div>
            <div className="mt-8 flex justify-between items-center gap-2 ">
              <ButtonElement


                typeButton="primary"
                fontWeight="bold"
                size={"sm"}
                handler={() => newCommentModalHandler(true)}
              >
                حضوری
              </ButtonElement>
              <ButtonElement
                typeButton="primary"
                fontWeight="bold"
                size={"sm"}
                handler={() => newCommentModalHandler(false)}
              >
                تلفنی
              </ButtonElement>
            </div>
          </div>
        </div>
      </Modal>
      {/* ----------modal------------- */}

      {/* ----------modal------------- */}
      <Modal show={showFormModal} closeHandler={() => setShowFormModal(false)}>
        <BottomSheetAndCenterContent show={showFormModal}>
          <div className="h-[calc(100vh-137px)] overflow-y-auto">
            <div>
              <span className="absolute top-[30px]  rtl:left-[15px] ltr:right-[15px] xs:rtl:left-[30px] xs:ltr:right[30px]">
                <CloseButton closeHanlder={() => setShowFormModal(false)} />
              </span>
            </div>
            <p className="font-bold text-center mb-3">امتیاز</p>
            <div className="flex justify-center mb-8">
              {/* <FunctionalStarRateModule
                size="xl"
                rate={rate}
                rateHandler={rateHandler}
                ltr={true}
              /> */}
            </div>
            {/* {isPresent && (
              <>
                <p className="text-md font-bold mb-5">مدت زمان انتظار</p>
                <div className="flex flex-col gap-4 mb-8">
                  <label
                    className="flex items-center gap-3"
                    htmlFor="zero-to-fifteen"
                  >
                    <CustomRadioButton selected={waitingTime === 0} />
                    <p className="text-md">۰ تا ۱۵ دقیقه</p>
                    <input
                      type="radio"
                      name="waiting-time"
                      id="zero-to-fifteen"
                      value={0}
                      onChange={waitingTimeHandler}
                      checked={waitingTime === 0}
                      hidden
                    />
                  </label>
                  <label
                    className="flex items-center gap-3"
                    htmlFor="fifteen-to-fortyfive"
                  >
                    <CustomRadioButton selected={waitingTime === 1} />
                    <p className="text-md">۱۵ تا ۴۵ دقیقه</p>
                    <input
                      type="radio"
                      name="waiting-time"
                      id="fifteen-to-fortyfive"
                      value={1}
                      onChange={waitingTimeHandler}
                      checked={waitingTime === 1}
                      hidden
                    />
                  </label>
                  <label
                    className="flex items-center gap-3"
                    htmlFor="fortyfive-to-ninety"
                  >
                    <CustomRadioButton selected={waitingTime === 2} />
                    <p className="text-md">۴۵ تا ۹۰ دقیقه</p>
                    <input
                      type="radio"
                      name="waiting-time"
                      id="fortyfive-to-ninety"
                      value={2}
                      onChange={waitingTimeHandler}
                      checked={waitingTime === 2}
                      hidden
                    />
                  </label>
                  <label
                    className="flex items-center gap-3"
                    htmlFor="more-than-ninety"
                  >
                    <CustomRadioButton selected={waitingTime === 3} />
                    <p className="text-md">بیش از ۹۰ دقیقه</p>
                    <input
                      type="radio"
                      name="waiting-time"
                      id="more-than-ninety"
                      value={3}
                      onChange={waitingTimeHandler}
                      checked={waitingTime === 3}
                      hidden
                    />
                  </label>
                </div>
              </>
            )} */}
            <p className="text-md font-bold mb-5">این پزشک را پیشنهاد میکنید؟</p>
            <div className="grid grid-cols-2 gap-4 mb-8 overflow-hidden">
              <label htmlFor="recommended">
                <div
                  className={cn(
                    `p-1 flex justify-center bg-[#DEFFDB] rounded-[47px] items-center gap-3 text-md w-full cursor-pointer`,
                    {
                      "opacity-100 animate-opacity_60": recommendation,
                      "opacity-60": !recommendation,
                    }
                  )}
                >
                  <div
                    className={cn(`relative `, {
                      "animate-like_thumb": recommendation,
                    })}
                  >
                    <UpThumbIcon size="30px" />
                  </div>
                  پیشنهاد میکنم
                </div>
                <input
                  type="radio"
                  name="recommendation"
                  id="recommended"

                  onChange={() => setRecommendation(true)}
                  checked={recommendation ? true : false}
                  hidden
                />
              </label>
              <label htmlFor="not-recommended">
                <div
                  className={cn(
                    `p-1 flex justify-center bg-[#FFF1F1] rounded-[47px] items-center gap-3 text-md w-full cursor-pointer`,
                    {
                      "opacity-100 animate-bouncing": recommendation === false,
                      "opacity-60": recommendation === null || recommendation,
                    }
                  )}
                >
                  <DownThumbIcon size="30px" />
                  پیشنهاد نمیکنم
                </div>
                <input
                  type="radio"
                  name="recommendation"
                  id="not-recommended"

                  onChange={() => setRecommendation(false)}
                  checked={recommendation === false}
                  hidden
                />
              </label>
            </div>
            <label className="text-md font-bold" htmlFor="comment">
              نظر
            </label>
            <textarea
              name="comment"
              id="comment"
              rows={4}
              className="w-full bg-gray-100 rounded-sm text-sm p-3 placeholder-[#B5B5B5] mt-3 mb-8"
              placeholder="نظر خود را وارد کنید..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="w-full">
              <ButtonElement
                typeButton="primary"
                fontWeight="bold"
                handler={submitCommentHandler}
                disabled={loadingButtonComment}
              >
                {loadingButtonComment ? <Loader size="size-[1.875rem]" color="border-white" /> : "ثبت نظر"}
              </ButtonElement>
            </div>
          </div>
        </BottomSheetAndCenterContent>
      </Modal>
      {/* ----------modal------------- */}

    </>
  );
};

export default PhysicianProfilePage;
