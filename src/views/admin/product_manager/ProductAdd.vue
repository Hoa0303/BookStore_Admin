<template>
    <div class="container">
        <h4 class="text-center">Thêm sản phẩm mới</h4>
        <div class="col-md-6 mx-auto">
            <ProductForm :product="newProduct" @submit:product="addProduct" />
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
    data() {
        return {
            newProduct: {
                title: '',
                author: '',
                genre: '',
                imageUrl: '',
                quantity: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await BookService.create(data);
                window.alert("Sản phẩm đã thêm thành công")
                this.$router.push({ name: "book_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
