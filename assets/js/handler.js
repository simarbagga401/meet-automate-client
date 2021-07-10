async function readHandler(axios) {
	const query = {
		gmail: 'johndoesample9@gmail.com',
		password: 'johndoe@123',
		meetId: 'xjw-ubfb-omo',
	};

	try {
		const payload = await axios.get(
			'https://meet-automate.herokuapp.com/meetings',
			{ params: query }
		);
		console.log(payload);
	} catch (err) {
		if (err.response) {
			console.log(err.response.data);
		} else {
			console.log(err);
		}
	}
}

async function createHandler(axios) {
	const query = {
		gmail: 'johndoesampl@gmail.com',
		password: 'johndoe@123',
		enterTime: {
			hour: 13,
			minute: 43,
			day: 6,
			month: 7,
			year: 2021,
		},
		exitTime: {
			delay: 30000,
		},
		phoneNumber: '34899959933',
		message: 'good afternoon',
		meetId: 'xjw-ubfb-omo',
	};

	try {
		const payload = await axios.post(
			'https://meet-automate.herokuapp.com/meetings',
			query
		);

		console.log(payload);
	} catch (err) {
		if (err.response) {
			console.log(err.response.data);
		} else {
			console.log('err', err);
		}
	}
}

async function updateHandler(axios) {
	const query = {
		query: {
			gmail: 'johndoesample9@gmail.com',
			password: 'johndoe@123',
			meetId: 'xjw-ubfb-omo',
		},
		data: {
			inProgress: 'true',
		},
	};

	try {
		const payload = await axios.put(
			'https://meet-automate.herokuapp.com/meetings',
			query
		);

		console.log(payload);
	} catch (err) {
		if (err.response) {
			console.log(err.response.data);
		} else {
			console.log('err', err);
		}
	}
}
async function deleteHandler(axios) {
	const query = {
		gmail: 'johndoesampl@gmail.com',
		password: 'johndoe@123',
		enterTime: {
			hour: 13,
			minute: 43,
			day: 6,
			month: 7,
			year: 2021,
		},
		exitTime: {
			delay: 30000,
		},
		phoneNumber: '34899959933',
		message: 'good afternoon',
		meetId: 'xjw-ubfb-omo',
	};

	try {
		const payload = await axios.delete(
			'https://meet-automate.herokuapp.com/meetings',
			{ data: query }
		);

		console.log(payload);
	} catch (err) {
		if (err.response) {
			console.log(err.response.data);
		} else {
			console.log('err', err);
		}
	}
}

export { createHandler, readHandler, updateHandler, deleteHandler };
