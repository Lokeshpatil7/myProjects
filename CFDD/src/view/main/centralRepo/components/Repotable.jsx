import React from "react";
import CustomTable from "../../../../view/components/data-display/table/CustomTable";
import EditCompliance from "../actions/editCompliance/EditCompliance";
import ComplianceDetails from "../actions/complianceDetails";

export default function RepoTable({
  loading,
  originData,
  rule,
  legislation,
  dataToEdit,
  legislation_rule,
  setDataToEdit,
  isOnboarding,
  setSelectedRows,
}) {
  const columns = [
    {
      title: "SR NO",
      dataIndex: "index",
      width: "70px",
      fixed: "left",
    },
    {
      title: "UID",
      dataIndex: "UID",
      width: "40px",
    },
    {
      title: "applicability",
      dataIndex: "applicability",
    },
    {
      title: "authority",
      dataIndex: "authority",
      width: "200px",
    },
    {
      title: "Name of Legislation",
      dataIndex: "legislationName",
    },
    {
      title: "Name of rules",
      dataIndex: "ruleName",
    },
    {
      title: "Law Category",
      dataIndex: "legislationLaw_category",
      width: "20px",
    },
    {
      title: "ECG Category",
      dataIndex: "legislationEsg_category",
      width: "140px",
    },
    {
      title: "consequence On Compliances",
      dataIndex: "consequenceOnCompliences",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      width: "200px",
    },
    {
      title: "UID Title",
      dataIndex: "title",
      width: "250px",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      width: "200px",
    },
    {
      title: "country",
      dataIndex: "country",
      width: "40px",
    },
    {
      title: "corrective actions",
      dataIndex: "corrective_actions",
      width: "200px",
    },
    {
      title: "created at",
      dataIndex: "created_at",
      width: "200px",
    },
    {
      title: "daily fine",
      dataIndex: "daily_fine",
    },
    {
      title: "daily fine amount",
      dataIndex: "daily_fine_amount",
    },
    {
      title: "event question",
      dataIndex: "event_question",
    },
    {
      title: "first penalty",
      dataIndex: "first_penalty",
    },
    {
      title: "form details",
      dataIndex: "form_details",
    },
    {
      title: "global principles",
      dataIndex: "global_principles",
    },
    {
      title: "help text",
      dataIndex: "help_text",
      width: "500px",
    },
    {
      title: "is active",
      dataIndex: "is_active_value",
    },
    {
      title: "is compoundable",
      dataIndex: "is_compoundable_value",
    },
    {
      title: "linkage",
      dataIndex: "linkage",
    },
    {
      title: "online link",
      dataIndex: "online_link",
    },
    {
      title: "region",
      dataIndex: "region",
    },
    {
      title: "requirement",
      dataIndex: "requirement",
      // width: "500px",
    },
    {
      title: "source matrix",
      dataIndex: "source_matrix",
      // width: "200px",
    },
    {
      title: "threshold",
      dataIndex: "threshold",
    },
    {
      title: "threshold unit",
      dataIndex: "threshold_unit",
    },
    {
      title: "threshold value",
      dataIndex: "threshold_value",
    },
    {
      title: "update page crawler link",
      dataIndex: "update_page_crawler_link",
    },
    {
      title: "updated at",
      dataIndex: "updated_at",
    },
    {
      title: "zone",
      dataIndex: "zone",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      width: "40px",
    },
    {
      title: "Parent",
      dataIndex: "parent_compliance",
      width: "40px",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "40px",
    },
  ];

  if (!isOnboarding) {
    columns.push({
      title: "Actions",
      dataIndex: "actions",
      width: "80px",
      fixed: "right",
    });
  }

  return (
    <>
      <CustomTable
        loading={loading}
        columns={columns}
        dataSource={originData}
        allowRowSelect={isOnboarding ? true : false}
        onChange={(selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows);
          // console.log(
          //   `selectedRowKeys: ${selectedRowKeys}`,
          //   "selectedRows: ",
          //   selectedRows
          // );
        }}
      />
      {originData && (
        <EditCompliance
          formData={dataToEdit}
          rule={rule}
          legislation={legislation}
          setFormData={setDataToEdit}
          legislation_rule={legislation_rule}
        />
      )}
      <ComplianceDetails />
    </>
  );
}
