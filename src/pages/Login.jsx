import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../services/Auth';
import { message } from "antd";
import { FacebookOutlined } from '@ant-design/icons';
import { setAxiosInstanceToken } from '../services/axiosInstance';

//img
import InstagramLogo from '../static/logo/Instagram-Logo.png'

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await Auth.login({ email: email.current.value, password: password.current.value })
      message.success(data.message);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAxiosInstanceToken(data.token)
      navigate('/')
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  return (
    <div className='w-full h-svh border flex flex-col items-center justify-start p-5'>
      <div className='border w-80 h-auto flex flex-col items-center justify-start p-5 mb-4'>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center mb-6'>
          {/*<h1 className='text-4xl font-semibold mb-8'>Instagram</h1>*/}
          <img src={InstagramLogo} alt="" className='w-44' />
          <input type="email" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-1 rounded-sm' ref={email} placeholder='email' />
          <input type="password" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-3 rounded-sm' ref={password} placeholder='Password' />
          <button className='w-full py-1 text-sm font-semibold text-white bg-blue-400 rounded-md'>Log in</button>
        </form>
        <div className='w-full flex items-center justify-between mb-7'>
          <span className='bg-secondary w-full h-[1px]' />
          <h3 className='mx-4'>OR</h3>
          <span className='bg-secondary w-full h-[1px]' />
        </div>
        <div>
          <div className='flex items-center justify-center text-center mb-3 font-semibold text-blue-900'>
            <FacebookOutlined className='bg-blue-950 text-white text-xl mr-2' />
            <a href="https://www.facebook.com/">Log in with Facebook</a>
          </div>
          <h4 className='text-center text-[12px] font-semibold text-blue-900'>Forgot password?</h4>
        </div>
      </div>
      <div className='w-80 h-auto border flex items-center justify-center p-3'>
        <h3>Don't have an account?</h3>
        <Link to='/signup' className='text-blue-400 font-semibold ml-1'>Sign up</Link>
      </div>
    </div>
  )
}

export default Login