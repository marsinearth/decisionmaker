import React, { PureComponent } from 'react';
import Picker from 'rmc-picker/lib/Picker.web';
import Popup from 'rmc-picker/lib/Popup.web';

function generateArray(_obj, type){    
    let init = 0, limit, startIdx = 0, endIdx = 59, valsArray = [];
    const array = [], obj = Object.assign({}, _obj);
    if(type === 'custom'){	
	    valsArray = Object.values(obj);
	    limit = Math.floor(1000 / valsArray.length);
	    endIdx = valsArray.length;		
    } else {
	    startIdx = Number(obj['fromNum']);
	    endIdx = Number(obj['toNum']) >= 0 ? Number(obj['toNum']) + 1 : Number(obj['toNum']) - 1;
	    const gapValue = endIdx >= startIdx ? Math.abs(endIdx - startIdx) : Math.abs(startIdx - endIdx);
	    limit = Math.floor(1000 / gapValue);	
    }        
    for(let j = 0; j < limit; j++){		
	    for(let i = startIdx; endIdx >= startIdx ? i < endIdx : i > endIdx; endIdx >= startIdx ? i++ : i--){
	        array.push({
		        label: type === 'custom' ? String(valsArray[i]) : String(i),
		        value: String(init++)
	        });	
	    }	
    }
    return array;
}

class Slotmachine extends PureComponent {
    constructor(props){
	    super(props);	
	    this.state = {
	        disabled: props.disabled,
	        items: [],
	        value: ''
	    };	
    }   
    onOK = () => {	
	    const props = this.props;
	    const option = props.option;
	    const inputObj = option === 'custom' ? props.items : props.nums;
	    if(typeof inputObj !== 'undefined'){
	        const items = generateArray(inputObj, option);
	        const num = option === 'custom' ? Object.keys(inputObj).length : Math.abs(Number(inputObj['toNum']) - Number(inputObj['fromNum'])) + 1;		
	        const comp = Math.floor(Math.floor(1000 / num) * num / 2);
	        const value = String(comp - (comp % num));	    
	        this.setState({	    
		        items,
		        value
	        });	 
	    }
    };
    componentWillReceiveProps(nextProps){
	    if(this.props.disabled !== nextProps.disabled)
	        this.setState({
		        disabled: nextProps.disabled
	        });
    }
    onChange = (value) => {	
	    const items = this.state.items[value];
	    this.setState({ value: value }, () => {
	        this.props.answer(items['label']);
	    });	
    };
    render(){
	    const disabled = this.state.disabled;
	    return (	        
	            <div>
		            <Popup
	                    className="fortest"
	                    transitionName="rmc-picker-popup-slide-fade"
	                    maskTransitionName="rmc-picker-popup-fade"
	                    picker={<Picker>{this.state.items}</Picker>}
	                    title="Roll & Pick!!!"	   
	                    value={this.state.value}  
	                    onOk={this.onChange}
	                    disabled={disabled}	          	    
		            >
		                <button disabled={disabled ? "disabled" : false} onClick={this.onOK}>{'Ready'}</button>
	                </Popup>
	            </div>
	    );
    }
}

export default Slotmachine;
