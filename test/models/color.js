const color = require('../../models/color')
const expect = require('chai').expect
const sinon = require('sinon')

const Color = color.Color;
const ColorFactory = color.ColorFactory;

describe('Color', function() {
  const color = new Color('Blue');
  const vehicle = {
    registratioNo : 'KA-01-A-1234',
  }
  vehicle.deleteVehicle = function () {
    console.log('faflkajl')
  }
  const stub = sinon.stub(vehicle, 'deleteVehicle').callsFake(function fakeFn() {
    delete vehicle
    return ;
  })
  const slot = {
    slotNo: 1
  }
  slot.deleteDetails = function () {}
  const stub2 = sinon.stub(slot, 'deleteDetails').callsFake(function fakeFn() {
    delete slot
    return ;
  })
  it('color instance should be an object', () => {
    expect(color).to.be.an('object')
  })
  it('color instance should have method getColor', () => {
    expect(color.getColor).to.be.an('Function')
  })
  it('Should get color Blue from the instance', () => {
    expect(color.getColor()).equals('Blue')
  })
  it('color instance should have method addDetails', () => {
    expect(color.addDetails).to.be.an('Function')
  })
  it('color instance should have method addDetails', () => {
    expect(color.addDetails(vehicle, slot))
    expect(color.vehicles).to.be.an('Array').that.includes(vehicle)
    expect(color.slots).to.be.an('Array').that.includes(slot)
  })
  it('color instance should have method deleteDetails', () => {
    expect(color.deleteDetails).to.be.an('Function')
  })
  it('color instance should have vehicle with Registration No', () => {
    expect(color.deleteDetails(vehicle,slot))
    stub.restore()
    stub2.restore()
  })
})