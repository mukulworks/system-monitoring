import React from 'react'
import Circleobject from './Circles/Circleobject';
import Boxobject from './Boxes/Boxobject';
import Cardobject from './Cards/Cardoject';

const Objectgroup = ({ brandcode, selectedObjectGroup }) => {
    console.log("brand object", brandcode, "data object", selectedObjectGroup);
    return (
        <div>
            {(selectedObjectGroup === 'Wholesale' || selectedObjectGroup === 'CRM') && brandcode && selectedObjectGroup &&
                <>
                    <Circleobject brandcode={brandcode} selectedObjectGroup={selectedObjectGroup} />
                    {/* <Cardobject brandcode={brandcode} selectedObjectGroup={selectedObjectGroup} /> */}
                    {/* <Boxobject brandcode={brandcode} selectedObjectGroup={selectedObjectGroup} /> */}
                </>
            }
        </div>
    )
}

export default Objectgroup



