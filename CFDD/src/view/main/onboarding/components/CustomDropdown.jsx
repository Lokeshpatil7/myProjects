// import React from "react";
// import { Checkbox, Menu, Dropdown, Space, Button } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import filter from "../../../../assets/images/onboarding/filter.svg";

// const CustomDropdown = ({ label }) => {
//   const myarray = [
//     "Entity details",
//     "Company secratorial details",
//     "Finance & exam & Customs",
//     "EHS And HR",
//     "Types Of Law",
//     "Event Based Questions",
//   ];

//   const onClick = ({ key }) => {
//     console.log(key);
//   };

//   const menu = (
//     <Menu onClick={onClick}>
//       {myarray.map((item, i) => (
//         <Menu.Item key={i}>{item}</Menu.Item>
//       ))}
//     </Menu>
//   );
//   return (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown overlay={menu} placement="bottomLeft">
//           {label ? (
//             <Button>
//               {label}
//               <span style={{ marginLeft: "10px" }}>
//                 <DownOutlined />
//               </span>
//             </Button>
//           ) : (
//             <div style={{ padding: "4px", cursor: "pointer" }}>
//               <img alt="" src={filter} />
//             </div>
//           )}
//         </Dropdown>
//       </Space>
//     </Space>
//   );
// };

// export default CustomDropdown;
