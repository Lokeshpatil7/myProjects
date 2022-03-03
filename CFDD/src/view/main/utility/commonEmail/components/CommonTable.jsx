import { Table } from 'antd'
import React from 'react'

const CommonTable = () => {
    const dataSource = [
        {
          key: '1',
          date: '9 sept 2021',
          subject: 'Annual compliance report and strategy',
        },
        {
          key: '2',
          date: '9 sept 2021',
          subject: 'Annual compliance report and strategy',
        },
        {
          key: '3',
          date: '9 sept 2021',
          subject: 'Annual compliance report and strategy',
        },
        {
          key: '3',
          date: '9 sept 2021',
          subject: 'Annual compliance report and strategy',
        },
        {
          key: '3',
          date: '9 sept 2021',
          subject: 'Annual compliance report and strategy',
        },
      ];
      
      const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          width : '200px'
        },
        {
          title: 'Subject',
          dataIndex: 'subject',
          key: 'subject',
        },
      ];
    return (
        <Table pagination={false} dataSource={dataSource} columns={columns} />
    )
}

export default CommonTable
