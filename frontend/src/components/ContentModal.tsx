import { CloseIcon } from "../icons/close"
import { Button } from "./Button"
import { InputBox } from "./InputBox"

interface ContentModalProps {
    open : boolean,
    onClose: () => void
}


export function ContentModal(props : ContentModalProps) {
    return (
        <div>
            {props.open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded-md">
                        <div className="flex justify-end cursor-pointer" onClick={props.onClose}>
                            <CloseIcon/>
                        </div>
                        <div>
                            <InputBox placeholder={"Title"}/>
                            <InputBox placeholder={"Link"} />
                        </div>
                        <div className="flex justify-center">
                            <Button variants="primary" text="Submit"/>
                        </div>
                    </span>
                </div>
        </div>}
        </div>
    )
}