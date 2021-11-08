<template>
    <div>
        <a-row v-for="item in cart" v-bind:key="item.id" type="flex">
            <a-col flex='0.6'>
                <img alt="example" :src="products.data[item.id].image" height="50" />
            </a-col>
            <a-col flex="1">
                <p>{{products.data[item.id].title}}</p>
            </a-col>

            <a-col flex="1">
                <div>
                    <a-button
                        type="primary"
                        shape="circle"
                    >
                    -
                    </a-button>
                    1
                    <a-button type="primary" shape="circle" >
                        +
                    </a-button>
                    <br />
                    <br />
                </div>
            </a-col>


            
        </a-row>
        <!-- <a-col v-for="item in cart" v-bind:key="item.id">
            <a-row>
                <p>{{item}}</p>
                <p>asd</p>
            </a-row>
            <a-row>
                <p>{{item}}</p>
            </a-row>
        </a-col> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['cart','products']),
  },
  methods: {},
};
</script>