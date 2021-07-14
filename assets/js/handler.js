async function readHandler(axios, meetInfo) {
	try {
		const query = {
			gmail: meetInfo.gmail,
			password: meetInfo.password,
			meetId: meetInfo.meetId,
		};
		const payload = await axios.get(
			'https://meet-automate.herokuapp.com/meetings',
			{ params: query }
		);
		return { type: 'success', payload };
	} catch (err) {
		if (err.response) {
			const errorResponse = { type: 'error', error: err.response.data };
			return errorResponse;
		} else {
			return { type: 'error', error: 'Unexpected Error Happened' };
		}
	}
}

async function createHandler(axios, meetInfo) {
	try {
		const query = {
			gmail: meetInfo.gmail,
			password: meetInfo.password,
			enterTime: {
				hour: +meetInfo.enterTime.hour,
				minute: +meetInfo.enterTime.minute,
				day: +meetInfo.enterTime.date.toString().slice(5, 7),
				month: +meetInfo.enterTime.date.toString().slice(8, 10),
				year: +meetInfo.enterTime.date.toString().slice(0, 4),
			},
			exitTime: {
				delay: +meetInfo.exitTime.delay * 1000,
			},
			phoneNumber: '34899959933',
			message: 'good afternoon',
			meetId: meetInfo.meetId,
		};

		const payload = await axios.post(
			'https://meet-automate.herokuapp.com/meetings',
			query
		);

		return { type: 'success', payload };
	} catch (err) {
		if (err.response) {
			return { type: 'error', error: err.response.data };
		} else {
			return { type: 'error', error: 'Unexpected Error Happened' };
		}
	}
}

async function updateHandler(axios, meetInfo) {
	try {
		const query = {
			query: {
				gmail: meetInfo.gmail,
				password: meetInfo.password,
				meetId: meetInfo.meetId,
			},
			data: {
				inProgress: meetInfo.delay,
				password: meetInfo.password,
			},
		};
		const payload = await axios.put(
			'https://meet-automate.herokuapp.com/meetings',
			query
		);

		return { type: 'success', payload };
	} catch (err) {
		if (err.response) {
			return { type: 'error', error: err.response.data };
		} else {
			return { type: 'error', error: 'Unexpected Error Happened' };
		}
	}
}
async function deleteHandler(axios, meetInfo) {
	try {
		const query = {
			gmail: meetInfo.gmail,
			password: meetInfo.password,
			meetId: meetInfo.meetId,
		};

		const payload = await axios.delete(
			'https://meet-automate.herokuapp.com/meetings',
			{ data: query }
		);

		return { type: 'success', payload };
	} catch (err) {
		if (err.response) {
			return { type: 'error', error: err.response.data };
		} else {
			return { type: 'error', error: 'Unexpected Error Happened' };
		}
	}
}

export { createHandler, readHandler, updateHandler, deleteHandler };
