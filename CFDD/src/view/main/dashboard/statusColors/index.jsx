import React from "react";
import { Card, Row } from "antd";
import { Colors } from "../../../../assets/Colors";
// import './styles.css'
// const { Header, Footer, Sider, Content } = Layout;

const ColorHeader = ({color, colorTag}) => {
    // const cls = {
    //     container : {
    //         display : 'flex',
    //         alignItems : 'center',
    //         flexWrap : 'wrap',
    //         // backgroundColor : 'lightgray',
    //         marginBottom : '9%'
    //     },
    //     color : {
    //         border : '1px solid transparent',
    //         borderRadius : '5px',
    //         backgroundColor : color,
    //         position: 'relative',
    //         flexBasis: 'calc(25% - 10px)',
    //         margin: '5px',
    //         boxSizing: 'border-box',
    //         ':before': {
    //             content: '',
    //             display: 'block',
    //             paddingTop: '100%',
    //         }
    //     },
    //     name : {
    //         // fontSize : '1vw',
    //         // fontWeight : "bold",
    //         // marginLeft : '20px',
    //         // // backgroundColor : 'gray',
    //         // minWidth : 'fit-content',
    //         flex : 1,
    //         position: 'absolute',
    //         top: 0, left: 0,
    //         height: '100%',
    //         width: '100%',
    //     }
    // }
    return (
        <div className="square-container"  >
            <div class="square" ></div>
            <Row class="content" >{colorTag}</Row>
            <div class="square" ></div>
            <Row class="content" >{colorTag}</Row>
        </div>
    )
}

const labelStyle = {
    fontSize : '20px',
    fontWeight : 'bold',
    backgroundColor : 'white',
    marginBottom : '10%'
}

function StatusColors() {
    return (
        <Card bordered={false} className="da-elevatior">
        <div style={labelStyle}>Status Colours</div>
        <ColorHeader color={Colors.graphColors.nonCompliant} 
        colorTag='Non compliant'/>
        </Card>
    )
}

export default StatusColors