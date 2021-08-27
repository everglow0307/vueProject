<!--모든 화면에서 공통적으로 보여지는 상단부분이다. 로그인 성공 시 사용자명과 로그아웃 버튼이 활성화된다. -->
<template>
    <div class="navBar">
        <table>
            <tr>
                <td class="title"><strong>Vue-Diary</strong></td>
                <td class="userMenu" v-show = "user"><strong>{{ user }}</strong>님 <button @click = "logout">로그아웃</button></td>
            </tr>
        </table>
    </div>
</template>
<script>

export default ({
    computed: {
        user() {
            return this.$store.state.currentUser;
        },
    },
    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push("/");
        }
    }
})
</script>
<style scoped>
    .navBar {
        background: #FFDC3C;
        height: 50px;
        line-height: 50px;
        color: white;
        padding: 0 150px;
    }
    table {
        width: 100%;
    }
    .title {
        width: 70%;
        text-align: left;
        font-size: 20px;
    }
    .userMenu {
        text-align : right;
    }
    button {
        background: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #cccc;
    }
</style>
