// import { gql } from 'apollo-boost';

export default {
    // CREATE_PATIENT: gql`
    // {
    // 	listCourses {
    // 		id
    // 		itemName
    // 		itemStatus
    // 		projects {
    // 			id
    // 			itemName
    // 			itemStatus
    // 		}
    // 	}
    // }`,
    // GET_COURSE: gql`
    // 	query getCourse($courseId: String!) {
    // 	getCourse(courseId: $courseId) {
    // 		id
    // 		itemName
    // 		itemStatus
    // 		projects {
    // 			id
    // 			itemName
    // 			itemStatus
    // 			itemURL
    // 		}
    // 	}
    // }`,
    // UPDATE_COURSE: gql`
    // mutation updateCourse($courseId: String!, $courseName: String!, $courseStatus: String!) {
    // 	updateCourse(courseId: $courseId, courseName: $courseName, courseStatus: $courseStatus)
    // }`,

    CREATE_PATIENT: gql`
	mutation createPaitent($sId: String!, $email: String!){
		createPaitent(sId: $sId, email: $email) {
            sId
            email
        },  
    },
    `,

    UPDATE_PATIENT: gql`
    mutation updatePaitent(
        $sId: String!,
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
        updatePaitent(
            sId: $sId,
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
    }
    `,
};
