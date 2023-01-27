import React from "react";
import "./spinner.scss";


export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}