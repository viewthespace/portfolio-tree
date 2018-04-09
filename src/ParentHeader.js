import React, { Component } from 'react';

import _ from 'lodash';
import { Button, Item } from 'semantic-ui-react';

export default class ParentHeader extends Component {
  render() {
    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Button icon="chevron left" size='huge' onClick={this.props.drillBack} />
            <Item.Header>{_.last(this.props.selectionPath).name}</Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}
