<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon color="white" dark v-on="on">
        <v-icon size="25px">mdi-clipboard-text-outline</v-icon>
      </v-btn>
    </template>
    <v-list class="quotationlist">
      <div>
        <div class="px-2 d-flex justify-content-between">
          <div>
            <strong>รายการใบเสนอราคา</strong>
            <br />
          </div>
          <div>
            <a href="#" class="badge badge-secondary">ลบ</a>
          </div>
        </div>
      </div>
      <hr />

      <div class="px-2 d-flex justify-content-between">
        <span>ดำเนินการต่อ</span>

        <a href="#">ลบสินค้าทั้งหมด</a>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
</script>

<style>
</style>
