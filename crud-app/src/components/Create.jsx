import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { createUser } from '../app/userReducer'
import { useNavigate } from 'react-router-dom'

function Create() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const schema = Yup.object({
    name: Yup.string()
      .min(3, 'min length should be 3')
      .required('name required'),
    email: Yup.string()
      .email('Invalid email')
      .min(3, 'min length should be 3')
      .required('email required'),
    gender: Yup.string().required('gender required'),
  })
    
  const handleSubmit = (values, {resetForm}) => {
    resetForm()
    dispatch(createUser(values))
    navigate('/read')
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        gender: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ errors, touched }) => (
        <Form className="container mt-4 p-3 border rounded shadow-sm" style={{ maxWidth: '500px' }}>
          {/* Name field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Field name="name" className="form-control" />
            {touched.name && errors.name && (
              <div className="text-danger small">{errors.name}</div>
            )}
          </div>

          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field name="email" className="form-control" />
            {touched.email && errors.email && (
              <div className="text-danger small">{errors.email}</div>
            )}
          </div>

          {/* Gender radio buttons */}
          <div className="mb-3">
            <label className="form-label d-block">Gender</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  className="form-check-input"
                  id="male"
                />
                <label htmlFor="male" className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-check-input"
                  id="female"
                />
                <label htmlFor="female" className="form-check-label">Female</label>
              </div>
            </div>
            {touched.gender && errors.gender && (
              <div className="text-danger small">{errors.gender}</div>
            )}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Create