<template>
<div class='main-container'>
    <a-row :gutter="[50, 0]">
        <a-col
            :xl="{ span: 16 }"
            :lg="{ span: 16 }"
            :md="{ span: 12 }"
            :xs="{ span: 24 }"
        >
            <a-list
                class="demo-loadmore-list"
                item-layout="horizontal"
                :data-source="cart"
            >
            <a-list-item slot="renderItem" slot-scope="item">
                

                <a-list-item-meta :description="products.data[item.id].description">
                <h3 slot="title">{{ products.data[item.id].title }}</h3>
                <img slot="avatar" width="100px" alt="logo" :src="products.data[item.id].image" />
                </a-list-item-meta>
                <a-button
                    slot="actions"
                    type="primary"
                    shape="circle"
                    @click="updateQuantity(item.id, item.quantity+1)"
                    :disabled='item.quantity == products.data[item.id].quantity'
                >
                +
                </a-button>
                
                <a-button
                    slot="actions"
                    type="primary"
                    shape="circle"
                    @click="updateQuantity(item.id, item.quantity-1)"
                >
                -
                </a-button>
                <a-button
                    slot="actions"
                    type="danger"
                    shape="circle"
                    @click="onProductRemove(item.id)"
                >
                <a-icon type="delete" />
                </a-button>
                <h4 class="list-count">{{ item.quantity }}</h4>
            </a-list-item>
            </a-list>
        </a-col>

        <a-col
        :xl="{ span: 8 }"
        :lg="{ span: 8 }"
        :md="{ span: 12 }"
        :xs="{ span: 24 }"
      >
        <a-affix :offset-top="120">
          <a-table
            :columns="columns"
            :data-source="getBill"
            :scroll="{ y: 440, x: 200 }"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
          <br />
          <a-row>
            <a-col :span="8">
                <a-button block type="primary" :disabled='getTotalBill<=0' @click="onPressCheckout">
                    Checkout (${{ getTotalBill }})
                </a-button>
              </a-col>
          </a-row>
        </a-affix>
      </a-col>
      </a-row>
</div>
</template>

<script>
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    scopedSlots: { customRender: 'title' },
    width: 80,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 80,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 80,
    ellipsis: true,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: 120,
    ellipsis: true,
  },
];

import { mapState,mapGetters } from 'vuex';
export default {
    data(){
        return {
            columns
        }
    },
    computed: {
        ...mapState(['cart','products']),
        ...mapGetters(['getBill', 'getTotalBill'])
    },
    methods: {
        updateQuantity(id, quantity){
            this.$store.commit('updateCart',{id, quantity})
        },
        onProductRemove(id){
            this.$store.commit('removeProductFromCart',{id})
        },
        onPressCheckout() {
            this.$router.push(`checkout`);
        }
    }
}
</script>

<style>
.main-container {
    padding: 50px
}
.ant-list-item {
  position: relative;
  text-align: left;
}
.ant-list-item .list-count {
  position: absolute;
  top: 22px;
  right: 68px;
}
.ant-list-item-meta {
  align-items: center !important;
}
</style>