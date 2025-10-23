import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { toJS } from "mobx";


export interface products {
  id: number;
  name: string;
  image: string;
  finalPrice: number;
  count :number
}
interface Cart {
    productList : products[]
}

class CartStore {
  cart:Cart = {productList :[]};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "cartStore",
      properties: ["cart"],
      storage: window.localStorage,
    }).then(() => {
      // Nếu cart chưa có productList (vì localStorage rỗng)
      if (!this.cart?.productList) {
        this.cart = { productList: [] };
      }
    });
  }

    addToCart =(product:products) => {
       const existingProduct = this.cart.productList.find(
          (item) => item.id === product.id
        );

        if (!existingProduct) {
          this.cart.productList = [...this.cart.productList, { ...product, count: product.count }];
        } else {
          this.cart.productList = this.cart.productList.map((item) =>
            item.id === product.id ? { ...item, count: item.count + (product.count) } : item
          );
        }
        console.log("🛒 After add:", toJS(this.cart.productList));
    }
    increaseCount=(id:number) => {
      this.cart.productList =this.cart.productList.map((item) => { 
         if(item.id ==id){
             item.count ++
         }
         return item
      })
    }
    decreaseCount =(id:number) => { 
      this.cart.productList =this.cart.productList.map((item) => {
        if(item.id ==id && item.count>1){
           item.count --
        }
        return item
      })
    }
    removeFromCart =(id:number) => { 
       this.cart.productList =this.cart.productList.filter((item) => item.id !==id)
    }
    reset =() => { 
      return this.cart.productList =[] 
    }
}

const cartStore = new CartStore();

export { cartStore };



 // import { cartStore } from "../../../../Store/cartStore";
  // const handleAddToCart = (product:products) => { 
  //     console.log("🚀 ~ handleAddToCart ~ product:", product)
  //     cartStore.addToCart(product)
  //  }

  // // lấy 
  //  const cart = cartStore.cart
  //  console.log("🚀 ~ ProductAll ~ cart:", cart)

//   @action
//   async login(username: string, password: string) {
//     const res = await authApi.login({ username, password });
//     setToken(res.data.token);
//     this.token = res.data.token;
//   }

//   @action
//   async getProfile() {
//     const res = await authApi.profile();

//     this.info = res.data;
//   }

//   @action
//   logout = () => {
//     if (!$isDev) {
//       const token = this.token;
//       //   oneSignal.userLogout(token);
//     }
//     setToken("");
//     this.token = "";
//   };