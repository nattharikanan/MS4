<template>
  <v-app class="app">
    <v-card>
      <v-toolbar color="cyan" dark flat>

<div>
        <v-toolbar-title>
          <div class="logo" />
        </v-toolbar-title>
</div>
        <!-- <div class = "search">
          
       <searchcom/>
          
        </div> -->
        <!-- <div class="right">
      
            <v-btn text >สมัครสมาชิก</v-btn>
    
          <v-btn text>เข้าสู่ระบบ</v-btn>
          <v-btn icon color="#0B5482">
            <v-icon size="25px">mdi-shopping-outline</v-icon>
          </v-btn>
          <v-btn icon color="#0B5482">
            <v-icon size="25px">mdi-clipboard-text-outline</v-icon>
          </v-btn>
        </div> -->
        <!-- มันเป็นค่า array ต้องระบุตำแหน่งแล้วก็เจาะจงลงไป -->
        <div v-if="$auth.loggedIn"> 
      <div class="login">
           <v-icon size="20px">mdi-account</v-icon> {{ $auth.user[0].email}} 
                <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on"><v-icon left >mdi-exit-to-app</v-icon>ออกจากระบบ</v-btn>
      </template>
      <v-card >
        <v-card-title >ท่านต้องการออกจากระบบใช่หรือไม่?</v-card-title>
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
        <div class = "right">
          <v-btn text v-for=" (item,idx) in itembar " :key="idx" :to="item.to" exact> {{item.title}} </v-btn>
        </div>
        </div>


        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for=" (item,idx) in items " :key="idx" :to="item.to" exact > {{ item.title }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <!-- <v-tabs-items v-model="tab"> -->
      <!-- <v-tab-item v-for="item in items" :key="item">
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
      </v-tab-item>-->
      <!-- <v-card flat>
          <nuxt />
        </v-card>
      </v-tabs-items>-->
      <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" max-height="600" height="1000px">
        <div class="nuxtdata">
          <nuxt />
        </div>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
// import searchcom from '../components/Search'
export default {

  data() {
    return {
      confirm:true,
      dialog:false,
      tab: null,
      items: [
        { title: "เกี่ยวกับเรา", to: { name: "index" } },
        { title: "สินค้า", to:"/product/#/product"},
        { title: "วิธีการสั่งซื้อ", to: { name: "howto" } },
        { title: "แจ้งชำระเงิน", to: { name: "payment" } },
        { title: "ติดตามพัสดุ", to: { name: "tracking" } }
      ],
      itembar :[
         { title: "สมัครสมาชิก", to: { name: "users-register" } },
          { title: "เข้าสู่ระบบ", to: { name: "users-login" } },
      ]
    };
    
  },
  methods:{
   
  }
  
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.app {
  font-family: "Kanit";
  overflow: hidden;
}
.link {
  text-decoration: none;
}

.logo {
  font-family: "Kanit";
  width: 100px;
  height: 50px;
  float: left;
  background-image: url("../assets/image/cpac.png");
  margin-top: 20px;
  margin-left: 40px;
}
.search {
  margin-left: 100px;
  width: 500px;
  margin-top: 40px;
  
}
.right {
   margin-left: 800px;
  padding: 10px;
}
.login{
  margin-left: 800px;
  padding: 10px;

}
</style>
