import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { toJS } from "mobx";


interface User {
  phone: number ;
  fullName: string;
  email: string;
  id: number;
}

class UserStore {
  user: User = { phone: 0, fullName: "", email: "", id: 0 };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ["user"],
      storage: window.localStorage,
    })
  }

    addUser =(user:User) => {
      this.user = user;
      console.log("🛒 After add:", toJS(this.user));
    }
    reset =() => { 
      return this.user = {phone: 0, fullName: "", email: "", id: 0}
    }
}

const userStore = new UserStore();

export { userStore };
