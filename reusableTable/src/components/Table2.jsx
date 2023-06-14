import React from 'react'
import Table from './Table'
import { data2, heading2 } from '../data'

const Table2 = () => {
  return (
    <div className="container">
        <Table headers={heading2} data={data2}/>
    </div>
  )
}

export default Table2