<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>RIC CHANGE 데이터 조회</v-toolbar-title>
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
                  <v-flex xs12 md4>
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
                              <th style="width: 10%">국가</th>
                              <th style="width: 20%">RECODE DATE</th>
                              <th style="width: 20%">RIC</th>
                              <th style="width: 20%">OLD VALUE</th>
                              <th style="width: 30%">SOURCE</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.nation_code }}</td>
                              <td>{{ item.recode_date }}</td>
                              <td>{{ item.ric }}</td>
                              <td>{{ item.old_value }}</td>
                              <td>{{ item.source }}</td>
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
      sdate: "",
      edate: "",
      itemList: [],
    };
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
    this.edate = Util.getToday();
    this.sdate = Util.getBef1Week();
    // console.log(this.sdate, this.edate);
    this.getList();
  },
  mounted: function () {},
  methods: {
    getList: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/api/datamanage/getricchange", {
          params: {
            sdate: vm.sdate,
            edate: vm.edate,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            let tList = response.data.results;

            for (let i = 0; i < tList.length; i++) {
              let item = {};
              item.nation_code = tList[i].NATIONCODE;
              item.recode_date = tList[i].RECODEDATE;
              item.ric = tList[i].RIC;
              item.old_value = tList[i].OLDVALUE;
              item.source = tList[i].SOURCE;
              vm.itemList.push(item);
            }
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
