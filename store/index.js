import Axios from "axios";

export const state = () => ({
  productg: [],
  cart: [],

});

export const getters = {
  cartItemCount: state => {
    return state.cart.length;
  },
  cartTotalPrice: state => {
    let total = 0;
    state.cart.forEach(item => {
      total += item.product[0].unitprice + item.quantity;
    });
    return total;
  }
};
export const mutations = {
  SET_PRODUCT: (state, productg) => {
    state.productg = productg;
  },
  ADD_TO_CART: (state, { product, quantity }) => {
    let productInCart = state.cart.find(items => {
      return items.product[0].productid === product[0].productid;
    });
 
    if (productInCart) {
      productInCart.quantity += quantity;
      return;
    }
    state.cart.push({
      product,
      quantity
    });
  },
  SET_CART: (state, cartItems) => {
    state.cart = cartItems.carts;
    console.log("cartItem" , cartItems.carts)
  }
};
export const actions = {
  async getProduct({ commit }, id) {
    const res = await this.$axios.get(
      `http://localhost:7000/api/product?productid=${id}`
    );
    commit("SET_PRODUCT", res.data);
  },

  async addProductToCart({ commit }, { product, quantity }) {
    commit("ADD_TO_CART", { product, quantity });
    await this.$axios.post("http://localhost:7000/api/carts", {
      product_id: product[0].productid,
      pname: product[0].productname,
      price : product[0].unitprice,
      quantity 
    });
  },

  async getCartItems({ commit }) {
    const res = await this.$axios.get("http://localhost:7000/api/carts");
    commit("SET_CART", res.data);
  }
};
