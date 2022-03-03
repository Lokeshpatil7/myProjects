import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'

const NavLinks = ({ parent, child, parentPath, childPath }) => {
    return (
        <Row >
            <Col span={2}><Link style={cls.text} to={parentPath}>{parent}</Link></Col>
            {parent &&
                <Col style={cls.text} span={1}><RightOutlined /></Col>
            }
            <Col span={2}><Link style={cls.text} to={childPath}>{child}</Link></Col>
        </Row>
    )
}

export default NavLinks

const cls = {
    text: {
        fontSize: '1vw',
        color: 'black'
    }
}
