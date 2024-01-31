import "./sidebar.css";
import Select from 'react-select';
import Menu from "./Menu";
import React, { useState } from 'react';

const dropdown = {
    control: (provided) => ({
        ...provided,
        width: "90%",
        height: "20%",
        padding: "3px",
        fontSize: "16px",
        border: "0px solid #ccc",
        borderRadius: "10px",
        margin: "10px",
        marginTop: "5px"
    }),
    placeholder: (provided) => ({
        ...provided,
    }),
    menu: (provided) => ({
        ...provided,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: "90%",
        height: "125px",
        padding: "3px",
        fontSize: "16px",
        border: "0px solid #ccc",
        borderRadius: "10px",
        marginLeft: "10px",

    }),
    menuList: (provided) => ({
        ...provided,
        padding: "3px",
        fontSize: "16px",
        border: "0px solid #ccc",
        borderRadius: "10px",

    }),
    option: (provided) => ({
        ...provided,
        textAlign: "center",
        color: "purple"
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "purple"
    })
};
const options = [
    { value: 'option1', label: 'ISUZU' },
    { value: 'option2', label: 'BENELLI' },
    { value: 'option3', label: 'MOTOV' }
];

const Sidebar = () => {
    const [brand, setBrand] = useState("");
    const handleSelectChange = (selectedOption) => {
        const select = selectedOption.label;
        setBrand(select)
        localStorage.setItem("brand", JSON.stringify(select));

    };
    console.log("brand", brand)
    return (
        <>
            <div className='sidebar'>
                <Select
                    options={options}
                    placeholder="Select..."
                    styles={dropdown}
                    onChange={handleSelectChange}
                />
                <Menu brand={brand} />
            </div>

        </>
    );
}

export default Sidebar;