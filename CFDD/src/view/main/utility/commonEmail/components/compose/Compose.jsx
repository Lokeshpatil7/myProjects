import React, { useState } from 'react'
import { Modal, Row, Divider, Col, Input } from 'antd'
import Footer from './Footer'
import Header from './Header'
import '../compose/header.css'
import FiltersHeader from '../../../../../components/tableFilter/FiltersHeader' 

const Compose = ({ setScreen, modal, setModal }) => {
    const [filterCompliences, setFilterCompliences] = useState([]);
    const [compliences, ] = useState([]);

    const filterCol = [
        { label: "GROUP", colName: "legislationName" },
        { label: "ENTITY", colName: "ruleName" },
        { label: "UNIT", colName: "legislationLaw_category" },
    ];

    return (
        <Modal
            className='composeModal'
            title={<Header setModal={setModal} />}
            visible={modal}
            onCancel={() => setModal(false)}
            onOk={() => setModal(false)}
            width={700}
            footer={<Footer setScreen={setScreen}/>}
        >
            <Row gutter={[15, 15]} style={cls.headerRow}>
                <Col>
                    To
                </Col>
                <FiltersHeader
                    filterData={filterCompliences}
                    originData={compliences}
                    setFilterData={setFilterCompliences}
                    cols={filterCol}
                />
            </Row>
            <Divider />

            <Row>
                <Col>
                    <Input size='small'  style={cls.input} placeholder='Subject'/>
                </Col>

                <Divider />
            </Row>
        </Modal>
    )
}

export default Compose

const cls = {
    headerRow: {
        alignItems: 'center',
    },
    input : {
        border : 'transparent',
        outline : 'none',
    }
}
