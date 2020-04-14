import React from "react";
import PropTypes from "prop-types";

const Center = ({ children, css = "" }) => (
    <div className={`flex justify-center items-center ${css}`}>{children}</div>
);
Center.propTypes = {
    css: PropTypes.string
};

const Between = ({ children, css = "" }) => (
    <div className={`flex justify-between ${css}`}>{children}</div>
);
Between.propTypes = {
    css: PropTypes.string
};
export default { Center, Between };
