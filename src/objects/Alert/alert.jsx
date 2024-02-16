import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetDashboardObject,
  GetObjectGroupQuery,
  API_HEADER,
} from "../../common/Routes/api_constant.jsx";
import "./alert.css";

const api_url = GetDashboardObject;
const api_query = GetObjectGroupQuery;
const api_header = API_HEADER;

const Alert = ({ brandcode, selectedObjectGroup, menulist }) => {
  const api_parameters = {
    BrandCode: brandcode,
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "SUPERVISOR",
    CompanyAccessprofile: "CDB_ADMIN",
    ObjectGroup: selectedObjectGroup === "CRM" ? "wholesale" : "CRM",
  };
  const [object, setObject] = useState([]);
  const [brandcodeState, setBrandcodeState] = useState();
  const [selectedObjectGroupState, setSelectedObjectGroupState] = useState();

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

  const query_parameters = (objectId, objectQuery) => {
    return {
      BrandCode: brandcode,
      CountryCode: "IN",
      ObjectGroup: selectedObjectGroup === "CRM" ? "wholesale" : "CRM",
      QueryName: objectQuery,
      OBJECTID: objectId,
    };
  };
  useEffect(() => {
    object.flatMap((item) =>
      item.objectTypeList.flatMap((item1, index) =>
        item1.objectDescList.flatMap((item2, index2) =>
          item2.dashboardObjectList.map((item3) =>
            fetchData(index, index2, item3.objectId, item3.objectQuery)
          )
        )
      )
    );
  }, [brandcodeState, selectedObjectGroupState]);

  const fetchData = (index, index2, objectId, objectQuery) => {
    try {
      const count = axios.post(
        api_query,
        query_parameters(objectId, objectQuery),
        { headers: api_header }
      );
      Promise.all([count]).then((results) => {
        const countdata = results[0]?.data?.result?.[0]?.count;
        const blink = results[0]?.data?.result?.[0]?.blink;
        const objectColour = results[0]?.data?.result?.[0]?.objectColour;
        const fontColour = results[0]?.data?.result?.[0]?.fontColour;
        let temp = [...object];
        let tempObj = {
          ...temp[0]?.objectTypeList[index]?.objectDescList[index2],
        };
        tempObj.countdata = countdata;

        tempObj.blink = blink;
        tempObj.objectColour = objectColour;
        tempObj.fontColour = fontColour;
        temp[0]?.objectTypeList[index]?.objectDescList.splice(
          index2,
          1,
          tempObj
        );
        setObject(temp);
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col dropDownProfile">
      {object.map((item) => (
        <ul className="flex flex-col gap-4">
          <p className="aler_tx">Alerts</p>
          <hr className="lin5" />

          <p className="aler_tx">
            {selectedObjectGroup === "CRM" ? "wholesale" : "CRM"}
          </p>
          <hr className="lin6"></hr>
          {item.objectTypeList?.map((item1, index) => (
            <>
              {item1.objectDescList.some((item2) => item2.blink === "Y") && (
                <li className="hlt_tx">
                  {item1.objectTypeName} <hr className="lin6"></hr>
                </li>
              )}

              {item1.objectDescList.map((item2) => (
                <>
                  {item2.blink === "Y" && (
                    <li>
                      <img
                        className="aro_pic"
                        src="public/Assets/arro.png"
                        alt=""
                      ></img>{" "}
                      {item2.objectDescName}
                    </li>
                  )}
                </>
              ))}
            </>
          ))}
        </ul>
      ))}
    </div>
  );
};
export default Alert;
