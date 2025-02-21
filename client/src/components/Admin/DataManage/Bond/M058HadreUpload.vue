<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M058HADRE (업로드) (대용량 데이터는 DB에 직접 업로드하시기 바랍니다.)</v-toolbar-title>
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
          cellDates: true,
          raw: false,
        });
        for (let i = 0; i < toJson.length; i++) {
          let tobj = {
            F16013 : "",
            HYBRID_FLAG : "",
            FLIPPER_FLAG : "",
            DAY_COUNT : "",
            B_DAY_COUNT : "",
            HOL_ADJUSTED : "",
            PER_LEG : "",
            CAL_BUS : "",
            STUB_RULE : "",
            MANUAL_PROCESSING : "",
            MP_TIME : "",
            EXCEPTION_FLAG : "",
            EXCEPTION_SPEC : "",
            P_CBO_FLAG : "",
          };
          // console.log(toJson);
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(tobj)[j]] = (
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
      let tList = [];

      console.log(vm.itemList);
      for(let i=0; i < vm.itemList.length; i++) {
        let robj = this.convRecord(vm.itemList[i])
        tList.push(robj);
      }
      // console.log(tList);
      axios
        .post(Config.base_url + "/api/datamanage/bond/m058hadre/excelupload", {
          itemList: tList,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("M058HADRE 소급을 완료하였습니다.");
          }
        });
    },

    convRecord: function(tobj) {
      let robj = {...tobj};
      // let robj = {};
      
      tobj.DAY_COUNT = tobj.DAY_COUNT.trim();
      switch(tobj.DAY_COUNT) {
        case "Bond": 
          robj.DAY_COUNT = 0;
          break;
        case "ACT/360": 
          robj.DAY_COUNT = 1;
          break;
        case "ACT/365": 
          robj.DAY_COUNT = 2;
          break;
        case "ACT/365(ISDA)": 
          robj.DAY_COUNT = 3;
          break;
        case "Bond_EOM": 
          robj.DAY_COUNT = 4;
          break;
        default:
          robj.DAY_COUNT = 0;
      }

      tobj.B_DAY_COUNT = tobj.B_DAY_COUNT.trim();
      switch(tobj.B_DAY_COUNT) {
        case "NO_CHANGE": 
          robj.B_DAY_COUNT = 0;
          break;
        case "FOLLOWING": 
          robj.B_DAY_COUNT = 1;
          break;
        case "MD_FOLLOWING": 
          robj.B_DAY_COUNT = 2;
          break;
        case "PRECEDING": 
          robj.B_DAY_COUNT = 3;
          break;
        case "MD_PRECEDING": 
          robj.B_DAY_COUNT = 4;
          break;
        case "END_MONTH": 
          robj.B_DAY_COUNT = 5;
          break;
        default:
          robj.B_DAY_COUNT = 0;
      }

      tobj.HOL_ADJUSTED = tobj.HOL_ADJUSTED.trim();
      switch(tobj.HOL_ADJUSTED) {
        case "ADJUSTED": 
          robj.HOL_ADJUSTED = 0;
          break;
        case "UNADJUSTED": 
          robj.HOL_ADJUSTED = 1;
          break;
        case "MAT_UNADJUSTED": 
          robj.HOL_ADJUSTED = 2;
          break;
        default:
          robj.HOL_ADJUSTED = 0;
      }

      tobj.CAL_BUS = tobj.CAL_BUS.trim();
      switch(tobj.CAL_BUS) {
        case "CAL": 
          robj.CAL_BUS = 0;
          break;
        case "BUS": 
          robj.CAL_BUS = 1;
          break;
        default:
          robj.CAL_BUS = 0;
      }

      tobj.STUB_RULE = tobj.STUB_RULE.trim();
      switch(tobj.STUB_RULE) {
        case "NONE": 
          robj.STUB_RULE = 0;
          break;
        case "SHORT_FIRST": 
          robj.STUB_RULE = 1;
          break;
        case "LONG_FIRST": 
          robj.STUB_RULE = 2;
          break;
        case "SHORT_LAST": 
          robj.STUB_RULE = 3;
          break;
        case "LONG_LAST": 
          robj.STUB_RULE = 4;
          break;
        case "FULL_COUPON": 
          robj.STUB_RULE = 5;
          break;
        default:
          robj.STUB_RULE = 0;
      }

      let tarr = tobj.MP_TIME.split(":");
      robj.MP_TIME = Number(tarr[0]) * 10000 + Number(tarr[1]) * 100 + Number(tarr[2]);

      return robj;

    }
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
