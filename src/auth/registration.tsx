import React from 'react';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StyledButton } from "@/components/button/button-lellall";
import Input from "@/components/input/input";
import { theme } from "@/theme/theme";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/path/to/auth.context'; // Adjust the import path to your auth context
import { useRegisterMutation } from '@/redux/api/auth/auth.api';

// Define the validation schema to match the Login component's fields
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{11,14}$/, 'Phone number must be between 11 and 14 digits and only numbers'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm Password is required'),
}).required();

const Registration = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  // const { register, isRegistering: isLoading, isRegisterSuccess } = useAuth();
  const [
    register,
    {
      isLoading,
      error: registerError,
      isSuccess: isRegisterSuccess,
      data: registerResponse,
    },
  ] = useRegisterMutation();

  const password = watch("password", "");

  // Navigate to success page on successful registration
  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/success");
    }
  }, [isRegisterSuccess, navigate]);

  const onSubmit = async (data) => {
    const { confirmPassword, ...rest } = data; // Exclude confirmPassword from the data sent to the register function
    const dataform = { ...rest, role: "CONSUMER", platformType: "WEB" };

    try {
      await register(dataform);
      toast.success('Registration successful! Please check your email for verification.');
    } catch (error) {
      toast.error('Registration failed: ' + (error.data?.message || 'An error occurred'));
    }
  };

  return (
    <div className="">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-green-900">Join Us</h1>
        <p className="mt-2 text-sm">Create an account to get started</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="First Name"
              placeholder="Enter first name"
              type="text"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="Last Name"
              placeholder="Enter last name"
              type="text"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              error={errors.phoneNumber?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="Email"
              placeholder="Enter your email"
              type="email"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              width='350px'
              label="Confirm Password"
              placeholder="Enter your password"
              type="password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />
        <div className="">
          <StyledButton
            background={theme.colors.active}
            color={theme.colors.secondary}
            width='350px'
            variant="outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'SIGN UP'}
          </StyledButton>
        </div>
        <div className="flex mt-2 justify-center">
          <Button
            variant='link'
            className="mb-2 text-xs"
            onClick={() => navigate("/login")}
          >
            Already have an account? <span className="text-green-800 text-[14px]">Sign In</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;