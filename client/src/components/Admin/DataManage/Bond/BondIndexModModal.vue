<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">채권지수 정보 수정</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs6>
              <v-text-field
                v-model="editedItem.F12506"
                label="F12506(Read Only)"
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="editedItem.F16013"
                label="F16013(Read Only)"
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30792"
                label="F30792"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30791"
                label="F30791"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30925"
                label="F30925"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30646"
                label="F30646"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30927"
                label="F30927"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F16188"
                label="F16188"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30797"
                label="F30797"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30798"
                label="F30798"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30799"
                label="F30799"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F30923"
                label="F30923"
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
        <v-btn color="black darken-1" flat @click="close">취소</v-btn>
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
      editedItem: {},
    };
  },
  computed: {},
  components: {},
  created: function () {},
  beforeDestroy() {},
  mounted: function () {
    this.dialog = true;
    this.editedItem = this.oldItem;
  },
  methods: {
    update: function () {
      let vm = this;
      axios
        .post(
          Config.base_url + "/api/datamanage/bondindex/updateitem",
          vm.editedItem
        )
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("채권지수 정보 수정을 완료하였습니다.");
            vm.close();
          }
        });
    },
    close: function () {
      var vm = this;
      vm.$emit("close");
      vm.dialog = false;
    },
  },
};
</script>
<style scoped></style>
