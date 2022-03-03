import { Col, Row } from 'antd'
import React from 'react'
import { ArrowsAltOutlined, CloseOutlined } from '@ant-design/icons'
import './header.css'

const Header = ({ setModal }) => {

    return (
        <div style={cls.container}>
            <Row style={cls.container2}>
                <Col style={cls.title}>
                    Compose New Message
                </Col>

                <Row style={cls.container3}>

                    <Col
                        onClick={() => setModal(false)}
                        style={cls.underscore}>
                        _
                    </Col>

                    <Col>
                        <ArrowsAltOutlined 
                        style={cls.arrowalt} />
                    </Col>

                    <div >
                        <CloseOutlined
                            style={cls.close}
                        />
                    </div>

                </Row>

            </Row>
        </div>
    )
}

export default Header

const cls = {
    container: {
        backgroundColor: '#36965f',
    },
    container2: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        margin: '0 15px'
    },
    container3: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white'
    },
    arrowalt: {
        color: '#9de09d',
        margin: '0 10px',
        cursor: 'pointer'
    },
    underscore: {
        color: '#9de09d',
        margin: '0 10px',
        cursor: 'pointer'
    },
    close: {
        color: '#9de09d',
        margin: '0 10px',
        cursor: 'pointer'
    }
}
