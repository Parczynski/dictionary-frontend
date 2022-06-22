import { useId } from "react"

import './input.scss'

type Props = {
    onChange: React.Dispatch<any>,
    value: string,
    title: string
}

export const TextInput = ( { onChange, value, title }:Props ) => {

    const id = useId()

    return (
        <div className="input">
            <label htmlFor={id}>{title}</label>
            <input onChange={ (e) => onChange( e.target.value )} type="text" id={id} value={value} placeholder={title} />
        </div>
    )
}