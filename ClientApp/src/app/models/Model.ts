export class Model{
    categoryName: string;
    products: Array<Product>;

    constructor(){
        this.categoryName = "Telefon Kategorisi";
        this.products = [
            new Product(1, "Samsung S5",2000,true),
            new Product(2, "Samsung S6",4000,true),
            new Product(3, "Samsung S7",6000,false),
            new Product(4, "Samsung S8",7000,false),
            new Product(5, "Samsung S9",12000,true),
          ];
    }
}

export class Product{
    productId: number;
    name: string;
    price: number;
    isActive: boolean;


    constructor(productId: number, name: string, price: number, isActive: boolean){
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.isActive = isActive;
    }
}