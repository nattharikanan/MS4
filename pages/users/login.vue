<template>
  <v-app class="bg">
     <v-alert
          border="top"
          :color="coloralert"
          dark
          :value="regisstatus"
          :icon="iconalert"
        >
          {{ alertMessage }}
        </v-alert>
    <v-content>
          
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" height="500px">
              <v-toolbar flat color="cyan" height="80px" :style="{color:'white',paddingLeft:'150px'}">
              * เข้าสู่ระบบ *
              </v-toolbar>
              <v-card-text>
                <v-form class = "form">  
                    
                  <v-text-field
                    label="อีเมล์"      
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="รหัสผ่าน"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <div class="forgot">
                  ลืมรหัสผ่าน ?
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions class="action">
              
               <v-btn color="cyan" rounded width="300px" :style="{color:'white'}" @click="LoginSubmit">เข้าสู่ระบบ</v-btn>
              </v-card-actions>
              <v-divider class="mx-10"></v-divider>
              <v-card-text class ="gotosignup">
                  ยังไม่มีบัญชีใช่มั้ย ?  
                  <nuxt-link to="register"> สมัครสมาชิก</nuxt-link>
              </v-card-text >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
layout: "login_layout",
data() {
return{
     regisstatus: false,
    alertMessage: "",
    coloralert: "",
    iconalert: "",
  email:'',
  password:''
}
}
,
methods:{
  async LoginSubmit() {
      try {
        const response = await this.$auth.loginWith('local', { data: { email:this.email , password:this.password} })
        console.log(response)
         console.log("เพิ่มข้อมูลสมาชิกสำเร็จ");
         this.regisstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.iconalert = "mdi mdi-checkbox-marked-circle"),
          (this.alertMessage = "เข้าสู่ระบบสำเร็จ")

      } catch (err) {
        console.log(err)
           console.log("เข้าสู่ระบบไม่สำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage =
            "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบความถูกต้องอีกครั้ง"),
          window.scrollTo(0, 0);
      }

  },
  


  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.form{
    /* padding: 40px; */
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
    
}
.action{
    padding-left:65px ;
 
}
.forgot {
    float:right;
}
.gotosignup{
    padding-left: 200PX;
    /* padding-right: 15px; */
}
.logo{
    background-image: url("../../assets/image/cpac.png");
}

</style>