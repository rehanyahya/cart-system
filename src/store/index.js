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
          [payload.data.id]:{...state.products.data[payload.data.id], ...payload.data}
        }
      }
    },
    removeProductFromCart:(state,payload)=>{
      const index = state.cart.findIndex(item=>item.id === payload.id)
      state.cart.splice(index,1)
    },
    clearCart:(state)=>{
      state.cart = []
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
    },
    updateCart:(state, payload)=>{
      const index = state.cart.findIndex(item=>item.id === payload.id)
      if(payload.quantity <= 0) {
        state.cart.splice(index,1)
      }else{
        state.cart[index].quantity = payload.quantity
      }
    },
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
    },
    getBill:(state)=>{
      let totalBill = []
      state.cart.forEach((item)=>{
        totalBill = [...totalBill, {...item,
          title: state.products.data[item.id].title,
          total: item.quantity * state.products.data[item.id].price,
          price: state.products.data[item.id].price
        }]
      })
      return totalBill;
    },
    getTotalBill: (state) => {
      let sum = 0;
      state.cart.forEach(
        (item)=>{
          sum = sum + (item.quantity * state.products.data[item.id].price)
        }
      )
      return sum.toFixed(2);
    }
  },
  actions: {
    setProductsData: (context, payload) => {
      let productData = {};
      let ids = [];
      payload.data.map(item=>{
        const randomNumber = Math.floor(Math.random() * (10 - 0));
        console.log(randomNumber)
        productData = {...productData, [item.id]:{...item, quantity:randomNumber}}
        ids = [...ids, item.id]
      })
      context.commit('setProducts',{
        data:productData,
        ids
      })
    }
  }
});
