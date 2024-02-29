<template>
  <div style="width:250px;text-align:right;font-size:12px !important;">
    <template v-if="user">
      <v-layout row wrap>
        <v-flex xs8>
          <b>ID:</b> {{ user.user_id }} | <b>Name:</b> {{ user.user_name }}<!-- | Level: {{ user.user_level }}-->
        </v-flex>
        <v-flex xs4 @click="dialog=true" class="clickable">
          <v-icon small>logout</v-icon>&nbsp;Logout
        </v-flex>
      </v-layout>

      <v-dialog
        v-model="dialog"
        max-width="250px"
        transition="dialog-transition"
      >
        <v-card class="logout-dialog">
          <v-card-text>
            로그아웃 하시겠습니까?
          </v-card-text>        
          <v-card-actions style="display:inline-block;">
            <v-btn flat small color="success" @click="logout">OK</v-btn>          
            <v-btn flat small color="warning" @click="dialog=false">Cancel</v-btn>          
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-else>
      <div @click="login">
        <v-icon small>login</v-icon>&nbsp;Login
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted: function() {
  },
  methods: {
    login() {
      this.$EventBus.$emit('login');
    },
    logout() {
      this.dialog = false;
      this.$EventBus.$emit("logout");
    },
  },
}
</script>

<style scoped>
.logout-dialog {
  position: fixed;
  width: 10%;
  left: 85%;
  top: 10%;
  transform: translate(-50%, -50%); /* 정중앙으로 이동 */
  width:250px;
  height:100px;
  text-align:center;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 12px !important;
  font-weight: bold;
}
</style>