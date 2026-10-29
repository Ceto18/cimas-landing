export interface HomeImage {
  id: number;
  uuid: string;
  position: number;
  file_url: string;
}

export interface Home {
  title: string;
  subtitle: string;
  images: HomeImage[];
}