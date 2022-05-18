<template>
  <Card>
    <template #header>
      <Avatar
        label="User Icon"
        :image="user.picture"
        size="large"
        shape="circle"
        v-badge.info="4"
      />
    </template>
    <template #title>
      {{ user.nickname }}
    </template>
    <template #content>
      <label for="name">Name</label>
      <InputText id="name" type="text" v-model="user.nickname" />
      <label for="email">Email</label>
      <InputText id="email" type="text" v-model="user.email" />
      <label for="icon">Icon</label>
      <InputText id="icon" type="text" v-model="user.picture" />
    </template>
    <template #footer> </template>
  </Card>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();
</script>

<style></style>
