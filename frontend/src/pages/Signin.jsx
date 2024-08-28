import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AppbarHomepage} from "../components/AppbarHomepage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (e, setter) => {
        const value = e.target.value;
        console.log(value);
        setter(value);
    }

    async function handlelogin (e) {
        e.prevent.default();
        console.log(username, password)
            const response = await axios.post("https://pay-sphere-your-digital-vault-81im.vercel.app/api/v1/user/signin", {
                username: username,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard')
            })      
    }

    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading sub_heading={"Enter your information to sign in."}/>
                    <form onSubmit={handlelogin}>
                        <Input label={"Email"} placeholder="john@example.com" onChange={e => handleChange(e, setUsername)}/>
                        <Input label={"Password"} placeholder="123456" onChange={e => handleChange(e, setPassword)}/>
                        <div className="mt-4">
                            <Button children={"Sign in"} typeb="submit"/>
                        </div>
                    </form>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}

export default Signin;