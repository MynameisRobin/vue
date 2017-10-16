<template>
  <div class="hello main">
      <h1 class="red">Hello Vue</h1>
      <Modal></Modal>
    <!--<ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>-->
  </div>
</template>

<script>
    import Api from "../api/api.js";
    import Modal from "./modal";
    let api = new Api();
    export default {
        name: 'HelloWorld',
        data() {
            return {
                totalMoney: 0,
                productList: []
            }
        },
        mounted() {
            this.updateMsg();
        },
        methods: {
            updateMsg() {
                var _this = this;
                api.reqNewAjaxAsync(api.apiUrl.queryReArticleHotList, {
                        'usercode': "admin",
                        'password': "000000"
                    })
                    .then(function(res) {
                        _this.productList = res.result.list;
                    })
            }
        },
        components:{
            Modal
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    
    .main {
        .red {
            color: blue;
        }
    }
</style>