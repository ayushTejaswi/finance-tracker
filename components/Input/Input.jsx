import "./styles.css";

const Input = ({ label, state, setState, placeholder, type }) => {
  //   const email = useRef();
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        className="input"
        value={state}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          setState(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Input;
