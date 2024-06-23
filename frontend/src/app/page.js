import Link from "next/link";
import Image from "next/image";
import Loginpage from "./login/page";
import bankImage from "./../../public/bank-hero.jpg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-[url('./../../public/bank-hero.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Ver's Banksite</h1>
          <p className="text-lg mb-6">
            Secure, Reliable, and Easy Banking Experience
          </p>
          <Link href="/createuser" className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300">
              Create User
          </Link>
        </div>
      </div>
      {/* Additional Content */}
      <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-gray-400 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Personal Accounts</h3>
            <p className="text-gray-600 text-center">
              Manage your personal finances with ease.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Business Accounts</h3>
            <p className="text-gray-600 text-center">
              Grow your business with our tailored services.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Investments</h3>
            <p className="text-gray-600 text-center">
              Secure your future with our investment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
