import React from "react";

type Props = {
  onClick: () => any;
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
