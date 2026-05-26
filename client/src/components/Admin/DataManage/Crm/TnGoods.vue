<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>TN_GOODS 이관</v-toolbar-title>
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
                    <v-btn color="primary" dark @click.stop="getList">조회(5초 소요)</v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn color="warning" dark @click.stop="deleteList">삭제(2초 소요)</v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn color="green" dark @click.stop="moveList">이관(10초 소요)</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 md12>
                    <span style="color: green">** 이관시 테이블의 내용을 모두 삭제해주세요(조회 후 데이터 있으면 삭제). Altibase 는 Duplicate Key 를 지원하지 않습니다.</span>
                    <br />
                  </v-flex>
                  <v-flex xs12 md12>
                    <span style="color: purple">** 필요없는 상품정보는 엑셀로 저장하여 CRM 담당자에게 삭제요청 해주시기 바랍니다.</span>
                    <br />
                  </v-flex>
                </v-layout>

                <v-layout wrap>
                  <v-flex xs12>
                    <div class="table_container">
                      <div class="table_wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>GOODS_SQ</th>
                              <th>PID</th>
                              <th>FRST_USER_SQ</th>
                              <th>SECON_USER_SQ</th>
                              <th>REGISTER_ID</th>
                              <th>REGIST_DT</th>
                              <th>RECKN_BGN_DE</th>
                              <th>COST_DEPT</th>
                              <th>RQEST_CODE</th>
                              <th>INSTL_DEPT</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.GOODS_SQ }}</td>
                              <td>{{ item.PID }}</td>
                              <td>{{ item.FRST_USER_SQ }}</td>
                              <td>{{ item.SECON_USER_SQ }}</td>
                              <td>{{ item.REGISTER_ID }}</td>
                              <td>{{ item.REGIST_DT }}</td>
                              <td>{{ item.RECKN_BGN_DE }}</td>
                              <td>{{ item.COST_DEPT }}</td>
                              <td>{{ item.RQEST_CODE }}</td>
                              <td>{{ item.INSTL_DEPT }}</td>
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
      itemList: [],
    }
  },
  watch: {},
  computed: {},
  components: {},

  created: function () {
    // console.log(this.sdate, this.edate);
    // this.getList()
  },
  mounted: function () {},
  methods: {
    getList: function () {
      let vm = this

      vm.itemList = []
      console.log('getList')
      axios
        .get(Config.base_url + '/api/datamanage/crm/gettngoodslist', {
          params: {},
        })
        .then(function (response) {
          // console.log(response.data)
          if (response.data.success == false) {
            alert(response.data.message)
          } else if (response.data.results.length == 0) {
            alert('데이터가 없습니다.')
          } else {
            // console.log(response.data.results)
            vm.itemList = response.data.results
          }
        })
    },

    deleteList: function () {
      let vm = this

      axios.post(Config.base_url + '/api/datamanage/crm/deletetngoodslist', {}).then(function (response) {
        // console.log(response);
        if (response.data.success == false) {
          alert(response.data.message)
        } else {
          alert('삭제를 완료하였습니다.')
        }
      })
    },
    moveList: function () {
      let vm = this

      axios.post(Config.base_url + '/api/datamanage/crm/movetngoodslist', {}).then(function (response) {
        // console.log(response);
        if (response.data.success == false) {
          alert(response.data.message)
        } else {
          alert('이관을 완료하였습니다.')
        }
      })
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
