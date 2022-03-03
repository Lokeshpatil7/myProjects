import React, { useState, useEffect } from "react";
import { get } from "../../../../api/HTTPService";
import AssetTable from "./components/AssetTable";
import { Button, Row, Col } from "antd";
import FilterSelect from "../../master/components/FilterSelect";
import AddAsset from "./components/addAsset";
import DeleteAsset from "./components/actions/deleteAsset";
import EditAsset from "./components/actions/editAsset";
import MoreOptions from "../../../components/data-display/tableActions";

import moment from "moment";
// import MoreOptions from "../../../components/data-display/tableActions";

export default function Asset() {
  const [dataSource, setdataSource] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [modalToShow, setModalToShow] = React.useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [entites, setEntites] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    get("/groups").then((res) => {
      if (res.data) setGroups(res.data);
    });
  };
  const getOrg = (selectedGroup) => {
    get(`/group/${selectedGroup}/entity/`).then((res) => {
      if (res.data) setEntites(res.data);
    });
  };

  const getUnit = (selectedEntity) => {
    get(`/entity/${selectedEntity}/unit/`).then((res) => {
      if (res.data) setUnits(res.data);
    });
  };

  const getAssets = (selectedUnit) => {
    get(`/asset/unit/${selectedUnit}`).then((res) => {
      const originData_ = res.data.map((row, index) => {
        return {
          index: index + 1,
          ...row,
          asset_renewal_date: moment(row.asset_renewal_date).format(
            "DD-MM-YYYY"
          ),
          actions: (
            <MoreOptions
              actionsList={[
                {
                  label: "Edit Asset",
                  onClick: () => {
                    setModalToShow("Edit Asset");
                    setSelectedAsset({ ...row });
                  },
                },
                {
                  label: "Delete Asset",
                  onClick: () => {
                    setModalToShow("Delete Asset");
                    setSelectedAsset(row.id);
                  },
                },
              ]}
            />
          ),
        };
      });
      setdataSource(originData_);
    });
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <FilterSelect
            placeholder="Select Group"
            options={groups}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedGroup(el);
              getOrg(el);
            }}
          />
        </Col>

        <Col span={6}>
          <FilterSelect
            placeholder="Select Entity"
            options={entites}
            label="name"
            value="id"
            onChange={(el) => {
              setSelectedEntity(el);
              getUnit(el);
            }}
          />
        </Col>

        <Col span={6}>
          <FilterSelect
            placeholder="Select Unit"
            options={units}
            label="name"
            value="id"
            // selectedValue={selectedEntity}
            onChange={(el) => {
              setSelectedUnit(el);
              getAssets(el);
            }}
          />
        </Col>
        <Col span={4}></Col>
        <Col span={2}>
          <Button type="secoundry" onClick={() => setModalToShow("Add Asset")}>
            Add
          </Button>
        </Col>
      </Row>
      <br />

      <AssetTable dataSource={dataSource} />

      <AddAsset
        getAssets={getAssets}
        getOrg={getOrg}
        getUnit={getUnit}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entites={entites}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        units={units}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        showModel={modalToShow === "Add Asset"}
        setShowModel={setModalToShow}
      />

      <EditAsset
        getAssets={getAssets}
        getOrg={getOrg}
        getUnit={getUnit}
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        entites={entites}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        units={units}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        selected={selectedAsset}
        setSelected={setSelectedAsset}
        showModel={modalToShow === "Edit Asset"}
        setShowModel={setModalToShow}
      />

      <DeleteAsset
        getAssets={getAssets}
        selectedUnit={selectedUnit}
        selectedAsset={selectedAsset}
        showModel={modalToShow === "Delete Asset"}
        setShowModel={setModalToShow}
      />
    </div>
  );
}
