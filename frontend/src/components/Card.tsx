import { DeleteIcon } from "../icons/delete";
import { NoteBookIcon } from "../icons/notebook";
import { ShareIcon } from "../icons/share";

interface CardInterface {
    title: string,
    link: string,
    type: "twitter" | "youtube"
};


export function Card(props: CardInterface) {
    return (
        <div>
            <div className="p-4 bg-white rounded-md shadow-md border-gray-200 border max-w-72 min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="pr-2">
                            <NoteBookIcon />
                        </div>
                        {props.title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-3">
                            <a href={props.link} target="_blank"></a>
                            <ShareIcon />
                        </div>
                        <DeleteIcon />
                    </div>
                </div>
                <div className="pt-2">
                    {
                        props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                    {
                        props.type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={props.link.replace("x", "twitter")}></a> 
                    </blockquote>   
                    }             
                </div>
            </div> 
        </div>
    )
}

