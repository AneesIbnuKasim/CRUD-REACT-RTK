import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editUser } from '../app/userReducer'
import Swal from 'sweetalert2'

function Update() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();
    
    
    const {users} = useSelector(state=>state.app)
    const singleUser = users.find(user=>user.id===id)

  const schema = Yup.object({
    name: Yup.string()
      .min(3, 'min length should be 3')
      .required('name required'),
    email: Yup.string()
      .email('Invalid email')
      .min(3, 'min length should be 3')
      .required('email required'),
    gender: Yup.string().required('gender required'),
    city: Yup.string()
      .min(3, 'min length should be 3')
      .required('name required'),
  })
    
  const handleSubmit = async(values, {resetForm}) => {
    const response = await Swal.fire({
      title: 'Are you sure to update?',
      confirmButtonText: 'Yes, Update',
      showCancelButton: true,
      cancelButtonText: 'No'
    })
    if(response.isConfirmed) {
    dispatch(editUser({...singleUser,...values}))
    resetForm()
    navigate('/read')
    }
  }

  return (
    <Formik
      initialValues={{
        name: singleUser?.name,
        email: singleUser?.email,
        city: singleUser?.city,
        gender: singleUser?.gender
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

          {/* City field */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <Field name="city" className="form-control" />
            {touched.email && errors.email && (
              <div className="text-danger small">{errors.city}</div>
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
            Update
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Update