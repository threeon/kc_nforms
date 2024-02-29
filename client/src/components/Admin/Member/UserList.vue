<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>회원 관리</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click.stop="registerMember">회원 등록</v-btn>
    </v-toolbar>    
    <NewMemberModal v-if="newMemberFlag"></NewMemberModal>
    <UpdateMemberModal v-if="updateMemberFlag" :oldItem="editedItem"></UpdateMemberModal>
    <v-data-table
      :headers="headers"
      :items="users"
      :rows-per-page-items="rowsPerPageItems"
      disable-initial-sort
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.index+1 }}</td>
        <td class="text-xs-center">{{ props.item.user_id }}</td>
        <td class="text-xs-center">{{ props.item.user_name }}</td>
        <td class="text-xs-center">{{ props.item.user_level }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Config       from "@/js/config.js"
import NewMemberModal from "./NewMemberModal.vue"
import UpdateMemberModal from "./UpdateMemberModal.vue"

export default {
  props: [],
  data() {
      return {
        rowsPerPageItems: [20, 10, 30, 50],
        headers: [
          { text: 'No', sortable: false, align:'center', value: 'index'},
          { text: 'ID', sortable: false, align: 'center', value: 'user_id'},
          { text: 'NAME', sortable: false, align: 'center', value: 'user_name'},
          { text: 'LEVEL', sortable: false, align: 'center', value: 'user_level'},
          { text: 'ACTION', sortable: false, align: 'center', value: 'action'},
        ],
        users:[],
        dialog: false,
        editedIndex: -1,
        editedItem: {
          user_id: "",
          password: "",
          user_level: "",
          user_name: "",
        },
        newMemberFlag: false,
        updateMemberFlag: false,
      };
  },
  computed: {
  },  
  components: {
      NewMemberModal,
      UpdateMemberModal
  },
  created: function() {
      this.$EventBus.$on('newMemberSave', this.newMemberSave);
      this.$EventBus.$on('updateMemberSave', this.updateMemberSave);
      this.$EventBus.$on('newMemberClose', this.newMemberClose);
      this.$EventBus.$on('updateMemberClose', this.updateMemberClose);
  },
  beforeDestroy() {
      this.$EventBus.$off('newMemberSave');
      this.$EventBus.$off('updateMemberSave');
      this.$EventBus.$off('newMemberClose');
      this.$EventBus.$off('updateMemberClose');
  },    
  mounted: function() {
      this.getMemberList();
  },
  methods: {
    getMemberList: function() {
      console.log('getMemberList');
      var vm = this;

      axios.get(Config.base_url+'/admin/getmemberlist', {
        params: {
            // "bbs_id" : vm.bbs_id,
        }
      }).then(function(response) {
        console.log(response);
        if(response.data.success == false){
            alert(response.data.message);
        }else {
            vm.users = response.data.results;
        }
      });
    },
    editItem: function(item) {
      this.editedItem = item;
      this.updateMemberFlag = true;
    },
    deleteItem: function(item) {
      var vm = this;
      axios.post(Config.base_url+'/admin/deletemember', 
          item
      ).then(function(response) {
          console.log(response);
          if(response.data.success == false){
              alert(response.data.message);
          }else {
            alert("회원삭제 완료하였습니다.");
            vm.getMemberList();
          }
        });
    },
    registerMember: function() {
      this.newMemberFlag = true;
    },
    newMemberSave: function() {
      this.newMemberFlag = false;
      this.getMemberList();
    },
    updateMemberSave: function() {
      this.updateMemberFlag = false;
      this.getMemberList();
    },
    newMemberClose: function() {
      this.newMemberFlag = false;
    },
    updateMemberClose: function() {
      this.updateMemberFlag = false;
    },
  }  
}
</script>
<style scoped>

</style>
