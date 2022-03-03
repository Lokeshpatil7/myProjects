import React, { useState, useEffect } from 'react'

import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Row,
  Col,
  Space,
  DatePicker,
  Dropdown,
  message,
  Menu,
  Button,
  Checkbox,
} from 'antd'
import moment from 'moment'
import { DownOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

export default function EditableRowsTable({ originData, originCol }) {
  const [checkedCode, setCheckedCode] = useState(false)
  const [codeClass, setCodeClass] = useState(false)
  const [selectionType, setSelectionType] = useState('checkbox')
  const [columns, setcolumns] = useState([])
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const { Search } = Input
  const onSearch = () => {}
  const location = useLocation()

  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100)
    setCheckedCode(!checkedCode)
  }
  function onChange() {
    //date, dateString removed parameters
  }

  function handleMenuClick() {
    message.info('Click on menu item.')
  }

  useEffect(() => {
    setData(originData)
    setcolumns([
      ...originCol,
      //     {
      //   title: 'ACTION',
      //   dataIndex: 'action',
      //   width: '130px',
      //   render: (_, record) => {
      //     const editable = isEditing(record);
      //     return editable ? (
      //       <span>
      //         <button
      //           onClick={() => save(record.key)}
      //           style={{
      //             marginRight: 8,
      //           }}
      //         >
      //           Save
      //         </button>
      //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //           <button>Cancel</button>
      //         </Popconfirm>
      //       </span>
      //     ) : (
      //       <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
      //         Edit
      //       </Typography.Link>
      //     );
      //   },
      // },
    ])
  }, [originCol, originData])

  // const originData = []

  // for (let i = 0; i < 100; i++) {
  //   originData.push({
  //     key: i.toString(),
  //     name: 'John ' + i,
  //     age: 32,
  //     address: 'London Park no. ' + i,
  //   })
  // }

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: 'Please Input ' + title + '!',
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  const isEditing = (record) => record.key === editingKey
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='1'>1st menu item</Menu.Item>
      <Menu.Item key='2'>2nd menu item</Menu.Item>
      <Menu.Item key='3'>3rd menu item</Menu.Item>
    </Menu>
  )
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
    }
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   name: record.name,
    // }),
  }
  return (
    <>
      <Row>
        <Col className='da-mb-16' span={24}>
          {!location.pathname.endsWith('/central-repository') && (
            <Row justify='space-between'>
              <Search
                placeholder='Search'
                onSearch={onSearch}
                style={{ width: 890 }}
              />
              <Button>Tag</Button>
            </Row>
          )}
        </Col>

        <Col className='da-mb-16' span={24}>
          <Row
            justify='space-between'
            align='bottom'
            style={{ paddingTop: '20px' }}
          >
            <DatePicker
              onChange={onChange}
              picker='week'
              defaultValue={moment('2019-06-03', 'YYYY-MM-DD')}
            />

            {columns.map((columnName, index) => {
              return (
                <Dropdown overlay={menu}>
                  <Button>
                    {columnName.title} <DownOutlined />
                  </Button>
                </Dropdown>
              )
            })}
          </Row>
        </Col>
      </Row>
      <Row>
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
            scroll={{
              y: 640,
              x: "100vw",
            }}
          />
        </div>
      </Row>
    </>
  )
}
