describe('growingDancer', function() {

  var growingDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    growingDancer = new GrowingDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(growingDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe('grow', function() {
    it('should switch classes between "growing" and "shrinking" each time step is called', function() {
      sinon.spy(growingDancer, 'step');
      
      expect(growingDancer.$node.hasClass('growing')).to.be.true;
      
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);
      clock.tick(timeBetweenSteps);
      
      expect(growingDancer.$node.hasClass('shrinking')).to.be.true;
    });
  });
});
