<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>ETF 비용 데이터 (M001_SKSETFEXPNINFO : 조회)</v-toolbar-title>
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
                    <v-text-field v-model="yyyymm" label="YYYYMM"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-btn color="primary" dark @click.stop="clickInfo">조회</v-btn>
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
import Config from '@/js/config.js'
import Util from '@/js/util.js'
export default {
  data() {
    return {
      yyyymm: 0,
      sdate: 0,
      edate: 0,
      itemList: [],
    }
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
    this.yyyymm = Math.floor(Number(Util.getToday()) / 100)
  },
  mounted: function () {
    // this.getList()
  },
  methods: {
    getList: function () {
      let vm = this

      vm.itemList = []
      // console.log('getList')
      axios
        .get(Config.base_url + '/api/datamanage/etffee/getitemlist', {
          params: {
            sdate: vm.sdate,
            edate: vm.edate,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message)
          } else if (response.data.results.length == 0) {
            alert('데이터가 없습니다.')
          } else {
            let tList = response.data.results
            // console.log(tList);

            for (let i = 0; i < tList.length; i++) {
              let item = tList[i]
              // console.log(item)
              // item.seq = Number(vm.sseq) + i;
              // item.MSTARID = tList[i].MSTARID;
              // item.SIMPLE_CODE = tList[i].SIMPLE_CODE;
              // item.INVSTRG_ENG = tList[i].INVSTRG_ENG;
              // item.INVSTRG_KOR = tList[i].INVSTRG_KOR;
              vm.itemList.push(item)
              // console.log(item);
            }
          }
        })
    },
    clickInfo: function () {
      this.sdate = this.yyyymm + '00'
      this.edate = this.yyyymm + '32'
      // console.log(this.yyyymm)
      this.getList()
    },
  },
}
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
