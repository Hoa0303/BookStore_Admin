<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh Liên hệ</h4>
        <div class="col-md-9 mx-auto">
            <ProductForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
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
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.contact = await BookService.get(id);
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
        async updateContact(data) {
            try {
                await BookService.update(this.contact._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "book_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteContact() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await BookService.delete(this.contact._id);
                    this.$router.push({ name: "book_manager" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getContact(this.id);
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