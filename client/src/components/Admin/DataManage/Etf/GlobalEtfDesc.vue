<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>Global ETF Description (HDB: M169UMSOPER_INVSTRG)</v-toolbar-title>
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
                      v-model="sseq" label="START SEQ"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-text-field 
                      v-model="eseq" label="END SEQ"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-text-field 
                      v-model="scode" label="SIMPLE CODE LIKE"></v-text-field>
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
                              <th style="width: 2%">SEQ</th>
                              <th style="width: 5%">MSTARID</th>
                              <th style="width: 5%">SIMPLE_CODE</th>
                              <th>INVSTRG_ENG</th>
                              <th>INVSTRG_KOR</th>
                              <th style="width: 5%">ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in itemList" :key="index">
                              <td>{{ item.seq }}</td>
                              <td>{{ item.MSTARID }}</td>
                              <td>{{ item.SIMPLE_CODE }}</td>
                              <td>{{ item.INVSTRG_ENG }}</td>
                              <td>{{ item.INVSTRG_KOR }}</td>
                              <td>
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
import UpdateModal from "./GlobalEtfDescModal.vue";

export default {
  data() {
    return {
      sseq : 1,
      eseq : 500,
      scode : "", // search CODE
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
      console.log("getList");
      axios
        .get(Config.base_url + "/api/datamanage/globaletfdesc/getitemlist", {
          params: {
            sseq: vm.sseq,
            eseq: vm.eseq,
            scode: vm.scode
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
              item.seq = Number(vm.sseq) + i;
              item.MSTARID = tList[i].MSTARID;
              item.SIMPLE_CODE = tList[i].SIMPLE_CODE;
              item.INVSTRG_ENG = tList[i].INVSTRG_ENG;
              item.INVSTRG_KOR = tList[i].INVSTRG_KOR;
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
