<template>
  <v-app>
    <div id="app">
      <template v-if="$route.path == '/'">
        <v-btn @click="$router.push('/admintool')">ADMINTOOL</v-btn>
      </template>
      <template v-else>
        <router-view></router-view>
        <v-alert :type="alertType" :value="alertFlag" class="MMAlert">
          {{ alertMessage }}
        </v-alert>
        <v-progress-circular
          v-if="progressFlag"
          indeterminate
          style="
            position: absolute;
            top: 26%;
            left: 45%;
            z-index: 99;
            width: 12%;
            height: 5%;
          "
        ></v-progress-circular>
      </template>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      alertFlag: false,
      alertMessage: "AlertTest",
      alertType: "error",

      progressFlag: false,
    };
  },
  methods: {},
  created() {
    //this.$router.push("/admintool");
    this.progressFlag = false;
  },
  mounted() {
    this.$EventBus.$on("alert", this.alert);
    this.$EventBus.$on("progress", this.progress);
  },
  beforeDestroy() {
    this.$EventBus.$off("alert");
    this.$EventBus.$off("progress");
  },
  methods: {
    alert(message, type) {
      this.alertMessage = message;
      this.alertFlag = true;
      this.alertType = type || "error";
      var vm = this;
      setTimeout(() => {
        vm.alertFlag = false;
      }, 3000);
    },
    progress(flag) {
      this.progressFlag = flag;
    },
  },
};
</script>

<style>
.MMAlert {
  position: absolute;
  bottom: 0;
  left: 25%;
  z-index: 99;
  width: 50%;
}
</style>
