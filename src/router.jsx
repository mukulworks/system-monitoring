import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Circleobject from "./objects/Circles/circleobject";
import Boxobject from "./objects/Boxes/boxobject";
import Cardobject from "./objects/Cards/cardoject";


function Routers() {
    return (
        <Router>
            <Switch >
                <Route path="/circle" component={Circleobject} />
                <Route path="/box" component={Boxobject} />
            </Switch>
        </Router>
    );
}

export default Routers;