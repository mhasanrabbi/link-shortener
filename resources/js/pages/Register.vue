<template>
    <div class="container w-75 h-100">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <p class="text-danger" v-if="errors.error" v-for="(error, index) in errors.error" :key="index">{{ error }}</p>
                        <form @submit.prevent="register">
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Name</label>
                                <input type="text" class="form-control" placeholder="Enter Name" v-model="registerForm.name">
                                <p class="text-danger" v-if="errors.name" v-for="(error, index) in errors.name" :key="index">{{ error }}</p>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Enter Email" v-model="registerForm.email">
                                <p class="text-danger" v-if="errors.email" v-for="(error, index) in errors.email" :key="index">{{ error }}</p>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" placeholder="Enter Password" v-model="registerForm.password">
                                <p class="text-danger" v-if="errors.password" v-for="(error, index) in errors.password" :key="index">{{ error }}</p>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" placeholder="Confirm Password" v-model="registerForm.password_confirmation">
                                <p class="text-danger" v-if="errors.password_confirmation" v-for="(error, index) in errors.password_confirmation" :key="index">{{ error }}</p>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Register</button>
                        </form>
                        <div class="mt-2 text-center">
                            <p>Already have an account? <router-link :to="{ name: 'login' }">Login</router-link></p>
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

const registerForm = reactive({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
});

const errors = ref([]);

const register = () => {
    authStore.register(registerForm)
        .then(response => {
            router.push({name: 'login'});
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
