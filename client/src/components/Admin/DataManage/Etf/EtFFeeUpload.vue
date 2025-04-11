<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>ETF 비용 데이터 (M001_SKSETFEXPNINFO : 업로드)</v-toolbar-title>
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
                              <th>CA적용일자</th>
                              <th>ETF단축코드</th>
                              <th>협회ISIN</th>
                              <th>운용보수</th>
                              <th>판매보수</th>
                              <th>수탁보수</th>
                              <th>사무관리보수</th>
                              <th>보수합계</th>
                              <th>기타비용</th>
                              <th>총보수비용비율</th>
                              <th>매매중개수수료율</th>
                              <th>투자자부담보수비용</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.TRADE_DATE }}</td>
                              <td>{{ item.ISU_SRT_CD }}</td>
                              <td>{{ item.KOFIA_ISIN }}</td>
                              <td>{{ item.OPR_FEE }}</td>
                              <td>{{ item.SALES_FEE }}</td>
                              <td>{{ item.ENTRUST_FEE }}</td>
                              <td>{{ item.MANANGE_FEE }}</td>
                              <td>{{ item.SUM }}</td>
                              <td>{{ item.ETC_FEE }}</td>
                              <td>{{ item.TER }}</td>
                              <td>{{ item.BROKERAGE_FEE }}</td>
                              <td>{{ item.TOTAL_FEE }}</td>
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
        // console.log(toJson)
        for (let i = 0; i < toJson.length; i++) {
          let tobj = {
            TRADE_DATE: "",
            ISU_SRT_CD: "",
            KOFIA_ISIN: "",
            OPR_FEE: "",
            SALES_FEE: "",
            ENTRUST_FEE: "",
            MANANGE_FEE: "",
            SUM: "",
            ETC_FEE: "",
            TER: "",
            BROKERAGE_FEE: "",
            TOTAL_FEE: "",
          };
          // console.log(toJson[i])
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(tobj)[j]] = (
              "" + toJson[i][Object.keys(tobj)[j]]
            ).trim();
          }

          tobj.TOTAL_FEE = Math.round(tobj.TOTAL_FEE * 10000) / 10000;
          // console.log(tobj);
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
      alert("300건당 1분 정도 소요됩니다.\n[확인]을 누르고 메시지가 나올때까지 기다려주세요.");
      axios
        .post(Config.base_url + "/api/datamanage/etffee/excelupload", {
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
