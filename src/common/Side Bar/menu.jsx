import "./sidebar.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetDashboardMenu, API_HEADER } from "../Routes/api_constant";


// const Props = localStorage.getItem("brand");
// const brand = JSON.parse(Props);
const api_url = GetDashboardMenu;
const api_header = API_HEADER;

const Menu = ({ brand }) => {
    // console.log("brand component:", brand);
    const api_parameters = {
        BrandCode: brand,
        CountryCode: "IN",
        CompanyId: "ORBIT",
        UserId: "ARVIND",
        CompanyAccessprofile: "CDB_ADMIN"
    };

    const [objectGroup, setObjectGroup] = useState([]);
    const [selectedObjectGroup, setSelectedObjectGroup] = useState("");

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.matches('.objectGroup-li')) {
                setSelectedObjectGroup(e.target.textContent);
            }
        };
        document.addEventListener('click', handleClick);
        console.log("selectedObjectGroup", selectedObjectGroup)
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [selectedObjectGroup]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(api_url, api_parameters, { headers: api_header });
                const data = response?.data?.result?.getDashboardMenuList
                setObjectGroup(data);
                // <Object brand data/>
            } catch (error) { }
        };

        fetchData();
    }, [brand]);


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