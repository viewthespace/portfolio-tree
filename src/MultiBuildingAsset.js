import SingleBuildingAsset from './SingleBuildingAsset.js';

export default class MultiBuildingAsset {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = "cubes";

    this.children = [
      new SingleBuildingAsset('1204A 6th Avenue', 'New York, NY')
    ];
  }
}
