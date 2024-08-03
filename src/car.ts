export interface Car {
    id:string
    make:string
    model:string
    year:number
}

let cars:Car[] = [
    {   id:'shandf@2rdfnlaj',
        make:'honda',
        model:'city',
        year:2016
    }
];

export const getCars = ()=>cars

export const getCarById = (id:string)=> cars.find(car => car.id === id)

export const addCar = (car: Car) => {
    cars.push(car);
    return car;
};

export const updateCar = (id: string, updatedCar: Partial<Car>) => {
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) return null;
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    return cars[carIndex];
};

export const deleteCar = (id: string) => {
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) return null;
    const deletedCar = cars[carIndex];
    cars.splice(carIndex, 1);
    return deletedCar;
  };

