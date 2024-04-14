<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh đơn mượn</h4>
        <div class="col-md-6 mx-auto">
            <OrderForm :order="order" @submit:order="updateOrder" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import OrderForm from "@/components/admin/order_manager/OrderForm.vue";
import OrderService from "@/services/order.service";
export default {
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            order: null,
            message: "",
        };
    },
    methods: {
        async getOrder(id) {
            try {
                this.order = await OrderService.get(id);
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
        async updateOrder(data) {
            try {
                await OrderService.update(this.order._id, data);
                this.message = "Thông tin đã được thay đổi.";
                this.$router.push({ name: "order_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getOrder(this.id);
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