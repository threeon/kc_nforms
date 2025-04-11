<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Global ETF 종목 개요 수정</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="editedItem.MSTARID"
                label="MSTARID"
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="editedItem.INVSTRG_ENG"
                label="INVSTRG_ENG"
                row="10"
                readonly
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="editedItem.INVSTRG_KOR"
                label="INVSTRG_KOR"
                row="10"
              ></v-textarea>
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
        MSTARID: "",
        INVSTRG_ENG: "",
        INVSTRG_KOR: "",
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
    update: function () {
      let vm = this;
      axios
        .post(Config.base_url + "/api/datamanage/globaletfdesc/updateitem", vm.editedItem)
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("Global ETF 종목 개요 수정을 완료하였습니다.");
            // props 수정
            vm.tItem.ncd = vm.editedItem.ncd;
            vm.close(0);
          }
        });
    },
    close: function (reloadFlag) {
      var vm = this;
      vm.$emit("close", reloadFlag);
      vm.dialog = false;
    },
  },
};
</script>

