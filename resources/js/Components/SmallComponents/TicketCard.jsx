import React, {useState} from 'react';
import Tickets from "@/Components/Tickets.jsx";

const TicketCard = ({date,name,location,description,id}) => {
    const[description1,setDescription1] =useState();
    const [selectedEventId, setSelectedEventId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePurchaseTicket = (eventId,description) => {
        console.log('Selected event ID:', eventId);
        setSelectedEventId(eventId);
        setDescription1(description)
        setIsModalOpen(true);

    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    return (
        <>
            <div
                className={"relative mb-10 p-4 max-w-xl w-full shadow-gray-800 drop-shadow-2xl"} key={id}>
                <div
                    style={{backgroundImage: `url('https://ik.imagekit.io/3paggvhlz/pngtree-water-is-a-beautiful-abstract-design-and-can-be-really-cool-picture-image_2711922-transformed.png?updatedAt=1709008227535')`}}
                    className={"relative shadow-xl rounded-xl bg-center bg-no-repeat hover:transform hover:z-10 hover:scale-105 transition-transform"}>
                    <div className={"border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 bg-slate-900 border-gray-700"}>
                        <p className={"mt-1 text-md text-gray-500 font-semibold"}>{formatDate(date)}</p>
                    </div>
                    <div className={"p-10"}>
                        <h3 className={"text-xl font-bold text-white"}>
                            {name}
                        </h3>
                        <h3 className={"text-md font-semibold text-gray-400"}>
                            {location}
                        </h3>
                        <p className={"mt-2 text-gray-500 overflow-hidden overflow-ellipsis"}
                           style={{ maxHeight: '2em', WebkitLineClamp: 2 }}>
                            {description}
                        </p>
                        <button
                            onClick={() => handlePurchaseTicket(id, description)}
                            className={"flex items-center text-white font-bold bg-blue-700 rounded-lg py-2 px-4 mt-4 hover:bg-blue-800"}
                        >
                            Purchase Ticket
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-move-right ml-2"
                            >
                                <path d="M18 8L22 12L18 16"/>
                                <path d="M2 12H22"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen &&
                <Tickets description={description1} selectedEventId={selectedEventId} setIsModalOpen={setIsModalOpen}/>}
        </>
    );
};

export default TicketCard;
