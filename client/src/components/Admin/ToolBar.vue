<template>
  <v-toolbar fixed app light clipped-left color="white" class="elevation-0">
    <v-toolbar-side-icon @click="menuClick"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link class="routerlink" :to="`${home_url}`">N-FORMS</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <UserInfo :user="user" @login="login" @logout="logout"></UserInfo>
    <!--<UserInfo v-if="login_flag" :user_id="user_id" :user_name="user_name"></UserInfo>-->
  </v-toolbar>
</template>

<script>
import UserInfo from "./Member/UserInfo.vue";
import Config from "@/js/config.js";
import Constant from "@/store/store_constant.js";

export default {
  props: ["login_flag"],
  data() {
    return {
      is_drawer: true,
      //user_id: "",
      user_name: "",
      home_url: Config.home_url,
    };
  },
  components: {
    UserInfo: UserInfo,
  },
  created: function () {},
  beforeDestroy() {},
  mounted: function () {
    //this.getUserName();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    //getUserName() {
    //	this.user_id = this.$store.state.user.user_id ;
    //  this.user_name = this.$store.state.user.user_name ;

    //	if(this.user_id == "" || this.user_id==undefined) {
    //    this.logout();
    //	}else {
    //      this.login_flag = true;
    //		// console.log("Success call...........");
    //	}
    //},
    //logout() {
    //	this.user_id = "";
    //    this.user_name = "";
    //    this.$store.commit(Constant.DELETE_USER);
    //    this.$router.push({
    //        path: Config.home_url
    //    });
    //},
    login() {
      this.$EventBus.$emit("login");
    },
    logout() {
      this.$EventBus.$emit("logout");
    },

    menuClick: function () {
      console.log("ToolBar menuClick!!!");
      this.is_drawer = !this.is_drawer;
      this.$EventBus.$emit("menuClick", this.is_drawer);
    },
  },
};
</script>

<style scoped></style>
