import React, { useState } from 'react'
import { Button, Col, Modal } from 'antd'
import GenerateForm from '../../../../components/forms/GenerateForm'

const AddDocument = ({ modal, setModal }) => {
    const [formData, setFormData] = useState({
        documentName: "",
        comment: "",
        attachment: "",
    });

    return (
        <Modal
            title='Add new document / report'
            visible={modal}
            onCancel={() => setModal(false)}
            onOk={() => setModal(false)}
            width={450}
            footer={[
                <Button type="secoundry">
                    SEND MAIL
                </Button>
            ]}
        >
            <Col>
                <GenerateForm
                    formField={formField}
                    formData={formData}
                    setFormData={setFormData}
                    colSpan={24}
                />
            </Col>
        </Modal>
    )
}

export default AddDocument



const formField = [
    {
        label: "DOCUMENT / REPORT NAME",
        placeholder: "Type here",
        field: "name",
        inputType: "text",
    },
    {
        label: "COMMENT",
        placeholder: "Type here",
        field: "number",
        inputType: "text",
    },
    {
        label: "ATTACHMENT",
        placeholder: "SELECT A FILE",
        field: "asset_image_link",
        inputType: "file",
        accept: "image/*",
    },
];