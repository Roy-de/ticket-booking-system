import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberInput from "@/Components/SmallComponents/NumberInput.jsx";

const Tickets = ({ description, selectedEventId, setIsModalOpen }) => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        ticket_type: '',
        no_of_tickets: 1,
        event_id: selectedEventId
    });

    useEffect(() => {
        axios.post(`/tickets/${selectedEventId}`, { eventId: selectedEventId })
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [selectedEventId]);

    function convertToUpperCase(text) {
        return text.toUpperCase();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/ticket/purchase", formData);
            // Handle success
            console.log("Ticket booked successfully!");
        } catch (error) {
            console.error('Error booking ticket:', error.response.data);
            // Handle error
        }finally {
            setIsModalOpen(false)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'ticketType') { // Exclude 'ticketType'
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleNumberOfTicketsChange = (newValue) => {
        setFormData(prevState => ({
            ...prevState,
            no_of_tickets: newValue
        }));
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90">
            <form onSubmit={handleSubmit}>
                <div className="p-6 max-w-4xl bg-slate-800 rounded-2xl">
                    <div className="flex justify-between flex-wrap p-6 items-center">
                        <span className="text-white font-extrabold pl-12">Book Ticket</span>
                        <button className="p-2" onClick={() => setIsModalOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-x text-white">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2">
                            <div className="p-6">
                                <span className="text-white">{description}</span>
                            </div>
                            <div className="p-6">
                                <div className="mb-5">
                                    <span className="text-white font-extrabold">Available tickets</span>
                                </div>
                                {data.map((ticket) => (
                                    <div className="mb-4 flex flex-wrap items-center" key={ticket.id}>
                                        <span className="text-white font-extrabold">{convertToUpperCase(ticket.type)}</span>
                                        <span className="ml-3 font-bold text-white">Ksh: {ticket.price}</span>
                                        <span className="ml-4 test-sm text-gray-500">{ticket.available_tickets} left</span>
                                    </div>
                                ))}
                                <div className="p-2">
                                    <div className="mb-4">
                                        <input
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="py-3 px-4 block w-full rounded-lg font-bold bg-slate-900 border-gray-700 text-gray-400"
                                            type="email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <select
                                            name="ticket_type"
                                            value={formData.ticket_type}
                                            onChange={handleInputChange}
                                            className="py-3 px-4 pe-9 block w-full rounded-lg font-bold focus:border-blue-500 focus:ring-blue-500 bg-slate-900 border-gray-700 text-gray-400"
                                        >
                                            <option value="">Select Ticket Type</option>
                                            {data.map((ticket) => (
                                                <option key={ticket.id} value={ticket.type}>{ticket.type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <NumberInput
                                        value={formData.no_of_tickets}
                                        onChange={handleNumberOfTicketsChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center">
                            <button
                                type="submit"
                                className="mt-6 bg-blue-700 px-7 py-5 rounded-xl text-white font-extrabold hover:transform hover:scale-105 transition-transform"
                            >
                                Book now
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Tickets;

