import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { fetchTargets } from '../reducers/Targets'

class Modes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0
    }
    // dispatch/state to props
    this.fetchTargets = this.props.fetchTargets;

    // bound functions
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.languageSelect = this.languageSelect.bind(this);
    this.buttonSelected = this.buttonSelected.bind(this);
  }

  handleNext() {
    // object destructuring to get stepIndex
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if(stepIndex > 0){
      this.setState({ stepIndex: stepIndex - 1});
    }
  }

  // language for the dispatch 
  languageSelect(event, selected) {
    let language = selected.toLowerCase();
    this.fetchTargets(language);
  }

  // work on this 
  buttonSelected(target) {
    backgroundColor= 'blue'
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      // select language radio buttons
      case 0:
        return (
          <RadioButtonGroup name='languageSelect' defaultSelected='thai' onChange={this.languageSelect}>
            <RadioButton 
              label='ThaiButton'
              value = 'Thai' 
            />
            <RadioButton 
              label='ChineseButton'
              value='Chinese'
              disabled={true}
            />
            <RadioButton 
              label='HmongButton'
              value='Hmong'
              disabled={true}
            />
          </RadioButtonGroup>
        )
      // select training style raised buttons
      case 1:
        return (
          <div>
            <RaisedButton label={'play'} disabled={true} fullWidth={true} onClick={this.buttonSelected} />
            <RaisedButton label={'study'} fullWidth={true}/>
            <RaisedButton label={'demo'} disabled={true} fullWidth={true}/>
          </div>
        )
      default:
        return 'step up 2: electric boogaloo'
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div className='studyDiv'>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel> Select Language </StepLabel>
          </Step>
          <Step>
            <StepLabel> Select Training Style </StepLabel>
          </Step>
          <Step>
            <StepLabel> Gerps </StepLabel>
          </Step>
        </Stepper>
        <div>
          {finished ? (
            <h1> Finished </h1>
          ) : (
            <div>
              <h2>{this.getStepContent(stepIndex)}</h2>
              <FlatButton 
                label='Back'
                disabled={stepIndex===0}
                secondary={true}
                onClick={this.handlePrev}
              />
              <FlatButton
                label={stepIndex === 2 ? 'Train!' : 'Next'}
                primary={true}
                onClick={this.handleNext}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = { fetchTargets }

export default connect(mapStateToProps, mapDispatchToProps)(Modes);

/*const play = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
};

const study = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
  color: 'blue'
};

const demo = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
  color: 'green'
};

const Modes = () => (
	<div>
		<div id="modes-container">
	    {button('PLAY', null, play, "play")}
	    {button('STUDY', null, study, "study")}
	    {button('DEMO', null, demo, "demo")}
		</div>
	</div>
)*/