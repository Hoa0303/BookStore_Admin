<template>
    <div class="container">
        <h4 class="text-center">Thêm sản phẩm mới</h4>
        <div class="col-md-6 mx-auto">
            <ContactForm :contact="newContact" @submit:contact="addContact" />
        </div>
        <p class="text-center">{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/admin/porduct_manager/UserForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            newContact: {
                name: '',
                email: '',
                address: '',
                phone: '',
                favorite: false
            },
            message: "",
        };
    },
    methods: {
        async addContact(data) {
            try {
                await BookService.create(data);
                this.message = "Sản phẩm mới được thêm mới thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
