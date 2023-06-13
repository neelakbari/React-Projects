import React from 'react'
import Table from './Table'
import { data1 ,heading1 } from '../data'

const Table1 = () => {
  return (
    <>
    <div className="container">
        <Table headers={heading1} data={data1}/>
    </div>
    </>
  )
}

export default Table1