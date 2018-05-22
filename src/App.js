import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import React, { PureComponent } from 'react';
import logo from './cogito_loading.gif';
import './App.css';
import Textarea from 'react-autosize-textarea';
import Slotmachine from './slotmachine';
import CustomInputText from './customInput';

class App extends PureComponent {
  state = {
    selectedOption: '',
    question: '',
    inputs: ['input-0'],
    maxInputIndex: 1,
    nums: {},
    items: {},
    answer: ''
  }

  inputList = inputs => inputs.map(index => (
    <CustomInputText
      name={index}
      key={index}
      change={this.handleChange}
      blur={this.removeInputText}
    />
  ))

  addInputText = () => {
    const { maxInputIndex } = this.state
    const newInput = `input-${maxInputIndex}`
    this.setState(prevState => ({
      inputs: prevState.inputs.concat([newInput]),
      maxInputIndex: maxInputIndex + 1,
    }))
  }

  removeInputText = (field, value) => {
    const { inputs } = this.state
    if (field !== inputs[0] && value.length === 0) {
      const currItems = Object.assign({}, this.state.items);
      delete currItems[field];
      const initVal = currItems['input-0'].length === 0 ? 1 : 0;
      if (inputs.length - Object.keys(currItems).length + initVal > 1) {
        inputs.splice(inputs.indexOf(field), 1);
      }
      this.setState({
        inputs,
        items: currItems,
      })
    }
  }

  handleChange = (type, field, value) => {
    const currItems = Object.assign({}, this.state.items);
    const inputLen = this.state.inputs.length;
    currItems[field] = value;
    this.setState({ items: currItems }, () => {
      const itemsLen = Object.keys(currItems).length;
      if (field.length >= 0 && inputLen === itemsLen) this.addInputText();
    })
  }

  handleInputChange = e => {
    const currName = e.target.name;
    if (currName.indexOf('Num') > -1) {
      const currNums = Object.assign({}, this.state.nums);
      currNums[e.target.name] = Math.floor(e.target.value);
      this.setState({ nums: currNums })
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  answerOn = answer => {
    this.setState({ answer });
  }

  render() {
    const {
      selectedOption,
      question,
      inputs,
      nums,
      items,
      answer,
    } = this.state;
    const maskNumSetup = {
      display: selectedOption === 'numbers' ? 'block' : 'none',
    };
    const maskCustSetup = {
      display: selectedOption === 'custom' ? 'block' : 'none',
    };
    const objKeys =
      selectedOption === 'custom' ? Object.keys(items) : Object.keys(nums);

    let disabled;

    if (selectedOption === 'custom') {
      disabled =
        objKeys.length === 0 ||
        (typeof items['input-0'] !== 'undefined' &&
          items['input-0'].length === 0)
          ? true
          : false;
    } else {
      let valEmpty = false;
      if (typeof nums !== 'undefined') {
        for (const key in nums) {
          if (nums[key].length === 0) valEmpty = true;
        }
      } else {
        valEmpty = true;
      }
      disabled = (objKeys.length === 2 && !valEmpty) ? false : true;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className={'App-logo'} alt="logo" />
          <h2>Decision Maker in React.js</h2>
        </div>
        <div className="container">
          <div className="weui_cells_title">The Question</div>
          <div className="weui_cells">
            <div className="weui_cell_primary">
              <Textarea
                name="question"
                className="q_text"
                placeholder="type your question here"
                value={question}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="weui_cell_primary">
              <div className="answer">{answer}</div>
            </div>
          </div>
          <div className="weui_cells_title">Select Type</div>
          <div className="weui_cells">
            <input
              id="custom"
              type="radio"
              name="selectedOption"
              value="custom"
              onChange={this.handleInputChange}
            />
            <label htmlFor="custom"> Custom </label>
          </div>
          <div className="weui_cell_primary">
            <input
              id="number"
              type="radio"
              name="selectedOption"
              value="numbers"
              onChange={this.handleInputChange}
            />
            <label htmlFor="number"> Numbers </label>
          </div>
          <div className="numbers_cell" style={maskNumSetup}>
            <div className="weui_cells_title">Select Ranges of Numbers</div>
            <div className="weui_cells">
              <div className="weui_cell" style={{ display: 'inline-block' }}>
                <div style={{ textAlign: 'left' }}>
                  <input
                    id="fromNum"
                    type="number"
                    className="txt-input"
                    placeholder="Number From"
                    name="fromNum"
                    value={
                      this.state.nums['fromNum']
                        ? this.state.nums['fromNum']
                        : ''
                    }
                    onChange={this.handleInputChange}
                  />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <input
                    id="toNum"
                    type="number"
                    className="txt-input"
                    placeholder="Number To"
                    name="toNum"
                    value={
                      this.state.nums['toNum'] ? this.state.nums['toNum'] : ''
                    }
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="custom_cell" style={maskCustSetup}>
            <div className="weui_cells_title">Type Custom Items</div>
            <div className="weui_cells">
              <div className="weui_cell_primary">{this.inputList(inputs)}</div>
            </div>
          </div>
          <Slotmachine
            option={selectedOption}
            nums={nums}
            items={items}
            onSubmitClick={this.handleSubmit}
            disabled={disabled}
            answer={this.answerOn}
          />
        </div>
      </div>
    );
  }
}

export default App;
