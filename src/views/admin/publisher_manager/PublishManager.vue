<template>
    <div class="page row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3">
            <h4 class="mb-4">
                <i class="fas fa-book mr-2"></i> Nhà xuất bản
            </h4>
            <PublishList v-if="filteredPublishsCount > 0" :publishes="filteredPublish"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-muted" style="min-width: 750px;">Không có sản phẩm nào.</p>
            <button class="btn btn-primary mt-3 mb-3" @click="goToAddPublisher">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>


<script>
import InputSearch from "@/components/admin/InputSearch.vue";
import PublishList from "../../../components/admin/publish_manager/PublishList.vue";
import PublishService from "@/services/publish.service";
export default {
    components: {
        InputSearch,
        PublishList,
    },
    data() {
        return {
            Publish: [],
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
            return this.Publish.map((user) => {
                const { name, address } = user;
                return [name, address].join("");
            });
        },
        filteredPublish() {
            if (!this.searchText) return this.Publish;
            return this.Publish.filter((_user, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublish[this.activeIndex];
        },
        filteredPublishsCount() {
            return this.filteredPublish.length;
        },
    },
    methods: {
        async retrievePublish() {
            try {
                this.Publish = await PublishService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublish();
            this.activeIndex = -1;
        },
        goToAddPublisher() {
            this.$router.push({ name: "publish.add" });
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