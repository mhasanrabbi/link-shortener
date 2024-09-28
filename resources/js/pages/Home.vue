<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'home' }">Home</router-link>
        <button type="button" class="btn btn-sm btn-danger mt-2" @click="logout()">Logout</button>
      </div>
    </nav>
  </template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
    localStorage.removeItem("access_token");
    router.push({ name: "login" });
};

</script>
