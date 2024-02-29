<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>ETF 분류 데이터 조회</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th style="width: 10%">분류코드</th>
                              <th style="width: 10%">분류명</th>
                              <th style="width: 10%">소속종목갯수</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in itemList"
                              :key="index"
                              @click="ctgClick(item)"
                            >
                              <td>{{ item.ctg_large_code }}</td>
                              <td>{{ item.ctg_large_name }}</td>
                              <td>{{ item.jnum }}</td>
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
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table1">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th style="width: 10%">분류코드</th>
                              <th style="width: 10%">분류명</th>
                              <th style="width: 10%">평균총보수율</th>
                              <th style="width: 10%">평균TER</th>
                              <th style="width: 10%">평균실부담비율</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ avgVal.ctg_large_code }}</td>
                              <td>{{ avgVal.ctg_large_name }}</td>
                              <td>{{ avgVal.F34763 }}</td>
                              <td>{{ avgVal.F35190 }}</td>
                              <td>{{ avgVal.F35192 }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th style="width: 3%">No.</th>
                              <th style="width: 10%">표준코드</th>
                              <th style="width: 10%">단축코드</th>
                              <th style="width: 10%">종목명</th>
                              <th style="width: 10%">총보수율</th>
                              <th style="width: 10%">TER</th>
                              <th style="width: 10%">실부담비율</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in etfList" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ item.F16012 }}</td>
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.F16002 }}</td>
                              <td>{{ item.F34763 }}</td>
                              <td>{{ item.F35190 }}</td>
                              <td>{{ item.F35192 }}</td>
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
      etfList: [],
      avgVal: {},
    };
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
    this.getList();
  },
  mounted: function () {},
  methods: {
    getList: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/etp/etfctginfo", {
          params: {},
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            let tList = response.data.results;
            vm.itemList = tList;
            vm.ctgClick(tList[0]);
          }
        });
    },
    ctgClick: function (item) {
      let vm = this;

      vm.avgVal = {};
      vm.etfList = [];

      // console.log("getList");
      vm.avgVal.ctg_large_code = item.ctg_large_code;
      vm.avgVal.ctg_large_name = item.ctg_large_name;
      vm.avgVal.F34763 = 0.0;
      vm.avgVal.F35190 = 0.0;
      vm.avgVal.F35192 = 0.0;
      axios
        .get(Config.base_url + "/etp/etfbyctgcode", {
          params: item,
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            let tList = response.data.results;
            let sumF34763 = 0.0;
            let sumF35190 = 0.0;
            let sumF35192 = 0.0;

            for (let i = 0; i < tList.length; i++) {
              sumF34763 += Number(tList[i].F34763);
              sumF35190 += Number(tList[i].F35190);
              sumF35192 += Number(tList[i].F35192);
            }
            vm.avgVal.F34763 = (sumF34763 / tList.length).toFixed(4);
            vm.avgVal.F35190 = (sumF35190 / tList.length).toFixed(4);
            vm.avgVal.F35192 = (sumF35192 / tList.length).toFixed(4);
            vm.etfList = tList;
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
  height: 310px;
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
