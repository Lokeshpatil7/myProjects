import React, { useEffect, useState } from "react";
import RepoTable from "./components/Repotable";
import { Card, Col, Row, Button } from "antd";
import AddModel from "./components/addCompliences/AddModel";
import AddComplianceForm from "./components/addCompliences/form";

import { DeleteFilled } from "@ant-design/icons";
import { get } from "../../../api/HTTPService";
import { useHistory } from "react-router";
import FiltersHeader from "../../components/tableFilter/FiltersHeader";
import MoreOptions from "../../components/data-display/tableActions";

export default ({
  isOnboarding,
  setSelectedRows,
  onAssign,
  unitId,
  selectedLegislations,
}) => {
  const [showAddModule, setshowAddModule] = useState(false);
  const [addModuleScreen, setAddModuleScreen] = useState(1);

  const [originData, setOriginData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [legislation, setlegislation] = useState([]);
  const [rule, setrule] = useState([]);
  const [legislation_rule, setLegislation_rule] = useState([]);
  const [loading, setloading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getRepo();
  }, []);

  const getRepo = () => {
    setloading(true);
    const legislation_ = [];
    const rule_ = [];
    const legislation_rule_ = [];

    let url = "/compliances";
    if (isOnboarding && unitId) {
      url += "?unitId=" + unitId;
    }

    get(url).then((res) => {
      let dataFilterLegislations = [];
      if (selectedLegislations && selectedLegislations.length) {
        dataFilterLegislations = selectedLegislations;
      }
      const dataFiltered = res.filter(
        (compliance) =>
          !!dataFilterLegislations.find(
            (legislation) => legislation.id === compliance.rule.legislation.id
          )
      );
      const originData_ = (isOnboarding ? dataFiltered : res).map(
        (row, index) => {
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
                    label: "Edit Compliance",
                    onClick: () => {
                      // setEditModel(true);
                      setDataToEdit({
                        ...row,
                        esg_category: row.rule.legislation.esg_category,
                        law_category: row.rule.legislation.law_category,
                        first_penalty: row.first_penalty,
                        consequence_reference: row.consequence_reference,
                        consequenceOnCompliences: row.consequence,
                        corrective_actions: row.corrective_actions,
                      });
                    },
                  },
                  {
                    label: "Edit Tagging",
                    onClick: () => {
                      const path = "parent-child-tagging/" + row.UID;
                      history.push(path);
                    },
                  },
                ]}
              />
            ),
            delete: <DeleteFilled onClick={() => alert("working")} />,
          };
        }
      );

      setOriginData(originData_);

      setFilterData(originData_);
      setlegislation(legislation_);
      setrule(rule_);
      setLegislation_rule(legislation_rule_);
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

  const span = window.innerWidth < 1000 ? 24 : 22;

  return (
    <Card
      span={24}
      className="da-border-color-black-40 ant-card card-without-padding"
    >
      {addModuleScreen !== 3 && (
        <Row style={{ marginTop: "20px" }} gutter={[1, 10]}>
          <Col span={span}>
            <FiltersHeader
              filterData={filterData}
              originData={originData}
              setFilterData={setFilterData}
              cols={filterCol}
            />
          </Col>
          {!isOnboarding ? (
            <Col>
              <Button type="secoundry" onClick={() => setshowAddModule(true)}>
                Add
              </Button>
            </Col>
          ) : (
            <Col>
              <Button type="secoundry" onClick={() => onAssign()}>
                Assign
              </Button>
            </Col>
          )}
        </Row>
      )}
      <br />
      {addModuleScreen !== 3 && (
        <div style={{ overflowY: "auto" }}>
          <RepoTable
            loading={loading}
            legislation_rule={legislation_rule}
            originData={filterData}
            rule={rule}
            legislation={legislation}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            isOnboarding={isOnboarding}
            setSelectedRows={setSelectedRows}
          />
        </div>
      )}
      {showAddModule && addModuleScreen !== 3 ? (
        <AddModel
          visible={showAddModule}
          setVisible={setshowAddModule}
          screen={addModuleScreen}
          getRepo={getRepo}
          setScreen={setAddModuleScreen}
        />
      ) : (
        ""
      )}

      {addModuleScreen === 3 && (
        <AddComplianceForm
          setshowAddModule={setshowAddModule}
          setAddModuleScreen={setAddModuleScreen}
        />
      )}
    </Card>
  );
};
