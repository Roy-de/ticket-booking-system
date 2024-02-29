import React from 'react';
import { Inertia } from '@inertiajs/inertia';
const LandingPageBody = () => {
    const handleEventsButtonClick = () => {
        Inertia.visit('/tickets'); // Navigate to the /tickets URL
    };

    return (
            <div className={"container px-4 flex flex-wrap"}>
                <div className={"items-center justify-center pt-48 w-screen pl-32"}>
                    <div className={"justify-between flex"}>
                        <img
                            src={"https://ik.imagekit.io/3paggvhlz/pngtree-water-is-a-beautiful-abstract-design-and-can-be-really-cool-picture-image_2711922-transformed.png?updatedAt=1709068957950"}
                            alt={"Image"} className={"w-5/6 h-5/6 rounded-lg pr-20"}/>
                        <div className={"max-w-md lg:max-w-lg mx-auto lg:mx-0"}>
                            <h1 className={"font-serif text-7xl font-extrabold mb-6"}>
                                <span className={"text-white"}>Ticket<span className={"text-green-500"}>Hub</span></span></h1>
                            <h1 className={"font-serif text-5xl xs:text-6xl font-bold mb-6 text-white"}>
                                <span>Unlock Your Next </span><span
                                className={"font-serif italic"}>Experience</span><span> with TicketHub!</span>
                            </h1>

                            <h1 className={"text-gray-400"}>
                                Welcome to TicketHub – your go-to destination for unforgettable experiences! With our
                                user-friendly platform, extensive event selection, and secure booking process, we ensure
                                every moment leading up to your event is filled with anticipation and joy. Choose
                                TicketHub
                                for
                                convenience, reliability, and endless entertainment. Let's make your next event
                                extraordinary – together!
                            </h1>
                            <div className={"m-20"}>
                                <button
                                    onClick={handleEventsButtonClick}
                                    className={"flex items-center text-white font-bold bg-blue-700 rounded-lg pt-4 pb-4 pl-10 pr-10 mt-4 hover:transform hover:scale-110 transition-transform duration-200"}>

                                    Events
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round" className="lucide lucide-move-right ml-2">
                                        <path d="M18 8L22 12L18 16"/>
                                        <path d="M2 12H22"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

    );
};

export default LandingPageBody;
