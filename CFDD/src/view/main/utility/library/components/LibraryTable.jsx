import React from 'react'
import { Table, Input} from 'antd';
import { ShareAltOutlined, FileOutlined } from '@ant-design/icons'

const LibraryTable = ({setModal, setView}) => {
    const dataSource = [
        {
          sr_no: '1',
          uid: 32,
          document: 'copy of license',
          upload: 'Aditi Choudhary',
        },
        {
          sr_no: '2',
          uid: 45,
          document: 'copy of license',
          upload: 'Aditi Choudhary',
        },
        {
          sr_no: '3',
          uid: 87,
          document: 'copy of license',
          upload: 'Aditi Choudhary',
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
          title: 'DOCUMENT name',
          dataIndex: 'document',
          key: 'document',
        },
        {
          title: 'uploaded by',
          dataIndex: 'upload',
          key: 'upload',
        },
        {
          title: 'comment',
          dataIndex: 'comment',
          key: 'comment',
          render: () => (
            <>
              <Input className='lib-input' placeholder='Write your comments here'/>
            </>
          ),
        },
        {
          title: 'document attachted',
          dataIndex: 'document_attachted',
          key: 'document_attachted',
          render: () => (<FileOutlined style={{width : '20px'}} onClick={() => setView(true)}/>),
        },
        {
          title: 'share',
          dataIndex: 'share',
          key: 'share',
          render: () => (<ShareAltOutlined style={{color : 'black'}} onClick={() => setModal(true)}/>),
        },
      ];
    return (
        <Table className='lib-table' dataSource={dataSource} columns={columns} />
    )
}

export default LibraryTable
