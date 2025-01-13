<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>반도체지수 소급 (M203HBASED : 업로드)</v-toolbar-title>
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
                    <div class="text-center">
                      <input
                        type="file"
                        ref="selectExcel"
                        @change="selectExcel"
                      />
                    </div>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-btn color="primary" dark @click.stop="excelUpload"
                      >업로드
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
                              <th>일자</th>
                              <th>종목코드</th>
                              <th>F18025</th>
                              <th>F15009</th>
                              <th>F15010</th>
                              <th>F15011</th>
                              <th>F15001</th>
                              <th>F15015</th>
                              <th>F15472</th>
                              <th>F15004</th>
                              <th>F15006</th>
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
                              <td>{{ item.F15015 }}</td>
                              <td>{{ item.F15472 }}</td>
                              <td>{{ item.F15004 }}</td>
                              <td>{{ item.F15006 }}</td>
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
  mounted: function () {},
  methods: {
    selectExcel: function () {
      const xlsx = require("xlsx");
      let vm = this;
      vm.itemList = [];
      const fileInfo = this.$refs.selectExcel.files[0];

      let reader = new FileReader();

      reader.onload = function () {
        const fileData = reader.result;
        const wb = xlsx.read(fileData, { type: "binary" });

        // sheet 개수 반복문
        // wb.SheetNames.forEach(function(sheetName) {
        //   const rowObj = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        //   console.log(JSON.stringify(rowObj));
        // });

        // sheet1만 사용
        const toJson = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        for (let i = 0; i < toJson.length; i++) {
          let tobj = {
            F16013: "",
            F12506: "",
            F18025: "",
            F15009: "",
            F15010: "",
            F15011: "",
            F15001: "",
            F15015: "",
            F15472: "",
            F15004: "",
            F15006: "",
          };
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(tobj)[j]] = (
              "" + toJson[i][Object.keys(tobj)[j]]
            ).trim();
          }
          console.log(tobj);
          vm.itemList.push(tobj);
          // console.log(tobj);
          // if (i == 3) break;
        }
        // 300건에 1분 정도 소요
        vm.insertTime = Math.round(vm.itemList.length / 300);
      };

      reader.readAsBinaryString(fileInfo);
      // console.log(vm.itemList);
    },
    excelUpload: function () {
      let vm = this;
      axios
        .post(Config.base_url + "/api/datamanage/semiindex/excelupload", {
          itemList: vm.itemList,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("소급을 완료하였습니다.");
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
