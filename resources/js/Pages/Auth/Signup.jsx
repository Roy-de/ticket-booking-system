import React, {useState} from 'react';
import Input from "@/Constants/Input.jsx";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData);
            console.log(response.data); // Log the response from the server
            // Optionally, reset the form after successful registration
            console.log("Success")
            const { email, password } = formData;
            // Perform auto login using sign up credentials
            await axios.post('/login', {email, password});
            const token = response.data.token;

            localStorage.setItem('token', token);
            console.log(token)
            // Redirect to dashboard upon successful login
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            window.location.href = '/dashboard';
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',

            });

        } catch (error) {
            console.error(error); // Log any errors that occur during the request
        }
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90">
                <div className="z-50 border rounded-xl shadow-md bg-gray-800 border-gray-700">
                    <div className="mb-8 p-10 max-w-xl mx-auto">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-y-4">
                                    <div>

                                        <Input
                                            onChange={handleChange}
                                            value={formData.name}
                                            htmlFor={"name"}
                                            label={"Full Name"}
                                            type={"text"}
                                            name={"name"}
                                            description={"text-error"}
                                        />
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please
                                            include your name so we can get back to you</p>
                                    </div>
                                    <div>

                                        <Input
                                            onChange={handleChange}
                                            value={formData.email}
                                            htmlFor={"email"}
                                            label={"Email address"}
                                            type={"email"}
                                            name={"email"}
                                            description={"email-error"}
                                        />
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please
                                            include
                                            a
                                            valid email address so we can get back to you</p>
                                    </div>
                                    <div>

                                        <Input
                                            onChange={handleChange}
                                            value={formData.password}
                                            htmlFor={"password"}
                                            name={"password"}
                                            type={"password"}
                                            label={"Password"}
                                            description={"password-error"}/>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+
                                            characters
                                            required</p>
                                    </div>
                                    <div>
                                        <Input
                                            onChange={handleChange}
                                            value={formData.password_confirmation}
                                            htmlFor="password_confirmation"
                                            name="password_confirmation" // Update name prop to match the field name in formData
                                            type="password"
                                            label="Confirm password"
                                            description="password-error"
                                        />
                                        <p className="hidden text-xs text-red-600 mt-2"
                                           id="confirm-password-error">Password
                                            does not match the password</p>
                                    </div>
                                    <button type="submit"
                                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign
                                        up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Signup;
