<template>
  <v-layout row wrap>
    <v-flex xs12>
      <UserList></UserList>
    </v-flex>
  </v-layout> 
</template>

<script>
import UserList          from './UserList.vue';

export default {
        data() {
            return {
    	};
    },    
    components: {
        UserList,
    },
    created: function() {
    },
    methods: {
    }

}
</script>

<style scoped>

</style>