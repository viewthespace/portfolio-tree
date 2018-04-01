import SingleBuildingAsset from './SingleBuildingAsset.js';
import MultiBuildingAsset from './SingleBuildingAsset.js';

export default class Portfolio {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = 'globe';
    this.color = 'blue'

    this.children = [
      new SingleBuildingAsset('14 24th St.', 'Los Angeles, CA'),
      new MultiBuildingAsset('1900 28th St.', 'San Francisco, CA')
    ];
  }
}
