Introducción
Este proyecto es una aplicación Angular diseñada para buscar y mostrar razas de perros. Utiliza servicios para obtener los datos de las razas y componentes para presentar esta información al usuario.

Instalación
Sigue estos pasos para configurar el proyecto en tu entorno local:

Clona el repositorio:
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instala las dependencias:

npm install
Inicia el servidor de desarrollo:

ng serve
La aplicación estará disponible en http://localhost:4200.

Estructura del Proyecto
La estructura básica del proyecto es la siguiente:

src/
|-- app/
|   |-- breed-search/
|   |   |-- breed-search.component.ts
|   |   |-- breed-search.component.html
|   |   |-- breed-search.component.scss
|   |   |-- breed-search.component.spec.ts
|   |-- services/
|   |   |-- dog.service.ts
|   |   |-- breed.service.ts
|   |-- models/
|   |   |-- breed.interface.ts
|-- assets/
|-- environments/
|-- styles.scss
|-- index.html
|-- main.ts
Componentes Principales
BreedSearchComponent
Este componente es responsable de buscar y mostrar las razas de perros. Aquí se realiza la llamada al DogService para obtener la lista de razas.

Métodos Importantes
ngOnInit(): Se llama al inicializar el componente y obtiene las razas de perros mediante DogService.
typescript
Copiar código
ngOnInit(): void {
  this.dogService.getBreeds().subscribe(breeds => {
    this.breeds = breeds;
    this.filteredBreeds = breeds;
  });
}
Servicios
DogService
Este servicio se encarga de obtener los datos de las razas de perros desde una API externa.

Métodos Importantes
getBreeds(): Devuelve un observable con la lista de razas de perros.
getBreeds(): Observable<Breed[]> {
  return this.http.get<Breed[]>(this.apiUrl);
}
BreedService
Este servicio gestiona la raza seleccionada por el usuario.

Métodos Importantes
setSelectedBreed(breed: Breed): Establece la raza seleccionada.

setSelectedBreed(breed: Breed): void {
  this.selectedBreed = breed;
}
Ejecución de Tests
Para ejecutar los tests del proyecto, utiliza el siguiente comando:

ng test
Este comando ejecutará los tests definidos en el proyecto y mostrará los resultados en la consola.

Test de BreedSearchComponent
El test verifica que el método getBreeds del DogService se llama correctamente y que las razas obtenidas se asignan a las propiedades breeds y filteredBreeds.

it('should fetch and set breeds correctly', () => {
  const mockBreeds = [
    { breed: 'hound', image: 'https://example.com/hound.jpg', subBreeds: [] },
    { breed: 'pug', image: 'https://example.com/pug.jpg', subBreeds: [] }
  ];
  
  dogService.getBreeds.and.returnValue(of(mockBreeds));
  component.ngOnInit();
  fixture.detectChanges();
  
  expect(dogService.getBreeds).toHaveBeenCalled();
  expect(component.breeds).toEqual(mockBreeds);
  expect(component.filteredBreeds).toEqual(mockBreeds);
});
