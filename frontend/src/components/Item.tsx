import { ReactElement } from "react"

interface ItemProps {
    text : string,
    icon : ReactElement
}

export function Item (props : ItemProps) {
    return (
        <div className="flex text-gray-700 py-2 pl-6 cursor-pointer hover:text-purple-400 hover:bg-gray-200">
            <div className="pr-2">
                {props.icon}
            </div>
            <div>
                {props.text}
            </div>  
        </div>
    )
}