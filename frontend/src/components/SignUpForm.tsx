import React, { useState } from 'react';
import { Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = yup
  .object({
    username: yup.string().required("Username is required").min(2, "Username must be at least 2 characters"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>§]/, 'Password must contain at least one special character')
      .matches(/[0-9]/, 'Password must contain at least one number')
    ,
    passwordRepeat: yup.string().required("Password confirmation is required").oneOf([yup.ref('password')], 'Passwords must match'),
    termsAndConditions: yup.boolean().oneOf([true], 'Please agree to the terms and conditions')
  })

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  termsAndConditions?: boolean;
}
interface RegisterFormProps {
  onDone: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onDone }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), })

  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  // I hate when you cant do this
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordRepeatVisible, setPasswordRepeatVisible] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data)

    setloading(true)

    // simulate a server request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setloading(false)
    setSuccess(true)
  }

  return (<>
    {loading && <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 200 }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>}
    {success && <div>
      <div className="text-center" style={{ fontSize: 100 }}>🥳</div>
      <strong className="d-block h4 text-center m-3">Congratulation, you have successfully signed up to Lab Inventory Tracker.</strong>

      <div className='d-flex gap-1 justify-content-end'>
        <Button onClick={onDone} variant='primary'>Close</Button>
      </div>
    </div>}

    {(!loading && !success) && <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="signupform-username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          isInvalid={!!errors.username}
          {...register("username", { required: true })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupform-email" >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          isInvalid={!!errors.email}
          {...register("email")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupform-password">
        <Form.Label>Password</Form.Label>

        <InputGroup hasValidation>
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            isInvalid={!!errors.password}
            {...register("password")}
          />
          <Button variant="outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </Button>

          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupform-passwordRepeat">
        <Form.Label>Confirm Password</Form.Label>

        <InputGroup hasValidation>
          <Form.Control
            type={passwordRepeatVisible ? "text" : "password"}
            isInvalid={!!errors.passwordRepeat}
            {...register("passwordRepeat")}
          />
          <Button variant="outline-secondary" onClick={() => setPasswordRepeatVisible(!passwordRepeatVisible)}>
            {passwordRepeatVisible ? <FaEyeSlash /> : <FaEye />}
          </Button>

          <Form.Control.Feedback type="invalid">
            {errors.passwordRepeat?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Yeah, not part of the requirements but while we're at it, let's add a checkbox just for fun */}
      <Form.Group className="mb-3" controlId="signupform-termsAndConditions">
        <div className={errors.termsAndConditions ? 'is-invalid' : ''}> {/* workaround for bootstraps css for invalid Feedback */}
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            isInvalid={!!errors.termsAndConditions}
            {...register("termsAndConditions")}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.termsAndConditions?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-flex gap-1 justify-content-end'>
        <Button onClick={onDone} variant='outline-secondary'>Close</Button>
        <Button type="submit">Sign Up</Button>
      </div>
    </Form >}
  </>);
};

export default RegisterForm;