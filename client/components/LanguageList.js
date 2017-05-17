'use strict'
import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {connect} from 'react-redux'
import { fetchTargets } from '../reducers/Targets';
import { fetchUserTones } from '../reducers/UserTone';
import { fetchToneTypes } from '../reducers/ToneTypes';
import { fetchUserBest } from '../reducers/UserBest';


let SelectableList = makeSelectable(List);

// selectable lists wrap lists in a higher order component 
function wrapState(ComposedComponent) {

  return class SelectableList extends Component {
    constructor(props){
      super(props)
      this.state = {
        selectedIndex: 1
      }

      this.handleRequestChange = this.handleRequestChange.bind(this);
      // this.onLanguageClick = this.onLanguageClick.bind(this);

    }

    handleRequestChange (event, index) {
      this.setState({
        selectedIndex: index
      });
      // function call to change x for LxTx and LxTxWordx 
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          style={{borderTop:'thin solid black'}}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

const UserLanguageList = (props) => {

  const onLanguageClick = () => {
    const userId = props.user.id;
    props.fetchUserTones(userId);
    props.fetchUserBest(userId);
    props.fetchToneTypes('thai');
    props.fetchTargets('thai');
  }
  
  return (
  <SelectableList defaultValue={1}>
    <h3>Your Languages</h3>
    <ListItem
      value={1}
      primaryText="Thai"
      onClick={onLanguageClick}
    />
    {/*<ListItem
      value={2}
      primaryText="User Language 2"
    />
    <ListItem
      value={3}
      primaryText="User Language 3"
    />*/}
  </SelectableList>
)};

SelectableList = wrapState(SelectableList);


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTargets: targets => {
      dispatch(fetchTargets(targets))
    },
    fetchToneTypes: language => {
      dispatch(fetchToneTypes(language))
    },
    fetchUserTones: userId => {
      dispatch(fetchUserTones(userId))
    },
    fetchUserBest: userId => {
      dispatch(fetchUserBest(userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLanguageList)