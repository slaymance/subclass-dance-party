class makeColorDancer extends makeDancer {
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
    this.$node.css({ 'border-color': 'green' });
  }

  step() {
    super.step();
    console.log(this.$node.css('border-color'));
    if (this.$node.css('border-color') === 'rgb(0, 128, 0)') {
      this.$node.css({ 'border-color': 'rgb(0, 0, 128)' });
    } else {
      this.$node.css({ 'border-color': 'rgb(0, 128, 0)' });
    }
  }
}
