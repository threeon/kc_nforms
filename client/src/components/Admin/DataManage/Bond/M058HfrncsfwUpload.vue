<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M058HFRNCSFW (업로드)</v-toolbar-title>
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
                              <th>F16013</th>
                              <th>INT_DIV</th>
                              <th>FIX_DIV</th>
                              <th>RESET_DATE</th>
                              <th>START_DATE</th>
                              <th>END_DATE</th>
                              <th>PAYMENT_DATE</th>
                              <th>OB_RATE</th>
                              <th>SPREAD</th>
                              <th>RATE</th>
                              <th>CF</th>
                              <th>REF_RATE_1</th>
                              <th>REF_RATE_2</th>
                              <th>F33867</th>
                              <th>F16455</th>
                              <th>F34648</th>
                              <th>F34649</th>
                              <th>F34650</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.INT_DIV }}</td>
                              <td>{{ item.FIX_DIV }}</td>
                              <td>{{ item.RESET_DATE }}</td>
                              <td>{{ item.START_DATE }}</td>
                              <td>{{ item.END_DATE }}</td>
                              <td>{{ item.PAYMENT_DATE }}</td>
                              <td>{{ item.OB_RATE }}</td>
                              <td>{{ item.SPREAD }}</td>
                              <td>{{ item.RATE }}</td>
                              <td>{{ item.CF }}</td>
                              <td>{{ item.REF_RATE_1 }}</td>
                              <td>{{ item.REF_RATE_2 }}</td>
                              <td>{{ item.F33867 }}</td>
                              <td>{{ item.F16455 }}</td>
                              <td>{{ item.F34648 }}</td>
                              <td>{{ item.F34649 }}</td>
                              <td>{{ item.F34650 }}</td>
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
        const toJson = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          // cellDates: true,
          raw: false,
          // dateNF: "yyyy/mm/dd"
        });
        for (let i = 0; i < toJson.length; i++) {
          let tobj = {
            F16013 : "",
            INT_DIV : "",
            FIX_DIV : "",
            RESET_DATE : "",
            START_DATE : "",
            END_DATE : "",
            PAYMENT_DATE : "",
            OB_RATE : "",
            SPREAD : "",
            RATE : "",
            CF : "",
            REF_RATE_1 : "",
            REF_RATE_2 : "",
            F33867 : "",
            F16455 : "",
            F34648 : "",
            F34649 : "",
            F34650 : "",
          };
          // console.log(toJson);
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(toJson[i])[j]] = (
              "" + toJson[i][Object.keys(toJson[i])[j]]
            ).trim();

            // console.log("["+j+"] " + Object.keys(tobj)[j]);
            // console.log("["+j+"] " + toJson[i][Object.keys(toJson[i])[j]]);
          }
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
        .post(Config.base_url + "/api/datamanage/bond/m058hfrncsfw/excelupload", {
          itemList: vm.itemList,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("M058HFRNCSFW 소급을 완료하였습니다.");
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
