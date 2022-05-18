<template>
  <Card>
    <template #header>
      <img alt="user header" :src="user.picture" />
    </template>
    <template #title>
      {{ user.nickname }}
    </template>
    <template #content> Email: {{ user.email }} </template>
    <template #footer>
      <!-- <Button icon="pi pi-check" label="Save" />
      <Button
        icon="pi pi-times"
        label="Cancel"
        class="p-button-secondary"
        style="margin-left: 0.5em"
      /> -->
    </template>
  </Card>
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
