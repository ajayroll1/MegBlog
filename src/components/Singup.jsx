import React, { useState } from 'react';
import authService from '../apwrite/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Logo } from '../components/Logo';

function Signup() {  // Fixed the typo from "Singup" to "Signup"
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();  // Correctly call useDispatch as a function
  const { register, handleSubmit } = useForm();  // Fixed the import name "useForm"

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();  // Changed the variable name to avoid conflict
        if (currentUser) {
          dispatch(Login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black">
        <div className="mb-2 flex justify-center">  {/* Fixed typo "justify-centre" to "justify-center" */}
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In {/* Changed "Sign Up" to "Sign In" to avoid confusion */}
          </Link>
        </p>

        {error && <p className="mt-8 text-center text-red-500">{error}</p>}  {/* Fixed error display class name */}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">  {/* Fixed typo "spcae-y-5" to "space-y-5" */}
            <input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <input  // Changed "Input" to "input" as it seems like a native HTML input is intended
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />



             <input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
          </div>
          <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
