import React from 'react'
import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import web3 from '../../web3';
export const Navbarhead = () => {
    const [haveMetamask, sethaveMetamask] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState('');
    const [openNav, setOpenNav] = useState(false);
    const [msg, setmsg] = useState("CONNECT WALLET");
    const connectWallet = async () => {
        const { ethereum } = window;
        try {
            if (!ethereum) {
                sethaveMetamask(false);
                setmsg("INSTALL WALLET");
                return;
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccountAddress(accounts[0]);
            setIsConnected(true);
            setmsg("CONNECTED");
        } catch (error) {
            setIsConnected(false);
        }
    };
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
        const { ethereum } = window;
        const checkMetamaskAvailability = async () => {
            if (!ethereum) {
                sethaveMetamask(false);
            }
            sethaveMetamask(true);
        };
        checkMetamaskAvailability();
    }, []);


    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center text-xl">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center text-xl">
                    Docs
                </a>
            </Typography>
        </ul>
    );
    return (
        <>
            <Navbar className="mx-auto lg:max-w-screen-xl w-[100vw] py-2 px-4 lg:px-8 lg:py-4 text-black">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="mr-4 cursor-pointer py-1.5 font-normal"
                    >
                        <span className='text-2xl font-bold'>DECENTID</span>
                    </Typography>
                    <div className="hidden lg:block">{navList}</div>
                    <Button
                        onClick={connectWallet}
                        variant="gradient" size="sm" className="hidden lg:inline-block">
                        <span>{msg}</span>
                    </Button>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    <div className="container mx-auto">
                        {navList}
                        <Button
                            onClick={connectWallet}
                            variant="gradient" size="sm" fullWidth className="mb-2">
                            <span>{msg}</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
        </>
    )
}
