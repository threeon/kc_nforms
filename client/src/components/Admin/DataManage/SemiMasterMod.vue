<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>반도체지수 마스터(M203HREFE :수정)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md1>
                    <v-btn color="primary" dark @click.stop="getList"
                      >조회</v-btn
                    >
                  </v-flex>
                  <v-flex xs12 md1>
                    <v-btn color="orange" dark @click.stop="newItem"
                      >추가</v-btn
                    >
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 md12>
                    <span style="color: red">
                      [일자] 클릭하면 날짜순으로 재정렬 (1초 소요 /
                      1000건당)</span
                    >
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr style="cursor: pointer" @click="reOrder()">
                              <th>F16013</th>
                              <th>F16288</th>
                              <th>F16542</th>
                              <th>F16002</th>
                              <th>UPDATE</th>
                              <th>DELETE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.F16288 }}</td>
                              <td>{{ item.F16542 }}</td>
                              <td>{{ item.F16002 }}</td>
                              <td>
                                <v-icon @click="updateItem(item, index)">
                                  edit
                                </v-icon>
                              </td>
                              <td>
                                <v-icon @click="deleteItem(item, index)">
                                  delete
                                </v-icon>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <UpdateModal
      v-if="updateFlag"
      :oldItem="editedItem"
      @close="close"
    ></UpdateModal>
  </div>
</template>

<script>
import Config from "@/js/config.js";
import Util from "@/js/util.js";
import UpdateModal from "./SemiMasterModModal.vue";

export default {
  data() {
    return {
      itemList: [],
      updateFlag: false,
      editedItem: {},
    };
  },
  watch: {},
  computed: {},
  components: {
    UpdateModal,
  },
  created: function () {
  },
  mounted: function () {},
  methods: {
    newItem: function () {
      this.editedItem = {
        F16013: "",
        F16288: "SEM",
        F16542: "",
        F16002: "",
      };
      this.updateFlag = true;
      console.log(this.editedItem);
    },
    updateItem: function (item) {
      // console.log(this.editedItem);
      this.editedItem = item;
      this.updateFlag = true;
    },
    deleteItem: function (item) {
      let vm = this;
      axios
        .post(
          Config.base_url + "/api/datamanage/semimaster/deleteitem",
          item
        )
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("정보 삭제를 완료하였습니다.");
            vm.close();
          }
        });
    },
    getList: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/api/datamanage/semimaster/getitemlist", {
          params: {
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else if (response.data.results.length == 0) {
            alert("해당 조건의 데이터가 존재하지 않습니다.");
          } else {
            let tList = response.data.results;

            for (let i = 0; i < tList.length; i++) {
              let item = {};
              item.F16013 = tList[i].f16013;
              item.F16288 = tList[i].f16288;
              item.F16542 = tList[i].f16542;
              item.F16002 = tList[i].f16002;
              vm.itemList.push(item);
              // console.log(item);
            }
          }
        });
    },
    reOrder: function () {
      // console.log("reOrder........");
      let tlist = [];
      tlist = JSON.parse(JSON.stringify(this.itemList));
      this.itemList = [];
      tlist = tlist.reverse();
      this.itemList = tlist;
    },
    close: function () {
      this.updateFlag = false;
      // console.log(this.editedItem);
    },
  },
};
</script>

<style scoped>
.v-card__title {
  margin-bottom: 0;
  padding-bottom: 0;
}

.v-card__text .container {
  margin-top: 0;
  padding-top: 0;
}

#favorite_table .table_container {
  height: 600px;
  overflow-y: auto;
}

.table_wrapper {
  border: 1px solid #444444;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-style: hidden;
}
table th {
  border: 1px solid #444444;
  background: #eee;
  padding: 8px !important;
  text-align: center;
}
table td {
  border: 1px solid #444444;
  text-align: center;
}
table td.title1 {
  padding-left: 10px !important;
  text-align: left;
}
table tr:hover {
  background: #fbf8e9;
}
</style>
