const valid = {
  user: '5dec20fc84a64441061fdefd',
  user2: '5dec21a084a64441061fdefe',
  product: '5de9c261b402161ab4350442'
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
  },
  success: {
    noRulesApply: {
      product_id: valid.product,
      user_id: valid.user
    },
    isBlackFriday: {
      product_id: valid.product,
      user_id: valid.user2
    }
  }
}
