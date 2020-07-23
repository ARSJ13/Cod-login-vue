import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store ({
  state: {
    auth: false,
    user: {
      nome: '',
      password: '',
      confirmePassword: ''
    }
  },
  mutations: {
    updateAuth(state){
      state.auth = true
    },
    updateNome(state, nome){
      state.user.nome = nome
    },
    updatePassword(state, password){
      state.user.password = password
    },
    updateConfirme(state, confirmePassword){
      state.user.confirmePassword = confirmePassword
    },
    clear(state, value){
      [state.user.nome, state.user.password, state.user.confirmePassword] = value;
      value = ''
    }
  }
})

export default store;