import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetDashboardObject, API_HEADER } from "../../common/Routes/api_constant.jsx";
import "./circleobject.css";

const api_url = GetDashboardObject;
const api_header = API_HEADER;
const api_parameters = {
    BrandCode: "ISUZU",
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "SUPERVISOR",
    CompanyAccessprofile: "CDB_ADMIN",
    ObjectGroup: "wholesale",
};

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const minuteString = minutes > 0 ? `${minutes}m ${minutes > 1 ? "" : ""}` : "";
    const secondString = seconds > 0 ? `${seconds}s${seconds > 1 ? "" : ""}` : "";
    if (minutes > 0) {
        return `${minuteString} ${secondString}`;
    } else {
        return `${minuteString}${secondString}`;
    }
};


const Circleobject = () => {
    const [object, setObject] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(api_url, api_parameters, { headers: api_header });
                console.log("response", response)
                const data = response?.data?.result?.objectGroupDescList
                setObject(data);
                console.log("objectGroup", objectGroup)

            } catch (error) { }
        };

        fetchData();
    }, []);



    return (
        <>
            {object.map((item) => (
                <div className='background'>
                    <div class="objgrpname">{item.objectGroupDescName}</div>

                    {item.objectTypeList.map((item1) => (
                        <>
                            <div class="typename">{item1.objectTypeName}</div>
                            <hr></hr>

                            {item1.objectDescList.map((item2) => (
                                <>
                                    <div class="flex-container">
                                        <div class="container">
                                            <div class="circle">
                                                <div class="interval">{formatDuration(item2.refreshIntervals)}</div>
                                                <div class="count">5</div>
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
}

export default Circleobject;