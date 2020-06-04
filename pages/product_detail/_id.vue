<template>
  <div class="details">
    <v-card
      class="mx-auto"
      max-width="auto"
      height="400px"
      outlined
      v-for="dt in productg.products"
      :key="dt.productid"
    >
     <img 
          :src="dt.productimage"
          :style="{ marginTop: '10px', height: '200px', width: '250px' }"
        />
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4"></div>
          <v-list-item-title class="headline mb-1">{{
            dt.productname
          }}</v-list-item-title>
          <v-list-item-subtitle>รายละเอียดสินค้า</v-list-item-subtitle>
        </v-list-item-content>

       
      </v-list-item>

      <v-card-actions>
        <v-btn color="success" dark @click="addToCart(dt.productid)">ใส่ตะกร้า</v-btn>
        <v-btn color="warning" dark>ขอใบเสนอราคา</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  name: "product_detail-id",
  computed: {
    productg() {
      return this.$store.state.productg;
      console.log("test", this.$store.state.productg);
    }
  },
  mounted() {
    this.$store.dispatch("getProduct", this.$route.params.id);
  },
  methods:{
      async addToCart(id){
      //  let res = await this.$http.get("/product", {
      //   params: { productid:id }
      // });
      //  console.log(res.data);
      //  this.selected = res.data.products
      // //  console.log(this.selected);
      // // this.selected = res.data.selected;
      // this.$store.dispatch('addProductToCart',{
      //   product : this.selected,
      //   quantity:1
      // })
            if($nuxt.$auth.loggedIn ==false){
        this.$router.push('/users/login');
      }
      else{
      
       let res = await this.$http.get("/product", {
        params: { productid:id }
      });
       console.log(res.data);
       this.selected = res.data.products
      //  console.log(this.selected);
      // this.selected = res.data.selected;
      this.$store.dispatch('addProductToCart',{
        id : id,
        quantity: 1
      })
      }
    }
  }
};
</script>

<style>
.details {
  color: black;
  padding: 50px;
}
</style>
