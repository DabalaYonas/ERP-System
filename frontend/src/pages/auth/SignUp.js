import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { FaGlobe, FaRegEnvelope, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export async function register(user) {
    return axios.post('http://127.0.0.1:8000/user/register/api/', user, 
      {headers: {'Content-Type': 'application/json'}, withCredentials: true});
}

function SignUp() {
    const [inputs, setInputs] = useState({});
    const [eyeOpened, setEyeOpened] = useState(false);
    const [paaswordType, setPasswordType] = useState("password");
    const navigate = useNavigate();
    
    function handleChange(e) {
      var name = e.target.name;
      var value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(e) {
      e.preventDefault();
      console.log(inputs);

      const user = {
        name: inputs.fullName,
        email: inputs.email,
        password: inputs.password
      }

      console.log(user);

      register(user).then(response => {
        if (response.status === 200) {
          console.log(response.data);
          // navigate("/");
        }
      });
    }

    return <div className="font-[sans-serif] bg-gray-50 h-lvh">
    <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
      <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your free account</h4>
    </div>

    <div className="mx-4 mb-4 -mt-16">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
        
        <div className="grid md:grid-cols-2 gap-8">
          <TextField 
            label="Full Name"
            placeholder="Enter full name"
            type="text"
            name="fullName"
            handleChange={handleChange}
            value={inputs.firstName}>
              <FaUser className="w-[18px] h-[18px] absolute right-4 cursor-pointer" fill="#bbb" stroke="#bbb"/>
          </TextField>

          <TextField 
            label="Email"
            placeholder="Enter email"
            type="email"
            name="email"
            handleChange={handleChange}
            value={inputs.lastName}>
              <FaRegEnvelope className="w-[18px] h-[18px] absolute right-4 cursor-pointer" fill="#bbb" stroke="#bbb"/>
          </TextField>
          
          <TextField 
            label="Company Name"
            placeholder="Enter company name"
            type="text"
            name="companyName"
            handleChange={handleChange}
            value={inputs.phoneNumber}>
              <FaGlobe className="w-[18px] h-[18px] absolute right-4 cursor-pointer" fill="#bbb" stroke="#bbb"/>
          </TextField>

          <TextField 
            label="Password"
            placeholder="Enter password"
            type={paaswordType}
            name="password"
            handleChange={handleChange}
            value={inputs.password}>
            {eyeOpened ? 
              <FaRegEye fill='#bbb' stroke='#bbb' className='w-[18px] h-[18px] absolute right-4 cursor-pointer' onClick={() => {setPasswordType("password"); setEyeOpened(!eyeOpened)}} /> :
              <FaRegEyeSlash fill='#bbb' stroke='#bbb' className='w-[18px] h-[18px] absolute right-4 cursor-pointer' onClick={() => {setPasswordType("text"); setEyeOpened(!eyeOpened)}}  />
            }
          </TextField>
          
          <TextField 
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            type={paaswordType}
            name="confirmPassword"
            handleChange={handleChange}
            value={inputs.confirmPassword}>
            {eyeOpened ? 
              <FaRegEye fill='#bbb' stroke='#bbb' className='w-[18px] h-[18px] absolute right-4 cursor-pointer' onClick={() => {setPasswordType("password"); setEyeOpened(!eyeOpened)}} /> :
              <FaRegEyeSlash fill='#bbb' stroke='#bbb' className='w-[18px] h-[18px] absolute right-4 cursor-pointer' onClick={() => {setPasswordType("text"); setEyeOpened(!eyeOpened)}}  />
            }
          </TextField>
        </div>

        <div className="mt-8">
          <Button type="submit" text="Register" onClick={() => {console.log("Login clicked")}} />
        </div>
        <p className="text-sm mt-8 text-center text-gray-800">I have an account? <Link to="/login" className="text-primary-600 font-semibold tracking-wide hover:underline ml-1">Log in here</Link></p>
      
      </form>
    </div>
  </div>
}

export default SignUp;