import { createContext, useCallback, useMemo, useState } from "react";

interface authContext {
    token: string | null,
    name: string | null,
    isLogged: boolean,
    login: ( login: string, password: string ) => void
}

interface authResponse {
    token: string
}


export const AuthContext = createContext( {} as authContext )


const initialState = localStorage.getItem( 'user' )


export const AuthProvider: React.FC<{children: JSX.Element}> = ( { children } ) => {

    const [ token, setToken ] = useState( initialState )

    const login = useCallback(
        ( login: string, password: string ) => {
            fetch( `${import.meta.env.VITE_API_URL}/auth`, {
                headers: {
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify( { login, password })
            })
            .then( response => {
                if( response.status !== 200 ) {
                    throw new Error( response.statusText )
                }
                return response.json()
            } )
            .then( (response:authResponse) => {
                localStorage.setItem( 'user', response.token )
                setToken( response.token )
            } )
            .catch( ( err: Error ) => console.log( err.message ) )
        }
    , [] )

    const isLogged = token !== null

    const payload = (isLogged) ? JSON.parse( atob( token.split( '.' )[1] ) ) : { name: 'Guest' }

    const {name} = payload

    console.log( payload )
    

    return (
        <AuthContext.Provider value={{token, name, isLogged, login}}>{children}</AuthContext.Provider>
    )
}

