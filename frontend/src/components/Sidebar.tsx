import { Logo } from "../icons/logo";
import { TwitterIcon } from "../icons/twitter";
import { YoutubeIcon } from "../icons/youtube";
import { Item } from "./Item";

export function SideBar () {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top 0">
            <div className="flex text-2xl pt-4 items-center">
                <div>
                    <Logo />
                </div>
                Neuronix
            </div>
            <div className="pt-4 pb-2">
                <Item text="Twitter" icon={<TwitterIcon />}></Item>
                <Item text="Youtube" icon={<YoutubeIcon />}></Item>
            </div>
        </div>
    )
}