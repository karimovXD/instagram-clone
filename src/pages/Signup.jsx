import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../services/Auth';
import { message } from "antd";
import { FacebookOutlined } from '@ant-design/icons';

//image
import logo from '../static/logo/Instagram-Logo.png'
import { setAxiosInstanceToken } from '../services/axiosInstance';

export const Register = () => {

  const navigate = useNavigate();
  const name = useRef();
  const surname = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await Auth.register({
        name: name.current.value,
        surname: surname.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      message.success(data.message);
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAxiosInstanceToken(data.token)
      navigate('/');

    } catch (error) {
      message.error(error.response.data.message);
    }

  }

  return (
    <div className='w-full h-svh flex flex-col items-center justify-start p-5'>
      <div className="border w-80 h-auto flex flex-col items-center justify-start p-5 mb-4">
        <div className='flex flex-col text-center justify-start items-center mb-5'>
          <img src={logo} alt="" className='w-44 h-auto leading-3' />
          <h2 className='text-gray-500 font-semibold text-md mb-4'>Sign up to see photos and videos from your friend.</h2>
          <Link className='w-full border flex items-center justify-center py-1 bg-blue-600 text-white font-semibold rounded-md'>
            <FacebookOutlined className='mr-2' />
            Log in with Facebook
          </Link>
        </div>
        <div className='w-full flex items-center justify-between mb-5'>
          <span className='bg-secondary w-full h-[1px]' />
          <h3 className='mx-4'>OR</h3>
          <span className='bg-secondary w-full h-[1px]' />
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
          <input type="text" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-1 rounded-sm' ref={name} placeholder='Name' />
          <input type="text" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-1 rounded-sm' ref={surname} placeholder='Surname' />
          <input type="text" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-1 rounded-sm' ref={email} placeholder='Email' />
          <input type="text" className='w-full border h-9 px-2 text-xs bg-slate-100 outline-gray-300 mb-1 rounded-sm' ref={password} placeholder='Password' />
          <div className="text-center my-4">
            <p className='text-xs font-normal text-gray-600'>
              People who use our service may have uploaded your contact information to Instagram.
              <a href="https://www.facebook.com/help/instagram/1128997980474717" className='font-medium text-blue-900 ml-[5px]'>Learn More</a></p>
          </div>
          <div className="text-center my-4">
            <p className='text-xs font-normal text-gray-600'>
              By signing up, you agree to our
              <a href="https://help.instagram.com/581066165581870" className='font-medium text-blue-900 ml-[5px]'>Terms</a>
              <a href="https://www.facebook.com/privacy/policy" className='font-medium text-blue-900 mx-[4px]'>Privacy Policy</a> and
              <a href="https://privacycenter.instagram.com/policies/cookies/" className='font-medium text-blue-900 ml-[5px]'>Cookies Policy.</a>
            </p>
          </div>
          <button className='w-full py-1 text-sm font-semibold text-white bg-blue-400 rounded-md'>Sign up</button>
        </form>
      </div>
      <div className='w-80 h-auto border flex items-center justify-center p-3'>
        <h3>Have an account?</h3>
        <Link to='/login' className='text-blue-400 font-semibold ml-1'>Log in</Link>
      </div>
    </div>
  )
}

export default Register