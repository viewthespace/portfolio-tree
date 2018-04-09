import React, { Component } from 'react';

import './App.css';

import { Grid, Header, List } from 'semantic-ui-react';
import _ from 'lodash';

import AssetSelectionListItem from './AssetSelectionListItem.js';
import MultiBuildingAsset from './MultiBuildingAsset.js';
import ParentHeader from './ParentHeader.js';
import Portfolio from './Portfolio.js';
import SingleBuildingAsset from './SingleBuildingAsset.js';

const userAssets = [
  new Portfolio('East Coast', '2 Assets'),
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
      <Grid container>
        <Grid.Row>
          <div className='asset-selection'>
            <Header as='h2' color='purple'>
              {this.state.assetSelection.name}
            </Header>
          </div>
        </Grid.Row>
        <Grid.Row>
          {this.showParentHeader() ?
            <ParentHeader
              selectionPath={this.state.selectionPath}
              drillBack={this.drillBack}
            /> : null
          }
        </Grid.Row>
        <Grid.Row>
          <List divided size='huge'>
            {this.state.assetSelections.map((asset, i) => (
              <AssetSelectionListItem
                key={i}
                asset={asset}
                index={i}
                handleClick={this.handleClick}
                drillInto={this.drillInto}
              />
            ))}
          </List>
        </Grid.Row>
      </Grid>
    );
  }

  showParentHeader() {
    return this.state.selectionPath.length > 0;
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
      let assetSelections = this.assetSelectionsFor(selectionPath.length);
      let selection = assetSelections[drillProps.index];
      selectionPath.push(selection);
      return Object.assign({}, prevState, {
        assetSelections: selection.children,
        selectionPath: selectionPath
      });
    });
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

  assetSelectionsFor(depth) {
    if (depth === 0) {
      return userAssets;
    }

    return _.last(this.state.selectionPath).children;
  }

  assetAt(index) {
    return this.state.assetSelections[index];
  }
}

export default App;
