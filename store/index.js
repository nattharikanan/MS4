import Axios from "axios";
import createPersistedState from "vuex-persistedstate";
import vuexpersist from "vuex-persist";
import vuex from "Vuex"
export const state = () => ({
  productg: [],
  cart: []
});

export const getters = {
  cartItemCount: state => {
    return state.cart.length;
  },
  cartTotalPrice: state => {
    let total = 0;
    state.cart.forEach(item => {
      total += item.product.unitprice * item.quantity;
    });
    return total;
  }
};
export const mutations = {
  SET_PRODUCT: (state, productg) => {
    state.productg = productg;
  },
  ADD_TO_CART: (state, data) => {
    let productInCart = state.cart.find(items => {
      return items.product.productid === data.product.productid;
     
    });
    if (productInCart) {
      productInCart.quantity += data.quantity;
      return ("SET_DATA");
      
    }

    state.cart.push({
      product: data.product,
      quantity: data.quantity
    });
    // 
    console.log("cart", state.cart)
    
  },
  // SET_CART: (state, cartItems) => {
  //   state.cart.product = cartItems;

  //   console.log("show cart ", state.cart.product)
  //   console.log("cartItem", cartItems);
  // }
  SAVE_DATA: (state)=>{ 
    window.localStorage.setItem('cart',JSON.stringify(state.cart))

  }

 

  
};
export const actions = {
  async getProduct({ commit }, id) {
    const res = await this.$axios.get(
      `http://localhost:7000/api/product?productid=${id}`
    );
    commit("SET_PRODUCT", res.data);
  },

  // async addProductToCart({ commit }, { id, quantity }) {
  //   const res = await this.$axios.get(
  //     `http://localhost:7000/api/product?productid=${id}`
  //   );
  //   commit("ADD_TO_CART", { product: res.data.products[0], quantity }); //การทำขอมูลให้OBJ เดียว
  //   await this.$axios.post("http://localhost:7000/api/carts", { 
  //     product_id: product[0].productid,
  //     pname: product[0].productname,
  //     price : product[0].unitprice,
  //     quantity
  //   })
  // }

    async addProductToCart({ commit }, { id, quantity }) {
    const res = await this.$axios.get(
      `http://localhost:7000/api/product?productid=${id}`
      );
      // await this.$axios.post("http://localhost:7000/api/carts", {
      //   product_id: res.data.products[0].productid,
      //   pname: res.data.products[0].productname,
      //   price: res.data.products[0].unitprice,
      //   quantity
      // });
      console.log("res",res.data.products[0])
      commit("ADD_TO_CART", { product: res.data.products[0], quantity });
  },

  // async getCartItems({ commit }) {
  //   const res = await this.$axios.get("http://localhost:7000/api/carts");
  //   console.log("getCartItems", res.data.carts)
  //   commit("SET_CART", res.data.carts);
  // }
};
