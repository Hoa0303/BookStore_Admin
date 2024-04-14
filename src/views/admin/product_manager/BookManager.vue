<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-book mr-2"></i> Sản phẩm
            </h4>
            <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="width: 935px;">Không có sản phẩm nào.</p>
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
            Products: [],
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
            return this.Products.map((user) => {
                const { title, author, genre, imageurl, quantity } = user;
                return [title, author, genre, imageurl, quantity].join("");
            });
        },
        filteredProducts() {
            if (!this.searchText) return this.Products;
            return this.Products.filter((_user, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.Products = await ProductService.getAll();
                console.log(await ProductService.getAll());
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
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