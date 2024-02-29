<template>
    <v-content>
        <!--<v-container fluid pa-0>-->
            <router-view></router-view>
        <!--</v-container>-->
   </v-content>
</template> 

<script>

export default {
    data() {
        return {
        };
    },
    components: {
    },
    beforeCreate() {
    },
    created: function() {
        var userLevel = this.$store.state.user.user_level ;
        
        if( userLevel == "NEWSCOM"){
          this.$router.push({ path: '/admintool/basicrate'});
        } else if (userLevel == "CHECKWEB") {
          this.$router.push({ path: "/admintool/macromanager" });
        } else {
          console.log("userLevel", userLevel);
          //this.$router.push({ path: "/admintool/menu" });
        }
        //  this.$router.push({ path: '/admintool/menu'});
    },
    beforeDestroy() {
    },

    methods: {
    }
}
</script>

<style scoped>
.container {
  padding: 12px;
}
</style>