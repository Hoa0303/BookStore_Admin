<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead class="thead-dark text-center ">
                <tr>
                    <th scope="col">Người mượn</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Ngày trả</th>
                    <template v-for="book in contacts[0].books" :key="book.bookId">
                        <th scope="col">Sách</th>
                        <th scope="col">Số lượng</th>
                    </template>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(contact, index) in contacts" :key="contact._id" :class="{ active: index === activeIndex }"
                    @click="updateActiveIndex(index)">
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.ngayMuon }}</td>
                    <td>{{ contact.ngayTra }}</td>
                    <template v-for="book in contact.books" :key="book.bookId">
                        <td>{{ book.title }}</td>
                        <td>{{ book.quantity }}</td>
                    </template>
                    <td>{{ contact.status }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{ name: 'order.edit', params: { id: contact._id }, }" class="nav-link">
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
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    },

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
