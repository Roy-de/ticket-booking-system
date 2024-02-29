import React, {useState} from 'react';
import CreateEventForm from "@/Components/Forms/CreateEventForm.jsx";

const CreateButton = ({refresh}) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const closeModal = () =>{
        setShowModal(false)
    }

    return (
        <>
            <button
                onClick={toggleModal}
                className={"flex items-center text-white font-extrabold bg-blue-700 rounded-xl py-5 px-7 mt-4  hover:transform hover:scale-105 transition-transform"}>
                New Event
                <div className={"pl-4"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-chevron-right">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </div>
            </button>
            {showModal && (<div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 m-30">
                    <CreateEventForm
                        refresh={refresh}
                    closeModal={closeModal}
                    />
            </div>)}
        </>
    );
};

export default CreateButton;
