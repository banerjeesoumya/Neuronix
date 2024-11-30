import { ReactElement } from "react";

interface ButtonInterface {
    title: string;
    size: "lg" | "md" | "sm";
    startIcon? : ReactElement;
    endIcon? : ReactElement;
}

const sizeStyles = {
    "lg" : "px-8 py-4 text-xl",
    "sm" : "px-2 py-1 text-sm",
    "md" : "px-4 py-2 text-md"
}

export const Button = (props : ButtonInterface) => {
    return (
        <button className={sizeStyles[props.size] + " bg-red-200"}>
            <div className="flex items-center">
            {props.startIcon}
            {props.title}
            </div>
        </button>
    )
}