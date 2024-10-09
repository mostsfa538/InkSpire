import useAuth from "../hooks/useAuth"

function App() {
    const { user, logout } = useAuth()
    return (
    <>
        Hello {user && (<button onClick={logout}>Logout</button>)}
    </>
  )
}

export default App
