<template>
    <Form @submit="submitOrder" :validation-schema="orderFormSchema" class="my-form">
        <div class="form-group">
            <label for="title">Tên người mượn sách</label>
            <Field name="title" type="text" class="form-control" v-model="orderLocal.name" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngayMuon">Ngày Mượn</label>
            <Field name="ngayMuon" type="text" class="form-control" v-model="orderLocal.ngayMuon" />
            <ErrorMessage name="ngayMuon" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ngayTra">Ngày Trả</label>
            <Field name="ngayTra" type="text" class="form-control" v-model="orderLocal.ngayTra" />
            <ErrorMessage name="ngayTra" class="error-feedback" />
        </div>
        <div v-for="(book, index) in orderLocal.books" :key="index">
            <div class="form-group">
                <label>{{ 'Tên sách ' + (index + 1) }}</label>
                <Field :name="'books[' + index + '].title'" type="text" class="form-control" v-model="book.title" />
                <ErrorMessage :name="'books[' + index + '].title'" class="error-feedback" />
            </div>
            <div class="form-group">
                <label>{{ 'Số lượng sách ' + (index + 1) }}</label>
                <Field :name="'books[' + index + '].quantity'" type="number" class="form-control"
                    v-model="book.quantity" />
                <ErrorMessage :name="'books[' + index + '].quantity'" class="error-feedback" />
            </div>
        </div>
        <div class="form-group">
            <label for="status">Tình trạng</label>
            <select v-model="orderLocal.status" class="form-control">
                <option disabled value="">Chọn tình trạng</option>
                <option v-for="option in statusOptions" :value="option.value" :key="option.value">{{ option.text }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <button class="btn btn-primary me-1" type="submit" @click="submitOrder">
                <i class="fas fa-save"></i> Lưu
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:order", "delete:order"],
    props: {
        order: { type: Object, required: true }
    },
    data() {
        const orderFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên người mượn sách không được để trống.'),
            ngayMuon: yup
                .string()
                .required('Ngày Mượn không được để trống.'),
            ngayTra: yup
                .string()
                .required('Ngày Trả không được để trống.'),
            status: yup
                .string()
                .required('Tình trạng không được để trống.'),
            books: yup.array().of(
                yup.object().shape({
                    title: yup
                        .string()
                        .required('Tên sách không được để trống.'),
                    quantity: yup
                        .number()
                        .required('Số lượng không được để trống.')
                        .positive('Số lượng phải lớn hơn 0.')
                        .integer('Số lượng phải là số nguyên.')
                })
            )
        });

        return {
            orderLocal: this.order,
            orderFormSchema,
            statusOptions: [
                { value: 'Đang đợi duyệt', text: 'Đang đợi duyệt' },
                { value: 'Đang mượn', text: 'Đang mượn' },
                { value: 'Quá hạn trả', text: 'Quá hạn trả' },
                { value: 'Đã trả', text: 'Đã trả' },
                { value: 'Đã hủy', text: 'Đã hủy' }
            ],
        };
    },
    methods: {
        submitOrder() {
            console.log(this.orderLocal);
            this.$emit("submit:order", this.orderLocal);
        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
