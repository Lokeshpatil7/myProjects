import React, { useRef, useState } from "react";
import { Layout, Button, Row, Col } from "antd";
import { RiMenuFill } from "react-icons/ri";
import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";
import HeaderSearch from "./HeaderSearch";
import Breadcrumb from "./Breadcrumb";

const { Header } = Layout;

export default function MenuHeader(props) {
  const { setVisible, collapsed } = props;

  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  // const searchClick = () => {
  //     setSearchHeader(true)

  //     setTimeout(() => {
  //         inputFocusRef.current.focus({
  //             cursor: 'start',
  //         });
  //     }, 200);
  // }

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
  };

  // Resize
  // function useWindowSize() {
  //     const [size, setSize] = useState([0, 0]);

  //     useLayoutEffect(() => {
  //         function updateSize() {
  //             setSize([window.innerWidth, window.innerHeight]);
  //         }

  //         window.addEventListener('resize', updateSize);

  //         updateSize();
  //         return () => window.removeEventListener('resize', updateSize);
  //     }, []);

  //     return size;
  // }

  // const [width, height] = useWindowSize();

  return (
    <Header>
      <Row
        className="da-w-100 da-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col className="da-mobile-sidebar-button da-mr-24">
          <Button
            className="da-mobile-sidebar-button"
            type="text"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80"
              />
            }
          />
        </Col>

        <Col 
        // offset={collapsed ? 1 : 5}
        >
          <div 
          style={{   
          position : 'relative', 
          left : collapsed ? '80px' : '250px'
        }}
          > <Breadcrumb collapsed={collapsed}/>
          </div>
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? "none" : "block" }}
          className={`da-pr-md-0 da-pr-16 da-header-search ${
            searchActive && "da-header-search-active"
          }`}
        >
          <HeaderSearch
            inputFocusProp={inputFocusProp}
            setSearchHeader={setSearchHeader}
          />
        </Col>

        <Col
          xl={16}
          lg={14}
          className="da-header-left-text da-d-flex-center"
        ></Col>

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {/* {!searchHeader ? (
                                <Button
                                    type="text"
                                    icon={
                                        <Search
                                            set="curved"
                                            className="da-text-color-black-60"
                                        />
                                    }
                                    onClick={() => searchClick()}
                                />
                            ) : 
                            
                            (
                                <Button
                                    type="text"
                                    icon={
                                        <RiCloseLine
                                            size={24}
                                            className="da-text-color-black-60"
                                        />
                                    }
                                    onClick={() => setSearchHeader(false)}
                                />
                            )} */}
            </Col>

            {/* {
                            width >= 768 && (
                                <Link to="/apps/calendar">
                                    <Col className="da-d-flex-center da-mr-4">
                                        <Button
                                            type="text"
                                            icon={
                                                <Calendar
                                                    set="curved"
                                                    className="da-text-color-black-60"
                                                />
                                            }
                                        />
                                    </Col>
                                </Link>
                            )
                        } */}

            <Col className="da-d-flex-center da-mr-sm-12 da-mr-16">
              <HeaderNotifications />
            </Col>

            <Col>
              <HeaderUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}
