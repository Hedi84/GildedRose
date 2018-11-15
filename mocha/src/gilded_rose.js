class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(function(item){
      item.sellIn -= 1;
      if ((item.quality > 0) && (item.quality < 50)) {
        switch(item.name) {
          case "Aged Brie":
            agedBrie(item);
            break;
          case "Sulfuras, Hand of Ragnaros":
            return item;
            break;
          case "Backstage passes to a TAFKAL80ETC concert":
            passes(item);
            break
          default:
            normalItem(item);
            break
        }
      } else {
        return item;
      }
    });
    return this.items;
  }
}

  function agedBrie(item) {
      item.quality += 1
  }

  function passes(item) {
    if (item.sellIn < 5) {
      item.quality += 3
    } else if (item.sellIn < 10) {
      item.quality += 2
    } else {
      item.quality += 1
    }
  }

function conjured(item) {
  if (item.sellIn <= 0) {
    item.quality -= 4;
  } else {
    item.quality -= 2;
  }
}

  function normalItem(item) {
    if (item.sellIn <= 0 || item.name.includes('conjured')) {
      item.quality -= 2;
    } else {
    item.quality -= 1;
    }
  }

module.exports = {
  Item,
  Shop
}

exports.Item = Item;
exports.Shop = Shop;
exports.updateQuality = Shop.prototype.updateQuality;
