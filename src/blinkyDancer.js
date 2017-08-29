class makeBlinkyDancer extends makeDancer {
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
  }

  step() {
    super.step();
    this.$node.toggle();
  }
}
