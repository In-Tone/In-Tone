'use strict'
import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

// selectable lists wrap lists in a higher order component 
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    constructor(props){
      super(props)
      this.state = {
        selectedIndex: 1
      }
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const UserLanguageList = () => (
  <div>
    <SelectableList defaultValue={1}>
      <Subheader>Your Languages</Subheader>
      <ListItem
        value={1}
        primaryText="User Language 1"
      />
      <ListItem
        value={2}
        primaryText="User Language 2"
      />
      <ListItem
        value={3}
        primaryText="User Language 3"
      />
    </SelectableList>
  </div>
);

export default UserLanguageList;