import {React, useState} from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    setPassword(e.target.value);
  }
  const handleLogin = () => {
    if(username === 'admin' && password === 'admin'){
        setError('');
        navigate('/app');
    }
    else{
        setError('Invalid Credentials');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-neutral-900 to-zinc-900">
      <div className="bg-[#171717] p-8 rounded-lg shadow-lg text-white w-[20rem]">
        <h2 className="text-2xl mb-6 font-nunito">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input type="text" className="w-full p-2 rounded-lg bg-gray-700" onChange={handleChange}/>
        </div>
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          <input type="password" className="w-full p-2 rounded-lg bg-gray-700" onChange={handleChange} />
        </div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 p-2 rounded-lg font-nunito"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
