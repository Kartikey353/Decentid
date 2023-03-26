import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Documetverification from '../../Documetverification';
import web3 from '../../web3';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
const Documentsverify = () => {
    const { id, idx } = useParams();
    const [loading, setloading] = useState(false);
    const [filename, setfilename] = useState();
    const [documentinfo, setdocumentinfo] = useState();
    const [hash, sethash] = useState();
    const [msg_document, setmsg_document] = useState();
    const [upload_timestamp, setupload_timestamp] = useState();
    const [verified_timestamp, setverified_timestamp] = useState();
    const [verified, setverified] = useState();
    const [owner, setowner] = useState();
    const [decesion, setdecesion] = useState();
    const [verifying_code, setverifying_code] = useState();

    async function verifydocuments() {

        let accounts = await web3.eth.getAccounts();
        let res = Documetverification.methods.verifyDocuments(idx, owner, accounts[0], msg_document).send({
            from: accounts[0]
        })
    }
    async function loaddata() {
        let accounts = await web3.eth.getAccounts();
        let newelement = await Documetverification.methods.Verifiers(accounts[0], idx).call();
        console.log(newelement);
        setfilename(newelement.filename);
        setdocumentinfo(newelement.documentinfo);
        sethash(newelement.hash);
        setmsg_document(newelement.msg_document);
        setupload_timestamp(newelement.upload_timestamp);
        setverified_timestamp(newelement.verified_timestamp);
        setverified(newelement.verified);
        setowner(newelement.owner);
        setverifying_code(newelement.verifying_code);
        setloading(false);
    }
    useEffect(() => {
        setloading(true);
        loaddata(); 
        console.log("hello");
        console.log(filename,
            documentinfo,
            hash,
            msg_document,
            upload_timestamp,
            verified_timestamp,
            verified,
            owner,
            decesion,
            verifying_code,);  

    }, []);
    return (
        <>
            {
                loading ?
                    <div className="App space-y-6 flex flex-col">
                        <HashLoader
                            color={"#123abc"}
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <div className="text-2xl font-bold text-white">
                            Loading...
                        </div>
                    </div>
                    :
                    <div className="w-full max-w-sm mx-auto mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" action="#">
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                                Verify documents
                            </h5>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    File name
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={filename}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Document info
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={documentinfo}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    File Hash
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={hash}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    message form verifier
                                </label>
                                <input
                                    type="text"
                                    placeholder='Why reject/Accept ?'
                                    className="bg-green-100 border border-red-500 text-lg font-bold uppercase text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    onChange={(e) => {
                                        setmsg_document(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Upload time
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={upload_timestamp}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Verified time
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={verified_timestamp == 0 ? "Pending request" : verified_timestamp}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Status
                                </label>
                                <input
                                    type="text"
                                    className={`bg-gray-50 border font-extrabold border-gray-300 ${verified === false ? "text-red-500" : "text-green-500"} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400`}
                                    value={verified === false ? "Pending" : "Sucess"}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Verifying code
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={verifying_code}
                                    disabled
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Owner
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    value={owner}
                                    disabled
                                />
                            </div>

                            <Link to={`https://${hash}.ipfs.w3s.link/`}>
                                <button
                                    type="button"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    View file
                                </button></Link>
                            <div className="flex space-x-2">
                                <button
                                    disabled={verified === true ? true : false}
                                    type="button"
                                    onClick={() => {
                                        setdecesion(false);
                                        verifydocuments();
                                    }}
                                    className={`w-full text-white  ${verified === true ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
                                >
                                    Reject
                                </button>
                                <button
                                    type="button"
                                    disabled={verified === true ? true : false}
                                    onClick={() => {
                                        setdecesion(true);
                                        verifydocuments();
                                    }}
                                    className={`w-full text-white ${verified === true ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} bg-green-500  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                                >
                                    Approve
                                </button>
                            </div>
                        </form>
                    </div >

            }
        </>
    )
}

export default Documentsverify;