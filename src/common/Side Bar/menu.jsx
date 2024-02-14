import "./sidebar.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetDashboardMenu, API_HEADER } from "../Routes/api_constant";
import Objectgroup from "../../objects/Objectgroup";

const api_url = GetDashboardMenu;
const api_header = API_HEADER;

const Menu = ({ brand, onDataChange, button }) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(api_url, api_parameters, {
          headers: api_header,
        });
        const data = response?.data?.result?.getDashboardMenuList;
        setObjectGroup(data);
      } catch (error) {}
    };

    fetchData();
  }, [brand]);

  useEffect(() => {
    const handleClick = (e, brand) => {
      if (e.target.matches(".objectGroup-li")) {
        setSelectedObjectGroup(e.target.textContent);
        onDataChange(e.target.textContent);
      }
    };

    document.addEventListener("click", handleClick);
    setBrandcode(brand);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectedObjectGroup, brandcode]);

  if (button !== null) {
    return (
      <>
        <div>
          <ul className="objectGroup-ul">
            {objectGroup.map((item, index) => (
              <li key={index} className="objectGroup-li active">
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
