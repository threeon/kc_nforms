<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M058HADRE (조회)</v-toolbar-title>
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
                      v-model="jcode"
                      label="종목코드"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md1>
                    <v-btn color="primary" dark @click.stop="getList"
                      >조회</v-btn
                    >
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>F16013</th>
                              <th>HYBRID_FLAG</th>
                              <th>FLIPPER_FLAG</th>
                              <th>DAY_COUNT</th>
                              <th>B_DAY_COUNT</th>
                              <th>HOL_ADJUSTED</th>
                              <th>PER_LEG</th>
                              <th>CAL_BUS</th>
                              <th>STUB_RULE</th>
                              <th>MANUAL_PROCESSING</th>
                              <th>MP_TIME</th>
                              <th>EXCEPTION_FLAG</th>
                              <th>EXCEPTION_SPEC</th>
                              <th>P_CBO_FLAG</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.HYBRID_FLAG }}</td>
                              <td>{{ item.FLIPPER_FLAG }}</td>
                              <td>{{ item.DAY_COUNT }}</td>
                              <td>{{ item.B_DAY_COUNT }}</td>
                              <td>{{ item.HOL_ADJUSTED }}</td>
                              <td>{{ item.PER_LEG }}</td>
                              <td>{{ item.CAL_BUS }}</td>
                              <td>{{ item.STUB_RULE }}</td>
                              <td>{{ item.MANUAL_PROCESSING }}</td>
                              <td>{{ item.MP_TIME }}</td>
                              <td>{{ item.EXCEPTION_FLAG }}</td>
                              <td>{{ item.EXCEPTION_SPEC }}</td>
                              <td>{{ item.P_CBO_FLAG }}</td>
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
      jcode: "",
      itemList: [],
    };
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
  },
  mounted: function () {},
  methods: {
    getList: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      if(this.jcode.length != 12) {
        alert("종목코드 12자리를 입력해야 됩니다.")
        return;
      }
      axios
        .get(Config.base_url + "/api/datamanage/bond/m058hadre/getitemlist", {
          params: {
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
              // let item = {};
              // vm.itemList.push(item);
              vm.itemList.push(tList[i]);
            }
            // console.log(vm.itemList)
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
