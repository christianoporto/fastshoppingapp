import React from "react";
import { MenuHorizontal } from "./MenuHorizontal";
import { withRouter } from "react-router-dom";

const AppContainer = ({ children }) => {
    return (
        <div>
            <MenuHorizontal />
            <div className="app-container-body">{children}</div>
        </div>
    );
};

export default withRouter(AppContainer);
