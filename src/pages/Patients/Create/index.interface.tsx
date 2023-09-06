export interface IAddPationFields {
  firstName: string;
  parentName: string;
  lastName: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  treatment: {
    name: string;
    description: string;
    price: number | undefined;
    doctor: string;
  };
}

export interface IEditPationFields {
  _id: string;
  firstName: string;
  parentName: string;
  lastName: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}
