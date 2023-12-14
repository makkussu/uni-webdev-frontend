import { HttpClient } from '@/api/HttpClient.ts';

interface ICustomer {
	id: bigint;
	nickname: string;
	password: string;
	newUsername?: string;
	newPassword?: string;
}

interface ICustomerNetwork extends ICustomer {
	http: HttpClient;

	login: () => void;
	register: () => void;
	update: () => void;
	delete: () => void;

}

export type TCustomer = {
	id: bigint;
	nickname: string;
	password: string;
};

export class Customer implements ICustomerNetwork {
	isLogged: bool = false;

	constructor() {
		this.id = 0;
		this.isLogged = false;
		this.http = new HttpClient();
	}

	jsonify(): string {
		return JSON.stringify({
			id: this.id,
			username: this.nickname,
			password: this.password,
			newUsername: this.newUsername,
			newPassword: this.newPassword,
		});
	}

	retrieve(): Promise<TCustomer> {
		var promise: Promise<TCustomer> = this.http.get(null, '/users/' + 'admin');
		return promise;
	}

	login(): Promise<bool> {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		console.log(data);

		var promise: Promise<bool> = this.http.post(dataObject, '/users/login');
		return promise;
	}

	register(): Promise<ICustomer> {
		let data: string = this.jsonify();
		const dataObject = {
			headers: {
				'Content-Type': 'application/json',
			},
			data,
		};

		console.log(data);

		var promise: Promise<ICustomer> = this.http.put(dataObject, '/users/register');
		return promise;
	}

	updateUsername(): Promise<bool> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/update/username');
	}

	updatePassword(): Promise<bool> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/update/password');
	}

	delete(): Promise<TCustomer> {
		let data: string = this.jsonify();
		console.log(data);

		this.http.post(data, 'users/delete');
	}
}
