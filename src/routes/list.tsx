import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../core/auth'
import { IWord, Word } from '../components/words-list/word'
import { Link } from 'react-router-dom'


export const WordsScreen = () => {

    const [ words, setWords ] = useState( [] )

    const user = useContext( AuthContext )

    useEffect( () => {
        fetch( `${import.meta.env.VITE_API_URL}/words`, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then( response => {
            if( response.status !== 200 ) {
                throw new Error( response.statusText )
            }
            return response.json()
        } )
        .then( (response ) => {
            setWords( response )
        } )
        .catch( ( err: Error ) => console.log( err.message ) )
    }, [] )

    return (
        <div id="wordsScreen">
            <div className="newWord">
                <Link className="button" to="/new-word">Add new word</Link>
            </div>
            <div className="list">
                {
                    words.map( (word:IWord) => <Word {...word}></Word> )
                }
            </div>
        </div>
    )
}