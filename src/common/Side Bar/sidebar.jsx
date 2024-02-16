import "./sidebar.css";
import Select from "react-select";
import Menu from "./Menu";
import React, { useState } from "react";
import Header from "../Header/Header";
import Fav from "../../objects/Fav/Fav";
const dropdown = {
  control: (provided) => ({
    ...provided,
    width: "90%",
    height: "20%",
    padding: "3px",
    fontSize: "16px",
    border: "0px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    marginTop: "5px",
  }),
  placeholder: (provided) => ({
    ...provided,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
    width: "90%",
    height: "125px",
    padding: "3px",
    fontSize: "16px",
    border: "0px solid #ccc",
    borderRadius: "10px",
    marginLeft: "10px",
    background: "none",
    marginTop: "0px",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "3px",
    fontSize: "16px",
    border: "0px solid #ccc",
    borderRadius: "10px",
  }),
  option: (provided) => ({
    ...provided,
    textAlign: "left",
    color: "#000C77",
    background: "#fff",
    fontWeight: "600",
    borderRadius: "9px",
    marginBottom: "1px",
    padding: "5px 15px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "purple",
  }),
};

const options = [
  { value: "option1", label: "ISUZU" },
  { value: "option2", label: "BENELLI" },
  { value: "option3", label: "MOTOV" },
];

const Sidebar = () => {
  const [brand, setBrand] = useState("");
  const [data, setData] = useState(null);
  const [togglebutton, setTogglebutton] = useState(null);
  const [menulist, setMenulist] = useState(null);
  const handleSelectChange = (selectedOption) => {
    const select = selectedOption.label;
    setBrand(select);
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handlemenulist = (menu) => {
    setMenulist(menu);
  };
  const handlebutton = (button) => {
    setTogglebutton(button);
  };
  return (
    <div className="con">
      <div className="leftcon">
        <div className="sidebar">
          <Select
            options={options}
            placeholder="Select..."
            styles={dropdown}
            onChange={handleSelectChange}
          />
          <Menu
            brand={brand}
            onDataChange={handleDataChange}
            button={togglebutton}
            menulist={handlemenulist}
          />
          {togglebutton && (
            <a href="">
              <div className="favourite_tx">
                {/* <p>
                  <img
                    src="public/images/Icon_awesome_White_star.png"
                    alt=""
                  ></img>{" "}
                  Favourite
                </p> */}
              </div>
            </a>
          )}
        </div>
      </div>
      <div className="content">
        <div className="header">
          <Header
            brandcode={brand}
            selectedObjectGroup={data}
            togglebutton={handlebutton}
            menulist={menulist}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
