<template>
  <v-app class="bg">
    <v-content>
      <v-container>
        <v-alert
          border="top"
          :color="coloralert"
          dark
          :value="regisstatus"
          :icon="iconalert"
        >
          {{ alertMessage }}
        </v-alert>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <v-card elevation="20">
              <v-toolbar
                flat
                color="cyan"
                height="80px"
                :style="{ color: 'white', paddingLeft: '150px' }"
              >
              </v-toolbar>
              <v-card-text>
                <!-- <v-toolbar color="blue lighten-4" flat>
              
                <v-toolbar-title >ลงทะเบียนสมาชิก</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>-->
                <!-- <v-app-bar src="https://picsum.photos/1920/1080?random">Register</v-app-bar> -->
                <div class="form">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <b-row>
                      <b-col>
                        <v-text-field
                          width="20"
                          v-model="firstname"
                          :rules="nameRules"
                          :counter="200"
                          label="ชื่อจริง"
                          outlined
                          required
                        ></v-text-field>
                      </b-col>
                      <b-col>
                        <v-text-field
                          v-model="lastname"
                          :rules="nameRules"
                          :counter="200"
                          label="นามสกุล"
                          required
                          outlined
                        ></v-text-field>
                      </b-col>
                    </b-row>

                    <div class="d-flex flex-row">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="อีเมล์"
                        required
                        outlined
                      ></v-text-field>
                    </div>

                    <b-row>
                      <b-col>
                        <v-text-field
                          class="รหัสผ่าน"
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[PasswordRules.required, PasswordRules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                          outlined
                          required
                        ></v-text-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <v-select
                          class="gender"
                          v-model="gender"
                          :items="genders"
                          label="เพศ"
                          outlined
                        ></v-select>
                      </b-col>

                      <b-col>
                        <v-text-field
                          v-model="age"
                          type="number"
                          min="0"
                          label="อายุ"
                          outlined
                        ></v-text-field>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <VuePhoneNumberInput
                          v-model="phone"
                          clearable
                          required
                        />
                      </b-col>
                    </b-row>
                    <v-spacer></v-spacer>
                    <div class="d-flex flex-row">
                      <b-col>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-btn
                          width="200px"
                          height="50px"
                          color="primary"
                          @click="register"
                          >ลงทะเบียน</v-btn
                        >
                      </b-col>
                      <b-col>
                        &nbsp;&nbsp;&nbsp;

                        <v-btn width="200px" height="50px" color="error" to="/"
                          >ยกเลิก</v-btn
                        >
                      </b-col>
                    </div>
                  </v-form>
                </div>
              </v-card-text>
              <v-card-actions>
                <!-- <b-row class="button">
                  <v-btn color="primary" rounded @click="register">ลงทะเบียน</v-btn>
                </b-row>
                <b-row>
                  <v-btn color="error" rounded>ยกเลิก</v-btn>
                </b-row>-->
                <!-- <b-col center>
                     <v-btn color="error">ล้างข้อมูล</v-btn>
                </b-col>-->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  theme: {
    dark: true
  },
  layout: "regis",
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
    phone: {
      handler() {
        console.log("firstname", this.phone);
      }
    }
  },
  components: {
    VuePhoneNumberInput
  },
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: " ",
    age: "",
    regisstatus: false,
    alertMessage: "",
    coloralert: "",
    iconalert: "",
    valid: true,
    nameRules: [
      v => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
      v => (v && v.length <= 200) || "Name must be less than 200 characters"
    ],

    emailRules: [
      v => !!v || "กรุณากรอกข้อมูลให้กรบถ้วน",
      v =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "อีเมล์ของท่านไม่ถูกต้อง"
    ],
    genders: ["Male", "Female", "Others"],
    PasswordRules: {
      required: value => !!value || "กรุณากรอกข้อมูลให้กรบถ้วน",
      min: v => v.length >= 8 || "กำหนดรหัสผ่านอย่างน้อย 8 ตัวอักษร"
    },

    show1: false,
    show2: true,
    show3: false,
    show4: false
  }),
  methods: {
    async register() {
      let res = await this.$http.post("/users/register", {
        userid: this.$route.query.userid,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        gender: this.gender,
        phone: this.phone,
        age: this.age
      });
      if (!res.data.ok) {
        console.log("เพิ่มข้อมูลสมาชิกไม่สำเร็จ");
        this.regisstatus = true;
        (this.coloralert = "red lighten-2"),
          (this.iconalert = "mdi-alert-circle"),
          (this.alertMessage =
            "สมัครสมาชิกไม่สำเร็จ กรุณากรอกข้อมูลให้ครอบถ้วน หรือ อีเมล์ของท่านมีการลงทะเบียนแล้ว"),
          window.scrollTo(0, 0);
      } else {
        console.log("เพิ่มข้อมูลสมาชิกสำเร็จ");
         this.regisstatus = true;
        (this.coloralert = "green lighten-2"),
          (this.iconalert = "mdi mdi-checkbox-marked-circle"),
          (this.alertMessage = "สมัครสมาชิกสำเร็จ"),
          window.scrollTo(0, 0);
        setTimeout(() =>this.$router.push('login'), 600);
      }
    }
  }
};
</script>

<style>
.form {
  padding-top: 20px;
}
.cancle {
  text-decoration: none;
}
</style>
