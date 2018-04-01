import SingleBuildingAsset from './SingleBuildingAsset.js';

export default class Portfolio {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = "globe";

    this.children = [
      new SingleBuildingAsset('14 24th St.', 'Los Angeles, CA')
    ];
  }
}
