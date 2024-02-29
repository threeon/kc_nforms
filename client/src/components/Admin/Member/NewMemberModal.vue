<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
        <v-card-title>
        <span class="headline">회원 등록</span>
        </v-card-title>

        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <v-flex xs12>
                <v-text-field v-model="editedItem.user_id" label="ID"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="editedItem.password" label="PASSWORD"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-select
                  :items="levelItems"
                  label="LEVEL"
                  outline
                  v-model="editedItem.user_level"
                ></v-select>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="editedItem.user_name" label="NAME"></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
import Config       from "@/js/config.js"

export default {
  props: [],
  data() {
      return {
        dialog: false,
        editedItem: {
          user_id: "",
          password: "",
          user_level: "NORMAL",
          user_name: "",
        },
        levelItems: ['NORMAL', 'SUPER','NEWSCOM','CHECKWEB'],
      };
  },
  computed: {
  },  
  components: {
      
  },
  created: function() {
      
  },
  beforeDestroy() {
      
  },
  mounted: function() {
      this.dialog = true;
  },
  methods: {
    checkForm: function() {
        if(this.editedItem.user_id == "") {
            alert("ID를 입력하세요.");
            return false;
        }else if(this.editedItem.password == "") {
            alert("PASSWORD를 입력하세요.");
            return false;
        }else if(this.editedItem.user_level == "") {
            alert("LEVEL를 입력하세요.");
            return false;
        }else if(this.editedItem.user_name == "") {
            alert("NAME를 입력하세요.");
            return false;
        }else {
            return true;
        }
    },
    save: function() {
        var vm = this;
        if(this.checkForm() == false) return;
        axios.post(Config.base_url+'/admin/insertmember', 
            vm.editedItem
        ).then(function(response) {
            console.log(response);
            if(response.data.success == false){
                alert(response.data.message);
            }else {
                alert("회원등록 완료하였습니다.");
                vm.$EventBus.$emit("newMemberSave");
                vm.dialog = false;
            }
        });
    },
    close: function() {
        var vm = this;
        vm.$EventBus.$emit("newMemberClose");
      this.dialog = false;
    }
  }  
}
</script>
<style scoped>

</style>
