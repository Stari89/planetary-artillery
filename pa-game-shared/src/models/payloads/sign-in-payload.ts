export interface SignInRequestPayload {
	username: string;
}

export interface SignInResponsePayload {
	status: 'ok' | 'error';
}
