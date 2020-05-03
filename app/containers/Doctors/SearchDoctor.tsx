/*
 *
 * Search Doctor
 *
 */

import React, { memo } from 'react';
import styled from 'styles/styled-components';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormError } from 'components/Form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { searchDoctorsAction } from './actions';
import reducer from '../User/reducer';
import saga from '../User/saga';

const SearchWrap = styled.form`
  display: flex;
  background-color:#fff;
  margin-bottom:30px;
  padding:5px;
  justify-content: space-between;
  input{
    line-height: 2.3;
    border: 0;
    margin-right: 10px;
    min-width: 220px;
    &:first-child{
        border-right: 1px solid #e5e5e5;
    }
    &:focus{
        outline:none;
    }
  }
  button{
    background-color: #089408;
    color: #fff;
    width: 50px;
    height: 35px;
    border-radius: 3px;
  }
  .from-message{
    top: 6px;
    left: -20px;
    position: relative;
  }
`;

const validationSchema = Yup.object().shape({
    postcode: Yup.number()
        .min(4, '4 numbers')
});

interface Props { }

function SearchDoctor(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: 'user', reducer: reducer });
    useInjectSaga({ key: 'user', saga: saga });

    const dispatch = useDispatch();
    return (

        <Formik
            initialValues={{
                doctorName: '',
                postcode: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                const { doctorName, postcode } = values;
                dispatch(searchDoctorsAction(doctorName, postcode));
                setTimeout(() => {
                    setSubmitting(false);
                }, 500);
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                    <SearchWrap
                        onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="doctorName"
                            placeholder="Search by provider name"
                            value={values.doctorName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormError
                            touched={touched.doctorName}
                            message={errors.doctorName} />
                        <input
                            type="number"
                            name="postcode"
                            placeholder="Postcode"
                            value={values.postcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormError
                            touched={touched.postcode}
                            message={errors.postcode} />
                        <button type="submit" disabled={isSubmitting}>-></button>
                    </SearchWrap>
                )}
        </Formik>

    );
}

export default memo(SearchDoctor);
