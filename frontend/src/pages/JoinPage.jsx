import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const JoinPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#f9f1e7] to-[#f0d9b5] font-sans relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-30">
        <span className="text-lg whitespace-nowrap">Already have an account?</span>
        <button
          className="bg-orange-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-orange-700"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
      </div>
      <div className="w-2/5 flex flex-col justify-center p-12 bg-white shadow-lg relative z-20">
        <RegisterForm />
      </div>
      <div className="w-3/5 relative overflow-hidden">
        <img
          src="/src/assets/logo-bird.png"
          alt="Logo Bird"
          className="absolute bottom-0 right-0 max-h-[90vh] max-w-[65vw] m-8 select-none pointer-events-none"
        />
        <img
          src="/src/assets/Vector 2.svg"
          alt=""
          className="absolute bottom-0 left-0 w-full select-none pointer-events-none"
        />
      </div>
    </div>
  );
};

export default JoinPage;
