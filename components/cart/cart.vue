<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon color="white" dark v-on="on">
          <v-icon size="25px">mdi-shopping-outline</v-icon>
          {{ cartItemCount }}
        </v-btn>
      </template>
      <!-- v-for="(comment, idx) in comments" :key="idx" -->
      <v-list class="cartlist">
        <!-- <div v-for="(item, idx) in cart" :key="idx">
          <div class="px-2 d-flex justify-content-between">
            <div>
              <strong>{{ item.product}}</strong>
              <br />
              {{ item.quantity }} x {{ item.product[0].unitprice }}
            </div>
            <div>
              <a href="#" class="badge badge-secondary">ลบ</a>
            </div>
          </div>
        </div>-->

        <div v-for="(item, idx) in cart" :key="idx">
          <div class="px-2 d-flex justify-content-between">
            <div>
              <strong>{{ item.name }}</strong>
              <br />
              {{ item.quantity }} * {{ item.price }}
            </div>
            <div>
              <a href="#" class="badge badge-secondary">ลบ</a>
            </div>
          </div>
        </div>
        <hr />

        <div class="px-2 d-flex justify-content-between">
          <span>ยอดรวม : {{cartTotalPrice}}</span>

          <a href="#">ลบสินค้าทั้งหมด</a>
        </div>
      </v-list>
    </v-menu>

    <!-- <v-btn icon color="white" data-toggle="modal" data-target="#cartModal" @click = "showcart()"> -->
    <!-- ปุ่มตะกร้าสินค้า -->
    <!-- <v-badge color="green" :content="noti">
          <v-icon size="25px">mdi-shopping-outline</v-icon>
        </v-badge>
      </v-btn>
    -->
    <!-- ปุ่มใบเสนอราคา -->
    <!-- <v-btn icon color="white">
      
      <v-icon size="25px">mdi-clipboard-text-outline</v-icon>
    </v-btn>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsInCart: []
    };
  },
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
    cart: {
      handler() {
        console.log("cart data", this.$store.state.cart.product);
      }
    }
  },
  computed: {
    cart() {
      const temp = this.$store.state.cart;
      const productsInCart = temp.map(item => {
        const totalPrice = item.quantity * item.product.unitprice;
        return {
          name: item.product.productname,
          quantity: item.quantity,
          price: item.product.unitprice
        };
      });
      return productsInCart;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
    cartTotalPrice() {
      return this.$store.getters.cartTotalPrice;
    }
  },
  mounted() {
    //  this.$store.dispatch("getCartItems");
  },
  methods: {}
};
</script>

<style>
.cartlist {
  width: 320px;
}
</style>
