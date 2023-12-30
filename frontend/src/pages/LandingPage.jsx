import React, {useState} from 'react'
import LogInForm from '../components/auth/LoginForm';
import SignUpForm from '../components/user/SignUpForm';


export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);

    const viewLogin = () => {
        setShowLogin(true);
    }
    const viewSignUp = () => {
        setShowLogin(false);
    }

    // Entire page is half/half
    // left is graphic
    // right is popup div with rounded corners
    // if showLogin is true, popup content is login form
    // if showLogin is false, popup content is signup form
    // add framer motion graphics

    return (
        <>
            {/* PAGE */}
            <section class="bg-gray-50 dark:bg-gray-900
            min-h-screen flex items-center -z-40 justify-center relative
            flex-col md:flex-row
            ">

                {/* IMAGE: LEFT HALF OF SCREEN */}
                    <div aria-label="Login Hero Image"
                        className="md:w-6/12 hidden w-6/12 flex flex-col items-center justify-center
                        ">
                            <h1 className='font-bold text-[2rem] sm:text-[3rem] text-[#002D74] text-center'>
                                Welcome to Acebook.
                            </h1>
                            <p className='text-xs sm:text-[1rem] m-3 text-[#002D74]'>Connecting friends since 2023
                            </p>
                            
                            <img src='/images/drawkit-3d-jelly-pair.png' alt="log in"
                            className='hidden md:block w-[35rem]'
                            ></img>
                    </div>


                {/* LOGIN CONTAINER */}
                <div aria-label="Login Container" 
                    class="bg-white opacity-80 flex 
                    w-full
                    md:w-1/2
                    rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    

                    {/* FORM */}
                    <div aria-lable="Login Form" class=" px-8 md:px-16">
                        <h2 className='font-bold text-2xl text-[#002D74]'>Login</h2>
                        <p class="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                        <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Don't have an account?</p>
                            <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
                        </div>
                    </div>
                </div>

        {/* pink gradient */}
          <div className="bg-[#bddcf3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] 
          rounded-full blur-[10rem] sm:w-[68.75rem]
          dark:bg-[#946263]"></div>
          {/* purple gradient */}
          <div className="bg-[#c4d7f1] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] 
          rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-8rem]
          dark:bg-[#676394]"></div>

            </section>
        </>
)
}
