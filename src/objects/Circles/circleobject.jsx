import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    GetDashboardObject,
    GetObjectGroupQuery,
    API_HEADER,
} from "../../common/Routes/api_constant.jsx";
import "./circleobject.css";

const Props = localStorage.getItem("brand");
const brand = JSON.parse(Props);

const api_url = GetDashboardObject;
const api_query = GetObjectGroupQuery;
const api_header = API_HEADER;
const api_parameters = {
    BrandCode: "ISUZU",
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "SUPERVISOR",
    CompanyAccessprofile: "CDB_ADMIN",
    ObjectGroup: "crm",
};

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

const Circleobject = () => {
    const [object, setObject] = useState([]);
    const [countApiCall, setCountApiCall] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(api_url, api_parameters, {
                    headers: api_header,
                });
                const data = response?.data?.result?.objectGroupDescList;
                setObject(data);
                setCountApiCall(true);
            } catch (error) { }
        };

        fetchData();
    }, []);

    const query_parameters = (objectId, objectQuery) => {
        return {
            BrandCode: "ISUZU",
            CountryCode: "IN",
            ObjectGroup: "crm",
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
    }, [countApiCall]);

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
                tempObj.objectGroupShortDescName = countdata;
                temp[0]?.objectTypeList[index]?.objectDescList.splice(
                    index2,
                    1,
                    tempObj
                );
                setObject(temp);
            });
        } catch (error) { }
    };

    return (
        <>
            {object.map((item) => (
                <div className="background">
                    <div class="objgrpname">{item.objectGroupDescName}</div>
                    {item.objectTypeList.map((item1, index) => (
                        <>
                            <div class="typename">{item1.objectTypeName}</div>
                            <hr></hr>
                            {item1.objectDescList.map((item2) => (
                                <>
                                    <div class="flex-container">
                                        <div class="container">
                                            <div class="circle">
                                                <div class="interval">
                                                    {formatDuration(item2.refreshIntervals)}
                                                </div>
                                                <div class="count">
                                                    {item2?.objectGroupShortDescName != undefined
                                                        ? item2?.objectGroupShortDescName
                                                        : 0}
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

export default Circleobject;
