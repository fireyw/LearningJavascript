const Car=(function(){

    const carProps= new WeakMap();

    class Car{
        constructor(make, model){
            this.make=make;
            this.model=model;
            this._useGears= ['P','N', 'R', 'D']
            carProps.set(this, {userGear: this._useGears[0]});
        }

        get userGear(){return carProps.get(this)._useGear;}
        set userGear(value){
            if(this.useGears.indexOf(value)<0)
                throw new Error(`Invalid gear: ${value}`);
            carProps.get(this)._useGear=value;
        }

        shift(gear){

            this.useGear=gear;
        }
    }

    console.log(typeof Car);

    return Car;
})


//
 const car1= new Car("Tesla", "Model S");
// const car2= new Car("Mazda", "3i");
//
// car1.shift('D');
// car1.shift('R');