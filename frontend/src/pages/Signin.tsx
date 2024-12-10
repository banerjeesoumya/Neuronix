import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export function SignIn () {
    return (    
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <InputBox placeholder="Username"></InputBox>
                <InputBox placeholder="Password"></InputBox>
                <div className="flex justify-center pt-4">
                    <Button variants="primary" text="SignIn" fullWidth={true}  ></Button>
                </div>
            </div>
        </div>
    )
}