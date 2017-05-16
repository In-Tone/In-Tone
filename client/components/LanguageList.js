'use strict'
import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {connect} from 'react-redux'

let SelectableList = makeSelectable(List);

// selectable lists wrap lists in a higher order component 
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    constructor(props){
      super(props)
      this.state = {
        selectedIndex: 1
      }

      this.handleRequestChange = this.handleRequestChange.bind(this)
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

SelectableList = wrapState(SelectableList);

const UserLanguageList = () => (
  <SelectableList defaultValue={1}>
    <h3>Your Languages</h3>
    <ListItem
      value={1}
      primaryText="Thai"
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
);

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTargets: language => {
      dispatch(fetchTargets(language))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLanguageList)