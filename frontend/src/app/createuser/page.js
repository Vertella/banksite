'use client'

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const createAccount = () => {
    const router = useRouter();
    const handleSubmit = (event) => {
        
        event.preventDefault();

        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        fetch('http://'+ process.env.NEXT_PUBLIC_BACKEND_HOST + ':3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                router.push('/login')
              }
        })
        .then(data => console.log(data));
    };
    return (
        <div className='flex flex-col content-center items-center w-full min-h-screen bg-gray-800'>
            <h1 className="flex py-4 text-2xl text-gray-200">Create your account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="circuslover123" required=""></input>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                </div>
                <button type="submit" className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <p>Submit</p>
                </button>
            </form>
        </div>
        
    );
}

export default createAccount;