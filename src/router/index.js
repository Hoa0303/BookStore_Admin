import { createWebHistory, createRouter } from "vue-router";
// Auth
import Register from "@/views/auth/RegisterPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";

// Function admin
import ContactBook from "@/views/admin/user_manager/UserBook.vue";
import Product from "@/views/admin/product_manager/BookManager.vue"
import OrderManager from "@/views/admin/order_manager/OrderManager.vue";
import PublishManager from "@/views/admin/publisher_manager/PublishManager.vue";
const routes = [
    //Auth
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/admin",
        name: "adminpage",
        component: Product,
    },
    {
        path: "/",
        name: "login",
        component: LoginPage,
    },

    // User_manager
    {
        path: "/admin/user_manager",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/admin/user_manager/:id",
        name: "contact.edit",
        component: () => import("@/views/admin/user_manager/UserEdit.vue"),
        props: true
    },
    // Product_manager
    {
        path: "/admin/product_manager",
        name: "book_manager",
        component: Product,
    },
    {
        path: "/admin/product_manager/:id",
        name: "product.edit",
        component: () => import("@/views/admin/product_manager/ProductEdit.vue"),
        props: true
    },
    {
        path: "/admin/product_managar/addProduct",
        name: "product.add",
        component: () => import("@/views/admin/product_manager/ProductAdd.vue"),
        props: true
    },
    // Order_manager
    {
        path: "/admin/order_manager",
        name: "order_manager",
        component: OrderManager,
    },
    {
        path: "/admin/order_manager/:id",
        name: "order.edit",
        component: () => import("@/views/admin/order_manager/OrderEdit.vue"),
        props: true
    },
    // Publish_manager
    {
        path: "/admin/publish_manager",
        name: "publish_manager",
        component: PublishManager,
    },
    {
        path: "/admin/publish_manager/:id",
        name: "publish.edit",
        component: () => import("@/views/admin/publisher_manager/PublishEdit.vue"),
        props: true,
    },
    {
        path: "/admin/publish_manager/add",
        name: "publish.add",
        component: () => import("@/views/admin/publisher_manager/PublishAdd.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;