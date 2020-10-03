export class User {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    cellPhone: string;
    role: string;
    state: string;
    documentType: string;
    documentNumber: string;
    participants: string[];
    picture:string;

    constructor(){
        this._id = null;
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.address = "";
        this.phone = "";
        this.role = "";
        this.state = "";
        this.documentType = "";
        this.documentNumber = "";
        this.participants = null;
        this.picture = "";
    }
}