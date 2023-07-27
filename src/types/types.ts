export interface Hero {
  name: string;
  description: string;
  element: string;
  id: string | number;
}

export interface Filter {
  element: string;
  label: string;
  id: string | number;
  className: string;
}
