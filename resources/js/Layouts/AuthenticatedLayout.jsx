import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <>
            <div className={"bg-gradient-to-tr from-pink-950 via-indigo-900 to-slate-900 h-screen flex items-center"}>
                <nav className="items-center z-50 rounded-lg justify-between flex px-20 w-screen top-8 fixed">

                        <div className={"p-2"}>
                            <span className="flex-none text-2xl font-extrabold">Ticket
                            <span className={"text-green-500  font-mono text-3xl font-extrabold"}>Hub</span></span>
                        </div>

                        <div>
                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-5 py-3 font-medium rounded-xl text-white text-lg hover:bg-blue-700 transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                </nav>
                <main>{children}</main>
            </div>
        </>
    );
}
