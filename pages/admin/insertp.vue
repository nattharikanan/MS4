<template>
      <v-container>
        <div>
        <b-tabs content-class="mt-3" justified>
          <b-tab title="เพิ่มสินค้า" active>
            
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
              <v-text-field label="IMAGE URL only" type="file" v-model="productimage"></v-text-field>
               
             

              <v-btn @click="insert">SAVE</v-btn>
              <v-btn>BACK</v-btn>
            
          </b-tab>
          <b-tab title="แสดงข้อมูลสินค้า">
            
               <v-card class="color">
    <v-card-title>
      ข้อมูลสินค้า
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :search="search" :items="show" >
    </v-data-table>
  
                 
  </v-card>
          
          </b-tab>
          <b-tab title="สั่งสินค้า">
            <showdata/>
          </b-tab>
           <b-tab title="ใบเสนอราคา">
          </b-tab>



        </b-tabs>
        </div>


    
      </v-container>
 

</template>

<script>
import axios from "axios";
import showdata from"../../components/productcrud/productcrud"

export default {
  components:{
    showdata

  },


  middleware: ["auth-admin"],
  data() {
    return {
      categories: [],
      productname: "",
      categoryid: "",
      unitprice: "",
      notation: "",
      productstatus: "",
      productimage: "",
      show:[],
            search: "",
      headers: [
        {
          text: "ชื่อสินค้า",
          align: "start",
          sortable: false,
          value: "productname"
        },
        { text: "รหัสสินค้า", value: "productid" },
        { text: "ประเภทสินค้า", value: "categoryid" },
        { text: "ราคา", value: "unitprice" },
        { text: "หมายเหตุ", value: "notation" },
        { text: "สถานะสินค้า", value: "productstatus" },
        { text: "ภาพสินค้า", value: "productimage" },
        { text: "แก้ไขสินค้า", value: "edit" }
      ],
    };
  },
  watch: {
    //ฟังก์ชันไว้คอยดูตัวแปร
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
        <v-alert type="error">เพิ่มข้อมูลสินค้าไม่สำเร็จ</v-alert>;
      } else {
        console.log("เพิ่มข้อมูลสินค้าสำเร็จ");
        <v-alert type="success">เพิ่มข้อมูลสินค้าสำเร็จ</v-alert>;
        window.alert("Insert Successful!");
      }
    },
     async getProduct() {
      let res = await this.$http.get("/product", {
        params: { categoryid: this.categoryid }
      });
     
      this.show = res.data.products;
      console.log("test ",this.show)
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
    this.getProduct();
  }
};
</script>

<style>
.setcolor {
  color: black;
}
</style>
