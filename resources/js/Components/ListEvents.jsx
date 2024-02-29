import React, {useEffect, useState} from 'react';
import Tickets from "@/Components/Tickets.jsx";
import TicketCard from "@/Components/SmallComponents/TicketCard.jsx";

const ListEvents = () => {
    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get('/events')
            .then(response => setData(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },[])
    console.log(data)
    return (
        <>
            <div className={"p-6 h-screen items-center justify-center"}>
                <div className={"m-2 px-10 py-2"}>
                    <div className={"mb-6 pt-10 m-6"}>
                        <h1 className={"text-white text-2xl font-bold"}>Available Events</h1>
                    </div>
                    <div className={"mh-4 m-6"}>
                        <p className={"text-white"}>Explore the exciting lineup of upcoming events! From
                            conferences
                            and
                            workshops to networking sessions and seminars, our platform offers a diverse range
                            of
                            opportunities for learning, collaboration, and professional growth. Browse through
                            the
                            list
                            of events below to find the perfect ones to attend and enrich your knowledge and
                            skills.</p>
                    </div>
                </div>
                <div className={"h-3/4 p-4 flex flex-wrap  items-center justify-between w-5/6 pl-64"}>
                    <div className={"p-4 grid grid-cols-2 overflow-y-scroll items-center pl-4 gap-10 h-full w-full"}>
                        {data.map((item) => (
                            <TicketCard
                                description={item.description}
                                date={item.date}
                                location={item.name}
                                name={item.name}
                                id={item.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListEvents;
