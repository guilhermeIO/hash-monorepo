const valid = {
  product: '5de9c261b402161ab4350442',
  user: '5dec20fc84a64441061fdefd'
};

module.exports = {
  error: {
    requiredProductId: {
      user_id: valid.user
    },
    requiredUserId: {
      product_id: valid.product
    },
    productNotFound: {
      product_id: '58fcf02b1ab5de09e2a3aecb',
      user_id: valid.user
    },
    userNotFound: {
      product_id: valid.product,
      user_id: '58fcf02b1ab5de09e2a3aecb'
    }
  }
}
