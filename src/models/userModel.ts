class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public refreshToken: string,
        public createdAt: Date,
    ) { }
}

export default User;