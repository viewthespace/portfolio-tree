import _ from 'lodash';
import './App.css';

import React, { Component } from 'react';
import { Button, List, Grid } from 'semantic-ui-react';

import Portfolio from './Portfolio.js';
import MultiBuildingAsset from './MultiBuildingAsset.js';

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
    return userAssets[index];
  }

  return homeAsset;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetSelection: { name: 'Home' } ,
      assetSelections: userAssets,
      selectionPath: [],
      drillDepth: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.drillInto = this.drillInto.bind(this);
    this.drillBack = this.drillBack.bind(this);
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Row centered>
          Currently selected asset: {this.state.assetSelection.name}
        </Grid.Row>
        <Grid.Row centered>
          { this.renderBackButton() }
          { this.renderAssetSelectionList(this.state.assetSelections) }
        </Grid.Row>
      </Grid>
    );
  }

  renderAssetSelectionList(assetSelections) {
    return (
      <List size='big'>
        {assetSelections.map((asset, i) => this.renderAccordionItem(asset, i))}
      </List>
    );
  }

  renderAccordionItem(asset, index) {
    return (
      <List.Item key={index} index={index} onClick={this.handleClick}>
        <List.Icon name={asset.icon} verticalAlign='middle' />
        <List.Content>
          <List.Header>{asset.name}</List.Header>
          <List.Description>{asset.description}</List.Description>
        </List.Content>
        <List.Icon
          name='chevron right'
          index={index}
          verticalAlign='middle'
          onClick={this.drillInto}
        />
      </List.Item>
    );
  }

  renderBackButton() {
    if (this.state.drillDepth > 0) {
      return <Button icon="chevron left" onClick={this.drillBack} />;
    }
  }

  handleClick(e, listItemProps) {
    this.setState((prevState, props) => {
      const { index } = listItemProps;

      return {
        assetSelection: assetAt(index)
      }
    });
  }

  drillInto(e, drillProps) {
    e.stopPropagation();
    debugger;
    this.setState((prevState, props) => {
      let drillSelections = this.assetSelectionsFor(prevState.drillDepth);
      return Object.assign({}, prevState, {
        assetSelections: drillSelections.children,
        selectionPath: prevState.selectionPath.push(drillSelections[drillProps.index]),
        drillDepth: prevState.drillDepth + 1
      });
    });
  }

  assetSelectionsFor(depth) {
    if (this.state.drillDepth === 0) {
      return userAssets;
    }

    return _.last(this.state.selectionPath).children;
  }

  drillBack() {
    this.setState((prevState, props) => {
      let newSelectionPath = prevState;
      newSelectionPath.pop();
      return Object.assign(
        {},
        prevState,
        {
          assetSelections: this.assetSelectionsFor(newSelectionPath.length),
          selectionPath: newSelectionPath,
          drillDepth: prevState.drillDepth - 1
        }
      );
    });
  }
}

export default App;
