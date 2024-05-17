import { useNavigate } from "react-router-dom"
import "./Home.css"

const Home = ()=>{

    const navigate = useNavigate()

    const handleRegister = ()=>{
        navigate("/register")
    }
    const handleLogin = ()=>{
        navigate("/login")
    }

    return (
        <div className='container'>
            <div className='main'>
                <h1>Patient QRcode system</h1>
                <img src="1.png" alt="logo" />
                <div className='buttons'>
                    <button onClick={handleRegister} >Register</button>
                    <button onClick={handleLogin} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Home