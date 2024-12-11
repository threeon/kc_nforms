<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>세계지수 소급 (M193HBASED :수정)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md2>
                    <v-text-field
                      v-model="sdate"
                      label="시작일자"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-text-field v-model="edate" label="끝일자"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-text-field
                      v-model="jcode"
                      label="종목코드"
                    ></v-text-field>
                  </v-flex>
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
                              <th>일자</th>
                              <th>종목코드</th>
                              <th>F18025</th>
                              <th>F15009</th>
                              <th>F15010</th>
                              <th>F15011</th>
                              <th>F15001</th>
                              <th>F15472</th>
                              <th>F15004</th>
                              <th>F15006</th>
                              <th>UPDATE</th>
                              <th>DELETE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F12506 }}</td>
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.F18025 }}</td>
                              <td>{{ item.F15009 }}</td>
                              <td>{{ item.F15010 }}</td>
                              <td>{{ item.F15011 }}</td>
                              <td>{{ item.F15001 }}</td>
                              <td>{{ item.F15472 }}</td>
                              <td>{{ item.F15004 }}</td>
                              <td>{{ item.F15006 }}</td>
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
import UpdateModal from "./WorldIndexModModal.vue";

export default {
  data() {
    return {
      sdate: "",
      edate: "",
      jcode: ".IRTS",
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
    this.edate = Util.getToday();
    // default : 1년전
    this.sdate = Util.getBefYears(1);
    // console.log(this.sdate, this.edate);
    // this.getList();
  },
  mounted: function () {},
  methods: {
    newItem: function () {
      // console.log(this.editedItem);
      console.log(this.jcode)
      this.editedItem = {
        F16013: this.jcode,
        F12506: "",
        F18025: "",
        F15009: "",
        F15010: "",
        F15011: "",
        F15001: "",
        F15472: "",
        F15004: "",
        F15006: "",

      };
      this.updateFlag = true;
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
          Config.base_url + "/api/datamanage/worldindex/deleteitem",
          vm.editedItem
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
        .get(Config.base_url + "/api/datamanage/worldindex/getitemlist", {
          params: {
            sdate: vm.sdate,
            edate: vm.edate,
            jcode: vm.jcode,
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
              item.F12506 = tList[i].f12506;
              item.F16013 = tList[i].f16013;
              item.F18025 = tList[i].f18025;
              item.F15009 = tList[i].f15009;
              item.F15010 = tList[i].f15010;
              item.F15011 = tList[i].f15011;
              item.F15001 = tList[i].f15001;
              item.F15472 = tList[i].f15472;
              item.F15004 = tList[i].f15004;
              item.F15006 = tList[i].f15006;
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
