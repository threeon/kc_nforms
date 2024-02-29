<template>
  <v-app>
    <ToolBar :login_flag="login_flag"></ToolBar>
    <NavFull :showDrawer="show_full"></NavFull>
    <HomeContents v-if="login_flag"></HomeContents>
    <LoginModal v-if="!login_flag"></LoginModal>
    <Footer></Footer>
  </v-app>
</template>

<script>
import ToolBar from "./ToolBar.vue";
import NavFull from "./NavFull.vue";
import HomeContents from "./HomeContents.vue";
import Footer from "./Footer.vue";
import LoginModal from "./Member/LoginModal.vue";
import Config from "@/js/config.js";

export default {
  data() {
    return {
      show_full: true,
      //login_flag: false,
      login_modal_flag: false,
    };
  },
  components: {
    ToolBar: ToolBar,
    NavFull: NavFull,
    HomeContents: HomeContents,
    Footer: Footer,
    LoginModal: LoginModal,
  },
  beforeCreate() {
    // this.$forceupdate;
  },
  created: function () {
    this.sessionCheck(); //sessionStorage에 저장된 user 값이 있는지 본다.

    this.$EventBus.$on("menuClick", this.menuClick);
    //this.$EventBus.$on('loginCheck', this.loginCheck);

    this.$EventBus.$on("login", this.login);
    this.$EventBus.$on("logout", this.logout);
  },
  beforeDestroy() {
    this.$EventBus.$off("menuClick");
    //this.$EventBus.$off('loginCheck');

    this.$EventBus.$off("login");
    this.$EventBus.$off("logout");

    this.logout();
  },
  computed: {
    login_flag() {
      if (this.$store.state.user) return true;
      else return false;
    },
  },
  methods: {
    menuClick: function (is_drawer) {
      console.log("Home menuClick", is_drawer);
      this.show_full = is_drawer;
    },
    //loginCheck: function(login_flag) {
    //  console.log('loginCheck');
    //  this.login_flag = login_flag;
    //},
    login(user) {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("set user.....");
        console.log(user);
        this.$store.commit("SET_USER", user);

        this.$EventBus.$emit("userLevelSet");

        setTimeout(() => {
          this.logout();
          //}, 1000*6)
        }, 1000 * 60 * 30);
      } else {
        this.login_modal_flag = true;
      }
    },
    logout() {
      sessionStorage.removeItem("user");
      this.$store.commit("REMOVE_USER");

      this.$EventBus.$emit("unsetMenu");

      this.$router.push({
        path: Config.home_url,
      });
    },
    sessionCheck() {
      const user = sessionStorage.getItem("user");
      if (user != "undefined" && user != null) {
        const parsedUser = JSON.parse(user);
        this.$store.commit("SET_USER", parsedUser);
      } else {
        this.login_modal_flag = true;
      }
    },
  },
};
</script>

<style scoped></style>
