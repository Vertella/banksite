import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex flex-row h-10 py-2 justify-center bg-gray-900">
            <div className="flex w-10/12 justify-around text-gray-300">
                <div><Link href="/">Hem</Link></div>
                <div><Link href="/login">Log In</Link></div>
                <div><Link href="/createuser">Create User</Link></div>
            </div>
        </div>
    );
};

export default Navbar;