<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">반도체지수(M203UBASEDIN :수정)</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F16013"
                label="F16013(Read Only)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F12506"
                label="F12506"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15009"
                label="F15009(시가)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15010"
                label="F15010(고가)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15011"
                label="F15011(저가)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15001"
                label="F15001(현재가)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15015"
                label="F15015(거래량)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15472"
                label="F15472(대비)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15004"
                label="F15004(등락률)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F15006"
                label="F15006(등락구분코드)"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-1" flat @click="update">수정</v-btn>
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
    console.log(this.oldItem);
    this.editedItem = this.oldItem;
  },
  methods: {
    update: function () {
      let vm = this;
      axios
        .post(
          Config.base_url + "/api/datamanage/semiin/updateitem",
          vm.editedItem
        )
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("정보 수정을 완료하였습니다.");
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
