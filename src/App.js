import React, { Component } from 'react';

import './App.css';

import { Button, Grid, Label, List } from 'semantic-ui-react';
import _ from 'lodash';

import AssetSelectionListItem from './AssetSelectionListItem.js';
import MultiBuildingAsset from './MultiBuildingAsset.js';
import ParentHeader from './ParentHeader.js';
import Portfolio from './Portfolio.js';
import SingleBuildingAsset from './SingleBuildingAsset.js';

const userAssets = [
  new Portfolio('East Coast Portfolio', '2 Assets'),
  new MultiBuildingAsset('1204 6th Avenue', 'New York, NY'),
  new SingleBuildingAsset('114 W 41 St.', 'New York, NY')
];

const homeSelection = { name: 'Home' };

function selectHome(prevState, props) {
  return Object.assign({}, prevState, {
    assetSelection: homeSelection
  });
}

function selectAssetAt(index) {
  return function(prevState, props) {
    return Object.assign({}, prevState, {
      assetSelection: prevState.assetSelections[index]
    });
  };
}

function viewChildSelectionsAt(index) {
  return function(prevState, props) {
    const { selectionPath } = prevState;
    let selection = assetSelectionsFor(selectionPath)[index];
    selectionPath.push(selection);

    return Object.assign({}, prevState, {
      assetSelections: selection.children,
      selectionPath: selectionPath
    });
  }
}

function traverseBackwards(prevState, props) {
  const { selectionPath } = prevState;
  selectionPath.pop();

  return Object.assign({}, prevState, {
    assetSelections: assetSelectionsFor(selectionPath),
    selectionPath: selectionPath
  });
}

function assetSelectionsFor(selectionPath) {
  if (selectionPath.length === 0) {
    return userAssets;
  }

  return _.last(selectionPath).children;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetSelection: homeSelection,
      assetSelections: userAssets,
      selectionPath: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.drillInto = this.drillInto.bind(this);
    this.drillBack = this.drillBack.bind(this);
    this.removeAssetSelection = this.removeAssetSelection.bind(this);
  }

  render() {
    return (
      <Grid container>
        <Grid.Row></Grid.Row>
        <Grid.Row>
          { this.isHomeSelected() ? null : <Button icon='remove' onClick={this.removeAssetSelection} /> }
          <Label circular color='purple' size='huge'>
            {this.state.assetSelection.name}
          </Label>
        </Grid.Row>
        <Grid.Row>
          {this.showParentHeader() ? this.renderParentHeader() : null}
        </Grid.Row>
        <Grid.Row>
          <List divided size='huge'>
            {this.state.assetSelections.map(this.renderAssetSelectionListItem.bind(this))}
          </List>
        </Grid.Row>
      </Grid>
    );
  }

  isHomeSelected() {
    return this.state.assetSelection.name === 'Home';
  }

  showParentHeader() {
    return this.state.selectionPath.length > 0;
  }

  handleClick(e, listItemProps) {
    this.setState(selectAssetAt(listItemProps.index));
  }

  drillInto(e, drillProps) {
    e.stopPropagation();
    this.setState(viewChildSelectionsAt(drillProps.index));
  }

  drillBack() {
    this.setState(traverseBackwards);
  }

  removeAssetSelection() {
    this.setState(selectHome);
  }

  renderParentHeader() {
    return (
      <ParentHeader
        selectionPath={this.state.selectionPath}
        drillBack={this.drillBack}
      />
    );
  }

  renderAssetSelectionListItem(asset, i) {
    return (
      <AssetSelectionListItem
        key={i}
        asset={asset}
        index={i}
        handleClick={this.handleClick}
        drillInto={this.drillInto}
      />
    );
  }
}

export default App;
