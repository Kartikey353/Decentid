import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import web3 from '../../web3';
import Documetverification from '../../Documetverification';
export const Dashboard = () => {
    const [background1, setbackground1] = useState("");
    const [background2, setbackground2] = useState("");
    const [select, setselect] = useState(1);
    const { id } = useParams();
    const [url, seturl] = useState(""); 
    const navigation = useNavigate();
    const [urlupload, seturlupload] = useState("");
    const [urldocument, seturldocument] = useState("");
    const [documentsowner, setdocumentsowner] = useState([]);
    const [documentsverifier, setdocumentsverifier] = useState([]);

    async function getuploaddocumentsowner() {
        let accounts = await web3.eth.getAccounts();
        let res = await Documetverification.methods.Owner_document_count(accounts[0]).call();
        setdocumentsowner([]);
        for (let i = 0; i < res; i++) {
            let newelement = await Documetverification.methods.Owners(accounts[0], i).call();
            setdocumentsowner((prev) => {
                return [
                    ...prev,
                    newelement
                ]
            });
        }        
    }
    async function getuploaddocumentsverifier() {
        let accounts = await web3.eth.getAccounts();
        let res = await Documetverification.methods.Verifier_document_count(accounts[0]).call();
        setdocumentsverifier([]);
        for (let i = 0; i < res; i++) {
            let newelement = await Documetverification.methods.Verifiers(accounts[0], i).call();
            setdocumentsverifier((prev) => {
                return [
                    ...prev,
                    newelement
                ]
            });
        }
    }

    useEffect(() => {
        setdocumentsowner([]);
        setdocumentsverifier([]);

        if (select === 1) {
            setbackground1("verticalcenter text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");

            setbackground2("text-black border-[2px] verticalcenter  focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2")
        } else {
            setbackground2("verticalcenter text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
            setbackground1("text-black border-[2px] verticalcenter  focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
        } 
        setdocumentsowner([]);
        setdocumentsverifier([]);
        seturl(`/profile/${id}`); 
        seturlupload(`/upload/${id}`);
        // seturldocument(`/documentsview/${id}${0}`); 
        getuploaddocumentsowner();
        getuploaddocumentsverifier(); 
        console.log(documentsowner);
        console.log(documentsverifier);
    }, [select]);
    return (
        <>
            <div className="mt-10 justify-center flex">
                <Link to={url}>
                    <button type="button" className="verticalcenter text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Profile Setting</button>
                </Link>
            </div>
            <div className="mt-32 flex justify-center">
                <div className="flex">
                    <div className="">
                        <button type="button" onClick={() => {
                            setselect(1);
                        }} className={background1}>Send for Approvals</button>
                    </div>
                    <div className="">
                        <button type="button" onClick={() => {
                            setselect(2);
                        }} className={background2}>Received for Approvals</button>
                    </div>
                </div>
            </div>

            {
                select === 1 ?
                    documentsowner.length === 0 ?
                        <div className="mt-20 text-center">
                            <Link to={urlupload}>
                                <button type='button' className='verticalcenter text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                                    Upload File
                                </button>
                            </Link>
                        </div>
                        :
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            File Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Verifier Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documentsowner.map((item, idx) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-xl text-gray-900  whitespace-nowrap dark:text-white"
                                                    >
                                                        {item.filename}

                                                    </th>
                                                    <td className="px-6 py-4">{item.verifier}</td>
                                                    <td className="px-6 py-4">{item.documentinfo}</td>
                                                    <td className={`px-6 py-4 ${item.verified === false ? "text-red-500" : "text-green-500"}`}>{item.verified === false ? "Pending" : "Verified"}</td>
                                                    <td className="px-6 py-4">
                                                       <button
                                                            onClick={()=>{
                                                                navigation(`/documentsview/${id}/${idx}`);
                                                            }} 
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    :
                    documentsverifier.length === 0 ?
                        <div className="mt-20 text-center text-black text-xl font-bold">
                            No documents to verify
                        </div>
                        :
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            File Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Verifier Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documentsverifier.map((item, idx) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-xl text-gray-900  whitespace-nowrap dark:text-white"
                                                    >
                                                        {item.filename}

                                                    </th>
                                                    <td className="px-6 py-4">{item.verifier}</td>
                                                    <td className="px-6 py-4">{item.documentinfo}</td>
                                                    <td className={`px-6 py-4 ${item.verified === false ? "text-red-500" : "text-green-500"}`}>{item.verified === false ? "Pending" : "Verified"}</td>
                                                    <td className="px-6 py-4">
                                                       <button
                                                            onClick={()=>{
                                                                seturldocument(`/documentsverify/${id}/${idx}`); 
                                                                navigation(urldocument);
                                                            }} 
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
            }

            <div className="mt-20 text-center">
                <Link to={urlupload}>
                    <button className={`verticalcenter ${documentsowner.length==0?"hidden":""} text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}>
                        Upload File
                    </button>
                </Link>
            </div>
        </>
    )
}
