import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    Avatar
} from "@material-tailwind/react";
import profile from "../LoginPage/Assets/github-icon.svg"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase-config';
import { useParams, useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
export const Profile = () => {
    const [loading, setloading] = useState(false);
    const [Fectch_FirstName, setFectch_FirstName] = useState();
    const [Fectch_Name, setFectch_Name] = useState();
    const [Fectch_Email, setFectch_Email] = useState();
    const [Fectch_Mobile, setFectch_Mobile] = useState();
    const [Fectch_WalletAddress, setFectch_WalletAddress] = useState();
    const [Fectch_Address, setFectch_Address] = useState();
    const [Fectch_Proffession, setFectch_Proffession] = useState();


    const [FirstName, setFirstName] = useState(Fectch_FirstName);
    const [Name, setName] = useState(Fectch_Name);
    const [Mobile, setMobile] = useState(Fectch_Mobile);
    const [WalletAddress, setWalletAddress] = useState(Fectch_WalletAddress);
    const [Address, setAddress] = useState(Fectch_Address);
    const [Proffession, setProffession] = useState(Fectch_Proffession);
    const { id } = useParams();
    const navigation = useNavigate();
    const fetchdata = async () => {
        const docRef = doc(db, "userdata", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            //  set fetch_data
            setFectch_FirstName(docSnap.data().FName);
            setFectch_Name(`${docSnap.data().FName} ${docSnap.data().LName}`);
            setFectch_Email(docSnap.data().UserEmail);
            setFectch_Mobile(docSnap.data().userMobile);
            setFectch_Address(docSnap.data().userAddress);
            setFectch_WalletAddress(docSnap.data().userWalletAddress);
            setFectch_Proffession(docSnap.data().userProffession);

            // set currentdata

            setFirstName(docSnap.data().FName);
            setName(`${docSnap.data().FName} ${docSnap.data().LName}`);
            setMobile(docSnap.data().userMobile);
            setAddress(docSnap.data().userAddress);
            setWalletAddress(docSnap.data().userWalletAddress);
            setProffession(docSnap.data().userProffession);

        } else {
            navigation("/");
        }
    }


    const updatedata = async () => {
        const dataRef = doc(db, "userdata", id);
        setName(Name.trim());
        console.log(Name);
        const myArray = Name.split(" ");
        console.log(myArray);
        myArray.push(" ");
        await updateDoc(dataRef, {
            FName: myArray[0],
            LName: myArray[1],
            userMobile: Mobile,
            userWalletAddress: WalletAddress,
            userAddress: Address,
            userProffession: Proffession
        });


    }
    useEffect(() => {
        setloading(true);
        fetchdata(); 
        setTimeout(() => {
            setloading(false);
          }, 2000);
    }, []);
    return (
        <>


            {
                loading ?
                    <div className="text-center flex justify-center items-center w-full h-[100vh]">
                        <HashLoader
                            color={"#123abc"}
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    :
                    <div className="md:w-[80vw] mx-auto">
                        <div className="">
                            <Card className="w-96 mx-auto mt-32">
                                <CardHeader
                                    variant="gradient"
                                    color=""
                                    className="mb-4 grid h-28 place-items-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200"
                                >
                                    {/* <Typography variant="h3" color="white">
                                    Sign In
                                </Typography> */}
                                    <Avatar src={profile} alt="avatar" variant="circular" className='w-16 h-16' />
                                </CardHeader>
                                <CardBody className="flex flex-col gap-4">
                                    <Typography variant="h4" color="blue-gray">
                                        Hey! {FirstName} 👋
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        Your Profile Details
                                    </Typography>
                                    <Input label="Email_id" size="lg" className='text-xl' disabled value={Fectch_Email} />
                                    <Input label="Name" size="lg" className='text-xl' value={Name} onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                    <Input label="Mobile" size="lg" className='text-xl' value={Mobile} onChange={(e) => {
                                        setMobile(e.target.value);
                                    }} />
                                    <Input label="Wallet Address" size="lg" className='text-xl' value={WalletAddress} onChange={(e) => {
                                        setWalletAddress(e.target.value);
                                    }} />
                                    <Input label="Address (optional)" size="lg" className='text-xl' value={Address} onChange={(e) => {
                                        setAddress(e.target.value);
                                    }} />
                                    <Input label="Proffession" size="lg" className='text-xl' value={Proffession} onChange={(e) => {
                                        setProffession(e.target.value);
                                    }} />
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button variant="gradient"
                                        onClick={() => {
                                            updatedata()
                                        }}
                                        fullWidth>
                                        Save Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

            }
        </>
    )
}
