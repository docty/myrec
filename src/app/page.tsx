'use client'
import { useRef, useState } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from "axios";
export default function Home() {
  const [search, setSearch] = useState('location routing problems');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IJournal[]>([]);
  const tableRef = useRef(null);
  const start = useRef(0)


  const getData = async () => {
    setIsLoading(true);


    const result = await axios.get(`api/research?q=${search}&start=${start.current}`)

    if (result.status) {
      start.current = start.current + 10;
      setData((p) => [...p, ...result.data])
      setIsLoading(false);
    } else {
      console.log('error');
      setIsLoading(false);
    }






  }


  return (
    <div className="p-12">
      <h1 className="text-large font-bold my-12">Web Scraping</h1>
      <input className="border p-4  w-full my-3" placeholder="Enter search ..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={getData} className={'bg-blue-600 block text-white p-4 rounded-md'} >Search </button>

      {
        isLoading && <div className="w-8 h-8 border-b-white animate-spin rounded-full border-4 border-black " ></div>

      }

      <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={tableRef.current}
      >

        <button className={'bg-pink-600 block text-white p-4 rounded-md'} > Export excel </button>

      </DownloadTableExcel>


      <table className="w-full my-12" ref={tableRef}>
        <thead>
          <tr>
            <th> SN </th>
            <th> Title </th>
            <th> Abstract</th>
            <th> Website</th>
          </tr>
        </thead>
        <tbody id="table_body" style={{ textAlign: 'center' }}>
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


      <button onClick={getData} className={'bg-blue-600 text-white p-4 rounded-md'} >Load More </button>
    </div>
  )
}


interface IJournal {
  title: string;
  abstract: string;
  url?: string;
}