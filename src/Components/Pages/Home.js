import { Navbarhead } from '../Navbar/Navbarhead';
import React from 'react'
import { Login } from '../LoginPage/Login';
import Typewriter from 'typewriter-effect';
const Home = () => {
    return (
        <>
            <div className="text-black">
                <div className="md:w-[80vw] md:flex mt-32 mb-16 mx-auto space-y-10 md:space-y-0">
                    <div className="md:w-[50%]">
                        <div className="text-center md:text-left space-y-5 md:space-y-5 verticalcenter">
                            <span className="md:text-[60px] font-bold text-3xl">
                                <Typewriter
                                    options={{
                                        strings: ['Decentid', 'Join Decentid'],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                            <p className="leading-[1.8rem] text-lg">Verify your documents without involving the third party. <br /> <span className="font-medium">Don't Comprmise your document security</span></p>
                        </div>
                    </div>
                    <div className="md:w-[50%]">
                        <div className="text-center md:text-left">
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;