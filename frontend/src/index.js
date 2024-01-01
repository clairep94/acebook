import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      
      {/* <div className='bg-gray-50 dark:bg-slate-800 
      -z-20 relative h-screen text-gray-900 dark:text-white'> */}

        <App />

          {/* pink gradient */}
          {/* <div className="bg-[#bddcf3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] 
          rounded-full blur-[10rem] sm:w-[68.75rem]
          dark:bg-[#946263]"></div> */}
          {/* purple gradient */}
          {/* <div className="bg-[#c4d7f1] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] 
          rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-8rem]
          dark:bg-[#676394]"></div> */}
{/* 
      </div> */}
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


