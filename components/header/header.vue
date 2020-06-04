<template>
  <v-card class="header">
    <v-toolbar color="cyan" dark flat>
      <div>
        <v-toolbar-title>
          <div class="logo" />
          <!-- แสดง logo สินค้า -->
        </v-toolbar-title>
      </div>

      <!-- มันเป็นค่า array ต้องระบุตำแหน่งแล้วก็เจาะจงลงไป -->
      <div v-if="$auth.loggedIn && $auth.user[0].status == 'user' ">
        <!-- ถ้ามีการ login  -->
        <div class="login">
          <v-icon size="20px">mdi-account</v-icon>
          {{ $auth.user[0].email}}
          <!-- แสดงค่าชื่อของคนที่ลูกค้าuser -->
          <v-dialog v-model="dialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-icon left>mdi-exit-to-app</v-icon>ออกจากระบบ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>ท่านต้องการออกจากระบบใช่หรือไม่?</v-card-title>
              <!-- เช็คก่อนออกจากระบบ -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">ไม่ใช่</v-btn>
                <v-btn color="green darken-1" text @click="$auth.logout(),dialog = false">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div v-else-if="$auth.loggedIn && $auth.user[0].status == 'admin' ">
        <!-- ถ้ามีการ login  -->
        <div class="login-admin">
          <!-- <v-icon size="20px">mdi-account</v-icon>
          {{ $auth.user[0].email}}แสดงค่าชื่อของคนที่ลูกค้าuser-->
          <v-btn text v-for=" (item,idx) in admin " :key="idx" :to="item.to">
            <v-icon left>mdi-account</v-icon>Admin : จัดการระบบ
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-icon left>mdi-exit-to-app</v-icon>ออกจากระบบ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>ท่านต้องการออกจากระบบใช่หรือไม่?</v-card-title>
              <!-- เช็คก่อนออกจากระบบ -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">ไม่ใช่</v-btn>
                <v-btn color="green darken-1" text @click="$auth.logout(),dialog = false">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <div v-else>
        <div class="right">
          <!-- ปุ่มเมนูบาร์ต่างๆ -->
          <v-btn
            color="white"
            text
            v-for=" (item,idx) in itembar "
            :key="idx"
            :to="item.to"
            exact
          >{{item.title}}</v-btn>
        </div>
      </div>
      <div @click="$event.stopPropagation()">
        <cart />
      </div>
      <div @click="$event.stopPropagation()">
        <quotation />
      </div>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for=" (item,idx) in items " :key="idx" :to="item.to" exact>{{ item.title }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<script>
import cart from "../cart/cart";
import quotation from "../quotation/quotation";

export default {
  components: {
    cart,
    quotation
  },
  data() {
    return {
      confirm: true,
      dialog: false,
      tab: null,
      admin: [{ to: "/admin/insertp" }],
      items: [
        { title: "เกี่ยวกับเรา", to: { name: "index" } },
        { title: "สินค้า", to: "/product/#/product" },
        { title: "วิธีการสั่งซื้อ", to: { name: "howto" } },
        { title: "แจ้งชำระเงิน", to: { name: "payment" } },
        { title: "ติดตามพัสดุ", to: { name: "tracking" } }
      ],
      itembar: [
        { title: "สมัครสมาชิก", to: { name: "users-register" } },
        { title: "เข้าสู่ระบบ", to: { name: "users-login" } }
      ]
    };
  },
  computed: {}
};
</script>

<style>
.link {
  text-decoration: none;
}
.logo {
  font-family: "Kanit";
  width: 100px;
  height: 50px;
  float: left;
  background-image: url("../../assets/image/cpac.png");
  margin-top: 20px;
  margin-left: 40px;
}
.right {
  position: relative;
  text-decoration: none;
  margin-left: 800px;
  padding: 10px;
}
.login {
  position: relative;
  text-decoration: none;
  margin-left: 700px;
  padding: 10px;
}
.login-admin {
  position: relative;
  text-decoration: none;
  margin-left: 700px;
  padding: 10px;
}
.header {
  position: relative;
  color: beige;
}
</style>