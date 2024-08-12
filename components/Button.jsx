import React from "react";

const Button = ({ text, flag, onClick, disabled }) => {
  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={`btn btn${flag ? "-outline" : ""}-primary`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
