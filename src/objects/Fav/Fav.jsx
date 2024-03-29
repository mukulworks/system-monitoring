import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetDashboardObject,
  GetObjectGroupQuery,
  API_HEADER,
} from "../../common/Routes/api_constant.jsx";
import "./fav.css";

const api_url = GetDashboardObject;
const api_query = GetObjectGroupQuery;
const api_header = API_HEADER;

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const minuteString =
    minutes > 0 ? `${minutes}m ${minutes > 1 ? "" : ""}` : "";
  const secondString = seconds > 0 ? `${seconds}s${seconds > 1 ? "" : ""}` : "";
  if (minutes > 0) {
    return `${minuteString} ${secondString}`;
  } else {
    return `${minuteString}${secondString}`;
  }
};

const Fav = ({ brandcode, selectedObjectGroup }) => {
  const api_parameters = {
    BrandCode: brandcode,
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "SUPERVISOR",
    CompanyAccessprofile: "CDB_ADMIN",
    ObjectGroup: selectedObjectGroup,
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

  // const query_parameters = (objectId, objectQuery) => {
  const query_parameters = () => {
    const parameters = {
      BrandCode: brandcode,
      CountryCode: "IN",
      ObjectGroup: selectedObjectGroup,
      // QueryName: objectQuery,
      // OBJECTID: objectId,
      OBJECTID: "0",
      QueryName: "USP_DB_CRM_CASE_CREATE_025",
    };
    return parameters;
  };
  useEffect(() => {
    object.flatMap((item) =>
      item.objectTypeList.flatMap((item1, index) =>
        item1.objectDescList.flatMap((item2, index2) =>
          item2.dashboardObjectList.map((item3) =>
            // fetchDatas(index, index2, item3.objectId, item3.objectQuery)
            fetchDatas(index, index2)
          )
        )
      )
    );
  }, [brandcodeState, selectedObjectGroupState]);
  // const fetchDatas = (index, index2, objectId, objectQuery) => {
  const fetchDatas = (index, index2) => {
    try {
      const count = axios.post(
        api_query,
        // query_parameters(objectId, objectQuery),
        query_parameters(),
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
    <>
      {object.map((item) => (
        <div className="background">
          <div class="objgrpname">Favourite</div>
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
                      <div class="circle">
                        <div class="interval">
                          {formatDuration(item2.refreshIntervals)}
                        </div>
                        <div class="count">
                          {item2?.countdata != undefined
                            ? item2?.countdata
                            : 99}
                        </div>
                      </div>
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

export default Fav;
