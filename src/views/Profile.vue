<template>
  <Card>
    <template #header>
      <div><img class="user-icon" alt="user header" :src="user.picture" /></div>
    </template>
    <template #title>
      {{ user.nickname }}
    </template>
    <template #content> 
       Email: {{ user.email }}
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Save" />
      <Button
        icon="pi pi-times"
        label="Cancel"
        class="p-button-secondary"
        style="margin-left: 0.5em"
      />
    </template>
  </Card>

  <!-- 
      "nickname": "contact",
  "name": "contact@hiltonmeyer.com",
  "picture": "https://s.gravatar.com/avatar/79154d3ee3ef41fca2f3ffd606eeaf98?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fco.png",
  "updated_at": "2022-05-16T13:21:12.288Z",
  "email": "contact@hiltonmeyer.com", 
  -->
</template>

<script setup>
import Card from 'primevue/card';
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();
</script>

<style>
.p-card-header img {
  width: 100px;
  height: 100px;
}
</style>
