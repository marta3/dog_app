export interface BreedsResponse {
  message: { [key: string]: string[] };
}

export interface BreedImageResponse {
  message: string;
}

export interface BreedWithImage {
  breed: string;
  subBreeds: string[];
  image: string;
}