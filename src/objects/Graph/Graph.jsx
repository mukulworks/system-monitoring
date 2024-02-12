import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetDashboardObject,
  GetObjectGroupQuery,
  API_HEADER,
} from "../../common/Routes/api_constant.jsx";
import "./graph.css";
import ReactApexChart from "react-apexcharts";

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

const Graph = ({ brandcode, selectedObjectGroup }) => {
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

  // const chartData = object.flatMap((item) =>
  //   item.objectTypeList.flatMap((item1, index) =>
  //     item1.objectDescList.flatMap(
  //       (item2, index2) => (
  //         console.log("item1", item1),
  //         {
  //           x: item2.objectDescName,
  //           y: item2.objectGroupShortDescName || 0,
  //         }
  //       )
  //     )
  //   )
  // );

  const getChartData = (item) => {
    return item.objectTypeList.flatMap((item1, index) =>
      item1.objectDescList.map((item2, index2) => ({
        x: item2.objectDescName,
        y: item2.countdata || 0,
        type: item1.objectTypeName,
      }))
    );
  };

  const renderBarChart = (type) => {
    const filteredChartData = object
      .flatMap((item) => getChartData(item))
      .filter((data) => data.type === type);

    const options = {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: filteredChartData.map((data) => data.x),
        labels: {
          show: true,

          rotate: -90,
          rotateAlways: true,
        },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 1,
          opacityTo: 0.98,
          shade: "light",
          type: "vertical",
        },
        colors: ["#B1B2FF", "#A6E3E9"],
      },
    };
    return (
      <ReactApexChart
        options={options}
        series={[{ data: filteredChartData.map((data) => data.y) }]}
        type="bar"
        height={400}
        width={1050}
      />
    );
  };
  return (
    <>
      {object.map((item) => (
        <div className="background">
          <div class="objgrpname">{item.objectGroupDescName}</div>
          {item.objectTypeList.map((item1) => (
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

              <div className="clr_wd">
                <div className="bac_clr">
                  <div className="box_lin">
                    <div>{renderBarChart(item1.objectTypeName)}</div>
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

export default Graph;
