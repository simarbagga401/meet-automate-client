<template>
	<div>
		<v-alert v-if="custom" color="red" prominent type="error" border="left">
			{{ message }}
		</v-alert>
		<v-alert v-else color="red" prominent type="error" border="left">
			Alert: Kindly Use <span>Dummy / Sample Gmail</span> With
			<span>2FA Disabled</span> And <span>Enable Less Secure App</span> Option
			in Settings
		</v-alert>
	</div>
</template>

<script>
export default {
	props: ['custom', 'message'],
};
</script>

<style lang="scss" scoped>
span {
	font-weight: bold;
	font-size: 14px;
}
</style>
