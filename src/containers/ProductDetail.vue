<template>
    <div>
        <div v-if="products.data !== null">
            <a-col style='padding:100px;'>
                <a-row :gutter="[30, 30]">
                    <div class='aligmItems'>
                        <a-col :span="50">
                            <div class='imageStyle'>
                                <img :src="products.data[id].image" alt="" width="100%" />
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <h1>{{ products.data[id].title }}</h1>
                            <p>{{ products.data[id].description }}</p>
                            <h2>{{ `Price: $${products.data[id].price}` }}</h2>
                            <p>Quantity: {{ products.data[id].quantity }}</p>
                            <!-- <br /> -->
                            <div>
                                <a-button
                                    type="primary"
                                    shape="circle"
                                    @click="decreaseQuantity"
                                    :disabled='products.data[id].quantity == 0 || quantity == 1'
                                >
                                -
                                </a-button>
                                {{ quantity }}
                                <a-button type="primary" shape="circle" @click="increaseQuantity" :disabled='products.data[id].quantity == 0 || quantity == products.data[id].quantity'>
                                    +
                                </a-button>
                                <br />
                                <br />
                            </div>
                            <a-button type="primary" @click="onProductAdd(id,quantity)" :disabled='products.data[id].quantity == 0'>
                                <a-icon
                                    type="shopping-cart"
                                    :style="{ marginTop: '3px',  }"
                                />
                                <span>Add To Cart</span>
                            </a-button>
                            <a-button type="danger" @click="onProductRemove(id)" id='remove-button-style' :style="{ marginTop: '3px' }" :disabled='products.data[id].quantity == 0'>
                                Remove from cart
                            </a-button>
                        </a-col>
                    </div>
                </a-row>
            </a-col>
        </div>
        <div class="loader" v-else>
        <a-spin size="large" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    created: async function(){
        console.log(this.$store)
        const { id } = this.$route.params;
        // const { data } = await axios(`https://fake-products-app.herokuapp.com/products/${id}`);
        const { data } = await axios(`https://fakestoreapi.com/products/${id}`);
        this.$store.commit('setProduct',{data})
    //     console.log(data)
    //     this.product = data;
    },
    computed: {
        ...mapState(['products', 'cart']),
    },
    data(){
        const { id } = this.$route.params;
        return {
            quantity: 1,
            id
        }
    },
    methods:{
        onProductAdd(id,quantity){
            this.$store.commit('addProductToCart',{id,quantity})
        },
        onProductRemove(id){
            this.quantity = 1;
            this.$store.commit('removeProductFromCart',{id})
        },
        updateQuantity(){
            const index = this.cart.findIndex(item=>item.id === this.id)
            if (index > -1) {
                this.quantity = this.cart[index].quantity;
            }
        },
        increaseQuantity(){
            this.quantity++;
        },
        decreaseQuantity(){
            if(this.quantity > 1){
                this.quantity--
            }
        }
    },
    mounted() {
        this.updateQuantity();
    },
}
</script>

<style scoped>
.loader {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left:0;
    right:0;
    top:0;
    bottom: 0;
}
.imageStyle {
  overflow: hidden;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  /* border: 1px solid #cccccc; */
  justify-content:flex-end;
  display: flex;
}
.imageStyle img {
  max-width: 250px;
  object-fit: contain;
}
.aligmItems{
    display: flex;
    align-items: center;
    justify-content: center;
}
#remove-button-style{
    margin-left: 10px;
}
</style>