<template>
  <div>
    <v-text-field
      solo
      v-model.lazy="search"
      placeholder="พิมพ์ชื่อสินค้าเพื่อค้นหา ..."
      append-icon="mdi-magnify "
      @input="handleClicked"
    ></v-text-field>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>