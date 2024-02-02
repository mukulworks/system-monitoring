import React from "react";
import Circleobject from "./Circles/Circleobject";
import Boxobject from "./Boxes/Boxobject";
import Cardobject from "./Cards/Cardoject";

const Objectgroup = ({ brandcode, selectedObjectGroup, activeTab }) => {
  let renderedComponent;

  if (activeTab === "circle") {
    renderedComponent = (
      <Circleobject
        brandcode={brandcode}
        selectedObjectGroup={selectedObjectGroup}
      />
    );
  } else if (activeTab === "card") {
    renderedComponent = (
      <Cardobject
        brandcode={brandcode}
        selectedObjectGroup={selectedObjectGroup}
      />
    );
  } else if (activeTab === "box") {
    renderedComponent = (
      <Boxobject
        brandcode={brandcode}
        selectedObjectGroup={selectedObjectGroup}
      />
    );
  }

  return (
    <div>
      {(selectedObjectGroup === "Wholesale" || selectedObjectGroup === "CRM") &&
        brandcode &&
        selectedObjectGroup && <>{renderedComponent}</>}
    </div>
  );
};

export default Objectgroup;
