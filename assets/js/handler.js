async function readHandler(axios, query) {
	try {
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

async function createHandler(axios, query) {
	try {
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

async function updateHandler(axios, query) {
	try {
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
async function deleteHandler(axios, query) {
	// const query = {
	// 	gmail: 'johndoesample9@gmail.com',
	// 	password: 'johndoe@123',
	// 	enterTime: {
	// 		hour: 13,
	// 		minute: 43,
	// 		day: 6,
	// 		month: 7,
	// 		year: 2021,
	// 	},
	// 	exitTime: {
	// 		delay: 30000,
	// 	},
	// 	phoneNumber: '34899959933',
	// 	message: 'good afternoon',
	// 	meetId: 'xjw-ubfb-omo',
	// };

	try {
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
