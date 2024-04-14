<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh nhà sản xuất</h4>
        <div class="col-md-9 mx-auto">
            <PublishForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import PublishForm from "@/components/admin/publish_manager/PublishForm.vue";
import PublishService from "@/services/publish.service";
export default {
    components: {
        PublishForm,
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
                this.product = await PublishService.get(id);
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
                await PublishService.update(this.product._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "publish_manager" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteProduct() {
            if (confirm("Bạn muốn xóa sản phẩm này?")) {
                try {
                    await PublishService.delete(this.product._id);
                    this.$router.push({ name: "publish_manager" });
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