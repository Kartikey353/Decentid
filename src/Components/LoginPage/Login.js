import React, { useEffect, useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Google from "./Assets/google-icon.svg"
import Github from "./Assets/github-icon.svg"
import { auth, db } from '../../firebase-config';
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import web3 from '../../web3';

export const Login = () => {
    const [checked, setchecked] = useState(false);
    const [isWallet, setWallet] = useState(false); 
    const [walletaddress,setwalletaddress] = useState();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.ethereum) {
            setWallet(true); 
            let accounts = web3.eth.getAccounts();
            setwalletaddress(accounts[0]);
        } else {
            setWallet(false); 
            setwalletaddress(0x0000000000000000);
        }
    },[]);

    const onClickgoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result) 
                const resultt = getAdditionalUserInfo(result).profile;
                // console.log(resultt);
                const storedataofuser = async () => {
                    const docData = {
                        FName: resultt.given_name,
                        LName: resultt.family_name,
                        UserEmail: resultt.email,
                        UserId: resultt.email.substring(0, resultt.email.indexOf('@')),
                        dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
                        userMobile: " ",
                        userWalletAddress: toString(walletaddress),
                        userAddress: resultt.locale,
                        userProffession: " "
                    };

                    const docRef = doc(db, "userdata", resultt.id);
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) {
                        await setDoc(doc(db, "userdata", resultt.id), docData);
                    }
                }

                storedataofuser();
                const url = `/dashboard/${resultt.id}`;
                navigate(url);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });


        // console.log("hello");

    }


    return (
        <>
            <div className="rounded-xl px-4 py-5">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Join Decentid 👋
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Login with
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                        <div className="mb-4 flex flex-col gap-6">
                            <Button
                                disabled={checked === true ? false : true}
                                onClick={() => {
                                    if (checked === true)
                                        onClickgoogle();
                                }}
                                className="mt-6 bg-white text-black shadow-xl shadow-gray-400" fullWidth>
                                <div className="flex space-x-6 text-center justify-center">
                                    <span className="my-auto"> Join With Google </span>
                                    <img src={Google} className="w-8" alt="" />
                                </div>
                            </Button>
                            <Button
                                disabled={checked === true ? false : true}
                                onClick={() => {
                                    if (checked === true)
                                        onClickgoogle();
                                }}
                                className="mt-6 bg-white text-black shadow-xl shadow-gray-400" fullWidth>
                                <div className="flex space-x-6 text-center justify-center">
                                    <span className="my-auto"> Join With Github </span>
                                    <img src={Github} className="w-8" alt="" />
                                </div>
                            </Button>
                        </div>
                        <Checkbox
                            onChange={(e) => {
                                setchecked(e.target.checked);
                            }}
                            label={
                                (
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center font-normal"
                                    >
                                        I agree the
                                        <a
                                            href="#"
                                            className="font-medium transition-colors hover:text-blue-500"
                                        >
                                            &nbsp;Terms and Conditions
                                        </a>
                                    </Typography>
                                )
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                    </form>
                </Card>
            </div>
        </>
    )
}
