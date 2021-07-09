<template>
	<section>
		<div id="container">
			<v-alert
				v-show="visibleForm === 0"
				color="red"
				prominent
				type="error"
				border="left"
			>
				Alert: Kindly Use <span>Dummy / Sample Gmail</span> With
				<span>2FA Disabled</span> And <span>Enable Less Secure App</span> Option
				in Settings
			</v-alert>

			<v-alert
				v-show="visibleForm === 1 || visibleForm === 2"
				color="orange"
				prominent
				type="warning"
				border="left"
			>
				Alert: Kindly Add <span>UTC Date & Time </span> For Your Meeting Below
				Instead Of Local Time.
			</v-alert>

			<div class="form">
				<div v-show="visibleForm === 0" class="inputs">
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

				<div v-show="visibleForm === 1" class="inputs">
					<v-text-field
						v-model="meetInfo.enterTime"
						label="Meeting Enter Time"
						placeholder="Meeting Enter Time"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.exitTime.delay"
						label="Meeting Leave Time Delay"
						placeholder="Leave Time (Minutes)"
						clearable
						outlined
					></v-text-field>
				</div>

				<div v-show="visibleForm === 2" class="inputs">
					<v-text-field
						v-model="meetInfo.enterTime"
						label="Meeting Enter Time (optional)"
						placeholder="Meeting Enter Time"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.exitTime.delay"
						label="Meeting Leave Time Delay (optional)"
						placeholder="Leave Time (Minutes)"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.password"
						label="Google Account Password (optional)"
						placeholder="Your Google Account Password"
						clearable
						outlined
					></v-text-field>
				</div>

				<div class="btns">
					<template v-for="(btn, index) in btns">
						<div v-show="visibleForm === 0" :key="index" class="btn-wrapper">
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

					<v-btn
						v-show="visibleForm === 1"
						class="success"
						elevation="0"
						block
						large
					>
						<img
							src="../static/schedule.png"
							alt=""
							style="margin: 0 10px 2px 0"
						/>

						Schedule Meeting</v-btn
					>

					<v-btn
						v-show="visibleForm === 2"
						class="warning"
						elevation="0"
						block
						large
					>
						<img
							src="../static/update.png"
							alt=""
							style="margin: 0 10px 2px 0"
						/>

						Update Meeting</v-btn
					>
				</div>
			</div>
		</div>
		{{ meetInfo }}
		<br />
		{{ apiResponse }}
	</section>
</template>

<script>
import {
	createHandler,
	updateHandler,
	readHandler,
	deleteHandler,
} from '../assets/js/handler';

export default {
	data() {
		return {
			visibleForm: 0,
			apiResponse: null,
			meetInfo: {
				gmail: '',
				password: '',
				meetId: '',
				enterTime: '',
				exitTime: {
					delay: '',
				},
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
					createHandler();
					break;
				case 'read':
					readHandler();
					break;
				case 'update':
					updateHandler();
					break;
				case 'delete':
					deleteHandler();
					break;

				default:
					break;
			}
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
	// background: rgb(175, 175, 175);
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
		// background: rgb(117, 102, 255);
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
}

span {
	font-weight: bold;
	font-size: 14px;
}
</style>
