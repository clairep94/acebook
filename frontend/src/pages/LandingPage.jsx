import React, {useEffect, useState} from 'react'
import LogInForm from '../components/auth/LoginForm';
import SignUpForm from '../components/user/SignUpForm';


export default function LandingPage({navigate}) {

    const [form, setForm] = useState('login');

    const viewLogin = () => {
        setForm('login');
    }
    const viewSignUp = () => {
        setForm('signup');
    }

    // Load the component, change form if form changes
    useEffect(() => {
    }, [form])

    return (
        <>
            {/* PAGE */}
            <section class="bg-[#f8fafd] dark:bg-gray-900
            min-h-screen flex items-center justify-center relative
            md:flex-row px-4">

                {/* IMAGE: LEFT HALF OF SCREEN, disappears for medium screens */}
                    <div aria-label="Login Hero Section"
                        className="md:w-6/12 md:flex hidden w-6/12 flex-col items-center justify-center
                            p-8
                        ">
                            <h1 className='font-bold text-[3.5rem] text-[#002c74d4] text-center'>
                                Welcome to Acebook.
                            </h1>
                            <p className='text-[1.5rem] m-3 text-[#282828d3]'>
                                Connecting friends since 2023
                            </p>
                            <img alt='hero' src={(form ==='signup') ? '/images/drawkit-3d-jelly-pair.png' : '/images/drawkit-3d-jelly-girl.png'}/>
                    </div>


                {/* LOGIN CONTAINER */}
                <div aria-label="Sign Up Container" 
                    class="bg-white/80 flex 
                    w-80 md:w-96 lg:w-[28rem] max-w-3xl
                    rounded-lg  p-5 py-10 items-center
                    dark:bg-gray-800 dark:border-gray-700 dark:border
                    shadow-[0px_0px_10px_0px_#E2E8F0]
                    ">
                    {(form === 'signup') ? <SignUpForm navigate={navigate} switchForms={viewLogin}/> : <LogInForm navigate={navigate} switchForms={viewSignUp}/>}

                </div>


        {/* pink gradient */}
            {/* <div className="bg-[#bdd5f3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] 
            rounded-full blur-[10rem] sm:w-[68.75rem]
            dark:bg-[#946263]"></div> */}
        {/* purple gradient */}
            {/* <div className="bg-[#c4d7f1] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] 
            rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-8rem]
            dark:bg-[#676394]"></div>
 */}
            </section>
        </>
)
}
