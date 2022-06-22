import { FormEvent, useCallback, useContext, useState } from 'react'
import { AuthContext } from '../../core/auth'
import './auth.scss'


export const AuthForm = () => {
    
    const user = useContext( AuthContext )
    const [ login, setLogin ] = useState( '' )
    const [ password, setPassword ] = useState( '' )

    const onSubmit = ( e: FormEvent ) => {
        e.preventDefault()
        user.login( login, password )
    }
    
    return (
        <form className='authForm' onSubmit={onSubmit}>
            <h1>Sign In</h1>

            <input type="text" name="login" placeholder="login" value={login} onChange={ (e) => setLogin( e.target.value ) } />

            <input type="password" name="password" placeholder="password" value={password} onChange={ (e) => setPassword( e.target.value ) } />

            <input type="submit" value="Sign In" />
        </form>
    )
}