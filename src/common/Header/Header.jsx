import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./header.css";
import { PROFILE_URL } from "../Routes/constant";
import Objectgroup from "../../objects/Objectgroup";
import Alert from "../../objects/Alert/alert";

const Header = ({ brandcode, selectedObjectGroup, togglebutton, menulist }) => {
  const [isToggleOn, setIsToggleOn] = useState("");
  const [activeTab, setActiveTab] = useState("circle");
  const [button, setButton] = useState("");
  const [selectedTabTitle, setSelectedTabTitle] = useState("");
  const [isNotificationClick, setIsNotificationClick] = useState(false);
  const [activeImage, setActiveImage] = useState("circle");

  useEffect(() => {
    if (brandcode) {
      setIsToggleOn(true);
    }
  }, [brandcode]);
  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };
  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
    setActiveImage(tabKey);
  };
  const handleTogglebutton = (value) => {
    setButton(value);

    let tabData = {};
    switch (value) {
      case "Sales Dashboard":
        tabData = { title: "Sales Dashboard" };
        break;
      case "After-Sales Dashboard":
        tabData = { title: "After-Sales Dashboard" };
        break;
      case "SysMonitoring Dashboard":
        tabData = { title: "SysMonitoring Dashboard" };
        break;
      default:
        break;
    }
    togglebutton(tabData);
    setSelectedTabTitle(tabData.title);
  };

  return (
    <>
      <div className="mn_hd">
        <div className="col-md-8">
          <div className="des_tx">
            <h1>Dashboards</h1>
            {selectedObjectGroup && (
              <div className="top_icon">
                <ul>
                  <li className={activeImage === "circle" ? "active" : ""}>
                    <img
                      src={`${PROFILE_URL}/Circle-View.png`}
                      alt="Circle View"
                      onClick={() => handleTabSelect("circle")}
                    />
                  </li>
                  <li className={activeImage === "box" ? "active" : ""}>
                    <img
                      src={`${PROFILE_URL}/Long-Card-View.png`}
                      alt="Long-card View"
                      onClick={() => handleTabSelect("box")}
                    />
                  </li>

                  <li className={activeImage === "card" ? "active" : ""}>
                    <img
                      src={`${PROFILE_URL}/Card-View.png`}
                      alt="Card View"
                      onClick={() => handleTabSelect("card")}
                    />
                  </li>

                  <li className={activeImage === "graph" ? "active" : ""}>
                    <img
                      src={`${PROFILE_URL}/Graph-View.png`}
                      alt="Graph View"
                      onClick={() => handleTabSelect("graph")}
                    />
                  </li>

                  {/* <li className="icon_pdg1">
                    <img
                      src={`${PROFILE_URL}/Icon-awesome-star.png`}
                      alt="star"
                      // onClick={() => handleTabSelect("fav")}
                    />
                  </li> */}

                  <li>
                    <img
                      src={`${PROFILE_URL}/Notification-Bell Icon.png`}
                      alt="notification bell"
                      onClick={() => setIsNotificationClick((prev) => !prev)}
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="user_nm">
            <p>Your Name</p>
            <span>Designation</span>
          </div>

          <div className="user_nm_pic">
            <img src={`${PROFILE_URL}/user.png`} alt="user user" />
          </div>
        </div>
      </div>

      {selectedTabTitle && (
        <div className="system_tx">
          {selectedTabTitle === "SysMonitoring Dashboard" && (
            <h4>System Monitoring</h4>
          )}
          {selectedTabTitle === "Sales Dashboard" && <h4>Sales</h4>}
          {selectedTabTitle === "After-Sales Dashboard" && <h4>After-Sales</h4>}
          <hr className="line1"></hr>
        </div>
      )}

      <div
        className={`tb_ht sidebar-tabs d-flex justify-content-center align-items-center ${
          isToggleOn ? "active" : ""
        }`}
      >
        <img
          id="sidebar-click"
          className="me-2 sid_click"
          src={`${PROFILE_URL}/Side_Menu_Animated_Button.png`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        />
        <div className="sidebar-tabs-data tb_bdr">
          <Tabs
            id="fill-tab-example"
            className=""
            fill
            onSelect={handleTogglebutton}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            <Tab eventKey="Sales Dashboard" title="Sales Dashboard"></Tab>
            <Tab
              eventKey="After-Sales Dashboard"
              title="After-Sales Dashboard"
            ></Tab>
            <Tab
              eventKey="SysMonitoring Dashboard"
              title="SysMonitoring Dashboard"
            ></Tab>
          </Tabs>
        </div>
      </div>

      <div>
        {(activeTab === "circle" ||
          activeTab === "box" ||
          activeTab === "card" ||
          activeTab === "graph" ||
          // activeTab === "fav" ||
          activeTab === "alert") &&
          selectedObjectGroup && (
            <Objectgroup
              selectedObjectGroup={selectedObjectGroup}
              brandcode={brandcode}
              activeTab={activeTab}
            />
          )}
      </div>
      <div>
        {isNotificationClick === true ? (
          <Alert
            brandcode={brandcode}
            selectedObjectGroup={selectedObjectGroup}
            menulist={menulist}
          />
        ) : null}
      </div>
    </>
  );
};
export default Header;
