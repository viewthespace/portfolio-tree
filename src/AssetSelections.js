class SingleBuildingAsset {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = 'building outline';
    this.color = 'red';
  }
}

class MultiBuildingAsset {
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

class Portfolio {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.icon = 'globe';
    this.color = 'blue'

    this.children = [
      new SingleBuildingAsset('14 24th St.', 'Los Angeles, CA'),
      new MultiBuildingAsset('Downtown Retail Plaza', 'San Francisco, CA')
    ];
  }
}

export { SingleBuildingAsset, MultiBuildingAsset, Portfolio };
