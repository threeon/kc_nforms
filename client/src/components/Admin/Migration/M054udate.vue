<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M054UDATE --> dp_bond_m054udate (체권 입회일 정보)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md4>
                    <v-btn color="primary" dark @click.stop="doMigration"
                      >이관
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12>
                    <div>
                      (* 총
                      <span style="color: red">{{ itemList.length }} </span>건이
                      선택되었습니다. 업로드시 {{ insertTime }} 분 정도
                      소요됩니다.)
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>TRADE_DATE</th>
                              <th>TIME_TYPE</th>
                              <th>DAY_TYPE</th>
                              <th>DATE_TYPE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.tradeDate }}</td>
                              <td>{{ item.timeType }}</td>
                              <td>{{ item.dayType }}</td>
                              <td>{{ item.dateType }}</td>
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
  </div>
</template>

<script>
import Config from "@/js/config.js";
import Util from "@/js/util.js";
export default {
  data() {
    return {
      itemList: [],
      insertTime: 0,
    };
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
    // this.edate = Util.getToday();
    // this.sdate = Util.getBef1Week();
    // console.log(this.sdate, this.edate);
  },
  mounted: function () {
    this.selectData();
  },
  methods: {
    selectData: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/api/migration/m054udate/getData", {
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
              item.tradeDate = tList[i].tradeDate;
              item.timeType = tList[i].timeType;
              item.dayType = tList[i].dayType;
              item.dateType = tList[i].dateType;
              vm.itemList.push(item);
              // console.log(item);
            }
          }
        });
    },
    doMigration: function () {
      let vm = this;
      axios
        .post(Config.base_url + "/api/migration/m054udate/doMigration", {
          itemList: vm.itemList,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("이관을 완료하였습니다.");
          }
        });
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
  height: 700px;
  overflow-y: auto;
}

#totalmenu_table .table_container {
  height: 400px;
  overflow-y: auto;
}

#total_new_table .table_container {
  height: 500px;
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
  padding: 4px;
  text-align: center;
}
table td {
  border: 1px solid #444444;
  padding: 4px;
  text-align: center;
}
table tr:hover {
  background: #fbf8e9;
}
</style>
