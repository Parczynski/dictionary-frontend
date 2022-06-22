import { FormEvent, useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
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

    // const getWordData = useCallback( debounce( ( value: string ) => {
    //     fetch( /** Words API */ )
    //         .then( response => response.json() )
    //         .then( response => {
    //             console.log( response )
    //             const word = response.pop() as IDictionaryWord
    //             setPhonetic( word.phonetic )
    //             setMeaning( word.meanings[0].definitions[0].definition )
    //         })
    // }, 1000 ), [] )

    const navigate = useNavigate()

    const updateWord = ( value: string ) => {
        setWord( value )
        // getWordData( value )
    }

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
        .then( response => navigate( '/' ) )
    }
    

    return (
        <form id="newWordForm" onSubmit={onSubmit}>
            <h1>New Word</h1>

            <BackButton />
            
            <TextInput value={word} onChange={updateWord} title="Word" />
            <TextInput value={meaning} onChange={setMeaning} title="Meaning" />
            <TextInput value={phonetic} onChange={setPhonetic} title="Phonetic" />
            <TextInput value={translate} onChange={setTranslate} title="Translate" />
            <TextInput value={examples} onChange={setExamples} title="Examples" />

            <input type="submit" value="save" />

        </form>
    )

}


function debounce( cb: CallableFunction, timeout: number ) {

    let timeoutHandler: number

    return ( ...args: any[] ) => {

        clearInterval( timeoutHandler )

        timeoutHandler = setTimeout( () => {
            cb( ...args )
        }, timeout )
        
    }



}