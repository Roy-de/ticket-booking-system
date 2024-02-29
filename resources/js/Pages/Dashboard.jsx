import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ListUserEvents from "@/Components/ListUserEvents.jsx";
import CreateButton from "@/Constants/CreateButton.jsx";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [events, setEvents] = useState([]); // State to hold events

    useEffect(() => {
        axios.get('/user/events')
            .then(response => setEvents(response.data.Events))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[])
    console.log(events)
    const fetchEvents = () => {
        axios.get('/user/events')
            .then(response => setEvents(response.data.Events))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className={"flex flex-wrap items-center justify-center p-10 h-screen w-screen"}>
                <div className={"h-3/4 p-4 flex flex-wrap  items-center justify-between w-5/6 pl-"}>
                    <div className={"grid grid-cols-2 gap-4 p-6 overflow-y-scroll items-center h-full w-full"}>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div className={"p-2"}>
                                    <ListUserEvents
                                        key={event.id}
                                        date={event.date}
                                        description={event.description}
                                        location={event.location}
                                        eventName={event.name}
                                        event_id={event.id}
                                        onDelete={fetchEvents}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No events available</p>
                        )}
                    </div>
                    <CreateButton refresh={fetchEvents}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
