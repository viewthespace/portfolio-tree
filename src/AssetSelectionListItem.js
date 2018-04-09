import React, { Component } from 'react';

import { Button, List } from 'semantic-ui-react';

export default class AssetSelectionListItem extends Component {
  render() {
    let { asset, index, handleClick } = this.props;

    return (
      <List.Item className='asset-list-item' index={index} onClick={handleClick}>
        <List.Content floated='right'>
          { asset.children ? this.renderDrillButton(asset, index) : null }
        </List.Content>
        <List.Icon name={asset.icon} verticalAlign='middle' color={asset.color}/>
        <List.Content>
          <List.Header>{asset.name}</List.Header>
          <List.Description>{asset.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }

  renderDrillButton(asset, index) {
    return <Button
      icon='chevron right'
      size='huge'
      index={index}
      onClick={this.props.drillInto}
    />
  }
}
