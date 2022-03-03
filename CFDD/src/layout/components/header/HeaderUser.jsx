import { UserOutlined } from "@ant-design/icons";

import { Menu, Dropdown, Col, Avatar } from "antd";
import { Logout } from "react-iconly";

// import avatarImg from "../../../assets/images/memoji/memoji-1.png";

export default function HeaderUser() {
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  const menu = (
    <Menu>
      {/* <Menu.Item
                icon={
                    <User
                        set="curved"
                        className="remix-icon da-vertical-align-middle"
                        size={16}
                    />
                }
            >
                <Link to="/pages/profile/personel-information">
                    Profile
                </Link>
            </Menu.Item> */}

      {/* <Menu.Item
                icon={
                    <Calendar
                        set="curved"
                        className="remix-icon da-vertical-align-middle"
                        size={16}
                    />
                }
            >
                <Link to="/apps/calendar">
                    Calendar
                </Link>
            </Menu.Item> */}

      <Menu.Item
        icon={
          <Logout
            set="curved"
            className="remix-icon da-vertical-align-middle"
            size={16}
          />
        }
        onClick={logout}
      >
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Col className="da-d-flex-center" onClick={(e) => e.preventDefault()}>
        <Avatar icon={<UserOutlined />} size={40} />
      </Col>
    </Dropdown>
  );
}
