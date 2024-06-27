'use client'

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const loginPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    fetch('http://'+ process.env.NEXT_PUBLIC_BACKEND_HOST + ':3000/sessions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
    } else {
        console.log('login failed')
      }
    }).then((data) => {
      const newOtp = data.onetimepass
      console.log(JSON.stringify(data.onetimepass))
      console.log('Your OTP:' + newOtp)
      setOtp(newOtp);
      //router.push('/account')

    })
  }

  const handleConfirmOtp = () => {
    router.push('/account');
  };

  return (
    <div className="flex flex-col content-center items-center w-full min-h-screen bg-gray-800">
      <h1 className="text-lg text-gray-200">Log In</h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="circuslover123"
            required=""
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          ></input>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <p>Log in</p>
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            href="createuser"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </form>
      {otp && (
        <div className="mt-4 p-4 border border-green-500 text-green-500 rounded">
          <p>Your one-time password is: <strong>{otp}</strong></p>
          <button
            onClick={handleConfirmOtp}
            className="mt-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            I have copied the OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default loginPage;
