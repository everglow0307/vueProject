<template>
    <div>
        <div class="login-wrap">
           <span style='font-size:50px;'>&#128521;</span><br>
            <input type="text" v-model.trim = "username"><br>
            <button @click = "login" ><strong>로그인</strong></button>
        </div>
    </div>   
</template>
<script>

export default ({
    name : 'Login',
    data() {
        return {
            username : '',
        };
    },
    methods: {
        // 사용자 목록에 입력한 사용자 이름이 있는지 인덱스 확인 후 로그인 성공여부를 알려준다. 
        login() {
            if(!this.username){
                alert('사용자를 입력해주세요.');
            }else{
                var userList = this.$store.state.userList;
                var result = userList.indexOf(this.username);
                if(result>-1){
                    this.$store.commit('login', this.username);
                    this.$router.push("/diary/list");
                }else{
                    alert("사용자 목록에 없습니다. 다시 입력해주세요.");
                }
            }
        }
    }
})
</script>
<style scoped>

input {
  border: 2px solid gold;
  width : 250px;
  height: 40px;
  margin-top: 100px;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
}

button {
    width : 250px;
    height : 40px;
    background : gold;
    box-shadow: none;
    color: white;
    font-size: 16px;
}

div input, button {
    margin: 10px;
}

.login-wrap {
    margin: 10% auto;
}
</style>