<template>
    <div>
        <div v-for="(order) in sortedOrders" :key="order._id" class="list-group mt-5">
            <div class="d-flex w-100 justify-content-between list-group-item">
                <h6>{{ order.ngayMuon }} -> {{ order.ngayTra }}</h6>
                <h5 class="mb-1">Người mượn: {{ order.name }}</h5>
                <p class="mb-1">
                <h6> Trạng thái:
                    <span :class="{
                        'text-warning': order.status === 'Đang đợi duyệt',
                        'text-info': order.status === 'Đang mượn',
                        'text-primary': order.status === 'Đã trả',
                        'text-danger': order.status === 'Đã hủy' || order.status === 'Quá hạn trả' || order.status === 'Yêu cầu hủy đơn'
                    }">
                        {{ order.status }}
                    </span>
                </h6>
                </p>
            </div>

            <div class="list-group-item">
                <div class="row">
                    <div class="col-8">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(book, bookIndex) in order.books" :key="book.bookId">
                                <strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong>
                                {{ book.title }} - Số lượng: {{ book.quantity }}
                            </li>
                        </ul>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center">
                        <router-link :to="{ name: 'order.edit', params: { id: order._id }, }">
                            <button class="btn btn-sm btn-success" style="white-space: nowrap;">
                                <i class="fas fa-plus"></i> Hiệu chỉnh
                            </button>
                        </router-link>

                        <button class="btn btn-sm btn-primary ms-2" style="white-space: nowrap;"
                            @click="checkOrder(order._id)" :disabled="order.status !== 'Đang đợi duyệt'">
                            <i class="fas fa-check"></i> Duyệt đơn
                        </button>

                        <button class="btn btn-sm btn-danger ms-2" style="white-space: nowrap;"
                            @click="cancelOrder(order._id)" :disabled="order.status !== 'Yêu cầu hủy đơn'">
                            <i class="fas fa-times"></i> Xác nhận hủy đơn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderService from '@/services/order.service';
import BookService from '@/services/book.service';
export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    computed: {
        sortedOrders() {
            return this.orders.slice().sort((a, b) => {
                const statusOrder = {
                    'Đang đợi duyệt': 1,
                    'Yêu cầu hủy đơn': 2,
                    'Quá hạn trả': 3,
                    'Đang mượn': 4,
                    'Đã trả': 5,
                    'Đã hủy': 6,
                };
                return statusOrder[a.status] - statusOrder[b.status];
            });
        }
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async checkOrder(id) {
            const submitData = {
                status: "Đang mượn",
            };
            const check = await OrderService.update(id, submitData);
            if (check) {
                alert("Duyệt đơn thành công!");
                window.location.reload();
            }
        },
        async cancelOrder(id) {
            const Order = await OrderService.get(id);
            if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
                const submitData = {
                    status: "Đã hủy",
                    req: 0
                };
                const check = await OrderService.update(id, submitData);
                for (let i = 0; i < Order.books.length; i++) {
                    const bookId = Order.books[i].bookId;
                    const bookInfo = await BookService.get(bookId);
                    const data = {
                        quantity: bookInfo.quantity + Order.books[i].quantity,
                    }
                    await BookService.update(bookId, data)
                }
                if (check) {
                    alert("Hủy đơn thành công!");
                    window.location.reload();
                }
            }
        }
    },
};
</script>
