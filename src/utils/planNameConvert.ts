


const planNameConvert = (type: string) => {



    switch (type) {
        case "onlineAppointment":
            return "Face-to-face-appointment"
            break;

        case "textConsultation":
            return "Text-advice"

            break;

        case "voiceConsultation":
            return "phone-consultancy"

            break;

        case "immediateConsultation":

            return "Immediate-phone-consultation"
            break;

        case "disabled":
            return "Canceled"

            break;

        default:
            break;
    }
}

export default planNameConvert