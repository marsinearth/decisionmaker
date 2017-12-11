# Decision Maker
_A semi-automatic random picking decision maker_
<br /><h4>**[Demo](https://marsinearth.github.io/decisionmaker/)**</h4>
## How-To
1. Type in your question needs to be decided.
2. Select the type and contents of the options you'd like
3. Click the 'Ready' button and the wheel selector pops up
4. You manually scroll the wheel with touch/dragging/scrolling
5. Click 'OK' on the upper right hand of the pop-up

## Used NPM Libraries
1. [create-react-app](https://github.com/facebookincubator/create-react-app)
2. [m-picker](https://github.com/react-component/m-picker)
3. [react-autosize-textarea](https://github.com/buildo/react-autosize-textarea)
<br /><br />
_I made several lines of m-picker(rmc-picker) library files to fit into my design of application, so it might not exactly same looking when you use the original version of these libraries._<br /><br />
_Mouse scrolling in functioning! I touched Zscroller library, which is one of the dependencies of the m-picker library. The modified codes are not included on this repository._

## Automated input textbox add/remove system
track down the length of typed value of the input text boxes and add/delete text boxes according to them.
```jsx
src/App.js

import React, { Component } from 'react';
import CustomInputText from './customInput';

class App extends Component {
  constructor(props){
      super(props);      
      this.state = {
	  selectedOption: '',
	  question: '',
	  inputs: ['input-0'],
	  maxInputIndex: 1,
	  nums: {},
	  items: {},
	  answer: ''
      };
  }
  addInputText = () => {
      var maxIndex = parseInt(this.state.maxInputIndex);
      const newInput = `input-${maxIndex}`;
      this.setState((prevState) => ({
	  inputs: prevState.inputs.concat([newInput]),
	  maxInputIndex: ++maxIndex
      }));
  }
  removeInputText = (field, value) => {
      const currInputs = this.state.inputs;
      if(field !== currInputs[0] && value.length === 0){	  	  
	  const currItems = Object.assign({}, this.state.items);
	  delete currItems[field];
	  const initVal = currItems['input-0'].length === 0 ? 1 : 0;
	  if(currInputs.length - Object.keys(currItems).length + initVal > 1){
	      currInputs.splice(currInputs.indexOf(field), 1);
	  }
	  this.setState({ 
	      inputs: currInputs,
	      items: currItems	     
	  });
      }
  }
  handleChange = (type, field, value) => {      
      const currItems = Object.assign({}, this.state.items);
      const inputLen = this.state.inputs.length;           
      currItems[field] = value;      
      this.setState({ items: currItems }, function(){
	  const itemsLen = Object.keys(currItems).length;
	  if(field.length >= 0 && inputLen === itemsLen) this.addInputText();
      });            
  };
  render(){
      const inputs = this.state.inputs;
      const inputList = inputs.map(index => <CustomInputText name={index} key={index} change={this.handleChange} blur={this.removeInputText} />);      
      return (
          ...
	  <div>
	      { inputList }
	  </div>
	  ...
      );
  }

```

```jsx
src/customInput.js

import React, { Component } from 'react';

class CustomInputText extends Component {
    constructor(props){
	super(props);
	this.state = { value: '' };
    }
    handleInputChange = (e) => {
	const type = e.target.type;
	const field = e.target.name;
	const value = e.target.value;
	this.setState({ value: value }, function() {
	    this.props.change(type, field, value);	
	});	
    };
    handleBlur = (e) => {
	const field = e.target.name;
	const value = e.target.value;
	this.props.blur(field, value);
    };
    render() {
	const index = "Item " + String(this.props.name.split('-')[1]) + ":";

	return <div>
	    <input
	      id={this.props.name}
	      type="text"
	      name={this.props.name}
	      value={this.state.value}
	      placeholder={index}
	      onChange={this.handleInputChange}
	      onBlur={this.handleBlur}
	    />
	    </div>;
    }
}
export default CustomInputText;
```
