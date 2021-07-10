<template>
	<v-btn :class="type" elevation="0" block large>
		<img
			:src="require(`../static/${image}`)"
			alt=""
			style="margin: 0 10px 2px 0"
		/>
		{{ title }}</v-btn
	>
</template>

<script>
export default {
	props: ['type', 'title', 'image'],
};
</script>

<style lang="scss" scoped></style>
