import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Typography, Progress } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import editIcon from "../../../../assets/images/utility/edit-icon.svg";
import { useHistory } from "react-router-dom";
import CentralRepo from "../../centralRepo";
import { post, get } from "../../../../api/HTTPService";
import CustomTable from "../../../components/data-display/table/CustomTable";
import { useEffect } from "react";

const { Title } = Typography;
const OnBoardingLegislation = ({ unitId, selectedRows, setSelectedRows }) => {
  const history = useHistory();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "70px",
      fixed: "left",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Law Category",
      dataIndex: "law_category",
    },
    {
      title: "ESG Category",
      dataIndex: "esg_category",
    },
    {
      title: "UID",
      dataIndex: "UID",
    },
  ];

  const onAssign = async () => {
    const compliance_ids = selectedRows.map((row) => row.id);
    await post("/unitCompliances", { unit_id: unitId, compliance_ids });
  };

  useEffect(() => {
    setLoading(true);
    let url = "/unitLegislation";
    if (unitId) {
      url += "?unitId=" + unitId;
    }
    get(url).then((response) => {
      setLoading(false);
      setData(
        response.map((legislation, index) => {
          return {
            ...legislation,
            index: index + 1,
            key: legislation.id,
          };
        })
      );
    });
  }, []);

  return (
    <>
      <Row style={{ padding: "20px" }}>
        <Col>
          <Title level={2}>Suggested Legislations</Title>
        </Col>
        <Col span={10}></Col>
        <Col>
          <Button onClick={() => {}} type="default">
            Back
          </Button>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Button
            disabled={!selectedRows.length}
            onClick={() => {
              history.push("/onboarding-unit/compliances/" + unitId);
            }}
            type="secoundry"
          >
            Next
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CustomTable
            loading={loading}
            columns={columns}
            dataSource={data}
            allowRowSelect={true}
            onChange={(selectedRowKeys, selectedRows) => {
              setSelectedRows(selectedRows);
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default OnBoardingLegislation;
