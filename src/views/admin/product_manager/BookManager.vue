<template>
    <div class="page row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-address-book mr-2"></i> Sản phẩm
            </h4>
            <ProductList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddProduct">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import ProductList from "../../../components/admin/porduct_manager/ProductList.vue";
import ProductService from "@/services/book.service";
export default {
    components: {
        InputSearch,
        ProductList,
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
                const { title, author, genre, imageurl, quantity } = user;
                return [title, author, genre, imageurl, quantity].join("");
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
                this.users = await ProductService.getAll();
                console.log(await ProductService.getAll());
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        goToAddProduct() {
            this.$router.push({ name: "product.add" });
        },
    },
    mounted() {
        this.refreshList();
    },

};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>