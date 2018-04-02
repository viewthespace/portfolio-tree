import _ from 'lodash';
import './App.css';

import React, { Component } from 'react';
import { Button, Grid, Header, Item, List } from 'semantic-ui-react';

import Portfolio from './Portfolio.js';
import MultiBuildingAsset from './MultiBuildingAsset.js';
import SingleBuildingAsset from './SingleBuildingAsset.js'

const userAssets = [
  new Portfolio('East Coast', '13 Assets'),
  new Portfolio('West Coast', '55 Assets'),
  new MultiBuildingAsset('1204 6th Avenue', 'New York, NY'),
  new SingleBuildingAsset('114 W 41 St.', 'New York, NY'),
  new MultiBuildingAsset('1204 6th Avenue', 'New York, NY'),
  new SingleBuildingAsset('114 W 41 St.', 'New York, NY')
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetSelection: { name: 'Home' } ,
      assetSelections: userAssets,
      selectionPath: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.drillInto = this.drillInto.bind(this);
    this.drillBack = this.drillBack.bind(this);
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Row centered>
          <Header as='h2' color='purple'>
            {this.state.assetSelection.name}
          </Header>
        </Grid.Row>
        { this.renderParentHeader() }
        <Grid.Row centered>
          { this.renderAssetSelectionList(this.state.assetSelections) }
        </Grid.Row>
      </Grid>
    );
  }

  renderAssetSelectionList(assetSelections) {
    return (
      <List divided size='huge'>
        {assetSelections.map((asset, i) => this.renderListItem(asset, i))}
      </List>
    );
  }

  renderListItem(asset, index) {
    return (
      <List.Item key={index} className='asset-list-item' index={index} onClick={this.handleClick}>
        <List.Content floated='right'>
          { this.renderDrillButton(asset, index) }
        </List.Content>
        <List.Icon name={asset.icon} verticalAlign='middle' color={asset.color}/>
        <List.Content>
          <List.Header>{asset.name}</List.Header>
          <List.Description>{asset.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  renderParentHeader() {
    if (this.state.selectionPath.length <= 0) {
      return;
    }


    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Button icon="chevron left" size='huge' onClick={this.drillBack} />
            <Item.Header>{_.last(this.state.selectionPath).name}</Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  renderDrillButton(asset, index) {
    if (asset.children) {
      return <Button
        icon='chevron right'
        size='huge'
        index={index}
        onClick={this.drillInto}
      />
    }
  }

  handleClick(e, listItemProps) {
    this.setState((prevState, props) => {
      return {
        assetSelection: this.assetAt(listItemProps.index)
      }
    });
  }

  drillInto(e, drillProps) {
    e.stopPropagation();
    this.setState((prevState, props) => {
      const { selectionPath } = prevState;
      let drillSelections = this.assetSelectionsFor(selectionPath.length);
      let selection = drillSelections[drillProps.index];
      selectionPath.push(selection);
      return Object.assign({}, prevState, {
        assetSelections: selection.children,
        selectionPath: selectionPath
      });
    });
  }

  assetSelectionsFor(depth) {
    if (depth === 0) {
      return userAssets;
    }

    return _.last(this.state.selectionPath).children;
  }

  assetAt(index) {
    return this.state.assetSelections[index];
  }

  drillBack() {
    this.setState((prevState, props) => {
      const { selectionPath } = prevState;
      selectionPath.pop();
      return Object.assign({}, prevState, {
        assetSelections: this.assetSelectionsFor(selectionPath.length),
        selectionPath: selectionPath
      });
    });
  }
}

export default App;
