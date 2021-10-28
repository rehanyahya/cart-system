import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products:{
      data:null,
      ids:[]
    },
  },
  mutations: {
    setProducts: (state, payload)=>{
      state.products = {...payload}
    },
    setProduct: (state,payload)=>{
      state.products = {
        ...state.products,
        data:{
          ...state.products.data,
          [payload.data.id]:{...payload.data}
        }
      }
    },
    removeProductFromCart:(state,payload)=>{
      const index = state.cart.findIndex(item=>item.id === payload.id)
      state.cart.splice(index,1)
    },
    addProductToCart:(state, payload)=>{
      const index = state.cart.findIndex(item=>item.id === payload.id)

      if(index >- 1){
        // state.cart[payload.id] = payload.quantity;
        state.cart[index].quantity = payload.quantity;
      }else{
        state.cart.push(
          {
            id: +payload.id,
            quantity: payload.quantity
          }
        )
        // {
        //   ...state.cart,
        //   [payload.id]:payload.quantity,
        // }
      }
    }
  },
  getters: {
    getProductsIds:(state)=>{
      return state.products.ids;
    },
    getProductsData:(state)=>{
      return state.products.data;
    },
    getCartTotalAmount:(state)=>{
      let total = 0;
      state.cart.map(item=> {
        total = total + (Number(state.products.data[item.id].price)*item.quantity)
      })

      return total.toFixed(2);
    }
  },
  actions: {
    setProductsData: (context, payload) => {
      console.log(payload)
      let productData = {};
      let ids = [];
      payload.data.map(item=>{
        productData = {...productData, [item.id]:item}
        ids = [...ids, item.id]
      })
      console.log(productData)
      console.log(ids)
      context.commit('setProducts',{
        data:productData,
        ids
      })
    }
  }
});
