import React from "react";
import NotFound from "../../components/NotFound";
import { MenuHorizontal } from "../../containers/MenuHorizontal";

export default function index() {
    return (
        <>
            <MenuHorizontal />
            <div className="wahio-body">
                <div className="wahio-container top-1-responsive">
                    <NotFound />
                </div>
            </div>
        </>
    );
}
