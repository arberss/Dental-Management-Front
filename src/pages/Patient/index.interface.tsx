export interface IPatient {
  _id: string;
  firstName: string;
  parentName: string;
  lastName: string;
  dateOfBirth: string;
  contactNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  treatments: {
    name: string;
    description: string;
    price: 0;
    doctor: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
