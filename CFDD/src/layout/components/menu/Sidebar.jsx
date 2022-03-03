/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
// import { loadCurrentItem } from "../../../redux/ecommerce/ecommerceActions";
import "./sidebar.css";

import { Layout, Drawer, Menu } from "antd";

import { RiCloseFill } from "react-icons/ri";

import MenuLogo from "./logo/logo";
import MenuFooter from "./footer/menuFooter";
import navigation from "../../../navigation";

// import avatar from "../../../assets/images/memoji/memoji-1.png";
import openIcon from "../../../assets/images/nav/open.svg";
import closeIcon from "../../../assets/images/nav/close.svg";
import colorful from "../../../assets/images/logo/colorful.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const central_repository_submenuItems = [
  {
    id: "centralRepository",
    title: (
      <div className="sidebar-title s-title-margin">Central repository</div>
    ),
    // icon: <Document set='curved' className='remix-icon' />,
    navLink: "/central-repository",
  },
  {
    id: "parentChildTagging",
    title: (
      <div className="sidebar-title s-title-margin">Parent child tagging</div>
    ),
    navLink: "/parent-child-tagging/0",
  },
  {
    id: "assignCompliance",
    title: (
      <div className="sidebar-title s-title-margin">Assign compliances</div>
    ),
    navLink: "/assign-compliances",
  },
];

export const central_repository_user_submenuItems = [
  {
    id: "complianceTask",
    title: <div className="sidebar-title s-title-margin">Compliance Task</div>,
    navLink: "/user-compliance-repository",
  },
  {
    id: "internalTask",
    title: <div className="sidebar-title s-title-margin">Internal Task</div>,
    navLink: "/user-compliance-repository?internal=true",
  },
];

export default function Sidebar(props) {
  const { visible, setVisible, setCollapsed, collapsed } = props;

  useEffect(() => {
    if (window.innerWidth < 900) {
      setCollapsed(true);
    }
  }, []);
  // Redux
  // const products = useSelector((state) => state.ecommerce.products);
  // const dispatch = useDispatch();

  // Location
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };
  // const MenuItemGroup = Menu.ItemGroup;
  // Menu
  function toggle() {
    // if(window.innerWidth > 600 && window.screen.width > 600){
    setCollapsed(!collapsed);
    // }
  }

  function hideSider() {
    if (window.innerWidth < 450) {
      setCollapsed(true);
    }
  }

  // const splitLocationUrl =
  //   splitLocation[splitLocation.length - 2] +
  //   "/" +
  //   splitLocation[splitLocation.length - 1];

  const menuItem = navigation.map((item, index) => {
    // if (item.header) {
    //   return <Menu.ItemGroup key={index} title={item.header}></Menu.ItemGroup>
    // }

    // if (item.children) {
    //   return (
    //     <SubMenu key={item.id} icon={item.icon} title={item.title}>
    //       {item.children.map((childrens, index) => {
    //         if (!childrens.children) {
    //           const childrenNavLink = childrens.navLink.split('/')
    //           return (
    //             <Menu.Item
    //               key={childrens.id}
    //               className={
    //                 splitLocationUrl ===
    //                 childrenNavLink[childrenNavLink.length - 2] +
    //                   '/' +
    //                   childrenNavLink[childrenNavLink.length - 1]
    //                   ? 'ant-menu-item-selected'
    //                   : 'ant-menu-item-selected-in-active'
    //               }
    //               onClick={onClose}
    //             >
    //               {childrens.id === 'product-detail' ? (
    //                 <Link
    //                   to={childrens.navLink}
    //                   onClick={() => dispatch(loadCurrentItem(products[0]))}
    //                 >
    //                   {childrens.title}
    //                 </Link>
    //               ) : childrens.id.split('-')[0] === 'email' ? (
    //                 <a href={childrens.navLink} target='_blank'>
    //                   {childrens.title}
    //                 </a>
    //               ) : (
    //                 <Link to={childrens.navLink}>{childrens.title}</Link>
    //               )}
    //             </Menu.Item>
    //           )
    //         } else {
    //           return (
    //             <SubMenu key={childrens.id} title={childrens.title}>
    //               {childrens.children.map((childItem, index) => {
    //                 const childrenItemLink = childItem.navLink.split('/')
    //                 return (
    //                   <Menu.Item
    //                     key={childItem.id}
    //                     className={
    //                       splitLocationUrl ===
    //                       childrenItemLink[childrenItemLink.length - 2] +
    //                         '/' +
    //                         childrenItemLink[childrenItemLink.length - 1]
    //                         ? 'ant-menu-item-selected'
    //                         : 'ant-menu-item-selected-in-active'
    //                     }
    //                     onClick={onClose}
    //                   >
    //                     <Link to={childItem.navLink}>{childItem.title}</Link>
    //                   </Menu.Item>
    //                 )
    //               })}
    //             </SubMenu>
    //           )
    //         }
    //       })}
    //     </SubMenu>
    //   )
    // }
    if (item.id === "User Compliance Repository") {
      return (
        <SubMenu
          style={{
            color: "white",
            // backgroundColor : 'blue',
            // borderTopLeftRadius : '50px',
            // borderTopRightRadius : '50px'
          }}
          key={item.id}
          icon={item.icon}
          title={item.title}
        >
          {central_repository_user_submenuItems.map((subMenuItem, index) => {
            return (
              <Menu.Item
                style={{ color: "white", backgroundColor: "#027b4b" }}
                key={index}
              >
                {subMenuItem.navLink ? (
                  <Link style={{ color: "white" }} to={subMenuItem.navLink}>
                    {subMenuItem.title}
                  </Link>
                ) : (
                  <Link
                    to="/"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    {subMenuItem.title}
                  </Link>
                )}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
    if (item.id === "centralRepository") {
      return (
        <SubMenu
          style={{
            color: "white",
            // backgroundColor : 'blue',
            // borderTopLeftRadius : '50px',
            // borderTopRightRadius : '50px'
          }}
          key={item.id}
          icon={item.icon}
          title={item.title}
        >
          {central_repository_submenuItems.map((subMenuItem, index) => {
            return (
              <Menu.Item
                style={{ color: "white", backgroundColor: "#027b4b" }}
                key={index}
              >
                {subMenuItem.navLink ? (
                  <Link style={{ color: "white" }} to={subMenuItem.navLink}>
                    {subMenuItem.title}
                  </Link>
                ) : (
                  <Link
                    to="/"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    {subMenuItem.title}
                  </Link>
                )}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    } else {
      const itemNavLink = item.navLink.split("/");
      return (
        <Menu.Item
          key={item.id}
          icon={item.icon}
          onClick={onClose}
          className={
            item.id === "profile"
              ? splitLocation[splitLocation.length - 3] +
                  "/" +
                  splitLocation[splitLocation.length - 2] ===
                itemNavLink[itemNavLink.length - 3] +
                  "/" +
                  itemNavLink[itemNavLink.length - 2]
                ? "ant-menu-item-selected"
                : "ant-menu-item-selected-in-active"
              : splitLocation[splitLocation.length - 2] +
                  "/" +
                  splitLocation[splitLocation.length - 1] ===
                itemNavLink[itemNavLink.length - 2] +
                  "/" +
                  itemNavLink[itemNavLink.length - 1]
              ? "ant-menu-item-selected"
              : "ant-menu-item-selected-in-active"
          }
        >
          {/* <Link to={item.navLink}>{item.title}</Link> */}
          {item.navLink ? (
            <Link to={item.navLink} onClick={() => hideSider()}>
              {item.title}
            </Link>
          ) : (
            <Link to="/" onClick={(event) => event.preventDefault()}>
              {item.title}
            </Link>
          )}
        </Menu.Item>
      );
    }
  });
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      // width={window.innerWidth > 550 ? 256 : 200}
      width={256}
      className="da-sidebar"
    >
      {/* <div> */}
      <img alt="" src={colorful} />
      {/* </div> */}
      <div style={{ marginTop: "5px" }}>
        {collapsed === false ? (
          <div style={{ display: "flex" }}>
            <MenuLogo onClose={onClose} />
            <a onClick={toggle} className="toggel">
              <img src={openIcon} alt="" />
            </a>
          </div>
        ) : (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={toggle} className="toggel toggel-out">
            <img src={closeIcon} alt="" />
          </a>
        )}
      </div>

      <Menu
        mode="inline"
        defaultOpenKeys={[
          splitLocation.length === 5
            ? splitLocation[splitLocation.length - 3]
            : null,
          splitLocation[splitLocation.length - 2],
        ]}
      >
        {menuItem}
      </Menu>
      {/* 
      {collapsed === false ? (
        <MenuFooter onClose={onClose} />
      ) : (
        <Row
          className="da-sidebar-footer da-py-16"
          align="middle"
          justify="center"
        >
          <Col>
            <Link to="/pages/profile/personel-information" onClick={onClose}>
              <Avatar size={36} src={avatar} />
            </Link>
          </Col>
        </Row>
      )} */}

      <Drawer
        title={<MenuLogo onClose={onClose} />}
        className="da-mobile-sidebar"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        closeIcon={
          <RiCloseFill
            className="remix-icon da-text-color-black-80"
            size={24}
          />
        }
      >
        <Menu
          mode="inline"
          defaultOpenKeys={[
            splitLocation.length === 5
              ? splitLocation[splitLocation.length - 3]
              : null,
            splitLocation[splitLocation.length - 2],
          ]}
        >
          {menuItem}
        </Menu>

        <MenuFooter onClose={onClose} />
      </Drawer>
    </Sider>
  );
}
