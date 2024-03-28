<template>
    <div>
        <div v-for="(contact) in contacts" :key="contact._id" class="list-group mt-5">
            <div class="d-flex w-100 justify-content-between list-group-item">
                <h6>{{ contact.ngayMuon }} -> {{ contact.ngayTra }}</h6>
                <h5 class="mb-1">{{ contact.name }}</h5>
                <p class="mb-1">
                <h6> Trạng thái:
                    <span :class="{
            'text-warning': contact.status === 'Đang đợi duyệt',
            'text-info': contact.status === 'Đang mượn',
            'text-primary': contact.status === 'Đã trả',
            'text-danger': contact.status === 'Đã hủy' || contact.status === 'Quá hạn trả'
        }">
                        {{ contact.status }}
                    </span>
                </h6>
                </p>
            </div>

            <div class="list-group-item">
                <div class="row">
                    <div class="col-10">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" v-for="(book, bookIndex) in contact.books" :key="book.bookId">
                                <strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong>
                                {{ book.title }} - Số lượng: {{ book.quantity }}
                            </li>
                        </ul>
                    </div>
                    <div class="col-2 d-flex justify-content-end align-items-center">
                        <router-link :to="{ name: 'order.edit', params: { id: contact._id }, }">
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
