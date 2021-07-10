<template>
	<section>
		<div id="container">
			<RedAlert v-show="visibleForm === 0" />
			<OrangeAlert v-show="visibleForm === 1 || visibleForm === 2" />

			<div class="form">
				<BackBtn
					v-show="visibleForm === 1 || visibleForm === 2"
					class="back-btn"
					@click.native="visibleForm = 0"
				/>

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

				<!-- TIME PICKER START-->
				<div v-show="visibleForm === 1" class="inputs">
					<v-menu
						ref="menu"
						v-model="menu2"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="meetInfo.time"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="290px"
					>
						<template #activator="{ on, attrs }">
							<v-text-field
								v-model="meetInfo.time"
								label="Picker in menu"
								prepend-icon="mdi-clock-time-four-outline"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-time-picker
							v-if="menu2"
							v-model="meetInfo.time"
							header-color="pink"
							full-width
							@click:minute="$refs.menu.save(meetInfo.time)"
						></v-time-picker>
					</v-menu>

					<!-- TIME PICKER END-->
					<!-- DATE PICKER START-->

					<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="meetInfo.date"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template #activator="{ on, attrs }">
							<v-text-field
								v-model="meetInfo.date"
								label="Picker in menu"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="meetInfo.date"
							no-title
							scrollable
							color="pink"
						>
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.menu.save(meetInfo.date)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>

					<!-- DATE PICKER END-->

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

					<BlockBtn
						v-show="visibleForm === 1"
						type="success"
						title="Schedule Meeting"
						image="schedule.png"
					/>

					<BlockBtn
						v-show="visibleForm === 2"
						type="warning"
						title="Update Meeting"
						image="update.png"
					/>
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
			menu: null,
			menu2: null,
			apiResponse: null,
			meetInfo: {
				gmail: '',
				password: '',
				meetId: '',
				time: '',
				date: '',
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
					createHandler(this.$axios);
					this.visibleForm = 1;
					break;
				case 'read':
					readHandler(this.$axios);
					break;
				case 'update':
					updateHandler(this.$axios);
					this.visibleForm = 2;
					break;
				case 'delete':
					deleteHandler(this.$axios);
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
	align-items: flex-start;
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
