<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Tên</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(publish, index) in publishes" :key="publish._id" :class="{ active: index === activeIndex }"
                    @click="updateActiveIndex(index)">
                    <td>{{ publish.name }}</td>
                    <td>{{ publish.address }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{ name: 'publish.edit', params: { id: publish._id }, }" class="nav-link">
                                <span class="btn btn-sm btn-success" style="white-space: nowrap;">
                                    <i class="fas fa-plus"></i> Hiệu chỉnh
                                </span>
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        publishes: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<style scoped>
.table {
    width: 100%;
}

.table th,
.table td {
    vertical-align: middle;
}

.table tbody tr:hover {
    background-color: #f2f2f2;
}

.active {
    background-color: #d3d3d3;
}
</style>
