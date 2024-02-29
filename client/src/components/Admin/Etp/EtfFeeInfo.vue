<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>ETF 총보수 비용 비율 데이터 조회</v-toolbar-title>
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
                              <th style="width: 10%">단축코드</th>
                              <th style="width: 10%">한글종목명</th>
                              <th style="width: 10%">국제표준코드</th>
                              <th style="width: 10%">분류코드</th>
                              <th style="width: 10%">총보수율</th>
                              <th style="width: 10%">총보수비용비율(TER)</th>
                              <th style="width: 10%">실부담비율</th>
                              <th style="width: 10%">평균총보수율</th>
                              <th style="width: 10%">
                                평균총보수비용비율(TER)
                              </th>
                              <th style="width: 10%">평균실부담비율</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.SIMPLE_CODE }}</td>
                              <td>{{ item.ETF_NAME }}</td>
                              <td>{{ item.ISIN_CODE }}</td>
                              <td>{{ item.CTG_LARGE_CODE }}</td>
                              <td>{{ item.FEE_RATE }}</td>
                              <td>{{ item.TER_RATE }}</td>
                              <td>{{ item.REAL_RATE }}</td>
                              <td>{{ item.AVG_FEE_RATE }}</td>
                              <td>{{ item.AVG_TER_RATE }}</td>
                              <td>{{ item.AVG_REAL_RATE }}</td>
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
        .get(Config.base_url + "/etp/etffeeinfo", {
          params: {},
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            let tList = response.data.results;
            vm.itemList = tList;
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
