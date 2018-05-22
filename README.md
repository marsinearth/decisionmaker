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
_I made some lines of m-picker(rmc-picker) library files to fit into my design of application, so it might not exactly same looking when you use the original version of these libraries._<br /><br />
_Mouse scrolling in functioning! I touched Zscroller library, which is one of the dependencies of the m-picker library. The modified codes are not included on this repository._

- it was quite a work to update the repo for React v16. especially I had to re-setup webpack config files due to the format difference between webpack 1.x and 2.x and replacing deprecated React.createClass and React.propTypes for rmc-picker related dependent packages such as rc-dialog, rc-touchable and rc-animate respectively.
