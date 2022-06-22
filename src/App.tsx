import { useContext } from "react"
import { AuthForm } from "./components/auth/auth"
import { WordsScreen } from "./routes/list"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "./core/auth"
import { NewWord } from "./components/newword/newword"

function App() {
	const user = useContext( AuthContext )

	console.log( {user} )


	if( ! user.isLogged ) {
		return ( <AuthForm></AuthForm>)
	}

  	return (
		<main>
			<Routes>
				<Route path="/" element={<WordsScreen />}></Route>
				<Route path="/new-word" element={<NewWord />}></Route>
			</Routes>
		</main>
  	)
}

export default App
