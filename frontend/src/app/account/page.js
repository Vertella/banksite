"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountPage = () => {
  const [saldo, setSaldo] = useState(null);

  const fetchSaldo = (event) => {
    event.preventDefault();

    const onetimepass = event.target.elements.onetimepass.value;

    fetch("http://"+ process.env.NEXT_PUBLIC_BACKEND_HOST + ":3000/me/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        onetimepass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.amount !== undefined) {
          setSaldo(data.amount);
        } else {
          console.log("Amount not found in response");
        }
      })
      .catch((error) => {
        console.log("Error fetching", error);
      });
  };

  const depositMoney = (event) => {
    event.preventDefault();

    const onetimepass = event.target.elements.onetimepass.value;
    const amount = parseFloat(event.target.elements.amount.value);

    fetch("http://"+ process.env.NEXT_PUBLIC_BACKEND_HOST + ":3000/me/accounts/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        onetimepass,
        amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.newBalance !== undefined) {
          setSaldo(data.newBalance);
        } else {
          console.log("Deposit failed or new balance not found in response");
        }
      })
      .catch((error) => {
        console.log("Error depositing money", error);
      });
  };


  return (
    <div className=" flex flex-col content-center items-center w-full min-h-screen bg-gray-800">
      <p className="text-2xl text-gray-300">Your Account</p>
      <div className="flex flex-row"> 
        <div className="flex flex-col p2 content-between ">
          <p className="flex border p-2 w-full self-center text-gray-300">Saldo</p>
          <div className="border">
            <form className="space-y-4 md:space-y-6" onSubmit={fetchSaldo}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  One time pass
                  <input
                    name="onetimepass"
                    placeholder="12345"
                    required=""
                    className="bg-gray-500 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                </label>
              </div>
              <button 
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Se saldo
                </button>
            </form>
            {saldo !== null && (
              <p className="mt-4 text-gray-300">Current Saldo: {saldo} SEK</p>
            )}
          </div>
        </div>
        <div className="flex flex-col p2 content-between">
          <p className="flex border p-2 w-full self-center text-gray-300">Deposit money</p>
          <div className="border">
            <form className="space-y-4 md:space-y-6" onSubmit={depositMoney}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  One time pass
                  <input
                    name="onetimepass"
                    placeholder="12345"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Amount
                  <input
                    name="amount"
                    type="number"
                    placeholder="100"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></input>
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Deposit Funds
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
      

  );
};

export default AccountPage;
