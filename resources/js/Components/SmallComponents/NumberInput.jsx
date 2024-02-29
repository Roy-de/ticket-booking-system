import React from 'react';

const NumberInput = ({ value, onChange, onValueChange }) => {
    const handleIncrement = () => {
        if (value < 5) {
            onChange(value + 1);
            onValueChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > 1) {
            onChange(value - 1);
            onValueChange(value - 1);
        }
    };

    return (
        <div className="py-3 px-4 block w-full rounded-lg bg-slate-900 border border-gray-700">
            <div className="w-full flex justify-between items-center gap-x-5">
                <div className="grow">
                    <input
                        className="w-full p-0 bg-transparent border-0 text-gray-500 focus:ring-0"
                        type="text"
                        value={value}
                        readOnly
                    />
                </div>
                <div className="flex justify-end items-center gap-x-1.5">
                    <button
                        type="button"
                        className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={handleDecrement}
                    >
                        <svg
                            className="flex-shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={handleIncrement}
                        disabled={value >= 5}
                    >
                        <svg
                            className="flex-shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NumberInput;
