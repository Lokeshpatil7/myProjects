import React, { useState } from "react";
import RepoTable from "./components/Repotable";
import { Card, Col, Row, Button, notification, Divider } from "antd";
import { post } from "../../../api/HTTPService";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import FiltersHeader from "../../components/tableFilter/FiltersHeader";

export default function Analytics(props) {
  const [parent, setparent] = useState({});
  const [children, setChildren] = useState([]);
  const [loading, setloading] = useState(false);

  const [selectChildren, setselectChildren] = useState(false);
  const [allParent, setallParent] = useState([]);
  const [allChildren, setallChildren] = useState([]);
  const [childFilterData, setChildFilterData] = useState([]);
  const [parentFilterData, setParentFilterData] = useState([]);
  const [originData, setoriginData] = useState([]);

  const filterCol = [
    { label: "NAME OF LEGISLATION", colName: "legislationName" },
    { label: "NAME OF RULE", colName: "ruleName" },
    { label: "LAW CATEGORY", colName: "legislationLaw_category" },
    { label: "ESG CATEGORY", colName: "esg_category" },
    { label: "REFERANCE", colName: "reference" },
    { label: "PARENT/CHILD", colName: "linkage" },
    { label: "FREQUENCY", colName: "frequency" },
    { label: "SEVERITY", colName: "severity" },
  ];

  const tag = async () => {
    setloading(true);
    const childrenIds = [];
    children.forEach((el) => {
      el.id !== parent.id && childrenIds.push(el.id);
    });
    
    try {
      const linked = await post(`/compliances/${parent.id}/linking/`, {
        child_compliances: childrenIds,
      });
      if (linked && linked.success) {
        notification.open({
          message: "Linked Successfully",
          description: "",
          icon: <RiErrorWarningFill style={{ color: "#00BA75" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
      }
      setloading(false);
      // handleModleClose();
    } catch (e) {
      notification.open({
        message: "Error",
        description: e.response.data.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        ),
      });

      setloading(false);
    }
  };

  const span = window.innerWidth < 900 ? 24 : 22

  return (
    <div>
      <Card span={24} className="da-border-color-black-40">
        {Object.keys(parent).length !== 0 && (
          <div>
            <Divider orientation="left">Parent</Divider>

            <Row>
              <Col span={3}>
                <label className="label"> UID </label>
                <div>
                  <strong>{parent.UID}</strong>
                </div>
              </Col>
              <Col span={5}>
                <label className="label"> NAME OF LEGISLATION </label>
                <div>
                  <strong>{parent.legislationName}</strong>
                </div>
              </Col>

              <Col span={6}>
                <label className="label"> NAME OF RULES </label>
                <div>
                  <strong>{parent.ruleName}</strong>
                </div>
              </Col>

              <Col span={6}>
                <label className="label"> Law Category </label>
                <div>
                  <strong>{parent.legislationLaw_category}</strong>
                </div>
              </Col>

              <Col span={4}>
                <label className="label">Frequency </label>
                <div>
                  <strong>{parent.frequency}</strong>
                </div>
              </Col>

              <Col span={3}>
                <label className="label">Severity </label>
                <div>
                  <strong>{parent.severity}</strong>
                </div>
              </Col>

              <Col span={5}>
                <label className="label">ESG Category </label>
                <div>
                  <strong>{parent.legislationEsg_category}</strong>
                </div>
              </Col>

              <Col span={6}>
                <label className="label">Refferene </label>
                <div>
                  <strong>{parent.reference}</strong>
                </div>
              </Col>

              <Col span={6}>
                <label className="label">Uid title </label>
                <div>
                  <strong>{parent.title}</strong>
                </div>
              </Col>
            </Row>
            <br />
          </div>
        )}

        <Row gutter={[10, 10]}>
          <Col span={span}>
            {selectChildren ? (
              <FiltersHeader
                filterData={childFilterData}
                originData={allChildren}
                setFilterData={setChildFilterData}
                cols={filterCol}
              />
            ) : (
              <FiltersHeader
                filterData={parentFilterData}
                originData={allParent}
                setFilterData={setParentFilterData}
                cols={filterCol}
              />
            )}
          </Col>

          <Col>
            <Button loading={loading} type="secoundry" onClick={() => tag()}>
              Tag
            </Button>
          </Col>
        </Row>
          <br />

        {Object.keys(parent).length !== 0 && (
          <Divider orientation="left">Children</Divider>
        )}

        <RepoTable
          loading={loading}
          parent={parent}
          parentIdToUpdate={props.match.params.id}
          setparent={setparent}
          children={children}
          setChildren={setChildren}
          selectChildren={selectChildren}
          setselectChildren={setselectChildren}
          allParent={parentFilterData}
          setallParent={setallParent}
          allChildren={childFilterData}
          setallChildren={setallChildren}
          setChildFilterData={setChildFilterData}
          setParentFilterData={setParentFilterData}
          originData={originData}
          setoriginData={setoriginData}
        />
      </Card>
    </div>
  );
}
