

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

const getPatient = `query ($id: String!) {
    getPatient(id: $id) {
            pId
            id
            patientName
            introduction
            address
            suburb
            addressState
            postcode
            speakingLanguage
            phone
            email
            updatedAt
            createdAt
            appointments{
                appointmentStartDateTime
                appointmentFinishDateTime
                appointmentStatus
                reason
                timezone
                patientName
                doctorName
                location
            }
        }
    }
    `;

export { getPatient };

