<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-lg-around">
        <a href="/admin/product_manager" class="navbar-brand">Books Store</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book_manager' }" class="nav-link">
                    <i class="fas fa-book"></i>
                    Sách
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'order_manager' }" class="nav-link">
                    <i class="fas fa-clipboard"></i>
                    Đơn mượn sách
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'publish_manager' }" class="nav-link">
                    <i class="fas fa-upload"></i>
                    Nhà xuất bản
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    <i class="fas fa-user"></i>
                    Tài khoản
                </router-link>
            </li>
            <li class="nav-item" v-if="userName">
                <router-link to="#" class="nav-link" @click="confirmLogout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span> {{ userName }}</span>
                </router-link>
            </li>
        </div>
    </nav>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            userName: ''
        };
    },
    mounted() {
        this.getUserNameFromCookie();
    },
    methods: {
        getUserNameFromCookie() {
            const userName = Cookies.get('userName');
            if (userName) {
                this.userName = userName;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {
            Cookies.remove('userName');
            Cookies.remove('userId');
            this.userName = '';
            this.$router.push({ name: 'login' });
        }
    }
};
</script>
