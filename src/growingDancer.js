class makeGrowingDancer extends makeDancer {
  constructor(top, left, timeBetweenSteps) {
    super(top, left, timeBetweenSteps);
    this.$node.addClass('growing');
  }

  step() {
    super.step();
    if (this.$node.hasClass('growing')) {
      this.$node.removeClass('growing').addClass('shrinking');  
    } else {
      this.$node.removeClass('shrinking').addClass('growing');
    }
  }
}
