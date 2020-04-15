const createPatient = `
	mutation ($id: String!, $email: String!){
		createPatient(id: $id, email: $email) {
            id
            email
        },  
    },
    `;


const updatePatient = `
    mutation(
        $id: String!,
        $email: String,
        $patientName: String,
        $introduction: String,
        $address: String,
        $suburb: String,
        $addressState: String,
        $postcode: Int,
        $speakingLanguage: String,
        $phone: String,
        $email: String,
    ){
        updatePatient(
            id: $sId,
            email: $email,
            patientName: $patientName,
            introduction: $introduction,
            address: $address,
            suburb: $suburb,
            addressState: $addressState,
            postcode: $postcode,
            speakingLanguage: $speakingLanguage,
            phone: $phone,
            email: $email,
        )
    } `;


const createAppointment = `
	mutation (
        $doctorId: String!,
        $patientId: String!,
        $appointmentDateTime: String!, 
        $reason: String!, 
        $timezone: String!,
        $patientName: String!,
        $doctorName: String!, 
        $location: String!) 
        {
		createAppointment(
            doctorId: $doctorId
            patientId: $patientId
            appointmentDateTime: $appointmentDateTime
            reason: $reason
            timezone: $timezone
            patientName: $patientName
            doctorName: $doctorName
            location: $location
        ) {
            pId
            id
            doctorId
            patientId
            appointmentDateTime
            appointmentStatus
            reason
            timezone
            patientName
            doctorName
            location
        },  
    },
    `;

const updateAppointment = `
    mutation(
        $id: String!,
        $email: String,
        $patientName: String,
        $introduction: String,
        $address: String,
        $suburb: String,
        $addressState: String,
        $postcode: Int,
        $speakingLanguage: String,
        $phone: String,
        $email: String,
    ){
        updatePatient(
            id: $sId,
            email: $email,
            patientName: $patientName,
            introduction: $introduction,
            address: $address,
            suburb: $suburb,
            addressState: $addressState,
            postcode: $postcode,
            speakingLanguage: $speakingLanguage,
            phone: $phone,
            email: $email,
        )
    }`;
export { createPatient, updatePatient, createAppointment, updateAppointment };