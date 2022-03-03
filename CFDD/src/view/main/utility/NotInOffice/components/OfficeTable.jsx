import React from 'react'
import { Input, Table, Tag} from 'antd';

const OfficeTable = ({setModal, setView}) => {
    const dataSource = [
        {
          sr_no: '1',
          uid: 32,
          emp_name: 'Aditi Choudhary',
          leave_period: '15 Sept 2021',
          task_title: 'Collect wedges 2134',
          task_assigned: 'Nikhil Kamble'
        },
        {
          sr_no: '2',
          uid: 45,
          emp_name: 'Aditi Choudhary',
          leave_period: '15 Sept 2021',
          task_title: 'Collect wedges 2134',
          task_assigned: 'Nikhil Kamble'
        },
        {
          sr_no: '3',
          uid: 87,
          emp_name: 'Aditi Choudhary',
          leave_period: '15 Sept 2021',
          task_title: 'Collect wedges 2134',
          task_assigned: 'Nikhil Kamble'
        },
        {
          sr_no: '4',
          uid: 27,
          emp_name: 'Aditi Choudhary',
          leave_period: '15 Sept 2021',
          task_title: 'Collect wedges 2134',
          task_assigned: 'Nikhil Kamble'
        },
      ];
      
      const columns = [
        {
          title: 'SR NO',
          dataIndex: 'sr_no',
          key: 'sr_no',
        },
        {
          title: 'UID',
          dataIndex: 'uid',
          key: 'uid',
        },
        {
          title: 'employee name',
          dataIndex: 'emp_name',
          key: 'emp_name',
        },
        {
          title: 'reason for leave',
          dataIndex: 'leave',
          key: 'leave',
          render: () => (
            <>
              <Input className='lib-input' placeholder='Write your comments here'/>
            </>
          ),
        },
        {
          title: 'leave period',
          dataIndex: 'leave_period',
          key: 'leave_period',
        },
        {
          title: 'task title',
          dataIndex: 'task_title',
          key: 'task_title',
        },
        {
          title: 'Task assigned to',
          dataIndex: 'task_assigned',
          key: 'task_assigned',
          render: () => (
            <>
              <Tag className='green-name'>Nikhil Kamble</Tag>
            </>
          ),
        },
      ];
    return (
        <Table className='lib-table' dataSource={dataSource} columns={columns} />
    )
}

export default OfficeTable
