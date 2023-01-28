'use client'
import { useRef, useState } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
    const [search, setSearch] = useState('location routing problems');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IJournal[]>([]);
    const tableRef = useRef(null);
    const start = useRef(0)


    const getData = async () => {
        setIsLoading(true);

        try {
            const result = await axios.get(`api/research?q=${search}&start=${start.current}`)
            if (result.status) {
                start.current = start.current + 10;
                setData((p) => [...p, ...result.data])
                setIsLoading(false);
            } else {
                console.log('error');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }




    }


    return (
        <>
            <nav className=' p-5 px-48 flex justify-between items-center'>
                <Link href={'/'} className={'text-3xl font-bold'}>My<span className='text-pink-600'>Rec</span></Link>
            </nav>

            <div className="px-48 flex items-baseline">
                <input className="border p-4  w-full my-3 rounded-l-lg" placeholder="Enter search ..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={getData} className={'bg-pink-600 block text-white p-4 rounded-md rounded-l-none'} >Search </button>

            </div>

            {
                isLoading && <div className="px-48">
                    <div className="h-1 bg-violet-100">
                        <span className="h-1 bg-blue-500 w-56 block move-load" ></span>
                    </div>
                </div>

            }

            {/* <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >

                <button className={'bg-pink-600 block text-white p-4 rounded-md'} > Export excel </button>

            </DownloadTableExcel> */}

            <div className="px-48 min-h-screen">
                <table className="w-full my-12 " ref={tableRef}>
                    <thead>
                        <tr>
                            <th> SN </th>
                            <th> Title </th>
                            <th> Abstract</th>
                            <th> Website</th>
                        </tr>
                    </thead>
                    <tbody id="table_body" className="text-center">
                        {
                            (data.length > 0) ? data.map((element, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{element.title ? element.title : ''}</td>
                                    <td>{element.abstract ? element.abstract : ''}</td>
                                    <td><a href={element.url} className={'text-blue-400'}>Visit Website</a></td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </table>
            </div>


            {
                data.length > 0 && <div className="px-48 ">
                    <button onClick={getData} className={'bg-pink-600  text-white p-4 rounded-md'} >Load More </button>

                </div>
            }

        </>
    )
}




interface IJournal {
    title: string;
    abstract: string;
    url?: string;
}