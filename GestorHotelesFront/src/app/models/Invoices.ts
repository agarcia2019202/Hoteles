export class Invoices {
    constructor(
        public number: Number,    
        public serie: String,
        public date: Date,
        public users: [],
        public features: [],
        public reservations: [],
        public totalNet: Number,
        public total: Number,
        public cash: Number,
        public remaining: Number
    ){

    }
}