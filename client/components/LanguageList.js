'use strict';
// react
import React, { Component } from 'react';
import { connect } from 'react-redux';

// material-ui
import { List, ListItem, makeSelectable } from 'material-ui/List';

// dispatchers
import { fetchTargets } from '../reducers/Targets';
import { fetchUserTones } from '../reducers/UserTone';
import { fetchToneTypes } from '../reducers/ToneTypes';
import { fetchUserBest } from '../reducers/UserBest';


let SelectableList = makeSelectable(List);

// selectable lists wrap lists in a higher order component
const wrapState = ComposedComponent => {
// function wrapState(ComposedComponent) {

	return class SelectableList extends Component {

		constructor(props){
			super(props)
			this.state = {
				selectedIndex: 1
			}
			this.handleRequestChange = this.handleRequestChange.bind(this);
		}

		handleRequestChange (event, index) {
			this.setState({
				selectedIndex: index
			});
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
		</SelectableList>
	)
};

SelectableList = wrapState(SelectableList);


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
