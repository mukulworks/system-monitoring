import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetDashboardObject,
  GetObjectGroupQuery,
  API_HEADER,
} from "../../common/Routes/api_constant.jsx";
import "./boxobject.css";

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

const Boxobject = ({ brandcode, selectedObjectGroup }) => {
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

  const query_parameters = (objectId, objectQuery) => {
    return {
      BrandCode: brandcode,
      CountryCode: "IN",
      ObjectGroup: selectedObjectGroup,
      QueryName: objectQuery,
      OBJECTID: objectId,
    };
  };
  useEffect(() => {
    object.flatMap((item) =>
      item.objectTypeList.flatMap((item1, index) =>
        item1.objectDescList.flatMap((item2, index2) =>
          item2.dashboardObjectList.map((item3) =>
            fetchDatas(index, index2, item3.objectId, item3.objectQuery)
          )
        )
      )
    );

    const refreshInterval =
      object[0]?.objectTypeList[0]?.objectDescList[0]?.refreshIntervals;

    const intervalId = setInterval(() => {
      object.flatMap((item) =>
        item.objectTypeList.flatMap((item1, index) =>
          item1.objectDescList.flatMap((item2, index2) =>
            item2.dashboardObjectList.map((item3) =>
              fetchDatas(index, index2, item3.objectId, item3.objectQuery)
            )
          )
        )
      );
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);

  }, [brandcodeState, selectedObjectGroupState]);

  const fetchDatas = async(index, index2, objectId, objectQuery) => {
    try {
      const count =await axios.post(
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
    <>
      {object.map((item) => (
        <div className="background">
          <div className="objgrpname">{item.objectGroupDescName}</div>
          {item.objectTypeList.map((item1) => (
            <>
              <div className="typename">
                {item1.objectTypeName}
                {/* <span className="star1">
                  <img
                    src="public/images/Icon-awesome-stroke-star.png"
                    alt=""
                  ></img>
                </span> */}
              </div>
              <hr className="lin4"></hr>

              <div className="clr_wd">
                <div className="bac_clr">
                  <div className="box_lin">
                    {item1.objectDescList.map((item2) => (
                      // <ul>
                      //   <li>
                      //     <span>{formatDuration(item2.refreshIntervals)}</span>
                      //     <div class="count_no">
                      //       {item2?.countdata != undefined
                      //         ? item2?.countdata
                      //         : 0}
                      //     </div>

                      //     <p>{item2.objectDescName}</p>
                      //   </li>
                      // </ul>

                      <div className="flex-container">
                        <div className="container bodr_rt">
                          <div
                            className="circle2"
                            style={{
                              border:
                                item2.blink === "Y"
                                  ? `2px solid ${item2.objectColour}`
                                  : "none",
                            }}
                          >
                            <div className="interval2">
                              {formatDuration(item2.refreshIntervals)}
                            </div>
                            <div className="count">
                              {item2?.countdata != undefined
                                ? item2?.countdata
                                : 0}
                            </div>
                          </div>
                          <div className="objectname">
                            {item2.objectDescName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      ))}
    </>
  );
};

export default Boxobject;
