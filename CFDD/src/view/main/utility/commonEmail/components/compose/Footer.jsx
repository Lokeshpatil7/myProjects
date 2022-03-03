import React from 'react'
import { Button, Col, Row, Image } from 'antd'
import { PaperClipOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import image from '../../../../../../assets/images/utility/common-email-image.svg'

const Footer = ({setScreen}) => {
    return (
        <div >
            <Row style={cls.container2} span={24}>
                <Col span={2}>
                    <Button onClick={() => setScreen(1)} type="secoundry">SEND</Button>
                </Col>
                <Col span={3} style={cls.wordA}>A</Col>
                <Col span={2}>
                    <PaperClipOutlined style={cls.paperclip} />
                </Col>
                <Col span={2}>
                    <LinkOutlined style={cls.linkout} />
                </Col>
                <Col span={2}>
                    <Image alt='' src={image} style={cls.image} />
                </Col>

                <Col span={13}>
                    <DeleteOutlined style={cls.delete} />
                </Col>
            </Row>

        </div>
    )
}

export default Footer

const cls = {
    container: {
        display: 'flex',
        justifyContainer: "space-between",
        // alignItems : 'center'
    },
    container2: {
        alignItems: 'center'
    },
    wordA: {
        textDecoration: 'underline',
        fontSize: '16px',
        marginBottom: '5px',
        cursor: 'pointer'
    },
    paperclip: {
        fontSize: '18px',
        transform: 'rotate(180deg)',
        cursor: 'pointer'
    },
    linkout: {
        fontSize: '22px',
        transform: 'rotate(45deg)',
        cursor: 'pointer'
    },
    image: {
        width: "18px",
        cursor: 'pointer'
    },
    delete: {
        fontSize: "18px",
        cursor: 'pointer'
    }
}
