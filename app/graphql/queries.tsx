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

const getDoctor = `query ($id: String!) {
      getDoctor(id: $id) {
            pId
            id
            doctorName
            introduction
            address
            suburb
            addressState
            postcode
            speakingLanguage
            phone
            email
            hospitalName
            photoUrl
            availableHours
            bookedHours
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

const listDoctors = `{
    listDoctors {
                pId
                id
                doctorName
                introduction
                address
                suburb
                addressState
                postcode
                speakingLanguage
                phone
                email
                hospitalName
                photoUrl
                availableHours,
                bookedHours,
                }
            }
            `;

const getAppointment = `query ($id: String!) {
            getAppointment(id: $id) {
                pId
                id
                doctorId
                patientId
                appointmentStartDateTime
                appointmentFinishDateTime
                appointmentStatus
                reason
                timezone
                patientName
                doctorName
                location
                updatedAt
                createdAt
                }
            }
        `;


export { getPatient, getDoctor, listDoctors, getAppointment };

