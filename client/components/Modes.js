import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import { fetchTargets } from '../reducers/Targets';

class Modes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      studyMode: ''
    }
    // dispatch/state to props
    this.fetchTargets = this.props.fetchTargets;

    // bound functions
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.languageSelect = this.languageSelect.bind(this);
  }

  handleNext() {
    // object destructuring to get stepIndex
    const {stepIndex} = this.state;
    console.log('step index', stepIndex)
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1
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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <RadioButtonGroup name='languageSelect' defaultSelected='thai' onChange={this.languageSelect}>
            <RadioButton 
              label='Chinese'
              value='Chinese'
              disabled={true}
              style={{margin: '8.5% 0 8.5% 0', height: '25%'}}
            />
            <RadioButton 
              label='Thai'
              value = 'Thai'
              style={{margin: '8.5% 0 8.5% 0', height: '25%'}}
            />
            <RadioButton 
              label='Hmong'
              value='Hmong'
              disabled={true}
              style={{margin: '8.5% 0 8.5% 0', height: '25%'}}
            />
          </RadioButtonGroup>
        )
      // select training style raised buttons
      case 1:
        return (
          <div>
            <RaisedButton label={'Play'} labelStyle={{fontSize:42}}  disabled={true} className='optionButtons'/>
            <Link to={'study'}>
              <RaisedButton label="Study" labelStyle={{fontSize:42}}value = "Study" className='optionButtons'
              />
            </Link>
            <RaisedButton label={'Demo'} labelStyle={{fontSize:42}} disabled={true}  className='optionButtons'/>
          </div>
        )
      default:
        return (
          <h1> You Shall Not Pass </h1>
        )
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div className='studyDiv'>
      <Paper>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel> Select Language </StepLabel>
          </Step>
          <Step>
            <StepLabel> Select Training Style </StepLabel>
          </Step>
        </Stepper>
        <div>
          {finished ? (
            <div></div>
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
                label={'Next'}
                disabled={stepIndex === 1}
                primary={true}
                onClick={this.handleNext}
              />
            </div>
          )}
        </div>
      </Paper>
    </div>
    )
  }
}

// null until/if we end up using mapState
const mapStateToProps = null;

const mapDispatchToProps = { fetchTargets }

export default connect(mapStateToProps, mapDispatchToProps)(Modes);