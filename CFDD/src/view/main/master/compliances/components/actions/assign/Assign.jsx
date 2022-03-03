import { Modal } from 'antd'
import React from 'react'

const Assign = ({showModal, setShowModal}) => {
    return (
        <Modal
        title='Assign Compliance'
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        >
            
        </Modal>
    )
}

export default Assign
