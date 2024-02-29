import React, { useEffect, useRef, useState } from 'react';

import { Link } from '@inertiajs/react';
import Signup from "@/Pages/Auth/Signup.jsx";
import Signin from "@/Pages/Auth/Signin.jsx";

const LandingPageNavbar = ({ auth }) => {
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isSigninModalOpen, setSigninModalOpen] = useState(false);
    const signupRef = useRef(null);
    const signinRef = useRef(null);

    const openSignupModal = () => {
        setSignupModalOpen(true);
    };

    const closeSignupModal = () => {
        setSignupModalOpen(false);
    };

    const openSigninModal = () => {
        setSigninModalOpen(true);
    };

    const closeSigninModal = () => {
        setSigninModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (signupRef.current && !signupRef.current.contains(event.target)) {
                setSignupModalOpen(false);
            }
            if (signinRef.current && !signinRef.current.contains(event.target)) {
                setSigninModalOpen(false);
            }
        };
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setSignupModalOpen(false);
                setSigninModalOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <>
            <nav className="items-center z-50 rounded-lg justify-between flex px-20 w-screen top-1 fixed">
                <span className="flex-none text-2xl font-extrabold">Ticket<span className="text-green-500  font-mono text-3xl font-extrabold">Hub</span></span>
                <div className="flex flex-wrap items-center justify-between">
                    <>
                        <div className="m-4">
                            <button onClick={openSignupModal} className="text-white font-extrabold bg-blue-700 rounded-lg py-3 px-6 hover:transform hover:scale-105 transition-transform">Signup</button>
                        </div>
                        <div className="m-6">
                            <button onClick={openSigninModal} className="py-3 px-6 font-extrabold rounded-lg border border-gray-700 text-gray-400 hover:text-blue-500 hover:border-blue-600 focus:outline-none focus:ring-1 focus:ring-gray-600 hover:transform hover:scale-105 transition-transform">Signin</button>
                        </div>
                    </>
                    {/*{auth.user ? (
                        <Link to="/dashboard" className="m-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Dashboard</Link>
                    ) : (

                    )}*/}
                </div>
            </nav>
            {isSignupModalOpen && <div ref={signupRef}><Signup /></div>}
            {isSigninModalOpen && <div ref={signinRef}><Signin /></div>}
        </>
    );
};

export default LandingPageNavbar;
