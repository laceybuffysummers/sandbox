
export class LoggedInUser {
    constructor(
        public userName: string,
        public email: string,
        public token: string
    ) {
    }
}
