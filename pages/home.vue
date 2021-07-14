<template>
	<section>
		<div id="container">
			<RedAlert v-show="visibleForm === 0" />
			<RedAlert
				v-show="apiResponseStatus === 'error'"
				:message="apiResponse"
				:custom="true"
			/>
			<GreenAlert
				v-show="apiResponseStatus === 'success'"
				:message="apiResponse"
			/>
			<OrangeAlert v-show="visibleForm === 1 || visibleForm === 2" />

			<v-progress-circular
				v-if="loading"
				indeterminate
				color="pink"
				style="margin: 10px"
			></v-progress-circular>

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

				<div v-show="visibleForm === 1" class="inputs">
					<!-- DATE PICKER START-->

					<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="meetInfo.enterTime.date"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template #activator="{ on, attrs }">
							<v-text-field
								v-model="meetInfo.enterTime.date"
								label="Picker in menu"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="meetInfo.enterTime.date"
							no-title
							scrollable
							color="pink"
						>
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.menu.save(meetInfo.enterTime.date)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>

					<!-- DATE PICKER END-->

					<v-text-field
						v-model="meetInfo.enterTime.hour"
						label="Meeting Enter Hour"
						placeholder="Hour (UTC FORMAT)"
						clearable
						outlined
					></v-text-field>

					<v-text-field
						v-model="meetInfo.enterTime.minute"
						label="Meeting Enter Minutes"
						placeholder="Minutes (UTC FORMAT)"
						clearable
						outlined
					></v-text-field>

					<!-- TIME PICKER START-->
					<!-- <v-menu
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
							format="24hr"
							@click:minute="$refs.menu.save(meetInfo.time)"
						></v-time-picker>

						<v-btn text color="primary" @click="$refs.menu.save(meetInfo.time)">
							OK
						</v-btn>
					</v-menu> -->

					<!-- TIME PICKER END-->
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
						@click.native="crud('create')"
					/>

					<BlockBtn
						v-show="visibleForm === 2"
						type="warning"
						title="Update Meeting"
						image="update.png"
						@click.native="crud('update')"
					/>
				</div>
			</div>
		</div>
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
			apiResponseStatus: null,
			meetInfo: {
				gmail: '',
				password: '',
				meetId: '',
				enterTime: {
					hour: '',
					minute: '',
					day: '',
					date: '',
				},
				exitTime: {
					delay: '',
				},
			},
			btns: [
				{
					type: 'setVisibleFormTo1',
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
					type: 'setVisibleFormTo2',
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
			loading: false,
		};
	},
	methods: {
		async crud(reqType) {
			switch (reqType) {
				case 'create': {
					for (const key in this.meetInfo) {
						if (this.meetInfo[key] === '') {
							this.apiResponseStatus = 'error';
							this.apiResponse = 'Err: Params are undefined';
							return;
						}
					}
					this.loading = true;
					const response = await createHandler(this.$axios, this.meetInfo);
					this.loading = false;

					if (response.type === 'success') {
						this.apiResponseStatus = 'success';
						this.apiResponse = `Meeting ${response.payload.data.meetId} Scheduled Successfully`;
					} else {
						this.apiResponseStatus = 'error';
						this.apiResponse = response.error;
					}
					break;
				}
				case 'read': {
					this.loading = true;
					const response = await readHandler(this.$axios, this.meetInfo);
					this.loading = false;
					if (response.type === 'success') {
						this.apiResponseStatus = 'success';
						this.apiResponse = response.payload.data.inProgress
							? 'Meeting In Progress'
							: 'Meeting Not In Progress';
					} else {
						this.apiResponseStatus = 'error';
						this.apiResponse = response.error;
					}
					break;
				}
				case 'update': {
					this.loading = true;
					const response = await updateHandler(this.$axios, this.meetInfo);
					this.loading = false;

					if (response.type === 'success') {
						this.apiResponseStatus = 'success';
						this.apiResponse = `Meeting ${response.payload.data.meetId} Updated Successfully`;
					} else {
						this.apiResponseStatus = 'error';
						this.apiResponse = response.error;
					}
					break;
				}
				case 'delete': {
					this.loading = true;
					const response = await deleteHandler(this.$axios, this.meetInfo);
					this.loading = false;

					if (response.type === 'success') {
						this.apiResponseStatus = 'success';
						this.apiResponse = `Meeting ${response.payload.data.meetId} Deleted Successfully`;
					} else {
						this.apiResponseStatus = 'error';
						this.apiResponse = response.error;
					}
					break;
				}
				case 'setVisibleFormTo1':
					this.visibleForm = 1;
					break;

				case 'setVisibleFormTo2':
					this.visibleForm = 2;
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
