import _ from 'lodash';
import './App.css';

import React, { Component } from 'react';
import { Button, Accordion, Icon } from 'semantic-ui-react';

import Portfolio from './Portfolio.js';
import MultiBuildingAsset from './MultiBuildingAsset';

const userAssets = [
  new Portfolio('East Coast', '13 Assets'),
  new Portfolio('West Coast', '55 Assets'),
  new MultiBuildingAsset('1204 6th Avenue', 'New York, NY')
];

const homeAsset = {
  name: 'Home'
};

function assetAt(index) {
  if (index >= 0) {
    return userAssets[index]
  }

  return homeAsset;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: null, assetSelection: { name: 'Home' } };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className='container'>
        <div className='list'>
          Currently selected asset: {this.state.assetSelection.name}
          <Accordion>
            { this.renderAccordionItems() }
          </Accordion>
        </div>
      </div>
    );
  }

  renderAccordionItems() {
    return userAssets.map((asset, i) => this.renderAccordionItem(asset, i));
  }

  renderAccordionItem(asset, index) {
    return (
      <div key={index}>
        <Accordion.Title active={this.isAccordionItemActive(index)} index={index} onClick={this.handleClick}>
          <Icon name='dropdown' />
          {asset.name}
        </Accordion.Title>
        <Accordion.Content active={this.isAccordionItemActive(index)}>{asset.description}</Accordion.Content>
      </div>
    );
  }

  isAccordionItemActive(index) {
    return this.state.activeIndex === index;
  }

  handleClick(e, titleProps) {
    this.setState((prevState, props) => {
      const { index } = titleProps;
      const { activeIndex } = prevState;
      const newIndex = activeIndex === index ? -1 : index;

      return { activeIndex: newIndex, assetSelection: assetAt(newIndex)}
    });
  }
}

export default App;
