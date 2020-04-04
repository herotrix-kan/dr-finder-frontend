const createPatient = `
	mutation ($id: String!, $email: String!){
		createPatient(id: $sId, email: $email) {
            sId
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


export { createPatient, updatePatient };