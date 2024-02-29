import React from 'react';

const NavBar = () => {
    const handleLogout=()=>{
        axios.post('/logout',)
            .then(response => console.log(response))
            .catch(error => console.log("Error ",error))
    }
    return (
        <>
                <nav className="items-center z-50 rounded-lg justify-between flex px-20 w-screen top-8 fixed">
                        <span className="flex-none text-2xl font-extrabold">Ticket<span
                            className={"text-green-500  font-mono text-3xl font-extrabold"}>Hub</span></span>
                    <div className="flex items-center pr-10">
                        <button
                            onClick={handleLogout}
                            className={"py-3 px-6 font-extrabold rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:bg-[#e00202] hover:transform hover:scale-105 transition-transform"}>Logout
                        </button>
                    </div>
                </nav>
            {/*</header>*/}
        </>
    );
};

export default NavBar;
