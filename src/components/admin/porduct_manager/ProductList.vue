<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr class="text-center ">
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Image</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product._id" :class="{ active: index === activeIndex }"
                    @click="updateActiveIndex(index)">
                    <td>{{ product.title }}</td>
                    <td>{{ product.author }}</td>
                    <td> {{ product.publisher }} </td>
                    <td>{{ product.genre }}</td>
                    <td class="text-center">
                        <!-- Sử dụng phần tử <img> để hiển thị hình ảnh từ URL -->
                        <img :src="product.imageUrl" alt="Hình ảnh" style="max-width: 100px; max-height: 100px;" />
                    </td>
                    <td>{{ product.quantity }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{ name: 'product.edit', params: { id: product._id }, }" class="nav-link">
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
        products: { type: Array, default: [] },
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
