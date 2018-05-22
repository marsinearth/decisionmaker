import React, { PureComponent } from 'react';

class CustomInputText extends PureComponent {
  state = { value: '' };

  handleInputChange = e => {
    e.preventDefault()
    const type = e.target.type
    const field = e.target.name
    const value = e.target.value
    this.setState({ value: value }, () => {
      this.props.change(type, field, value)
    })
  }

  handleBlur = e => {
    const field = e.target.name
    const value = e.target.value
    this.props.blur(field, value)
  }

  render() {
    const index = 'Item ' + String(this.props.name.split('-')[1]) + ':'

    return (
      <div>
        <input
          id={this.props.name}
          type="text"
          className="customInput"
          name={this.props.name}
          value={this.state.value}
          placeholder={index}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default CustomInputText
