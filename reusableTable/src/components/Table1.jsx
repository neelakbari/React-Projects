import React from 'react'
import Table from './Table'
import { data1 ,heading1 } from '../data'
import Context, { tableContext } from '../context/tablecontext.jsx'

const Table1 = () => {
  
  return (
    <>
    <Context >
    <div className="container">
        <Table headers={heading1} data={data1}/>
    </div>
    </Context>
    </>
  )
}

export default Table1