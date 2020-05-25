<template>
  <div>
    <v-text-field
      class="search"
      solo-inverted
      placeholder="ค้นหาสินค้า ..."
      @keydown.enter="handleClicked"
      full-width
    >
    
  
   </v-text-field>
    
 </div> 
</template>
    


<script>
export default {
   methods:{
    handleClicked(){
      console.log("from component")
      this.$emit('enter')
    }

  },
  
};
</script>

<style>
</style>