<template>
    <main class="container">
      <div class="container-form">
        <button @click="sair" class="button-sair">Sair</button>
        <h1 class="title">Funcionários</h1>
        <div class="container-button">
          <button @click.prevent="cadastrar" class="button-cadastrar">Cadastrar</button>
          <button v-if="!editing" class="button-editar" @click.prevent="editar(func)">Editar</button>
          <button v-if='editing' class="button-salvar" @click.prevent="salvar()">Salvar</button>
        </div>
        <form class="body-form">
          <input type="text" v-model="funcionario.nome" name="nome" placeholder="Primeiro nome"/>
          <input type="text" v-model="funcionario.sobrenome" name="sobrenome" placeholder="Último nome"/>
        </form>
      </div>
      <div class="container-table">
        <table class="body-table">
          <tr class="tr-title">
            <th></th>
            <th>Nome </th>
            <th>Sobrenome </th>
          </tr>
          <tr class="tr-body" v-for="(func, index) of list" :key="index">
            <div class="tr-list">
              <td>{{ index + 1 }}</td>
              <td>{{ func.nome }}</td>
              <td>{{ func.sobrenome }}</td>
            </div>
            <div class="tr-editar">
              <input v-if="editing" type="text" v-model="func.nome" placeholder="Alterar nome" />
              <input v-if="editing" type="text" v-model="func.sobrenome" placeholder="Alterar sobrenome"/>
              <td><button class="button-excluir" @click.prevent="remover(func)">X</button></td>
            </div>
          </tr>
        </table>
      </div>
    </main>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      editing: false,
      list: [],
      funcionario: {
        nome: '',
        sobrenome: ''
      }
    }
  },
  computed: {
    funcAtualizado(){
      return this.funcionario
    },
    stateEditing(){
      return this.editing
    }
  },  
  methods: {
    cadastrar(){
     this.list.push(this.funcionario);
     this.funcionario = {
        nome: '',
        sobrenome: ''
      }
    },
    remover(item){
     this.list.splice(this.list.indexOf(item), 1)
    },
    editar(){
      if(!this.list){
        console.log(this.list)
      }else{
        this.editing = true
      }
    },
    salvar(){
      this.list.push(this.funcionario);
      this.editing = false
      this.list.pop();
    },
    sair(){
      this.$router.push({path: '/login'})
      this.$store.commit('clear', '');
    }
  },
}
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  button{
    padding: 5px 10px;
    text-transform: uppercase;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    border: none;
    border-radius: 1rem;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
    transition: all 500ms;
    cursor: pointer;
  }
  button:hover{
    transform: scale(1.1);
  }
  .button-sair{
    position: absolute;
    top: 5px;
    right: 5px;
    background-image: linear-gradient(red, darkred);
  }
  .button-cadastrar, .button-editar, .button-salvar{
    background-image: linear-gradient(#008503, rgb(0, 82, 2));
    padding: 10px;
  }
  .container-form{
    width: 80%;
    background-color: #fff;
    position: relative;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
    
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title{
    color: #fff;
    background-image: repeating-linear-gradient(#008503, rgb(0, 82, 2));
    width: 100%;
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 2rem;
  }
  .container-button{
    width: 40%;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
  }
  .body-form{
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  .body-form input{
    margin-bottom: 10px;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    box-shadow: 1px 3px 5px rgba(0, 82, 02, 0.5);
    outline: none;
    font-size: 0.9rem;
  }
  .container-table{
    margin-top: 3rem;
    padding: 35px;
    width: 80%;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
  }
  .body-table{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .tr-title {
    width: 50%;
    display: flex;
  }
  .tr-title th{
    width: 100%;
    text-align: center;
    padding: 10px;
    text-transform: uppercase;
  }
  .tr-body{
    display: flex;
    width: 100%;
  }
  .tr-list{
    width: 100%;
    display: flex;
  }
  .tr-list td{
    width: 100%;
    text-align: center;
    padding: 10px;
  }
  tr:nth-child(2n){
    background-color: rgba(0, 82, 2, 0.4);
  }
  .tr-editar{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .tr-editar input{
    width: 40%;
    padding: 10px;
    margin-right: 5px;
    border: none;
    border-radius: 8px;
    box-shadow: 1px 3px 5px rgba(0, 82, 02, 0.5);
  }
  .button-excluir{
    background-image: repeating-linear-gradient(red, darkred);
    margin-right: 10px;
  }
</style>