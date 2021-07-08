<template>
	<section>
		<div id="container">
			<v-alert color="red" prominent type="error" border="left">
				Alert: Kindly Use <span>Dummy / Sample Gmail</span> With
				<span>2FA Disabled</span> And <span>Enable Less Secure App</span> Option
				in Settings
			</v-alert>
			<div class="form">
				<div class="inputs"></div>
				<div class="btns"></div>
			</div>
		</div>
	</section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
section {
	width: 100vw;
	height: 100vh;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}
#container {
	width: 90%;
	max-width: 500px;
	height: 100%;
	background: rgb(175, 175, 175);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}

.form {
	width: 100%;
	height: 80%;
	border-radius: 10px;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 10px;

	.inputs {
		width: 100%;
		height: 80%;
		background: rgb(97, 76, 76);
	}
	.btns {
		width: 100%;
		height: 20%;
		background: rgb(61, 44, 44);
		display: flex;
		justify-content: center;
		align-items: space-evenly;
	}
}

span {
	font-weight: bold;
	font-size: 14px;
}
</style>
