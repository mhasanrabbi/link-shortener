<template>
    <div class="container w-75 h-100">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <p class="text-danger" v-if="errors.error" v-for="(error, index) in errors.error" :key="index">{{ error }}</p>
                        <form @submit.prevent="login">
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter Email" v-model="loginForm.email">
                                <p class="text-danger" v-if="errors.email" v-for="(error, index) in errors.email" :key="index">{{ error }}</p>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password" v-model="loginForm.password">
                                <p class="text-danger" v-if="errors.password" v-for="(error, index) in errors.password" :key="index">{{ error }}</p>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                        <div class="mt-2 text-center">
                            <p>Don't have an account? <router-link :to="{ name: 'registration' }">Register</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const router = useRouter();

const authStore = useAuthStore();

const loginForm = reactive({
    email: null,
    password: null,
});

const errors = ref([]);

const login = () => {
    authStore.login(loginForm)
        .then(response => {
            console.log(response);
            if(response.success === true) {
                router.push({name: 'home'});
            }
        })
        .catch(e => {
            if (e.response && e.response.data) {
                errors.value = e.response.data.errors;
            } else {
                errors.value = { general: ['An unexpected error occurred.'] };
            }
        })
};

</script>
