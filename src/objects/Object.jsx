import React from 'react'
import Circleobject from './Circles/Circleobject';
import Boxobject from './Boxes/Boxobject';
import Cardobject from './Cards/Cardoject';

const Object = ({ brand }, { data }) => {
    return (
        <div>
            <Circleobject />
            <Cardobject />
            <Boxobject />

        </div>
    )
}

export default Object
