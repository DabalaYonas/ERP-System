import TextField from '../../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Button, message } from 'antd';
import { AuthContext } from '../../context/AuthContext';

function Login() {

    const [inputs, setInputs] = useState({});
    const [eyeOpened, setEyeOpened] = useState(false);
    const [paaswordType, setPasswordType] = useState("password");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    function handleChange(e) {
      var name = e.target.name;
      var value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await login(inputs.email, inputs.password);
        navigate("/");
      } catch (error) {
        const msg = error.message === "Network Error" ? error.message : error.response.data.detail;
        message.error(msg);
        console.error(msg);
      }
    }

    return <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
    <div className="grid md:grid-cols-2 items-center gap-8 h-full">
      <form onSubmit={handleSubmit} className="max-w-lg max-md:mx-auto w-full p-6">
        <div className="mb-12">
          <h3 className="text-gray-800 text-4xl font-extrabold dark:text-white">Sign in</h3>
          <p className="text-gray-800 text-sm mt-6 dark:text-white">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
        </div>

        <TextField
          label="Email"
          placeholder="Enter Email"
          type="text"
          name="email"
            handleChange={handleChange}
            value={inputs.email}>
            <FaRegEnvelope className='w-[18px] h-[18px] absolute right-4' fill='#bbb' stroke='#bbb' />
        </TextField>

        <div className="mt-4">
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
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 h-4 w-4 text-primary-600 focus:ring-blue-500 border-gray-300 rounded-md  hover:cursor-pointer" />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-600  hover:cursor-pointer">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="jajvascript:void(0);" className="text-primary-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Button type='primary' className='w-full' size='large' htmlType='submit'>Log in</Button>
        </div>
        <p className="text-sm mt-8 text-center text-gray-800">Don't have an account? <Link to="/signup" className="text-primary-600 font-semibold tracking-wide hover:underline ml-1">Register here</Link></p>
      </form>

      <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
        <img src="./Dashboard.webp" 
          className="rounded-lg lg:block md:block shadow-2xl lg:w-5/6 lg:h-5/6 md:w-11/12 md:h-5/6 sm:hidden z-50 relative object-cover object-left" alt="Dashboard image of login page" />
      </div>
    </div>
  </div>
}

export default Login;