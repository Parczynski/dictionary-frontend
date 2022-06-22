import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../core/auth"
import { BackButton } from "../back/backbutton"
import { TextInput } from '../input/input'

import './newword.scss'

export const NewWord= () => {

    const user = useContext( AuthContext )
    const [ word, setWord ] = useState( '' )
    const [ meaning, setMeaning ] = useState( '' )
    const [ phonetic, setPhonetic ] = useState( '' )
    const [ translate, setTranslate ] = useState( '' )
    const [ examples, setExamples ] = useState( '' )

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        fetch( `${import.meta.env.VITE_API_URL}/words`, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            method: 'POST',
            body: JSON.stringify( { word, meaning, phonetic, translate, examples })
        })
        .then( response => response.json() )
        .then( response => console.log( response ) )
    }
    

    return (
        <form id="newWordForm" onSubmit={onSubmit}>
            <h1>New Word</h1>

            <BackButton />
            
            <TextInput value={word} onChange={setWord} title="Word" />
            <TextInput value={meaning} onChange={setMeaning} title="Meaning" />
            <TextInput value={phonetic} onChange={setPhonetic} title="Phonetic" />
            <TextInput value={translate} onChange={setTranslate} title="Translate" />
            <TextInput value={examples} onChange={setExamples} title="Examples" />

            <input type="submit" value="save" />

        </form>
    )

}