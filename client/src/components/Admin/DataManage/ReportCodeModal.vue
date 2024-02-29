<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">리포트 종목 연동 정보 수정</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="editedItem.code"
                label="CODE"
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="editedItem.title"
                label="TITLE"
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="editedItem.ncd"
                label="연동 종목코드"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-1" flat @click="update">수정</v-btn>
        <!--
        <v-btn color="blue darken-1" flat @click="insert">복수종목 추가</v-btn>
        -->
        <v-btn color="black darken-1" flat @click="close(0)">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Config from "@/js/config.js";

export default {
  props: ["oldItem"],
  data() {
    return {
      dialog: false,
      editedItem: {
        inst_cd: "",
        user_name: "",
        user_ip: "",
        auth_key: "",
      },
    };
  },
  computed: {},
  components: {},
  created: function () {},
  beforeDestroy() {},
  mounted: function () {
    this.dialog = true;
    this.editedItem = { ...this.oldItem };
    this.tItem = this.oldItem;
  },
  methods: {
    checkForm: function (item) {
      if (item.ncd.length > 6) {
        alert("연동 종목코드는 6자리를 초과할 수 없습니다.");
        return false;
      }
    },
    checkForm1: function (item) {
      if (item.ncd.length > 6) {
        alert("연동 종목코드는 6자리를 초과할 수 없습니다.");
        return false;
      } else if (item.ncd.length == 0) {
        alert("복수종묵 추가는 문자열이 있어야 됩니다.");
        return false;
      }
    },
    update: function () {
      let vm = this;
      if (this.checkForm(this.editedItem) == false) return;

      if (this.editedItem.ncd == "") this.editedItem.oper = "delete";
      else {
        if (this.oldItem.ncd == "") this.editedItem.oper = "insert";
        else this.editedItem.oper = "update";
      }

      axios
        .post(Config.base_url + "/api/datamanage/operreportcode", vm.editedItem)
        .then(function (response) {
          console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("리포트 종목연동 정보 수정을 완료하였습니다.");
            // props 수정
            vm.tItem.ncd = vm.editedItem.ncd;
            vm.close(0);
          }
        });
    },
    /*
    insert: function () {
      let vm = this;
      if (this.checkForm1(this.editedItem) == false) return;

      this.editedItem.oper = "insert";

      axios
        .post(Config.base_url + "/api/datamanage/operreportcode", vm.editedItem)
        .then(function (response) {
          console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("리포트 종목연동 정보 수정을 완료하였습니다.");
            vm.close(1);
          }
        });
    },
    */
    close: function (reloadFlag) {
      var vm = this;
      vm.$emit("close", reloadFlag);
      vm.dialog = false;
    },
  },
};
</script>
<style scoped></style>
