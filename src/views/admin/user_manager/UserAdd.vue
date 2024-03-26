<template>
    <div class="container">
        <h4 class="text-center">Thêm Liên hệ</h4>
        <div class="col-md-6 mx-auto">
            <ContactForm :contact="newContact" @submit:contact="addContact" />
        </div>
        <p class="text-center">{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/admin/user_manager/UserForm.vue";
import ContactService from "@/services/contact.service";
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
                await ContactService.create(data);
                this.message = "Liên hệ được thêm mới thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
