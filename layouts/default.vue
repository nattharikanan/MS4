<template>
<div>
  <v-app class="app" >
  <headercom/>
<nuxt/>
  </v-app>
</div>
  
</template>
<script>
import headercom from "../components/header/header"

export default {
  components:{
    headercom
  }

};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap");
.app {
  font-family: "Kanit";
  overflow: hidden;
  color: white;

}

/* .link {
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
.login {
  margin-left: 700px;
  padding: 10px;
}
.head {
  position: relative;
}
.cart {
} */
</style>
