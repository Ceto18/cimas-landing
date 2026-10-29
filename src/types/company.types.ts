export interface CompanyValue {
  name: string;
  position: number;
}

export interface Company {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: CompanyValue[];
}