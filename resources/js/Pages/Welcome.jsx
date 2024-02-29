import { Link, Head } from '@inertiajs/react';
import LandingPageBody from "@/Layouts/LandingPageBody.jsx";
import LandingPageNavbar from "@/Layouts/LandingPageNavbar.jsx";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to TicketHub"/>
            <div className={"bg-gradient-to-tr from-pink-950 via-indigo-900 to-slate-900 h-screen flex items-center"}>
                <LandingPageNavbar
                auth={auth}/>
                <LandingPageBody/>
            </div>
        </>
    );
}
