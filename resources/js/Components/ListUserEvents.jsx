import React, {useEffect, useState} from 'react';
import EditModal from "@/Components/SmallComponents/EditModal.jsx";
import CreateEventForm from "@/Components/Forms/CreateEventForm.jsx";

const ListUserEvents = ({eventName,description,date,location,event_id,onDelete}) => {
    const [showModal, setShowModal] = useState(false);
    const [isTruncated, setIsTruncated] = useState(true);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const closeModal = () =>{
        setShowModal(false)
    }

    useEffect(() => {
        const element = document.getElementById('description');
        if (element) {
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, [description]);

    const handleDelete = async () => {
        try {
            // Make a DELETE request to the backend API to delete the event
            await axios.delete(`/user/events/${event_id}`);
            // If deletion is successful, call the onDelete callback function
            onDelete();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    return (
        <>
            <div
                className={"relative shadow-xl rounded-xl bg-slate-900 hover:transform hover:z-10 hover:scale-105 transition-transform"}>
                <img className={"w-full h-64 rounded-xl"}
                     src="https://ik.imagekit.io/3paggvhlz/triangle-texture-futuristic-abstract-background_279525-26876.avif?updatedAt=1709198358474"
                     alt="Image Description"/>
                <div className={"absolute bottom-0 right-0 p-4"}>
                    <button
                        onClick={handleDelete}
                        className={"text-white font-bold rounded-md px-2.5 p-1.5 bg-[#e00202]"}
                        >Delete</button>

                </div>
                <div className="absolute bottom-0 left-0 p-4">
                    <button
                        className={"text-white font-bold rounded-md p-1.5"}
                        onClick={toggleModal}>Edit</button>

                </div>
                <div className={"absolute top-0 start-0 end-0"}>
                    <div className={"p-4 md:p-5"}>
                        <h3 className={"text-4xl font-extrabold text-white font-sans"}>{eventName}</h3>
                        <div className={"bg-slate-600 bg-opacity-10 flex flex-wrap items-center p-2 rounded-lg"}>
                            <span className={"text-gray-200 ml-4"}>{location} <span
                                className="text-xs text-gray-200">{date}</span></span>
                        </div>
                        <p className={`mt-1 text-slate-600 ${isTruncated ? 'overflow-hidden overflow-ellipsis' : ''}`}
                           style={{ maxHeight: '3em', WebkitLineClamp: 4 }}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className={"fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 bg-black"}>
                    <EditModal
                        event_id={event_id}
                    closeModal={closeModal}/>
                </div>
            )}
        </>
    );
};

export default ListUserEvents;

