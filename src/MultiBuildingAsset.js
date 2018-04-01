import SingleBuildingAsset from './SingleBuildingAsset.js';

export default class MultiBuildingAsset {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = 'cubes';
    this.color = 'green';

    this.children = [
      new SingleBuildingAsset('1204A 6th Avenue', 'New York, NY'),
      new SingleBuildingAsset('1204B 6th Avenue', 'New York, NY'),
      new SingleBuildingAsset('1204C 6th Avenue', 'New York, NY')
    ];
  }
}
