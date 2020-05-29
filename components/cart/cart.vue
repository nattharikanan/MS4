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
      <v-list class="cart">
        <div v-for="(item, idx) in cart" :key="idx">
          <div class="px-2 d-flex justify-content-between">
            <div>
              <strong>{{ item.product[0].productname}}</strong>
              <br />
              {{ item.quantity }} x {{ item.product[0].unitprice }}
            </div>
            <div>
              <a href="#" class="badge badge-secondary">ลบ</a>
            </div>
          </div>
        </div>
        <hr />

        <div class="px-2 d-flex justify-content-between">
          <span>ยอดรวม : {{ cartTotalPrice }}</span>
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

    <v-btn icon color="white">
      <!-- ปุ่มใบเสนอราคา -->
      <v-icon size="25px">mdi-clipboard-text-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
    watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
    cart: {
      handler() {
        console.log("cart data", this.$store.state.cart);
      
      }
    }
    },

 
  computed: {
    cart() {
      return this.$store.state.cart;
      
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


};
</script>

<style>
.cart {
  width: 320px;
}
</style>
