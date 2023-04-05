import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import web3 from '../../web3';
import Documetverification from '../../Documetverification';
const Upload = () => {
    const [loader, setloader] = useState(false);
    const [filename, setfilename] = useState("");
    const [description, setdescription] = useState("");
    const [verifierdetails, setverifierdetails] = useState("");
    const [filehash, setfilehash] = useState();
    const [file, setfile] = useState();
    const [checked, setchecked] = useState(false);
    const { id } = useParams();

    function getAccessToken() {
        return process.env.REACT_APP_WEB3STORAGE_TOKEN;
    }
    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }

    function getFiles() {
        const fileInput = document.querySelector('input[type="file"]')
        setfile(fileInput.files);
    }


    function makeFileObjects() {
        const blob = new Blob(file, { type: 'image/jpeg' })

        const files = [
            new File([blob], 'hello.json')
        ]
        setfile(files);
    }

    async function getfilehash() {
        setloader(true);
        makeFileObjects();
        if (file) {
            const client = makeStorageClient()
            const cid = await client.put(file, {
                name: filename,
                maxRetries: 3,
            })
            console.log('stored files with cid:', cid);
            setfilehash(cid.toString());
            setloader(false);
            uploadfiles();
        }
    }
    async function uploadfiles() {
        let accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        let res = await Documetverification.methods.addDocument(filehash, filename, accounts[0], verifierdetails, description, id).send(
            {
                from: accounts[0]
            }
        );
        console.log(res);

    }
    return (
        <>
            <div className="md:w-[80vw] mx-auto">
                <div className="justify-center flex mt-32">
                    <Card color="transparent" shadow={false}>
                        <Typography variant="h4" color="blue-gray">
                            Upload Document
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter details to upload.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="File Name" onChange={(e) => {
                                    setfilename(e.target.value);
                                }} />
                                <Input size="lg" label="Description" onChange={(e) => {
                                    setdescription(e.target.value);
                                }} />
                                <Input type="text" size="lg" label="Verifier Address" onChange={(e) => {
                                    setverifierdetails(e.target.value);
                                }} />
                                {
                                    loader ?
                                        <div role="status" className='text-center'>
                                            <svg
                                                aria-hidden="true"
                                                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="text-black">Uploading...</span>
                                        </div>
                                        :
                                        <Input type="file" size="lg" label="File" onChange={(e) => {
                                            getFiles();
                                        }} />
                                }
                                {/* <Input type="file" size="lg" label="File" onChange={(e) => {
                                    setfile(e.target.files[0]);
                                }} /> */}
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
                            <Button className={`mt-6 ${loader === true || checked === false ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`} fullWidth
                                disabled={loader === true || checked === false ? true : false}
                                onClick={() => {
                                    if (checked === true)
                                        getfilehash();
                                }}>
                                Upload
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Learn How your documents{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                                >
                                    Are secure ?
                                </a>
                            </Typography>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Upload