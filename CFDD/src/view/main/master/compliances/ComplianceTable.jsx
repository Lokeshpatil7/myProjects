import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';
import MoreOptions from './actions/index'

const columns = [
  {
    title: 'UID',
    dataIndex: 'uid',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'User Name',
    dataIndex: 'username',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];
const data = [
  {
    key: '1',
    uid : 34523,
    username: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    actions: <MoreOptions actionsList={[
      {
        label: "Edit users",
        onClick: () => {
          // setDataToEdit({ ...row });
        },
      },
      {
        label: "Delete users",
        onClick: () => {
          // setuserToDelete(row.id);
        },
      },
    ]} />
  },
  {
    key: '2',
    uid : 464546,
    username: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    uid : 95676,
    username: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  // {
  //   key: '4',
  //   name: 'Disabled User',
  //   age: 99,
  //   address: 'Sidney No. 1 Lake Park',
  // },
]; // rowSelection object indicates the need for row selection


const ComplianceTable = ({setSelected, dataSource}) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelected(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        {/* <Radio value="checkbox">Checkbox</Radio> */}
        {/* <Radio value="radio">radio</Radio> */}
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};


export default ComplianceTable