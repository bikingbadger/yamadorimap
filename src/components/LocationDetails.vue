<script setup>
import { ref } from 'vue';

const emit = defineEmits(['addLocation', 'deleteLocation', 'closeModal']);
const props = defineProps({ CurrentLocation: { Object } });

//const currentLocation = props.CurrentLocation;

const addLocation = () => {
  const location = {
    tree: tree.value,
    latlng: latlng.value,
    image: image.value,
    notes: notes.value,
    isPublic: isPublic.value,
  };
  emit('addLocation', location);
};

const deleteLocation = () => {
  const location = {
    _id: _id.value,
    tree: tree.value,
    latlng: latlng.value,
    image: image.value,
    notes: notes.value,
    isPublic: isPublic.value,
  };
  emit('deleteLocation', location);
};
// import { useToast } from 'primevue/usetoast';

//     tree: event.tree || 'Test Tree',
const _id = ref(props.CurrentLocation._id || '');
const tree = ref(props.CurrentLocation.tree || '');
const latlng = ref(props.CurrentLocation.latlng || '');
//     image: event.image || '',
const image = ref('');
//     notes: event.notes || '',
const notes = ref(props.CurrentLocation.notes || '');
//     public: event.public || false,
const isPublic = ref(props.CurrentLocation.public || '');

const onUpload = (event) => {
  image.value = event.files;
};
</script>

<template>
  <form>
    <span class="p-float-label">
      <InputText id="tree" type="text" v-model="tree" />
      <label for="tree">Tree</label>
    </span>
    <h5>Image</h5>
    <FileUpload
      mode="basic"
      name="treeImage[]"
      url="./upload"
      accept="image/*"
      :maxFileSize="1000000"
      @upload="onUpload"
    />
    <h5>Notes</h5>
    <Textarea v-model="notes" :autoResize="true" rows="5" cols="30" />
    <h5>Public</h5>
    <div class="field-checkbox">
      <Checkbox id="binary" v-model="isPublic" />
    </div>
    <Button @click="addLocation">Save</Button>
    <Button @click="deleteLocation">Delete</Button>
  </form>
</template>

<style></style>
