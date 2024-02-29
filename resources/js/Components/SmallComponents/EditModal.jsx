import React, {useEffect, useState} from 'react';

const EditModal = ({event_id,closeModal}) => {
    const [data, setData] = useState([]);
    const [ticketData, setTicketData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        available: '',
        ticketTypes: [],
    });

    useEffect(() => {
        axios.get(`/events/${event_id}`)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching event data:', error));

        axios.post(`/tickets/${event_id}`, { eventId: event_id })
            .then(response => setTicketData(response.data))
            .catch(error => console.error('Error fetching ticket data:', error));
    }, [event_id]);

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                description: data.description || '',
                date: data.date || '',
                location: data.location || '',
                available: data.available || '',
                ticketTypes: data.ticketTypes ? data.ticketTypes.map(ticket => ({
                    ticketType: ticket.type,
                    price: ticket.price,
                    available_tickets: ticket.available_tickets
                })) : [],
            });
        }
    }, [data]);

    const handleAddTicketType = () => {
        setFormData((prevData) => ({
            ...prevData,
            ticketTypes: [...prevData.ticketTypes, { type: '', price: '', available_tickets: '' }],
        }));
    };

    const handleRemoveTicketType = (index) => {
        const updatedTicketTypes = [...formData.ticketTypes];
        updatedTicketTypes.splice(index, 1);
        setFormData((prevData) => ({ ...prevData, ticketTypes: updatedTicketTypes }));
    };

    const handleChange = (e, index, name) => {
        const { value } = e.target;
        const updatedTicketTypes = [...formData.ticketTypes];
        updatedTicketTypes[index][name] = value;
        setFormData((prevData) => ({ ...prevData, ticketTypes: updatedTicketTypes }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventData = {
                name: formData.name,
                description: formData.description,
                date: formData.date,
                location: formData.location,
                available: formData.available,
                ticketTypes: formData.ticketTypes.map(ticketType => ({
                    type: ticketType.type,
                    price: ticketType.price,
                    available_tickets: ticketType.available_tickets
                }))
            };

            const eventResponse = await axios.put(`/events/${event_id}`, eventData);
            console.log('Event updated successfully:', eventResponse.data);
            closeModal();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };



    return(
        <>
            <div className={"relative"}>
                <form
                    className={"bg-slate-600 p-5 rounded-2xl bg-opacity-90 flex flex-wrap items-center max-w-4xl"}>
                    <div className={"m-4 flex flex-wrap justify-between items-center w-screen"}>
                        <h2 className="text-2xl font-bold text-white ">Edit Event</h2>
                        <button onClick={closeModal} className={"p-2 m-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-x text-white">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className={"grid grid-cols-2 gap-10 mt-4"}>
                        <div className={"p-6"}>
                            <input
                                placeholder={data.name}
                                type={"text"}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={"py-3 px-4 pt-2 w-full rounded-lg font-bold bg-slate-500 placeholder:text-white text-gray-200 bg-opacity-40 mb-4"}
                            /><input
                            placeholder={data.date}
                            type={"date"}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={"py-3 px-4 pt-2 w-full rounded-lg font-bold bg-slate-500 placeholder:text-white text-gray-200 bg-opacity-40 mb-4"}
                        />
                            <input
                                placeholder={data.location}
                                type={"text"}
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className={"py-3 px-4 w-full rounded-lg font-bold  bg-slate-500 text-gray-100 bg-opacity-40 placeholder:text-white mb-4"}
                            />
                            <textarea
                                placeholder={data.description}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className={"py-3 px-4 w-full rounded-lg font-bold  bg-slate-500 placeholder:text-white text-gray-200 bg-opacity-40 mb-4"}
                            />
                            <input
                                placeholder={data.available}
                                type={"text"}
                                value={formData.available}
                                onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                                className={"py-3 px-4  rounded-lg font-bold  bg-slate-500 placeholder:text-white text-gray-200 bg-opacity-40 mb-4"}
                            />
                        </div>

                        <div className={"p-6"}>
                            {formData.ticketTypes.map((ticketType, index)=>(
                                <div className={"grid grid-cols-2 gap-6"}>
                                    <div className={"mb-4"}>
                                        <input
                                            placeholder={''}
                                            type={"text"}
                                            value={ticketType.type}
                                            onChange={(e) => handleChange(e, index, 'type')}
                                            className={"py-3 px-4 w-full rounded-lg font-bold placeholder:text-white bg-slate-500 text-gray-200 bg-opacity-40"}
                                        />
                                    </div>
                                    <div className={"mb-4"}>
                                        <input
                                            placeholder={''}
                                            type={"number"}
                                            value={ticketType.price}
                                            onChange={(e) => handleChange(e, index, 'price')}
                                            className={"py-3 px-4 w-full rounded-lg font-bold placeholder:text-white bg-slate-500 text-gray-200 bg-opacity-40 mb-4"}
                                        /><input
                                        placeholder={''}
                                        type={"number"}
                                        value={ticketType.available_tickets}
                                        onChange={(e) => handleChange(e, index, 'available_tickets')}
                                        className={"py-3 px-4 w-full rounded-lg font-bold placeholder:text-white bg-slate-500 text-gray-200 bg-opacity-40 "}
                                    />
                                    </div>
                                </div>
                            ))}
                            <div className={"p-2 flex flex-wrap justify-between text-white font-extrabold "}>
                                <button type="button"
                                        className={"left-0 flex items-center border border-blue-700 px-2 py-1 rounded-md bg-blue-700"}
                                        onClick={handleAddTicketType}>
                                    Add
                                    <div className={"pl-2"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round" className="lucide lucide-plus text-white">
                                            <path d="M5 12h14"/>
                                            <path d="M12 5v14"/>
                                        </svg>
                                    </div>

                                </button>
                                <button type="button"
                                        className={"right-0 flex items-center border border-red-700 px-2 py-1 rounded-md bg-red-700"}
                                        onClick={handleRemoveTicketType}>Remove
                                    <div className={"pl-2"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="lucide lucide-minus">
                                            <path d="M5 12h14"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <button type={"button"}
                                    onClick={handleSubmit}
                                    className={"ml-32 mt-8 m-2 text-white font-bold bg-blue-700 rounded-lg px-8 py-3.5 text-l hover:transition transition-transform hover:scale-105"}>Save
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
        ;
};

export default EditModal;
