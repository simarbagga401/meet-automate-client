<template>
	<v-alert color="success" prominent type="success" border="left">
		{{ message }}
	</v-alert>
</template>

<script>
export default {
	props: ['message'],
};
</script>

<style lang="scss" scoped>
span {
	font-weight: bold;
	font-size: 14px;
}
</style>
