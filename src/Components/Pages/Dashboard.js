import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom';
export const Dashboard = () => {
    const [background1, setbackground1] = useState("");
    const [background2, setbackground2] = useState("");
    const [select, setselect] = useState(1);
    const {id} = useParams();
    const [url,seturl] = useState("");

    useEffect(() => {
        

        if (select === 1) {
            setbackground1("verticalcenter text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");

            setbackground2("text-black border-[2px] verticalcenter  focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2")
        } else {
            setbackground2("verticalcenter text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
            setbackground1("text-black border-[2px] verticalcenter  focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2");
        } 

        seturl(`/profile/${id}`);

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
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}
