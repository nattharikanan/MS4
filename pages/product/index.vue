<template>
  <div>
  
    <v-app class="app">
      <v-content>
        <v-container fluid ma-0 pa-0 fill-height>
          <v-layout row>
            <v-flex xs4>
              <v-container>
                <v-card width="400">
                  <v-list-item class="blue lighten-4">ประเภทสินค้า</v-list-item>
                  <v-list-item v-for="c in categories" :key="c.id" @click="categorySelect(c.id)">
                    <v-list-item-title>{{ c.name }}</v-list-item-title>
                  </v-list-item>
                </v-card>
              </v-container>
            </v-flex>

            <v-flex xs8>
              <b-row class="text-center">
                <b-col></b-col>
                <b-col cols="5">
                  <v-text-field
                    solo
                    v-model.lazy="search"
                    placeholder="พิมพ์ชื่อสินค้าเพื่อค้นหา ..."
                    append-icon="mdi-magnify "
                    @input="handleClicked"
                  ></v-text-field>
                </b-col>
                <b-col cols="1"></b-col>
              </b-row>

              <v-container class="d-flex flex-wrap">
                <v-card
                  v-for="p in products"
                  :key="p.productid"
                  class="ma-2"
                  max-width="250"
                  max-height="350"
                  raised
                  :style="{border:'3px',color:'#DCDCDC'}"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4"></div>
                      <img
                        :src="p.productimage"
                        :style="{marginTop : '10px',height:'150px',width:'200px'}"
                      />
                      <nuxt-link
                        :to="{
        name: 'product_detail-id',
        params: {
          id:p.productid,
        }
      }"
                      >
                        <v-list-item-title>{{p.productname}}</v-list-item-title>
                      </nuxt-link>

                      <v-list-item-subtitle>
                        หมายเหตุ : {{p.notation}}
                        <br />
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>ราคา : {{p.unitprice}}</v-list-item-subtitle>
                      <v-list-item-subtitle>สถานะสินค้า : {{p.productstatus}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
                    <!-- <img :src="p.productimage" /> -->
                  </v-list-item>

                  <v-card-actions :style="{marginLeft:'12px',}">
                    <v-btn color="success" dark @click="addToCart(p.productid)">ใส่ตะกร้า</v-btn>
                    <v-btn color="warning" dark>ขอใบเสนอราคา</v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'product',
  props: ['product'],
  data() {
    return {
      search: "",
      categoryid: null,
      products: [],
      categories: [],
      selected:null
    };
  },

  async created() {
    console.log("created function -->");
    //ปกป้องเสริมส่วนนี้มาให้
    console.log("created function -->", this.pd);

    let res = await this.$http.get("/categories");
    console.log("respond", res.data);
    let temp = res.data.categories;
    this.categories = temp.map(c => ({
      name: c.categoryname,
      id: c.categoryid
    }));
    this.getProduct();
  },
  // computed:{
  //   product(){
  //   return this.$store.state.product
  //   console.log("test",this.$store.state.product)
  //   }
  // },
  mounted() {
    // this.$store.dispatch("getProduct");
  },

  methods: {
    async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid }
      });
      console.log(res.data);
      this.products = res.data.products;
    },
    async categorySelect(_id) {
      this.categoryid = _id;
      this.getProduct();
    },
    async countproduct(_idd) {
      console("count", _idd);
    },
    async handleClicked() {
      console.log("FROM ENTER", this.search);
      let res = await this.$http.get("/product/search", {
        params: { productname: this.search }
      });
      console.log(res.data);
      this.products = res.data.products;
    },
    async addToCart(id){
       let res = await this.$http.get("/product", {
        params: { productid:id }
      });
       console.log(res.data);
       this.selected = res.data.products
      //  console.log(this.selected);
      // this.selected = res.data.selected;
      this.$store.dispatch('addProductToCart',{
        product : this.selected,
        quantity: 1
      })
    }
  }
};
</script>
};
</>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.product {
  padding: 20px;
}
img {
  border: 4px solid #6495ed;

  width: 150px;
}
.text-center {
  padding-right: 25px;
  padding-top: 5px;
}
</style>
