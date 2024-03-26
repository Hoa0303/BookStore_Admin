<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema" class="my-form">
        <div class="form-group">
            <label for="title">Tiêu đề</label>
            <Field name="title" type="text" class="form-control" v-model="contactLocal.title" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="contactLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="genre">Thể loại</label>
            <Field name="genre" type="text" class="form-control" v-model="contactLocal.genre" />
            <ErrorMessage name="genre" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="imageUrl">Hình ảnh (URL)</label>
            <Field name="imageUrl" type="text" class="form-control" v-model="contactLocal.imageUrl" />
            <ErrorMessage name="imageUrl" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field name="quantity" type="tel" class="form-control" v-model="contactLocal.quantity" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary me-1" type="submit">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="contactLocal._id" class="btn btn-danger" @click="deleteContact">
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
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
            author: yup
                .string()
                .required("Tác giả phải có giá trị.")
                .max(50, "Tác giả có nhiều nhất 50 ký tự."),
            genre: yup
                .string()
                .required("Thể loại phải có giá trị.")
                .max(50, "Thể loại có nhiều nhất 50 ký tự."),
            imageUrl: yup.string().url("Hình ảnh không hợp lệ."),
            quantity: yup
                .number()
                .required("Số lượng phải có giá trị.")
                .positive("Số lượng phải lớn hơn 0.")
                .integer("Số lượng phải là số nguyên.")
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal.id);
        }
    },
};
</script>

<style scoped>
.my-form .form-group {
    margin-bottom: 20px;
}
</style>
