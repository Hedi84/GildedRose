var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

function createItems () {
  var things = []
  aged_brie = new Item("Aged Brie", 15, 20);
  things.push(aged_brie);
  backstage_passes = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
  things.push(backstage_passes);
  sulfuras = new Item("Sulfuras, Hand of Ragnaros", undefined, 50);
  things.push(sulfuras);
  soy_milk= new Item("Soy Milk", 5, 5);
  things.push(soy_milk);
  conjured_milk = new Item("Milk - conjured", 10, 10);
  things.push(conjured_milk);
  return things;
}

  it("creates a new shop with items", function() {
    const gildedRose = new Shop(createItems());
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
  });

  it(" decreases quality and sellIn value of a regular item every day", function() {
    const gildedRose = new Shop(createItems());
    var quality = gildedRose.items[3].quality
    var sellIn = gildedRose.items[3].sellIn
    const items = gildedRose.updateQuality();
    expect(items[3].quality).to.equal(quality - 1);
    expect(items[3].sellIn).to.equal(sellIn - 1);
  });

  it("decreases the quality twice as fast after the due date is passed", function() {
    const gildedRose = new Shop(createItems());
    var soyMilk = gildedRose.items[3]
    soyMilk.sellIn = 0;
    quality = soyMilk.quality;
    const items = gildedRose.updateQuality();
    expect(items[3].quality).to.equal(quality -2);
  });


  it("never decreases an item's quality to a negative", function() {
    const gildedRose = new Shop(createItems());
    var soyMilk = gildedRose.items[3]
    soyMilk.quality = 0
    const items = gildedRose.updateQuality();
    expect(items[3].quality).to.equal(0);
  });

  it("increases quality of aged brie every day", function() {
    const gildedRose = new Shop(createItems());
    var brie = gildedRose.items[0]
    quality = brie.quality
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(quality + 1);
  });

  it("never increases the item's value above 50", function() {
    const gildedRose = new Shop(createItems());
    var brie = gildedRose.items[0]
    brie.sellIn = -10
    brie.quality = 50
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });


  it("never decreases in quality when the item is sulfuras", function() {
    const gildedRose = new Shop(createItems());
    var sulfuras = gildedRose.items[2]
    quality = sulfuras.quality;
    const items = gildedRose.updateQuality();
    expect(items[2].quality).to.equal(50);
  });

  it("increases by 2 when there are 10 or fewer days for Backstage passes", function() {
    const gildedRose = new Shop(createItems());
    var passes = gildedRose.items[1]
    quality = passes.quality;
    passes.sellIn = 10
    var items = gildedRose.updateQuality();
    expect(items[1].quality).to.equal(quality + 2);
  });

  it("increases by 3 when there are 5 or fewer days for Backstage passes", function() {
    const gildedRose = new Shop(createItems());
    var passes = gildedRose.items[1]
    quality = passes.quality;
    passes.sellIn = 5
    var items = gildedRose.updateQuality();
    expect(items[1].quality).to.equal(quality + 3);
  });

  it("decreases by 2 when the item is conjured", function() {
    const gildedRose = new Shop(createItems());
    conjuredMilk = gildedRose.items[4];
    quality = conjuredMilk.quality;
    var items = gildedRose.updateQuality();
    expect(items[4].quality).to.equal(quality - 2);
  });

});


describe("Gilded Rose outcomes", function() {

  function createMoreItems () {
    var things = []
    aged_brie = new Item("Aged Brie", 15, 20);
    things.push(aged_brie);
    backstage_passes = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
    things.push(backstage_passes);
    sulfuras = new Item("Sulfuras, Hand of Ragnaros", undefined, 80);
    things.push(sulfuras);
    soy_milk = new Item("Soy Milk", 5, 5);
    things.push(soy_milk);
    sour_milk = new Item("Sour Milk... eww", 1, 1);
    things.push(sour_milk);
    green_milk = new Item("Green Milk: I wouldn't try my luck with this", 0, -5);
    things.push(green_milk);
    conjured_milk = new Item("Milk - conjured", 10, 10);
    things.push(conjured_milk);
    fairy_potion = new Item("Fairy Potion: you murdered a fairy for this, but it was worth it", 5, 50);
    things.push(fairy_potion);
    expired_milk = new Item("Milk - conjured and very expired", -0, 4);
    things.push(expired_milk);
    return things;
  }


  it("gives back the right numbers for aged brie", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(14);
    expect(items[0].quality).to.equal(21);
  });

  it("gives back the right numbers for backstage passes", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[1].sellIn).to.equal(9);
    expect(items[1].quality).to.equal(17);
  });

  it("gives back the right numbers for sulfuras", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(isNaN(items[2].sellIn)).to.equal(true);
    expect(items[2].quality).to.equal(80);
  });

  it("gives back the right numbers for soy milk", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[3].sellIn).to.equal(4);
    expect(items[3].quality).to.equal(4);
  });

  it("gives back the right numbers for sour milk", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[4].sellIn).to.equal(0);
    expect(items[4].quality).to.equal(-1);
  });

  it("gives back the right numbers for green milk", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[5].sellIn).to.equal(-1);
    expect(items[5].quality).to.equal(-5);
  });

  it("gives back the right numbers for conjured milk", function() {
    const gildedRose = new Shop(createMoreItems());
    const items = gildedRose.updateQuality();
    expect(items[6].sellIn).to.equal(9);
    expect(items[6].quality).to.equal(8);
  });

})
