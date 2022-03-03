import React from 'react'
import { Card, Row, Col, Tabs, Modal } from 'antd'
import FormFields from './data'
// import { SelectInput, TextInput } from '../../../../components/forms/index'
import CustomLabel from '../../../../components/forms/textInput/label'
const { TabPane } = Tabs


const ComplianceDetails = (props) => { 
    // const location = useLocation()
//   const { from } = location.state
    React.useEffect(() => {
        setTimeout(() => {
            // const filteredKeys = originData
            // // const newFilteredKeys = filteredKeys.toLowerCase()
            // const filteredValues = Object.values(originData[3])
        }, 10);
    }, [])
    // const mydata = originData[0]
    // let filteredArray = mydata.filter((e) => {return e.UID === 'UID'})
    // const filteredLabels = FormFields.map(item => item.lable)
    // const filLabels = filteredLabels.toLowerCase()

    // const data = originData.filter(i => filLabels.includes(i.filLabels))
    return (
        <Modal>
            <p>The code on Wages, 2019</p>
            <Card bordered={false} className="da-elevatior">
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Info" key="Info">Info</TabPane>
                </Tabs>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {FormFields.map((fieldDetail, index) => (
                        <Col key={index} className="gutter-row" span={6}>
                            <CustomLabel
                                label={fieldDetail.lable}
                            />
                        </Col>
                    ))}
                </Row>
            </Card>
        </Modal>
    )
}

export default ComplianceDetails
