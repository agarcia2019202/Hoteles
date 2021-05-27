export class Hotel{
    constructor(
        _id: String,
        public name: String,
        public phone: Number,
        public email: String,
        public addres: String,
        public description:String,
        public descAddress: String,
        public cantReservs:number,
        public images: [],
        public users: [],
        public rooms: [],
        public features: [],
    ){}
}
