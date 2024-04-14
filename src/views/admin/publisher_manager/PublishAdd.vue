<template>
    <div class="container">
        <h4 class="text-center">Thêm nhà xuất bản mới</h4>
        <div class="col-md-6 mx-auto">
            <PublishForm :product="newPublish" @submit:product="addProduct" />
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
    data() {
        return {
            newPublish: {
                name: '',
                address: '',
            },
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await PublishService.create(data);
                window.alert("Sản phẩm đã thêm thành công")
                this.$router.push({ name: "publish_manager" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
