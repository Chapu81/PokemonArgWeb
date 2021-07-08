<template>
<v-progress-circular
	:size="70"
	:width="7"
	:color="color ? color : $store.getters.color_app" 
	indeterminate
	class="spinner"
></v-progress-circular>
</template>

<script>
export default {
    name: 'loader',
    props: ['color'],
}
</script>

<style scoped>

</style>