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
            <section class="bg-gray-100 dark:bg-gray-900
            min-h-screen flex items-center -z-40 justify-center relative
            md:flex-row px-4">

                {/* IMAGE: LEFT HALF OF SCREEN, disappears for medium screens */}
                    <div aria-label="Login Hero Section"
                        className="md:w-6/12 md:flex hidden w-6/12 flex-col items-center justify-center
                        ">
                            <h1 className='font-bold text-[3.5rem] text-[#002c74d4] text-center'>
                                Welcome to Acebook.
                            </h1>
                            <p className='text-[1.5rem] m-3 text-[#282828d3]'>
                                Connecting friends since 2023
                            </p>
                            
                    </div>


                {/* LOGIN CONTAINER */}
                <div aria-label="Login Container" 
                    class="bg-white opacity-80 flex 
                    w-80
                    md:w-96
                    lg:w-[28rem]
                    rounded-lg shadow-lg max-w-3xl p-5 items-center
                    dark:bg-gray-800 dark:border-gray-700
                    dark:border
                    ">
                    

                    {/* FORM */}
                    {showLogin ? <SignUpForm/> : <LogInForm />}



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
            <div className="bg-[#bdd5f3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] 
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
