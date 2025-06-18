<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M058HADRE(NEW) (조회)</v-toolbar-title>
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
                              <th>F35254</th>
                              <th>F35255</th>
                              <th>F35256</th>
                              <th>F35257</th>
                              <th>F35258</th>
                              <th>F35259</th>
                              <th>F35260</th>
                              <th>F35261</th>
                              <th>F35262</th>
                              <th>F35263</th>
                              <th>F35264</th>
                              <th>F35265</th>
                              <th>F35266</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.F35254 }}</td>
                              <td>{{ item.F35255 }}</td>
                              <td>{{ item.F35256 }}</td>
                              <td>{{ item.F35257 }}</td>
                              <td>{{ item.F35258 }}</td>
                              <td>{{ item.F35259 }}</td>
                              <td>{{ item.F35260 }}</td>
                              <td>{{ item.F35261 }}</td>
                              <td>{{ item.F35262 }}</td>
                              <td>{{ item.F35263 }}</td>
                              <td>{{ item.F35264 }}</td>
                              <td>{{ item.F35265 }}</td>
                              <td>{{ item.F35266 }}</td>
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
        .get(Config.base_url + "/api/datamanage/bond/m058hadrenew/getitemlist", {
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
