'use client'
import { useRef, useState } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function Home() {
  const [search, setSearch] = useState('location routing problems');
  const [data, setData] = useState<IJournal[]>([]);
  const tableRef = useRef(null);

  let start = 0;

  const getData = () => {

    fetch(`api/research?q=${search}&start=${start}`)
      .then(res => res.json())
      .then(output => {
        setData((p) => [...p, ...output])  
        
      }).catch(e => console.log(e))
      .finally(() => start = start + 10)
  }


  return (
    <div>
      <h1>Web Scraping</h1>
      <input type="text" name="" id="search" placeholder="Enter search ..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={getData} >Search </button>

      <span className="loading visibility" id="loading"></span>

      <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={tableRef.current}
      >

        <button> Export excel </button>

      </DownloadTableExcel>


      <table style={{ width: '100%' }} ref={tableRef}>
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
                <td>{index + 1 + start}</td>
                <td>{element.title ? element.title : ''}</td>
                <td>{element.abstract ? element.abstract : ''}</td>
                <td><a href={element.url}>Visit Website</a></td>
              </tr>
            )) : null
          }
        </tbody>
      </table>


      <button onClick={getData}>Load More </button>
    </div>
  )
}


interface IJournal {
  title: string;
  abstract: string;
  url?: string;
}