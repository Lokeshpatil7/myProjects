import React, { Children, useEffect } from "react";
import { Table } from "antd";
import { get } from "../../../../api/HTTPService";

export default function RepoTable({
  loading,
  parentIdToUpdate,
  parent,
  setparent,
  setChildren,
  selectChildren,
  setselectChildren,
  allParent,
  setallParent,
  allChildren,
  setallChildren,
  setParentFilterData,
  setChildFilterData,
}) {
  // const myarray = [{label:"Edit Compliance",onClick = ()=>{}},{label: "Edit Tagging",onclick=()=>{}}];

  useEffect(() => {
    Object.keys(parent).length === 0 && getRepo();

    Object.keys(parent).length > 0
      ? setselectChildren(true)
      : setselectChildren(false);
  }, [parent, Children]);

  const getRepo = () => {
    get("/compliances").then((res) => {
      const _allParent = [];
      const _allChildren = [];
      const selectedChildren = [];

      res.data.forEach((row, index) => {
        const rowData = {
          key: index + 1,
          ...row,
          ...{
            legislationName: row.legislation.name,
            ruleName: row.rule.name,
            legislationLaw_category: row.legislation.law_category,
            legislationEsg_category: row.legislation.esg_category,
          },
        };

        rowData.linkage === "parent"
          ? _allParent.push(rowData)
          : _allChildren.push(rowData);
        if (parentIdToUpdate === rowData.UID) {
          setparent(rowData);
        }
        if (rowData.parent_compliance === parentIdToUpdate) {
          selectedChildren.push(rowData);
        }
      });
      // rowSelection.selectedRowKeys = children.map((child) => child.key;
      setChildren(selectedChildren);
      setallChildren(_allChildren);
      setChildFilterData(_allChildren);
      setParentFilterData(_allParent);
      setallParent(_allParent);
    });
  };

  const columns = [
    {
      title: "SR NO",
      dataIndex: "key",
      width: "100px",
    },
    {
      title: "UID",
      dataIndex: "UID",
      width: "250px",
    },
    {
      title: "Name of Legislation",
      dataIndex: "legislationName",
      width: "300px",
    },
    {
      title: "Name of rules",
      dataIndex: "ruleName",
      width: "400px",
    },
    {
      title: "Law Category",
      dataIndex: "legislationLaw_category",
      width: "200px",
    },
    {
      title: "ECG Category",
      dataIndex: "legislationEsg_category",
      width: "140px",
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
      width: "130px",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      width: "200px",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectChildren) {
        setChildren(selectedRows);
      } else {
        setparent(selectedRows[0]);
      }
    },
  };

  return (
    <Table
      loading={loading}
      rowSelection={{
        type: selectChildren ? "checkbox" : "radio",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={selectChildren ? allChildren : allParent}
      scroll={{ x: 800 }}
    />
  );
}
