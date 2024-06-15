export interface Account {
  user_id: string;
  name: string;
  email: string;
  phone_number?: string;
}

export interface Class {
  class_id: string;
  class_room: string;
  class_name: string;
  class_semester: string;
  class_period: string;
  number_of_classes: number;
}

export interface ClassRegistration {
  user_id: string;
  class_id: string;
  absences: number;
}
