<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-lg-around  ">
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
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    <i class="fas fa-user"></i>
                    Tài khoản
                </router-link>
            </li>
        </div>
    </nav>
</template>