import React from 'react';

const Input = ({htmlFor,label,type,name,description,value,onChange}) => {
    return (
        <>
            <label htmlFor={htmlFor} className={"text-sm mb-2 text-white"}>{label}</label>
            <input
                onChange={onChange}
                value={value}
                type={type}
                name={name}
                className="py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500  bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
                required aria-describedby={description}
            />
        </>
    );
};

export default Input;
