<template>
	<section>
		<div id="container">
			<Illustration :width="illustration.width" :height="illustration.height" />
			<div class="text">
				<h2><span>Automate</span> All Your Google Meetings With Ease!</h2>
				<p>Schedule Details About Your Google Meeting And Forget About Them!</p>
			</div>

			<v-btn elevation="0" outlined x-large to="/home"> Get Started! </v-btn>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			illustration: {
				width: 350,
				height: 200,
			},
		};
	},
};
</script>

<style scoped lang="scss">
section {
	width: 100vw;
	height: 100vh;
	padding: 10px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
}
.text {
	width: 100%;
	height: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	// background: rgb(255, 140, 140);

	p {
		text-align: center;
		// background: rgb(255, 128, 128);
		width: 60%;
	}
	span {
		color: #ec407a;
		font-weight: 500;
	}
	h2 {
		text-align: center;
		font-weight: 400;
		width: 60%;
		// background: rgb(255, 117, 117);
	}
}
#container {
	width: 100%;
	max-width: 500px;
	max-height: 700px;
	height: 100%;
	// background: rgb(175, 175, 175);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 10px;
}
</style>
