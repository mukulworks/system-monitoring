import "./sidebar.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetDashboardMenu, API_HEADER } from "../Routes/api_constant";

const api_url = GetDashboardMenu;
const api_header = API_HEADER;
const api_parameters = {
    BrandCode: "ISUZU",
    CountryCode: "IN",
    CompanyId: "ORBIT",
    UserId: "ARVIND",
    CompanyAccessprofile: "CDB_ADMIN"
};


const Menu = () => {
    const [objectGroup, setObjectGroup] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(api_url, api_parameters, { headers: api_header });
                const data = response?.data?.result?.getDashboardMenuList
                setObjectGroup(data);

            } catch (error) { }
        };

        fetchData();
    }, []);


    return (
        <>

            <ul className="objectGroup-ul">
                {objectGroup.map((item, index) => (
                    <li key={index} className="objectGroup-li">{item.objectGroup}</li>
                ))}
            </ul>


        </>
    );
}

export default Menu;