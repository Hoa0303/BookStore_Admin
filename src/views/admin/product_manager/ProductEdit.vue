<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh Liên hệ</h4>
        <div class="col-md-9 mx-auto">
            <ProductForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import ProductForm from "@/components/admin/porduct_manager/ProductForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        ProductForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await BookService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateProduct(data) {
            try {
                await BookService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "book_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteProduct() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await BookService.delete(this.product._id);
                    this.$router.push({ name: "book_manager" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 100px;
}
</style>