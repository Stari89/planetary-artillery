export interface JoinGameRequestPayload {
	username: string;
}

export interface JoinGameResponsePayload {
	status: 'ok' | 'error';
}
