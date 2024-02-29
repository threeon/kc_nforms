<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>리포트 종목코드 연동 관리</v-toolbar-title>
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
                              <th style="width: 15%">날짜</th>
                              <th style="width: 10%">시간</th>
                              <th style="width: 15%">CODE</th>
                              <th style="width: 45%">TITLE</th>
                              <th style="width: 15%">NCD</th>
                              <th style="width: 15%">ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td style="width: 15%">{{ item.date }}</td>
                              <td style="width: 10%">{{ item.time }}</td>
                              <td style="width: 15%">{{ item.code }}</td>
                              <td style="width: 45%" class="title1">
                                {{ item.title }}
                              </td>
                              <td style="width: 15%">{{ item.ncd }}</td>
                              <td style="width: 15%">
                                <v-icon @click="updateItem1(item)">
                                  edit
                                </v-icon>
                              </td>
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
    <UpdateModal
      v-if="updateFlag"
      :oldItem="editedItem"
      @close="close"
    ></UpdateModal>
  </div>
</template>

<script>
import Config from "@/js/config.js";
import Util from "@/js/util.js";
import UpdateModal from "./ReportCodeModal.vue";

export default {
  data() {
    return {
      sdate: "",
      edate: "",
      itemList: [],
      updateFlag: false,
      editedItem: {},
    };
  },
  watch: {},
  computed: {},
  components: {
    UpdateModal,
  },
  created: function () {
    this.edate = Util.getToday();
    this.sdate = Util.getBef1Week();
    // console.log(this.sdate, this.edate);
    this.getList();
  },
  mounted: function () {},
  methods: {
    updateItem1: function (item) {
      this.editedItem = item;
      this.updateFlag = true;
    },
    getList: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/api/datamanage/getreportcode", {
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
              item.date = tList[i].DATE;
              item.time = tList[i].TIME;
              item.code = tList[i].CODE;
              item.title = tList[i].TITLE.trim().substr(0, 80);
              if (tList[i].NCD == undefined) item.ncd = "";
              else item.ncd = tList[i].NCD;
              vm.itemList.push(item);
              // console.log(item);
            }
          }
        });
    },
    close: function (reloadFlag) {
      this.updateFlag = false;
      // console.log(reloadFlag);
      if (reloadFlag != 0) this.getList();
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
