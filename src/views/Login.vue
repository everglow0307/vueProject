<template>
        <div class="login-wrap">
           <span style='font-size:50px;'>&#128521;</span><br><br>
           <el-form :model = "loginForm" :rules = "rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop = "username">
                    <el-input placeholder = '사용자명' v-model.trim = "loginForm.username" @keypress.native.enter = "login" class="input__user" clearable >
                        <template slot="prepend"><i class="el-icon-user"></i></template>    
                    </el-input><br>
                </el-form-item>
            <el-button @click = "login" class="btn__login"><strong>로그인</strong></el-button>
           </el-form>
        </div>
</template>
<script>

export default ({
    name : 'Login',
    data() {
        return {
            loginForm : {
                username : '',
            },
            rules: {
                username: [
                    { required: true, message: '사용자를 입력해주세요.', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        // 사용자 목록에 입력한 사용자 이름이 있는지 인덱스 확인 후 로그인 성공여부를 알려준다. 
        login() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    var userList = this.$store.state.userList;
                    var result = userList.indexOf(this.loginForm.username);
                    console.log(result);

                    if (result > -1) {
                        this.$store.commit('login', this.loginForm.username);
                        this.$router.push("/diary/list");
                    } else {
                        this.$message({
                            message: '사용자 목록에 없습니다. 다시 입력해주세요.',
                            type: 'info'
                        });
                    }
                } else {
                    return false;
                }
            });
        }
    }
})
</script>
<style scoped>

.login-wrap {
  border: 2px solid gold;
  margin: 10% auto;
  width: 30%;
  min-width: 250px;
  padding: 20px;
  height: 200px;  
}

.input__user, .btn__login {
    width: 20%;
    min-width: 250px;
}

.btn__login {
    background: gold;
    border: none;
    margin-top: 10px;
}
</style>