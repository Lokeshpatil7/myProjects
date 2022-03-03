import React, { useState } from 'react'
import { Col, Dropdown, Menu, Row, Space } from 'antd'
import profile from '../../../../../../assets/images/utility/profile.svg'
import { FileInput } from '../../../../../components/forms'
import { CaretDownOutlined } from '@ant-design/icons'
import './card.css'

const CustomCard = () => {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        upload: "",
        accept: ''
    });


    const Customdd = () => {
        const menu = (
            <Menu>
              <Menu.Item>
                <a href="#">
                  1st item
                </a>
              </Menu.Item>
            </Menu>
          );
        return (
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <label style={{fontWeight : 'bold'}}>me <CaretDownOutlined /></label>
                    </Dropdown>
                </Space>
            </Space>
        )
    }

    return (
        <Row gutter={[10, 32]}>
            <Row gutter={[15, 32]}>

                <Col>
                    <img src={profile} alt='' />
                </Col>

                <Col>
                    <Row gutter={10}>
                        <Col className='name'>NIKHIL KAMBLE</Col>
                        <Col>nikhilkamble@gmail.com</Col>
                    </Row>

                    <Col>to <Customdd /></Col>
                </Col>

            </Row>

            <Row gutter={[32, 32]}>
                <Col>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                    It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum
                </Col>
                <Col>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                    It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum
                </Col>

                <Col>
                    <FileInput
                        label={<p className='attachments'>ATTACHMENTS</p>}
                        placeholder='upload'
                        value={formData.upload}
                        onChange={(e) => {
                            setFormData((prev) => {
                                return { ...prev, ['name']: e };
                            });
                        }}
                        accept={formData.accept ?? "*"}
                    />
                </Col>
            </Row>
        </Row>
    )
}

export default CustomCard
