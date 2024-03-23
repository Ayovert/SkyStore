import { Component, InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

class CustomRadioInput extends Component<Props> {
  render(): ReactNode {
    const { name, value, onChange, id, checked } = this.props;
    return (
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
      />
    );
  }
}

export default CustomRadioInput;
