<template>
  <v-navigation-drawer
    fixed
    app
    :permanent="showDrawer"
    clipped
    width="300"
    class="drawer-style"
    id="style-1"
  >
    <v-list dense expand subheader>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        no-action
        :prepend-icon="item.action"
        v-model="item.active"
      >
        <v-list-tile
          slot="activator"
          @click="selectedItemTitle = item.title"
          :class="{ selected: selectedItemTitle == item.title }"
        >
          <v-list-tile-title> {{ item.title }} </v-list-tile-title>
        </v-list-tile>

        <template v-for="subitem in item.subitems">
          <template v-if="subitem.subitems">
            <v-list-group
              :key="subitem.title"
              no-action
              sub-group
              :prepend-icon="subitem.action"
              v-model="subitem.active"
            >
              <template slot="activator">
                <router-link
                  class="routerlink"
                  :to="subitem.link ? subitem.link : ''"
                >
                  <v-list-tile
                    @click="selectedSubitemTitle = subitem.title"
                    :class="{ selected: selectedSubitemTitle == subitem.title }"
                  >
                    <v-list-tile-title> {{ subitem.title }} </v-list-tile-title>
                  </v-list-tile>
                </router-link>
              </template>

              <template v-if="subitem.subitems">
                <template v-for="ssubitem in subitem.subitems">
                  <v-list-tile
                    @click="selectedSSubitemTitle = ssubitem.title"
                    :class="{
                      selected: selectedSSubitemTitle == ssubitem.title,
                    }"
                    :key="ssubitem.title"
                  >
                    <router-link
                      class="routerlink"
                      :to="{ path: ssubitem.link, query: ssubitem }"
                    >
                      <v-list-tile-title>
                        {{ ssubitem.title }}
                      </v-list-tile-title>
                    </router-link>
                  </v-list-tile>
                </template>
              </template>
            </v-list-group>
          </template>

          <template v-else>
            <router-link
              :key="subitem.title"
              class="routerlink"
              :to="subitem.link ? subitem.link : ''"
            >
              <v-list-tile>
                <v-list-tile-title
                  @click="selectedSubitemTitle = subitem.title"
                  :class="{ selected: selectedSubitemTitle == subitem.title }"
                >
                  {{ subitem.title }}
                </v-list-tile-title>
              </v-list-tile>
            </router-link>
          </template>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["showDrawer"],
  data() {
    return {
      selectedItemTitle: undefined,
      selectedSubitemTitle: undefined,
      selectedSSubitemTitle: undefined,
      fullItems: [
        {
          action: "storage",
          title: "정보-DB 데이터 관리",
          active: true,
          level: "NORMAL",
          subitems: [
            { title: "001. RIC CHANGE", link: "/admintool/ricchange" },
            { title: "002. 리포트 종목연동", link: "/admintool/reportcode" },
            {
              title: "003. 채권지수 소급 (업로드)",
              link: "/admintool/bondindexupload",
            },
            {
              title: "004. 채권지수 소급 (수정)",
              link: "/admintool/bondindexmod",
            },
            {
              title: "005. 세계지수 (업로드)",
              link: "/admintool/worldindexupload",
            },
            {
              title: "006. 세계지수 (수정)",
              link: "/admintool/worldindexmod",
            },
            {
              title: "007. 반도체지수 마스터 (업로드)",
              link: "/admintool/semimasterupload",
            },
            {
              title: "008. 반도체지수 마스터(수정)",
              link: "/admintool/semimastermod",
            },
            {
              title: "009. 반도체지수 (업로드)",
              link: "/admintool/semiindexupload",
            },
            {
              title: "010. 반도체지수 (수정)",
              link: "/admintool/semiindexmod",
            },
          ],
        },
        {
          action: "fence",
          title: "정보-DB 플랫폼 이관",
          active: false,
          level: "NORMAL",
          subitems: [
            { 
              title: "001. M054UDATE (dp_bond_m054udate)", 
              link: "/admintool/migration/m054udate" 
            },
          ],
        },
        {
          action: "dataset",
          title: "ETP-DB 데이터 관리",
          active: false,
          level: "NORMAL",
          subitems: [
            {
              title: "001. ETF 배당정보",
              link: "/admintool/etfdivinfo",
            },
            {
              title: "002. ETF 총보수비용비율",
              link: "/admintool/etffeeinfo",
            },
            {
              title: "003. ETF 분류정보",
              link: "/admintool/etfctginfo",
            },
            {
              title: "004. ETP 상관계수 화일 생성",
              link: "/admintool/etpcorrelfile",
            },
            /*
            {
              title: "(채권)xdb_m060csigamast",
              link: "/admintool/ricchange",
            },
            */
          ],
        },
        /*
        {
          action: "token",
          title: "DP-DB 데이터 관리",
          active: false,
          level: "NORMAL",
          subitems: [
            {
              title: "(채권)xdb_xdb_m060csigamast",
              link: "/admintool/ricchange",
            },
          ],
        },
        */
        {
          action: "accessibility_new",
          title: "MEMBER",
          active: false,
          level: "SUPER",
          subitems: [{ title: "관리자계정 관리", link: "/admintool/member" }],
        },
      ], //item
      items: [],
    }; // return
  },
  created: function () {
    this.$EventBus.$on("userLevelSet", this.userLevelSet);
    this.$EventBus.$on("unsetMenu", this.unsetMenu);
  },
  beforeDestroy() {
    this.$EventBus.$off("userLevelSet");
    this.$EventBus.$off("unsetMenu");
  },
  beforeDestroy() {},
  watch: {
    showDrawer() {
      // console.log("this.showDrawer", this.showDrawer);
    },

    selectedItemTitle(val, oval) {
      let target = this.items.forEach((x) => {
        if (x.title != val) x.active = false;
      });
    },
  },
  mounted: function () {
    this.userLevelSet();
    //var userLevel = this.$store.state.user.user_level ;
    //var vm = this;
    //if(userLevel != 'SUPER'){
    //  this.fullItems.forEach(function(el) {
    //    if(el.level == userLevel) { vm.items.push(el); }
    //  });
    //} else {
    //  vm.items = this.fullItems;
    //}
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userLevel() {
      return this.$store.state.user.user_level;
    },
  },
  methods: {
    userLevelSet() {
      console.log("userLevelSet..............", this.userLevel);
      //var userLevel = this.$store.state.user.user_level ;
      var vm = this;
      if (this.userLevel != "SUPER") {
        this.fullItems.forEach(function (el) {
          if (el.level == vm.userLevel) {
            vm.items.push(el);
          }
        });
      } else {
        vm.items = this.fullItems;
      }
    },
    unsetMenu() {
      this.items = [];
    },
  },
};
</script>

<style scoped>
.routerlink {
  text-decoration: none;
}
.selected {
  color: red;
}
</style>
