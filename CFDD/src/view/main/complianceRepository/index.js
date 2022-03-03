import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";

import { get } from "../../../api/HTTPService";
import { useHistory } from "react-router";
import FiltersHeader from "../../components/tableFilter/FiltersHeader";
import MoreOptions from "../../components/data-display/tableActions";
import ComplianceRepositoryTable from "./components/ComplianceRepositoryTable";
import ComplianceDetails from "./components/ComplianceDetails";

export default ({ isOnboarding, setSelectedRows, onAssign }) => {
  const location = useLocation();
  const [, , path, complianceId] = location.pathname.split("/");

  const [showAddModule, setshowAddModule] = useState(false);

  const [originData, setOriginData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  //   const [legislation, setlegislation] = useState([]);
  //   const [rule, setrule] = useState([]);
  //   const [legislation_rule, setLegislation_rule] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const history = useHistory();

  useEffect(() => {
    getRepo();
  }, []);

  const getComponentByPath = () => {
    switch (path) {
      case "details":
        return <ComplianceDetails selectedRow={selectedRow} />;
    }
  };

  const getRepo = () => {
    setloading(true);
    const legislation_ = [];
    const rule_ = [];
    const legislation_rule_ = [];

    get("/compliances").then((res) => {
      const originData_ = res.map((row, index) => {
        const leg_index = legislation_.findIndex(
          (el) => el.id === row.rule.legislation.id
        );

        if (leg_index === -1) {
          legislation_.push(row.rule.legislation);
          legislation_rule_.push({
            le: row.rule.legislation,
            rule: [row.rule],
          });
        } else {
          if (
            legislation_rule_[leg_index].rule.findIndex(
              (el) => el.id === row.rule.id
            ) === -1
          ) {
            legislation_rule_[leg_index].rule.push(row.rule);
          }
        }

        if (rule_.findIndex((el) => el.id === row.rule.id) === -1) {
          rule_.push(row.rule);
        }

        return {
          index: index + 1,
          ...row,
          key: row.id,
          created_at: new Date(row.created_at || "").toLocaleDateString(),
          updated_at: new Date(row.updated_at || "").toLocaleDateString(),
          is_compoundable_value: row.is_compoundable
            ? "Compoundable"
            : "Non-Compoundable",
          is_active_value: row.is_active ? "Yes" : "No",
          ...{
            legislationName: row.rule.legislation.name,
            ruleName: row.rule.name,
            legislationLaw_category: row.rule.legislation.law_category,
            legislationEsg_category: row.rule.legislation.esg_category,
          },
          ...{
            esg_category: row.rule.legislation.esg_category,
            law_category: row.rule.legislation.law_category,
            first_penalty: row.first_penalty,
            consequence_reference: row.consequence_reference,
            consequenceOnCompliences: row.consequence,
            corrective_actions: row.corrective_actions,
          },
          actions: isOnboarding ? null : (
            <MoreOptions
              actionsList={[
                {
                  label: "View Compliance Details",
                  onClick: () => {
                    setSelectedRow({
                      ...row,
                    });
                    history.push("/compliance-repository/details/" + row.id);
                  },
                },
              ]}
            />
          ),
        };
      });

      setOriginData(originData_);

      setFilterData(originData_);
      //   setlegislation(legislation_);
      //   setrule(rule_);
      //   setLegislation_rule(legislation_rule_);
      if (complianceId) {
        setSelectedRow({
          ...(originData_.find((row) => row.id === complianceId) || {}),
        });
      }
      setloading(false);
    });
  };

  const filterCol = [
    // { label: "Date", colName: "legislationName" },
    { label: "NAME OF LEGISLATION", colName: "legislationName", calender: "" },
    { label: "NAME OF RULE", colName: "ruleName" },
    { label: "LAW CATEGORY", colName: "legislationLaw_category" },
    { label: "ESG CATEGORY", colName: "esg_category" },
    { label: "REFERANCE", colName: "reference" },
    { label: "PARENT/CHILD", colName: "linkage" },
    { label: "FREQUENCY", colName: "frequency" },
    { label: "SEVERITY", colName: "severity" },
    { label: "ZONE", colName: "zone" },
    { label: "FORM DETAILS", colName: "form_details" },
    { label: "REGION", colName: "region" },
    { label: "CONSEQUENCE REFERENCE", colName: "consequence_reference" },
    { label: "UID TITLE", colName: "title" },
    {
      label: "Consequence On Compliances",
      colName: "consequenceOnCompliences",
    },
    { label: "online link", colName: "online_link" },
  ];

  return (
    <Card
      span={24}
      className="da-border-color-black-40 ant-card card-without-padding"
    >
      {!path ? (
        <>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <FiltersHeader
                filterData={filterData}
                originData={originData}
                setFilterData={setFilterData}
                cols={filterCol}
              />
            </Col>
          </Row>
          <br />
          <div style={{ overflowY: "auto" }}>
            <ComplianceRepositoryTable
              loading={loading}
              originData={filterData}
              isOnboarding={isOnboarding}
              setSelectedRows={setSelectedRows}
            />
          </div>
        </>
      ) : (
        getComponentByPath()
      )}
    </Card>
  );
};
