import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import GitHubForkRibbon from 'react-github-fork-ribbon';

class ForkRibbon extends React.Component {
    render(){
	return (
	    <GitHubForkRibbon 
	      position="right"
	      color="black"
	      href="//github.com/marsinearth/decisionmaker"
	      target="_blank" >
		<b style={{'fontFamily':'Eczar'}}>Go To Source Code</b>
	    </GitHubForkRibbon>
	);
    }
}

let Wrapper = (
    <div>
      <ForkRibbon />
      <App />
    </div>
);

ReactDOM.render(
  Wrapper,
  document.getElementById('root')
);

