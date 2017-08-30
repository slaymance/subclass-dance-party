describe('colorDancer', function() {

  var colorDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    colorDancer = new ColorDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(colorDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe('color', function() {
    it('should change color each time step is called', function() {
      sinon.spy(colorDancer, 'step');

      
      expect(colorDancer.$node.css('border-color') === 'green').to.be.true;
      
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);
      expect(colorDancer.$node.css('border-color') === 'rgb(0, 0, 128)').to.be.true;
      clock.tick(timeBetweenSteps);
      
      
    });
  });
});
