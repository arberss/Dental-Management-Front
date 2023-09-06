export interface IAddPatientTreatment {
  name: string;
  description: string;
  price: number | undefined;
  doctor: string;
}

export interface Treatment {
  _id: string;
  name: string;
  description: string;
  price: number;
  doctor: string;
}