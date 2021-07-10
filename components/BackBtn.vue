<template>
	<v-btn
		v-show="visibleForm === 1 || visibleForm === 2"
		style="margin: 10px 0px"
		icon
		class="white"
		x-large
		elevation="4"
		@click="visibleForm === 0"
	>
		<img src="../static/back.png" alt="" />
	</v-btn>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
