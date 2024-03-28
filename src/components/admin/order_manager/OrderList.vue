<template>
    <div>
        <div v-for="(order) in orders" :key="order._id" class="list-group mt-5">
            <div class="d-flex w-100 justify-content-between list-group-item">
                <h6>{{ order.ngayMuon }} -> {{ order.ngayTra }}</h6>
                <h5 class="mb-1">{{ order.name }}</h5>
                <p class="mb-1">
                <h6> Trạng thái:
                    <span :class="{
            'text-warning': order.status === 'Đang đợi duyệt',
            'text-info': order.status === 'Đang mượn',
            'text-primary': order.status === 'Đã trả',
            'text-danger': order.status === 'Đã hủy' || order.status === 'Quá hạn trả'
        }">
                        {{ order.status }}
                    </span>
                </h6>
                </p>
            </div>

            <div class="list-group-item">
                <div class="row">
                    <div class="col-10">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(book, bookIndex) in order.books" :key="book.bookId">
                                <strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong>
                                {{ book.title }} - Số lượng: {{ book.quantity }}
                            </li>
                        </ul>
                    </div>
                    <div class="col-2 d-flex justify-content-end align-items-center">
                        <router-link :to="{ name: 'order.edit', params: { id: order._id }, }">
                            <button class="btn btn-sm btn-success" style="white-space: nowrap;">
                                <i class="fas fa-plus"></i> Hiệu chỉnh
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        orders: { type: Array, default: [] },
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
