const importClass = require('./gilded_rose.js');

function createItems () {
  var things = []
  aged_brie = new importClass.Item("Aged Brie", 15, 20);
  things.push(aged_brie);
  backstage_passes = new importClass.Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
  things.push(backstage_passes);
  sulfuras = new importClass.Item("Sulfuras, Hand of Ragnaros", undefined, 50);
  things.push(sulfuras);
  soy_milk = new importClass.Item("Soy Milk", 5, 5);
  things.push(soy_milk);
  sour_milk = new importClass.Item("Sour Milk... eww", 1, 1);
  things.push(sour_milk);
  green_milk = new importClass.Item("Green Milk: I wouldn't try my luck with this", 0, -5);
  things.push(green_milk);
  fairy_potion = new importClass.Item("Fairy Potion: you murdered a fairy for this, but it was worth it", 50, 5);
  things.push(fairy_potion);
  return things;
}

function run () {
  myShop = new importClass.Shop(createItems());
  quality = myShop.updateQuality();
  console.log(quality)
}

run()
