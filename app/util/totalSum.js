function CartSum(data) {
  let total = 0;
  if (data.length === 0) {
    total = 0;
  } else {
    data.map((items) => {
      let discount = 100 - items.discount;
      total += items.price * items.qty * discount;
      return 0;
    });
  }
  return total;
}

module.exports = {
  CartSum,
};
