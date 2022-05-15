<template>
  <pre><code>{{ user }}</code></pre>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { user, isAuthenticated } = useAuth0();
    return { user, isAuthenticated };
  },
};
</script>

<style></style>
