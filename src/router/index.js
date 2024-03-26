import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/admin/user_manager/UserBook.vue";
import Product from "@/views/admin/product_manager/BookManager.vue"
import OrderManager from "@/views/admin/order_manager/OrderManager.vue";
const routes = [
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
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;