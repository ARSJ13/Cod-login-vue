<template>
    <main class="container">
      <div class="body-login">
        <h2>Admin System</h2>
        <hr>
        <div class="title-login">{{ showLogar ? 'Cadastro' : 'Login' }}</div>
        <form>
          <input :value="nome" @input="updateNome" name='nome' type="text" class="input-login" placeholder="Informe seu nome" required>
          <input :value="password" @input="updatePassword" name='password'  type="password" class="input-login" placeholder="Informe sua senha" required>
          <input v-if="showLogar" :value="confirmePassword" @input="updateConfirme" type="password" class="input-login" placeholder="Confirme a senha" required>
          <button v-if="showLogar" @click.prevent="registrar" class="button-login">Registrar</button>
          <button v-else @click.prevent="logar" class="button-login">Logar</button>
        </form>
        <a href @click.prevent="showLogar = !showLogar">
          <span v-if='showLogar'>Já tem cadastro? Acesse o Login!</span>
          <span v-else>Não tem cadastro? Registre-se aqui!</span>
        </a>
      </div>
    </main>  
</template>

<script>
import { userKey } from '@/global'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Login',
  data: function (){
    return {
      login: '',
      showLogar: false
    }
  },
  computed: {
    ...mapState({
      nome: state => state.user.nome, 
      password: state => state.user.password,
      confirmePassword: state => state.user.confirmePassword,
      auth: state => state.auth
    }),
    ...mapMutations({})
  },
  methods: {
    updateNome(event){
      this.$store.commit('updateNome', event.target.value)
    },
    updatePassword(event){
      this.$store.commit('updatePassword', event.target.value)
      },
    updateConfirme(event){
      this.$store.commit('updateConfirme', event.target.value)
    },
    logar(){
      this.login = localStorage.getItem(userKey);
      const obj = JSON.parse(this.login);

      if(!obj){
        alert('Nome ou senha não conferem! Digite novamente.');
        this.$store.commit('clear', '');
      }
      if( obj.nome == this.nome & obj.password == this.password){
        this.$store.commit('updateAuth');
        this.$router.push({path: '/'})
      }else{
        alert('Nome ou senha não conferem! Digite novamente.');
        this.$store.commit('clear', '');
      }
    },
    registrar(){
      const dataUser = { 
        nome: this.nome,
        password: this.password,
        confirmePassword: this.confirmePassword
      }
      if (dataUser.password != dataUser.confirmePassword) {
        alert('Senhas não conferem! Digite novamente');
        this.$store.commit('clear', '');
      }else{
        localStorage.setItem(userKey, JSON.stringify(dataUser));
        this.showLogar = false;
        this.$store.commit('clear', '');
      }
    }
  }
  
}
</script>

<style>
.container{
  display: flex;
  justify-content: center;
  align-content: center;
}
.body-login{
  margin: 0px;
  padding: 35px;
  background-color:#fff;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
}
.body-login h2{
  font-weight: 400;
  margin-bottom: 5px;
  color:  #008503;
}
hr{
  width: 96%;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-image: repeating-linear-gradient(#fff, rgb(0, 0, 0));
}
.title-login{
  color:  #008503;
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.body-login form{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.body-login a{
  margin-top: 1rem;
  color:  #008503;
}
.input-login{
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  box-shadow: 1px 3px 5px rgba(0, 82, 02, 0.5);
  outline: none;
}
.button-login{
  width: 50%;
  padding: 10px;
  margin-top: 2rem;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  background-color: rgb(0, 82, 2);
  outline: none;
  align-self: flex-end;
  transition: all 300ms;
  cursor: pointer;
}
.button-login:hover{
  opacity: 0.8;
}
</style>