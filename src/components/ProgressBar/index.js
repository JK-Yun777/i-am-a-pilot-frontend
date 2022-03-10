import { color } from "../../utils/color";

const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    position: "relative",
    width: `${completed}px`,
    height: "8px",
    marginTop: "20px",
    borderRadius: "3px",
    backgroundColor: `${color.brightBrown}`,
  };

  const fillerStyles = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    margin: "2px",
    backgroundColor: `${color.brightRed}`,
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};

export default ProgressBar;
