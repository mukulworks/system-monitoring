import "./sidebar.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetDashboardMenu, API_HEADER } from "../Routes/api_constant";
import Objectgroup from "../../objects/Objectgroup";

const api_url = GetDashboardMenu;
const api_header = API_HEADER;

const Menu = ({ brand, onDataChange, button, menulist }) => {
  const api_parameters = {
    BrandCode: brand,
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "ARVIND",
    CompanyAccessprofile: "CDB_ADMIN",
  };

  const [objectGroup, setObjectGroup] = useState([]);
  const [selectedObjectGroup, setSelectedObjectGroup] = useState("");
  const [brandcode, setBrandcode] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const [objectGroupNames, setObjectGroupNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(api_url, api_parameters, {
          headers: api_header,
        });
        const data = response?.data?.result?.getDashboardMenuList;
        setObjectGroup(data);
        const objectGroupValues = data.map((item) => item.objectGroup);
        setObjectGroupNames(objectGroupValues);
      } catch (error) {}
    };

    fetchData();
  }, [brand]);

  useEffect(() => {
    const handleClick = (index) => {
      setSelectedObjectGroup(objectGroup[index].objectGroup);
      onDataChange(objectGroup[index].objectGroup);
      setActiveIndex(index);
    };

    document.querySelectorAll(".objectGroup-li").forEach((item, index) => {
      item.addEventListener("click", () => handleClick(index));
    });
    setBrandcode(brand);

    menulist(objectGroupNames);

    return () => {
      document.querySelectorAll(".objectGroup-li").forEach((item) => {
        item.removeEventListener("click", () => handleClick(index));
      });
    };
  }, [objectGroup, onDataChange]);

  if (button !== null) {
    return (
      <>
        <div>
          <ul className="objectGroup-ul">
            {objectGroup?.map((item, index) => (
              <li
                key={index}
                className={
                  index === activeIndex
                    ? "objectGroup-li active"
                    : "objectGroup-li"
                }
              >
                {item.objectGroup}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default Menu;
