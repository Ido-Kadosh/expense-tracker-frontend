import io from 'socket.io-client';

export const SOCKET_EMIT_ADD_EXPENSE = 'add-expense';
export const SOCKET_EVENT_EXPENSE_ADDED = 'expense-added';

export const SOCKET_EMIT_UPDATE_EXPENSE = 'update-expense';
export const SOCKET_EVENT_EXPENSE_UPDATED = 'expense-updated';

export const SOCKET_EMIT_REMOVE_EXPENSE = 'remove-expense';
export const SOCKET_EVENT_EXPENSE_REMOVED = 'expense-removed';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';
export const socketService = createSocketService();

socketService.setup();

function createSocketService() {
	var socket: ReturnType<typeof io> | null = null;
	const socketService = {
		setup() {
			socket = io(BASE_URL);
		},
		on(eventName: string, cb: (...args: any[]) => void) {
			if (socket) {
				socket.on(eventName, cb);
			} else {
				console.error('socket used before initiation');
			}
		},
		off(eventName: string, cb: ((...args: any[]) => void) | null = null) {
			if (!socket) return;
			if (!cb) socket.removeAllListeners(eventName);
			else socket.off(eventName, cb);
		},
		emit(eventName: string, ...data: any) {
			if (socket) {
				socket.emit(eventName, ...data);
			} else {
				console.error('socket used before initiation');
			}
		},

		terminate() {
			socket = null;
		},
	};
	return socketService;
}
