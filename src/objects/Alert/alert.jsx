import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetDashboardObject,
  GetObjectGroupQuery,
  API_HEADER,
} from "../../common/Routes/api_constant.jsx";
const api_url = GetDashboardObject;
const api_query = GetObjectGroupQuery;
const api_header = API_HEADER;

const Alert = ({ brandcode, selectedObjectGroup }) => {
  const api_parameters = {
    BrandCode: brandcode,
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "SUPERVISOR",
    CompanyAccessprofile: "CDB_ADMIN",
    ObjectGroup: selectedObjectGroup,
  };
  const [object, setObject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(api_url, api_parameters, {
          headers: api_header,
        });
        const data = response?.data?.result?.objectGroupDescList;
        setObject(data);
        setBrandcodeState(brandcode);
        setSelectedObjectGroupState(selectedObjectGroup);
      } catch (error) {}
    };

    fetchData();
  }, [brandcode, selectedObjectGroup]);
  return (
    <>
      {object.map((item) => (
        <div className="background">
          <div class="objgrpname">Alerts</div>
          {item.objectTypeList.map((item1, index) => (
            <>
              <div class="typename">
                {item1.objectTypeName}
                <span class="star1">
                  <img
                    src="public/images/Icon-awesome-stroke-star.png"
                    alt=""
                  ></img>
                </span>
              </div>
              <hr className="lin4"></hr>
              {item1.objectDescList.map((item2) => (
                <>
                  <div class="flex-container">
                    <div class="container">
                      <div class="objectname">{item2.objectDescName}</div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
      ))}
    </>
  );
};

export default Alert;
