<template>
    <Form @submit="submitProduct" :validation-schema="ProductFormSchema" class="my-form">
        <div class="form-group">
            <label for="title">Tên</label>
            <Field name="title" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Địa chỉ</label>
            <Field name="author" type="text" class="form-control" v-model="productLocal.address" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary me-1" type="submit">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="productLocal._id" class="btn btn-danger" @click="deleteContact">
                <i class="fas fa-trash"></i> Xóa
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
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const ProductFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
            author: yup
                .string()
                .required("Tác giả phải có giá trị.")
                .max(50, "Tác giả có nhiều nhất 50 ký tự."),
        });
        return {
            productLocal: this.product,
            ProductFormSchema,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteContact() {
            this.$emit("delete:product", this.productLocal.id);
        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
