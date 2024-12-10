import { useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { BACKEND_URL } from "../config";

export function SignUp () {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post (BACKEND_URL + "/api/v1/user/signup", {
            data: {
                username: username,
                password: password
            }
        })
        alert("You have signed up")
    }
    return (    
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <InputBox ref={usernameRef} placeholder="Username"></InputBox>
                <InputBox ref={passwordRef} placeholder="Password"></InputBox>
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variants="primary" text="Signup" fullWidth={true}  ></Button>
                </div>
            </div>
        </div>
    )
}