import { useState } from "react"
import "./Login.css"
import QrScanner from "qr-scanner"
import { useNavigate } from "react-router-dom"


const Login = ()=>{
    const [file, setFile] = useState(null)
    const [data, setData] = useState({})
    const [form, setForm] = useState(false)

    const navigate = useNavigate()

    const ScanQr = async ()=>{
        const result = await QrScanner.scanImage(file)
        console.log(JSON.parse(result))
        setData(JSON.parse(result))
        setForm(true)
    }

    const handleBack = ()=>{
        navigate("/")
    }

    return (
        <div className="login_container">
            <div onClick={handleBack} className="back_button">
                Back
            </div>
            <div className="login_content">
                <h1>Details</h1>
                <div className="scan_form">
                    <input 
                    type="file" 
                    onChange={(e)=>setFile(e.target.files[0])}
                    />
                    <button onClick={ScanQr} >Scan Qr Image</button>
                </div>

                {form && <div className="form">
                    <table className="user_data">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td>{data.date}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{data.gender}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{data.weight}</td>
                            </tr>
                            <tr>
                                <td>Blood Group</td>
                                <td>{data.bloodGroup}</td>
                            </tr>
                            <tr>
                                <td>Medicines</td>
                                <td>{data.medicines || "Not specified"}</td>
                            </tr>
                            <tr>
                                <td>Prescriptions</td>
                                <td>{data.prescription || "Not specified"}</td>
                            </tr>
                            <tr>
                                <td>Doctor Assigned</td>
                                <td>{data.doctorAssigned || "Not specified"}</td>
                            </tr>
                        </tbody>
                    </table>  
                </div>}
            </div>
        </div>
    )
}

export default Login