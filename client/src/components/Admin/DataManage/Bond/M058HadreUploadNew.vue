<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>M058HADRE(NEW) (업로드) (대용량 데이터는 DB에 직접 업로드하시기 바랍니다.)</v-toolbar-title>
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
                              <th>F35254</th>
                              <th>F35255</th>
                              <th>F35258</th>
                              <th>F35259</th>
                              <th>F35260</th>
                              <th>F35261</th>
                              <th>F35262</th>
                              <th>F35263</th>
                              <th>F35264</th>
                              <th>F35265</th>
                              <th>F35256</th>
                              <th>F35257</th>
                              <th>F35266</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.F16013 }}</td>
                              <td>{{ item.F35254 }}</td>
                              <td>{{ item.F35255 }}</td>
                              <td>{{ item.F35258 }}</td>
                              <td>{{ item.F35259 }}</td>
                              <td>{{ item.F35260 }}</td>
                              <td>{{ item.F35261 }}</td>
                              <td>{{ item.F35262 }}</td>
                              <td>{{ item.F35263 }}</td>
                              <td>{{ item.F35264 }}</td>
                              <td>{{ item.F35265 }}</td>
                              <td>{{ item.F35256 }}</td>
                              <td>{{ item.F35257 }}</td>
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
            F35254 : "",
            F35255 : "",
            F35256 : "",
            F35257 : "",
            F35258 : "",
            F35259 : "",
            F35260 : "",
            F35261 : "",
            F35262 : "",
            F35263 : "",
            F35264 : "",
            F35265 : "",
            F35266 : "",
          };
          // console.log("------------------------------------");
          // console.log(toJson);
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(toJson[i])[j]] = (
              "" + toJson[i][Object.keys(toJson[i])[j]]
            ).trim();

            // console.log("["+j+"] " + Object.keys(toJson[i])[j]);
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
        .post(Config.base_url + "/api/datamanage/bond/m058hadrenew/excelupload", {
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
      
      tobj.F35258 = tobj.F35258.trim();
      switch(tobj.F35258) {
        case "Bond": 
          robj.F35258 = 0;
          break;
        case "ACT/360": 
          robj.F35258 = 1;
          break;
        case "ACT/365": 
          robj.F35258 = 2;
          break;
        case "ACT/365(ISDA)": 
          robj.F35258 = 3;
          break;
        case "Bond_EOM": 
          robj.F35258 = 4;
          break;
        default:
          robj.F35258 = 0;
      }

      tobj.F35259 = tobj.F35259.trim();
      switch(tobj.F35259) {
        case "NO_CHANGE": 
          robj.F35259 = 0;
          break;
        case "FOLLOWING": 
          robj.F35259 = 1;
          break;
        case "MD_FOLLOWING": 
          robj.F35259 = 2;
          break;
        case "PRECEDING": 
          robj.F35259 = 3;
          break;
        case "MD_PRECEDING": 
          robj.F35259 = 4;
          break;
        case "END_MONTH": 
          robj.F35259 = 5;
          break;
        default:
          robj.F35259 = 0;
      }

      tobj.F35260 = tobj.F35260.trim();
      switch(tobj.F35260) {
        case "ADJUSTED": 
          robj.F35260 = 0;
          break;
        case "UNADJUSTED": 
          robj.F35260 = 1;
          break;
        case "MAT_UNADJUSTED": 
          robj.F35260 = 2;
          break;
        default:
          robj.F35260 = 0;
      }

      tobj.F35262 = tobj.F35262.trim();
      switch(tobj.F35262) {
        case "CAL": 
          robj.F35262 = 0;
          break;
        case "BUS": 
          robj.F35262 = 1;
          break;
        default:
          robj.F35262 = 0;
      }

      tobj.F35263 = tobj.F35263.trim();
      switch(tobj.F35263) {
        case "NONE": 
          robj.F35263 = 0;
          break;
        case "SHORT_FIRST": 
          robj.F35263 = 1;
          break;
        case "LONG_FIRST": 
          robj.F35263 = 2;
          break;
        case "SHORT_LAST": 
          robj.F35263 = 3;
          break;
        case "LONG_LAST": 
          robj.F35263 = 4;
          break;
        case "FULL_COUPON": 
          robj.F35263 = 5;
          break;
        default:
          robj.F35263 = 0;
      }

      let tarr = tobj.F35265.split(":");
      robj.F35265 = Number(tarr[0]) * 10000 + Number(tarr[1]) * 100 + Number(tarr[2]);

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
