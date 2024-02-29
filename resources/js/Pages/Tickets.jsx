import React from 'react';
import ListEvents from "@/Components/ListEvents.jsx";
import LandingPageNavbar from "@/Layouts/LandingPageNavbar.jsx";
import {Head} from "@inertiajs/react";

const Tickets = ({auth}) => {
    return (
    <div className={"h-screen flex flex-col"}>
        <Head title={"TicketHub"}/>
        <div className={"bg-gradient-to-tr from-pink-950 via-indigo-900 to-slate-900 flex h-screen items-center"}>
            <LandingPageNavbar auth={auth}/>
        <div className={"items-center flex flex-col justify-center h-screen w-screen"}>
            <ListEvents/>
        </div>
        </div>
    </div>
    );
};

export default Tickets;
