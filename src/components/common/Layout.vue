<template>
    <el-container>
        <!--==================================================================상단 메뉴바====================================================================-->
        <el-header>
            <slot name="header">
                <div class="head-bar">
                    <span class = "diary-logo">
                        <strong>Vue-Diary</strong>
                    </span>
                    <span v-show = "user" class="user-info">
                        <strong>{{ user }}</strong>님 <el-button @click = "logout" class="btn__logout">로그아웃</el-button>
                    </span>
                </div>
            </slot>
        </el-header>
         <!--==================================================================메인============================================================================-->
        <el-main>
            <slot></slot>
        </el-main>
        <!--====================================================================================================================================================-->
    </el-container>
</template>
<script>

export default ({
    name: 'Layout',
    data() {
        return {
            activeIndex : '1',
        }
    },
    computed: {
        user() {
            return this.$store.state.currentUser;
        },
    },
    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push("/");
        },
    }
})
</script>
<style scoped>
    .head-bar {
        background: #FFDC3C;
        height: 50px;
        line-height: 50px;
        color: white;
        padding: 0 150px;
    }
    .diary-logo {
        float: left;
        font-size: 18px;
    }
    .user-info {
        float: right;
    }
    
    .btn__logout {
        background: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #cccc;
    }

    .btn__logout:hover {
        color:gold;
    }
</style>

