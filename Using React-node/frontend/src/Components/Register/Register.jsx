import { useNavigate } from "react-router-dom"
import "./Register.css"
import newRequest from "../../utils/newRequest"
import { useState } from "react"
import QRCode from "qrcode"

const Register = ()=>{

    const [message, setMessage] = useState(null)
    const [qrcode, setQrcode] = useState(false)
    const [qrUrl, setQrUrl] = useState("")

    const [data, setData] = useState({
        name: "",
        email: "",
        address:"",
        date:"",
        mobile:"",
        gender:"",
        weight:"",
        bloodGroup:"",
        aadhar:"",
    })

    const navigate = useNavigate()

    const generateQRcode = async ()=>{
        const qr = await QRCode.toDataURL(JSON.stringify(data))
        setQrUrl(qr)
    }   

    const  handleBack = ()=>{
        navigate("/")
    }

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await newRequest.post("/api/user/register", {
                ...data
            })
            if(res.status===201){
                setMessage("User registered!")
                generateQRcode()
                setQrcode(true)
                console.log("User registered!")
            }else{
                setMessage(res.data.errmsg || "Failed to register!")
            }
        }catch(err){
            setMessage(err.response.data.msg||"Please provide all the details ")
            console.log(err.response.data.msg)
        }
    }

    return (
        <div className="register_container">
            <div className="back_button" onClick={handleBack} >Back</div>
            <div className="form_container">
                <h1>Register</h1>
                <form className="register_form" onSubmit={handleSubmit}>
                    <div className="left">
                        <label htmlFor="name">Enter Name:</label>
                        <input type="text" name="name" onChange={handleChange} id="name" placeholder="Enter your name" required />
                        <label htmlFor="address">Enter Address:</label>
                        <input type="text" name="address" onChange={handleChange} id="address" placeholder="Enter your address" required />
                        <label htmlFor="mobile">Enter mobile:</label>
                        <input type="text" name="mobile" onChange={handleChange} id="mobile" maxLength={10} placeholder="Enter your mobile" pattern="[9678]{1}[0-9]{9}" required />
                        <label htmlFor="weight">Enter Weight:</label>
                        <input type="number" min={1} max={200} name="weight" onChange={handleChange} id="weight" placeholder="Enter your weight" required />
                        <button type="submit">Register</button>
                        <span>{message && message}</span>
                    </div>
                    <div className="right">
                        <label htmlFor="email">Enter Email:</label>
                        <input type="email" name="email" onChange={handleChange} id="email" placeholder="Enter your email" required />
                        <label htmlFor="date">Enter date of birth:</label>
                        <input type="date" name="date" onChange={handleChange} id="date" placeholder="Enter your DOB" required />
                        <label htmlFor="gender">Enter Gender:</label>
                        <input type="text" name="gender" onChange={handleChange} id="gender" placeholder="Enter your gender" required />
                        <label htmlFor="bloodGroup">Enter Blood Group:</label>
                        <input type="text" name="bloodGroup" onChange={handleChange} id="bloodGroup" placeholder="Enter your blood group" required />
                        <label htmlFor="aadhar">Enter Aadhar No.:</label>
                        <input type="text" name="aadhar" onChange={handleChange} id="aadhar" placeholder="Enter your aadhar no." required />
                    </div>
                </form>
                {qrcode && (
                        <div className="qrcode">    
                            <h2>Your QRcode</h2>
                            <a href={qrUrl} download="qr.png">
                                <img src={qrUrl} alt="QRCode" />
                            </a>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Register