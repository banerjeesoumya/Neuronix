interface InputBoxProps {
    placeholder : string,
    ref?: React.MutableRefObject
}


export function InputBox (props : InputBoxProps) {
    return (
        <div    >
            <input ref={props.ref} type="text" placeholder={props.placeholder} className="px-4 py-2 border rounded-md m-2" onChange={props.onChange}/>
        </div>
    )
}