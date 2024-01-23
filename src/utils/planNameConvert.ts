


const planNameConvert = (type: string) => {



    switch (type) {
        case "OnlineAppointment":
            return "Face-to-face-appointment"
            break;

        case "TextConsultation":
            return "Text-advice"

            break;

        case "VoiceConsultation":
            return "phone-consultancy"

            break;

        case "ImmediateConsultation":

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