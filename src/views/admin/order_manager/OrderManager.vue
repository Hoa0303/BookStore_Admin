<template>
    <div class="container">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-clipboard mr-2"></i> Đơn mượn sách
            </h4>
            <!-- Dropdown chứa tên người dùng -->
            <div class="dropdown mb-3">
                <button class="btn dropdown-toggle border-black" type="button" id="userDropdown"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Chọn người dùng
                </button>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                        <button class="dropdown-item" @click="filterOrdersByUser(null)">Tất cả</button>
                    </li>
                    <li v-for="(user, index) in users" :key="index">
                        <button class="dropdown-item" @click="filterOrdersByUser(user)">{{ user }}</button>
                    </li>
                </ul>
            </div>
            <!-- Hiển thị danh sách đơn mượn sách -->
            <OrderList v-if="filteredOrdersCount > 0" :orders="filteredOrders" v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có đơn mượn nào.</p>
        </div>
    </div>
</template>

<script>
import OrderService from '@/services/order.service';
import OrderList from '@/components/admin/order_manager/OrderList.vue';

export default {
    components: {
        OrderList,
    },
    data() {
        return {
            orders: [],
            activeIndex: -1,
            searchText: "",
            users: [],
            selectedUser: null,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        filteredOrders() {
            if (this.selectedUser === null) return this.orders;
            return this.orders.filter(order => order.name === this.selectedUser);
        },
        filteredOrdersCount() {
            return this.filteredOrders.length;
        },
    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await OrderService.getAll();
                this.extractUsersFromOrders();
            } catch (error) {
                console.log(error);
            }
        },
        extractUsersFromOrders() {
            const userSet = new Set();
            this.orders.forEach(order => {
                userSet.add(order.name);
            });
            this.users = Array.from(userSet);
        },
        filterOrdersByUser(user) {
            this.selectedUser = user;
        },
        refreshList() {
            this.retrieveOrders();
            this.selectedUser = null;
            this.activeIndex = -1;
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
