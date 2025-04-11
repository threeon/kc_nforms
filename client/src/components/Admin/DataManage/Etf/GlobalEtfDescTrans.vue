<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Global ETF Description 수동 번역 (HDB: M169UMSOPER_INVSTRG)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs2>
                    <v-btn color="primary" dark @click.stop="getList"
                      >조회(번역대상종목)</v-btn
                    >
                  </v-flex>
                  <v-flex xs2>
                    <v-btn color="green" dark @click.stop="translate"
                      >번역 및 업로드</v-btn
                    >
                  </v-flex>
                  <!--
                  <v-flex xs2>
                    <v-btn color="green" dark @click.stop="excelDownload"
                      >엑셀 다운로드</v-btn
                    >
                  </v-flex>
                  <v-flex xs2>
                    <v-btn color="warning" dark @click.stop="excelUpload"
                      >엑셀 업로드</v-btn
                    >
                  </v-flex>
                  <v-flex xs6>
                    <div class="text-center">
                      <input
                        type="file"
                        ref="selectExcel"
                        @change="selectExcel"
                      />
                    </div>
                  </v-flex>
-->
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 md12>
                    <span style="color: green">
                      [ ( M169UMSOPER )테이블의 INVSTRG와 ( M169UMSOPER_INVSTRG )테이블의 INVSTRG_ENG 가 다르거나 INVSTRG_KOR 가 없는 항목 표시함.]</span
                    > 
                    <br>
                    <span style="color: green">
                      [ '-', '?' 등 특수문자는 Altibase-DB 인코딩 문제로 입력되지 않을 수 있슴. DB 담당자에게 수작업으로 요청.]</span
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
                              <th style="width: 2%">SEQ</th>
                              <th style="width: 5%">MSTARID</th>
                              <th>INVSTRG</th>
                              <th>INVSTRG_ENG</th>
                              <th>INVSTRG_KOR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.seq }}</td>
                              <td>{{ item.MSTARID }}</td>
                              <td>{{ item.INVSTRG }}</td>
                              <td>{{ item.INVSTRG_ENG }}</td>
                              <td>{{ item.INVSTRG_KOR }}</td>
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
      uItemList: [],
      itemList: [],
      temList: [],
    };
  },
  watch: {},
  computed: {},
  components: {
  },
  created: function () {
    // console.log(this.sdate, this.edate);
    this.getList();
  },
  mounted: function () {},
  methods: {
    getList: function () {
      let vm = this;

      vm.itemList = [];
      console.log("getList");
      axios
        .get(Config.base_url + "/api/datamanage/globaletfdesc/gettransitemlist", {
          params: {
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          }else if(response.data.results.length == 0){
            alert("데이터가 없습니다.")
          } else {
            let tList = response.data.results;
            // console.log(tList);

            for (let i = 0; i < tList.length; i++) {
              let item = {};
              item.seq = i + 1;
              item.MSTARID = tList[i].MSTARID;
              item.INVSTRG = tList[i].INVSTRG;
              item.INVSTRG_ENG = tList[i].INVSTRG_ENG;
              item.INVSTRG_KOR = tList[i].INVSTRG_KOR;

              console.log(item);
              if(item.INVSTRG_ENG == undefined || item.INVSTRG_KOR == undefined) {

              }else if(item.INVSTRG_ENG.length > 0) {
              // 특수문자 차이는 무시(altibase 에서 - 를 ? 으로 입력함)
                let diffs = vm.findDifferences(item.INVSTRG, item.INVSTRG_ENG);
                console.log(diffs);
                if(diffs.length < 5 && item.INVSTRG_KOR.length > 50) {
                  // console.log(diffs.length)
                  continue;
                }
              }

              // item.title = tList[i].TITLE.trim().substr(0, 80);
              // if (tList[i].NCD == undefined) item.ncd = "";
              // else item.ncd = tList[i].NCD;
              vm.itemList.push(item);
              // console.log(item);
            }

            console.log(vm.itemList)
            if(vm.itemList.length == 0) {
              alert("번역대상 종목이 없습니다.")
            }
          }
        });
    },
    findDifferences: function(str1, str2) {
      let diffs = [];

      console.log("find.............")
      console.log(str1)
      console.log(str2)
      let rlength = str1.length;
      if(str2.length < str1.length) rlength = str2.length;
      for (let i = 0; i < rlength; i++) {
        if (str1[i] !== str2[i]) {
          diffs.push({ index: i, char1: str1[i] || '', char2: str2[i] || '' });
        }
      }

      return diffs;
    },
    translate: function () {
      let vm = this;

      if(vm.itemList.length > 0) {
        alert("300건당 1분 정도 소요됩니다.\n[확인]을 누르고 메시지가 나올때까지 기다려주세요.");
      }else {
        alert("데이터가 선택되지 않았습니다.")
        return;
      }
      axios
        .post(Config.base_url + "/api/datamanage/globaletfdesc/translate", {
          itemList: vm.itemList,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("번역 및 입력을 완료하였습니다.");
          }
        });
    },
    /*
    excelDownload: function() {
        const xlsx = require("xlsx");
        // 엑셀 워크시트로 json 내보내기, 배열만 가능
        const dataWS = xlsx.utils.json_to_sheet(this.itemList);
        // 엑셀의 workbook(엑셀파일에 지정된 이름)을 만든다
        const wb = xlsx.utils.book_new();
        // workbook에 워크시트 추가, 시트명은 'peopleData'
        xlsx.utils.book_append_sheet(wb, dataWS, "GlobalEtf");
        // 엑셀 파일을 내보낸다. 엑셀 파일 저장명은 'people.xlsx'
        const filename = 'GlobalEtfTrans.xlsx';
        xlsx.writeFile(wb, filename);
    },
    selectExcel: function () {
      const xlsx = require("xlsx");
      let vm = this;
      vm.uItemList = [];
      const fileInfo = this.$refs.selectExcel.files[0];

      console.log("selectExcel.........")
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
            seq: "",
            MSTARID: "",
            INVSTRG: "",
            INVSTRG_ENG: "",
            INVSTRG_KOR: "",
          };
          // console.log(toJson[i])
          for (let j = 0; j < Object.keys(toJson[i]).length; j++) {
            tobj[Object.keys(tobj)[j]] = (
              "" + toJson[i][Object.keys(tobj)[j]]
            ).trim();
          }

          vm.uItemList.push(tobj);
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

      if(vm.uItemList.length > 0) {
        alert("300건당 1분 정도 소요됩니다.\n[확인]을 누르고 메시지가 나올때까지 기다려주세요.");
      }else {
        alert("데이터가 선택되지 않았습니다.")
        return;
      }
      axios
        .post(Config.base_url + "/api/datamanage/globaletfdesc/excelupload", {
          itemList: vm.uItemList,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("Excel 업로드를 완료하였습니다.");
          }
        });
    },
*/
  }
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
  height: 600px;
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
  padding: 8px !important;
  text-align: center;
}
table td {
  border: 1px solid #444444;
  text-align: center;
}
table td.title1 {
  padding-left: 10px !important;
  text-align: left;
}
table tr:hover {
  background: #fbf8e9;
}
</style>
