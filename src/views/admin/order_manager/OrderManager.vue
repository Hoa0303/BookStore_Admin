<template>
    <div class="container">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-address-book mr-2"></i> Đơn mượn sách
            </h4>
            <OrderList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có liên hệ nào.</p>
        </div>
    </div>
</template>


<script>
import InputSearch from '@/components/admin/InputSearch.vue';
import OrderService from '@/services/order.service';
import OrderList from '@/components/admin/order_manager/OrderList.vue';

export default {
    components: {
        InputSearch,
        OrderList,
    },
    data() {
        return {
            users: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        contactStrings() {
            return this.users.map((user) => {
                const { ngayMuon, ngayTra, status } = user;
                return [ngayMuon, ngayTra, status].join("");
            });
        },
        filteredContacts() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.users = await OrderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        }
    },
    mounted() {
        this.refreshList();
    },

};
</script>
