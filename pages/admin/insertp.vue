<template>
  <div>
      <v-container> 
      <v-text-field label="ชื่อสินค้า" v-model="productname" required></v-text-field>
      <!-- <v-text-field label="ประเภทสินค้า" v-model ="categoryid"></v-text-field> -->
      <v-select
        v-model="categoryid"
        :items="categories"
        item-text="name"
        item-value="id"
        label="ประเภทสินค้า"
        persistent-hint
        return-object
        single-line
        required
      ></v-select>

      <v-text-field label="ราคาสินค้า" v-model="unitprice" type="number"></v-text-field>
      <v-text-field label="หมายเหตุสินค้า" v-model="notation"></v-text-field>
      <v-text-field label="สถานะของสินค้า" v-model="productstatus"></v-text-field>
      <v-text-field label="IMAGE URL only" v-model="productimage"></v-text-field>

      <v-btn @click="insert">SAVE</v-btn>
      <v-btn>BACK</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
      productname: "",
      categoryid: "",
      unitprice: "",
      notation: "",
      productstatus: "",
      productimage: ""
    };
  },
  watch: { //ฟังก์ชันไว้คอยดูตัวแปร
    categoryid: {
      handler() {
        console.log("cateID", this.categoryid);
      }
    }
  },
  methods: {
    async insert() {
  
      let res = await this.$http.post("/product/insert", {
        productid: this.$route.query.productid,
        productname: this.productname,
        categoryid: this.categoryid.id, //ที่ต้อง.id เพราะมันส่งค่าเ็น obj ไป เราอยากได้แค่ id
        unitprice: this.unitprice,
        notation: this.notation,
        productstatus: this.productstatus,
        productimage: this.productimage
      });
      if (!res.data.ok) {
          console.log("เพิ่มข้อมูลสินค้าไม่สำเร็จ");
         <v-alert type="error">เพิ่มข้อมูลสินค้าไม่สำเร็จ</v-alert>
      } else {
          console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
     <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>
      window.alert('Insert Successful!');
      }
    }
  },
  async created() {
    //ปกป้องเสริมส่วนนี้มาให้
    let res = await this.$http.get("/categories");
    // console.log(res.data);
    let temp = res.data.categories;
    this.categories = temp.map(c => ({
      name: c.categoryname,
      id: c.categoryid
    }));
  }
};
</script>

<style></style>
