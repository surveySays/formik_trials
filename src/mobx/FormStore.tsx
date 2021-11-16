import { makeAutoObservable } from "mobx";

class FormStore {
  forms: any;

  constructor() {
    makeAutoObservable(this);
  }

  updateForms(newForm: any) {
    this.forms = newForm;
    // console.log("New Form:", newForm);
  }
}

const store = new FormStore();
export default store;
