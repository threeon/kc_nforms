<template>
<v-dialog v-model="loginDialog" persistent max-width="400px">
    <v-btn slot="activator" outline color="primary" dark>Login</v-btn>
    <v-card>
      <v-card-title primary-title>
      </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <v-flex xs12>
                <v-text-field label="ID" v-model="user_id" ref="user_id"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Password" type="password" v-model="password" @keyup.enter="loginCheck"></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="loginCheck">LOGIN</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</template>

<script>
import Config       from "@/js/config.js"
import Constant from "@/store/store_constant.js"

export default {
  data() {
    return {
        loginDialog: true,
        //user_id: Config.env=='dev' ? "ahnadmin" : '',
        //password: Config.env=='dev' ? "1111" : '',
        user_id: '',
        password: '',
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      this.$refs.user_id.$el.querySelector('input').focus();
    });
    //if(Config.env=='dev') this.loginCheck(); //개발환경에서만 자동 로그인
  },
  methods: {
    loginCheck: function() {
      var vm = this;

      axios.post(Config.base_url+'/admin/login', {
        "user_id" : vm.user_id,
        "password" : vm.password,
      }).then(function(response) {
        if(response.data.success == false){
            alert(response.data.message);
            return;
        }
        vm.loginDialog = false;

        const { user_id, user_name, user_level } = response.data.results[0];
        const user = { user_id, user_name, user_level };
        vm.$EventBus.$emit("login", user);
      });
    }
  }
}
</script>

<style scoped>

</style>