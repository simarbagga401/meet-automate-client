<template>
	<section>
		<div id="container">
			<v-alert color="red" prominent type="error" border="left">
				Alert: Kindly Use <span>Dummy / Sample Gmail</span> With
				<span>2FA Disabled</span> And <span>Enable Less Secure App</span> Option
				in Settings
			</v-alert>

			<div class="form">
				<div class="inputs">
					<v-text-field
						v-model="meetInfo.gmail"
						label="Gmail"
						placeholder="Your Gmail"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.password"
						label="Google Account Password"
						placeholder="Your Google Account Password"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.meetId"
						label="Meet ID"
						placeholder="Your Meeting ID"
						clearable
						outlined
					></v-text-field>
				</div>

				<div class="btns">
					<template v-for="(btn, index) in btns">
						<div :key="index" class="btn-wrapper">
							<v-btn
								icon
								:class="btn.color"
								tile
								x-large
								elevation="4"
								@click="crud(btn.type)"
							>
								<img :src="require(`../static/${btn.icon}`)" alt="" />
							</v-btn>
							<p>{{ btn.heading }}</p>
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			meetInfo: {
				gmail: '',
				password: '',
				meetId: '',
			},
			btns: [
				{
					type: 'create',
					heading: 'Schedule Meeting',
					color: 'success',
					icon: 'schedule.png',
				},
				{
					type: 'delete',
					heading: 'Delete Meeting',
					color: 'error',
					icon: 'delete_outline.png',
				},
				{
					type: 'update',
					heading: 'Update Meeting',
					color: 'warning',
					icon: 'update.png',
				},
				{
					type: 'read',
					heading: 'Get Meeting Status',
					color: 'info',
					icon: 'chrome_reader_mode.png',
				},
			],
		};
	},
	methods: {
		crud(reqType) {
			switch (reqType) {
				case 'create':
					console.log('create');
					break;
				case 'read':
					console.log('read');
					this.readHandler();
					break;
				case 'update':
					console.log('update');
					break;
				case 'delete':
					console.log('delete');
					break;

				default:
					break;
			}
		},
		async readHandler() {
			const response = await this.$axios.get(
				'https://meet-automate.herokuapp.com/meetings'
			);
			console.log(response);
		},
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
#container {
	width: 100%;
	max-width: 500px;
	max-height: 700px;
	height: 100%;
	background: rgb(175, 175, 175);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 10px;
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
		background: rgb(117, 102, 255);
	}
	.btns {
		width: 100%;
		height: 20%;
		// background: rgb(100, 232, 255);
		display: flex;
		justify-content: center;
		align-items: space-evenly;
	}
}

.btn-wrapper {
	// background: rgb(85, 82, 255);
	// border: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	width: 25%;
	height: 100%;

	p {
		font-size: 12px;
		text-align: center;
		padding-top: 10px;
		width: 60%;
		color: #494949;
	}
	span {
		font-weight: bold;
		font-size: 14px;
	}
}
</style>
