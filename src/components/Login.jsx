    import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        
        var decodedHeader = jwtDecode(response.credential);
        console.log(decodedHeader);
        localStorage.setItem('user', JSON.stringify(decodedHeader));

        const { name, sub, picture } = decodedHeader;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', {replace: true})
            })
    }
  return (
    <div className='flex justify-start itemps-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video
                src={shareVideo}
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className="w-full h-full object-cover"
            />
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className='p-5'>
                    <img src={logo} width="130px" alt='logo' />
                </div>
                <div className='shadow-2x1'>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
                        <GoogleLogin 
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center-items-center p-3 rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    
                                >
                                    <FcGoogle className='mr-4' />
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            cookiePolicy="single_host_origin"
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login