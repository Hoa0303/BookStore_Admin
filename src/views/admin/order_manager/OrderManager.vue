<template>
    <div class="container">
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-clipboard mr-2"></i> Đơn mượn sách
            </h4>
            <div class="row">
                <!-- Dropdown chứa tên người dùng -->
                <div class="dropdown mb-3 col-2">
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
                <!-- Dropdown chứa trạng thái -->
                <div class="dropdown mb-3 col-2">
                    <button class="btn dropdown-toggle border-black" type="button" id="statusDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Trạng thái
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="statusDropdown">
                        <li>
                            <button class="dropdown-item" @click="filterOrdersByStatus(null)">Tất cả</button>
                        </li>
                        <li v-for="(status, index) in orderStatuses" :key="index">
                            <button class="dropdown-item" @click="filterOrdersByStatus(status)">{{ status }}</button>
                        </li>
                    </ul>
                </div>
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
            selectedStatus: null,
        };
    },
    computed: {
        // Tạo danh sách các trạng thái từ orders
        orderStatuses() {
            const statusSet = new Set();
            this.orders.forEach(order => {
                statusSet.add(order.status);
            });
            return Array.from(statusSet);
        },
        filteredOrders() {
            let filtered = this.orders;
            if (this.selectedUser !== null) {
                filtered = filtered.filter(order => order.name === this.selectedUser);
            }
            if (this.selectedStatus !== null) {
                filtered = filtered.filter(order => order.status === this.selectedStatus);
            }
            return filtered;
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
        filterOrdersByStatus(status) {
            this.selectedStatus = status;
        },
        refreshList() {
            this.retrieveOrders();
            this.selectedUser = null;
            this.selectedStatus = null;
            this.activeIndex = -1;
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
