import _ from 'lodash';
import './App.css';

import React, { Component } from 'react';
import { Button, List, Icon, Grid } from 'semantic-ui-react';

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
      <Grid container centered>
        <Grid.Row centered>
          Currently selected asset: {this.state.assetSelection.name}
        </Grid.Row>
        <Grid.Row centered>
          { this.renderAssetSelectionList() }
        </Grid.Row>
      </Grid>
    );
  }

  renderAssetSelectionList() {
    return (
      <List size='big'>
        {userAssets.map((asset, i) => this.renderAccordionItem(asset, i))}
      </List>
    );
  }

  renderAccordionItem(asset, index) {
    return (
      <List.Item key={index} index={index} onClick={this.handleClick}>
        <Icon name={asset.icon} />
        <List.Content>
          <List.Header>{asset.name}</List.Header>
          <List.Description>{asset.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  handleClick(e, listItemProps) {
    this.setState((prevState, props) => {
      const { index } = listItemProps;
      const { activeIndex } = prevState;
      const newIndex = activeIndex === index ? -1 : index;

      return { activeIndex: newIndex, assetSelection: assetAt(newIndex)}
    });
  }
}

export default App;
