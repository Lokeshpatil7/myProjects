import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import editIcon from '../../../../../assets/images/utility/edit-icon.svg'

const originData = [
  {
    sr_no: "1",
    key: "1",
    uid: 35,
    esg: "Governance",
    law_category: "Regulatory",
    central: "Central",
    state: "NA",
    name_act: 'The Legal Metrology Act',
    rules: 'The Legal Metrology rules, 2011',
    reference: 'Setion 6 (3)'
  },
  {
    sr_no: "2",
    key: "2",
    uid: 87,
    esg: "Governance",
    law_category: "Regulatory",
    central: "Central",
    state: "NA",
    name_act: 'The Legal Metrology Act',
    rules: 'The Legal Metrology rules, 2011',
    reference: 'Setion 6 (3)'
  },
  {
    sr_no: "3",
    key: "3",
    uid: 60,
    esg: "Governance",
    law_category: "Regulatory",
    central: "Central",
    state: "NA",
    name_act: 'The Legal Metrology Act',
    rules: 'The Legal Metrology rules, 2011',
    reference: 'Setion 6 (3)'
  },
  {
    sr_no: "3",
    key: "4",
    uid: 60,
    esg: "Governance",
    law_category: "Regulatory",
    central: "Central",
    state: "NA",
    name_act: 'The Legal Metrology Act',
    rules: 'The Legal Metrology rules, 2011',
    reference: 'Setion 6 (3)'
  },
];

// for (let i = 0; i < 5; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ActTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const [selectionType, ] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    //   setSelectedCompliences(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "SR NO",
      dataIndex: "sr_no",
      key: "sr_no",
    },
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "esg",
      dataIndex: "esg",
      key: "esg",
      editable : true
    },
    {
      title: "law category",
      dataIndex: "law_category",
      key: "law_category",
      editable : true
    },
    {
      title: "central/state/ui",
      dataIndex: "central",
      key: "central",
      editable : true
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state",
      editable : true
    },
    {
      title: "name of act",
      dataIndex: "name_act",
      key: "name_act",
      editable : true
    },
    {
      title: "rule/regulations",
      dataIndex: "rules",
      key: "rules",
      editable : true
    },
    {
      title: "reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <img className="utility-tasks-edit" alt="" src={editIcon}/>
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
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
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ActTable