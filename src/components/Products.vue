<template>
<div>
    <div v-show="products.ids.length>0"  style="margin-top:75px;padding-right: 60px;padding-left: 60px;">
        <a-row id='backgroundContainer' :gutter="[20, 20]">
            <a-col
            v-for="product in products.ids"
            :key="product"
            :xl="{ span: 6 }"
            :lg="{ span: 8 }"
            :md="{ span: 12 }"
            :xs="{ span: 24 }"
            >
                <a-card @click="showProductDetail(product)" hoverable>
                    <img slot="cover" alt="example" :src="products.data[product].image" />
                    <a-card-meta :title="products.data[product].title">
                        <template slot="description">
                            <span>Price: ${{products.data[product].price}}</span>
                        </template>
                    </a-card-meta>
                </a-card>
            </a-col>
        </a-row>
    </div>
    <div v-show="!products.ids.length>0" id="backgroundContainer">
      <template>
        <a-row v-for="i in 4" :key="i" :gutter="[16, 32]">
          <a-col :span="6"> <a-skeleton active /> </a-col>
          <a-col :span="6"> <a-skeleton active/> </a-col>
          <a-col :span="6"> <a-skeleton active/> </a-col>
          <a-col :span="6"> <a-skeleton active/> </a-col>
        </a-row>
      </template>
    </div>
</div>
    
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    created: async function(){
        console.log(this.$store)
        if(this.$route.name === 'Home' && this.$store.getters.getProductsIds.length === 0 ){
            // const { data } = await axios(`https://fake-products-app.herokuapp.com/products`);
            const { data } = await axios(`https://fakestoreapi.com/products`);
            this.$store.dispatch('setProductsData',{data})
        }
    },
    computed: {
        ...mapState(['products']),
    },
    methods:{
        showProductDetail(id){
            this.$router.push({ name: 'productDetail', params: { id } })
        }
    }
}
</script>

<style scoped>
.ant-card-cover img {
  object-fit: contain;
  min-height: 250px;
  max-height: 250px;
  padding: 15px;
  display: inline-block;
}
#backgroundContainer{
    background-color: #ffffff;
}

</style>
