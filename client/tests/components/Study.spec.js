console.log('what is connected');

'use strict';
// react
import React from 'react';

// testing libraries
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
// import { mockDOM, setupDOM } from '../setup.js';
console.log('before mocdom');
// mockDOM();

// components
import {Study} from '../../components/Study';
import ChooseLanguage from '../../components/ChooseLanguage';
import AudioComponent from '../../components/AudioComponent';
import Record from '../../components/Record';
import Graph from '../../components/Graph';

// study's children components
// describe('<Study/>', function() {

// 	// const currentTarget = {};

// 	describe('renders chooselanguage if no language selected', function () {
// 		const wrapper = shallow(<Study />);
// 		wrapper.setProps({ currentTarget: {}});

// 		xit('contains a <ChooseLanguage/> component', function() {
// 			expect(wrapper.find(ChooseLanguage)).to.have.lenght(1);
// 		});

// 		xit('contains one child components', function() {
// 			expect(wrapper.children()).to.have.lenght(1);
// 		});

// 	});

// 	// describe('renders Graph, AudioComponent, Record', function (){
// 	// 	const wrapper = mount(<Study allTargets={[{}]}/>);
		
// 	// 	it ('contains a <Graph/> component', function (){
// 	// 		expect(wrapper.find(Graph)).to.have.lenght(1);
// 	// 	});

// 	// 	it ('contains an <AudioComponent/> component', function() {
// 	// 		expect(wrapper.find(AudioComponent)).to.have.lenght(1);
// 	// 	});

// 	// 	it('contains a <Record/> component', function() {
// 	// 		expect(wrapper.find(Record)).to.have.lenght(1);
// 	// 	}); 
// 	// });
// });

