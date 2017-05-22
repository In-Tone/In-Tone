'use strict';
// react
import React from 'react';

// testing libraries
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import jsdom from 'mocha-jsdom';

// components
import Study from '../../components/Study';
import ChooseLanguage from '../../components/ChooseLanguage';
import AudioComponent from '../../components/AudioComponent';
import Record from '../../components/Record';
import Graph from '../../components/Graph';

// study's children components
describe('<Study/>', function() {

	jsdom();
	
	const wrapper = shallow(<Study/>);

	it ('contains a <Graph/> component', function (){
		expect(wrapper.find(Graph)).to.have.lenght(1);
	});

	it ('contains an <AudioComponent/> component', function() {
		expect(wrapper.find(AudioComponent)).to.have.lenght(1);
	});

	it('contains a <Record/> component', function() {
		expect(wrapper.find(Record)).to.have.lenght(1);
	}); 

	it('contains a <ChooseLanguage/> component', function() {
		expect(wrapper.find(ChooseLanguage)).to.have.lenght(1);
	});

	it('contains four children components', function() {
		expect(wrapper.children()).to.have.lenght(4);
	});

});

