<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">반도체지수 정보 수정</span>
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
                v-model="editedItem.F16288"
                label="F16288"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F16542"
                label="F16542(DRAM/NAND)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editedItem.F16002"
                label="F16002(종목명)"
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
    // console.log(this.oldItem);
    this.editedItem = this.oldItem;
  },
  methods: {
    update: function () {
      let vm = this;
      axios
        .post(
          Config.base_url + "/api/datamanage/semimaster/updateitem",
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
