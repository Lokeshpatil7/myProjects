import React from "react";
import FilterDropDown from "./FilterDropDown";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { RightCircleFilled, LeftCircleFilled } from "@ant-design/icons";
import "./filter.css";

function FiltersHeader({ filterData, originData, cols, setFilterData }) {
  const [filterCols, setfilterCols] = React.useState({});

  React.useEffect(() => {
    // creating a filter array with
    const filterCols_ = {};
    if (Object.keys(filterCols).length === 0 && cols) {
      cols.forEach((col) => {
        filterCols_[col.colName] = [];
      });
      setfilterCols({ ...filterCols_ });
    }

    // reset filter data if all filter is removed
    if (
      originData.length !== filterData.length &&
      !Object.values(filterCols).find((selectedItems) => {
        return selectedItems.length !== 0;
      })
    ) {
      setFilterData([
        ...originData.map((row, index) => {
          return {
            ...row,
            index: index + 1,
          };
        }),
      ]);
    }
  }, [filterCols, filterData]);

  const onFilter = (item, colName) => {
    const filterCols_ = filterCols;
    // check if(item belongs to filterCols[colName])
    const itemIndex = filterCols_[colName].findIndex(
      (selectedItem) => selectedItem === item
    );

    if (itemIndex === -1) {
      filterCols_[colName].push(item);
    } else {
      filterCols_[colName].splice(itemIndex, 1);
    }

    setfilterCols({ ...filterCols_ });

    aplyFilterOnOriginData();
  };

  const aplyFilterOnOriginData = () => {
    let originData_ = originData;

    Object.entries(filterCols).forEach((col) => {
      const colName = col[0];
      const items = col[1];
      if (items.length > 0) {
        originData_ = originData_.filter((row) => {
          return items.includes(row[colName]);
        });
      }
    });
    setFilterData([
      ...originData_.map((row, index) => {
        return {
          ...row,
          index: index + 1,
        };
      }),
    ]);
  };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {cols.map((colDetail, index) => (
        <FilterDropDown
          itemId={index + ""} // NOTE: itemId is required for track items
          key={index + ""}
          filterData={filterData}
          onFilter={onFilter}
          setfilterCols={setfilterCols}
          filterCols={filterCols}
          label={colDetail.label}
          colName={colDetail.colName}
          calender={colDetail?.calender}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);
  return (
    <div className="left-arrow-div">
      <LeftCircleFilled
        className={`left-arrow ${isFirstItemVisible ? "hide-arrows" : ""}`}
        onClick={() => scrollPrev()}
      />
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  return (
    <div className="right-arrow-div">
      <RightCircleFilled
        className={`right-arrow ${isLastItemVisible ? "hide-arrows" : ""}`}
        onClick={() => scrollNext()}
      />
    </div>
  );
}

export default FiltersHeader;
