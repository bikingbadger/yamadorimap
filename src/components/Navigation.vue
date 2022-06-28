<template>
  <Menubar v-if="isAuthenticated" :model="itemsLoggedOn">
    <template #start>
      <router-link to="/">
        <img alt="logo" src="/assets/bonsai.png" height="40" class="mr-2" />
      </router-link>
    </template>
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>

  <Menubar v-if="!isAuthenticated" :model="itemsLoggedOut">
    <template #start
      ><router-link to="/">
        <img
          alt="logo"
          src="/assets/bonsai.png"
          height="40"
          class="mr-2"
        /> </router-link
    ></template>
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Menubar from 'primevue/menubar';
const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

const itemsLoggedOn = ref([
  {
    label: 'Map',
    icon: 'pi pi-fw pi-map',
    to: '/map',
  },
  // {
  //   label: 'Edit',
  //   icon: 'pi pi-fw pi-pencil',
  //   items: [
  //     {
  //       label: 'New',
  //       icon: 'pi pi-fw pi-plus',
  //       items: [
  //         {
  //           label: 'Tree',
  //           icon: 'pi pi-fw pi-tree',
  //         },
  //         {
  //           label: 'Video',
  //           icon: 'pi pi-fw pi-video',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Delete',
  //       icon: 'pi pi-fw pi-trash',
  //     },
  //   ],
  // },
  // {
  //   label: 'About',
  //   icon: 'pi pi-fw pi-calendar',
  //   to: '/about',
  // },
  // {
  //   label: 'User',
  //   icon: 'pi pi-fw pi-user',
  //   to: '/profile',
  // },
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      logout({ returnTo: window.location.origin });
    },
  },
]);

const itemsLoggedOut = ref([
  {
    label: 'About',
    icon: 'pi pi-fw pi-calendar',
    to: '/about',
  },
  {
    label: 'Login',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      loginWithRedirect();
    },
  },
]);
</script>

<style>
.p-inputtext {
  width: 100%;
}
</style>
