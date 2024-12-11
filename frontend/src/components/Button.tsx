import { ReactElement } from "react";

interface ButtonProps {
    variants: "primary" | "secondary",
    text: string,
    startIcon?: ReactElement,
    onClick?: () => void,
    fullWidth?: boolean,
    loading?: boolean
}

const variantTypes = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-400"
};

const defaultStyles = "px-2 py-2 rounded-md font-normal"

export function Button (props : ButtonProps) {    
    return(
        <button onClick={props.onClick} className={variantTypes[props.variants] + " " + defaultStyles + `${props.fullWidth ? " w-full flex justify-center" : ""}`} disabled={props.loading}>
            <div className="flex items-center">
            <div className="pr-1">
                {props.startIcon}
            </div>
            {props.text}
            </div>
        </button>
    )
}