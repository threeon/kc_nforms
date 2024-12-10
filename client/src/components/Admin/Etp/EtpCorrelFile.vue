<template>
  <div>
    <v-toolbar color="white">
      <v-toolbar-title>ETP 상관계수 화일 생성(XDB 전송용도)</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md pa-0 ma-0>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="favorite_table">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md2>
                    <v-text-field
                      v-model="edate"
                      label="소급일자"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md3>
                    <span> (3~5분 정도 소요됨. td_etp_hist update)</span><br>
                    <span> (데이터 갯수 10개 이하면 0 처리됨)</span><br>
                    <span> (기타 거래정지 등도 0 처리됨)</span>
                  </v-flex>
                  <v-flex md2>
                    <v-btn color="primary" dark @click.stop="doWork">상관계수 생성</v-btn>
                  </v-flex>
                  <v-flex md2>
                    <v-btn color="warning" dark @click.stop="doFile">파일 생성</v-btn>
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
      edate: "",
    };
  },
  watch: {},
  computed: {},
  components: {},
  created: function () {
  },
  mounted: function () {},
  methods: {
    doWork: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/etp/makeetpcorrel", {
          params: {
            edate: vm.edate,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("상관계수 생성이 완료되었습니다.")
          }
        });
    },
    doFile: function () {
      let vm = this;

      vm.itemList = [];
      // console.log("getList");
      axios
        .get(Config.base_url + "/etp/makeetpcorrelfile", {
          params: {
            edate: vm.edate,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          if (response.data.success == false) {
            alert(response.data.message);
          } else {
            alert("화일 생성이 완료되었습니다. 화일은 ./logs/totcorel...")
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
