//validation
interface Validatable {
  value: string | number;
  required?: boolean; //? as optional
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// validates above objects
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    //isValid value will be set to true or false depending on situation
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  //if type is number
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

//autobind decorator
function autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  //stores method defined
  const originalMethod = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true, //set to true, so we can change it later
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}


// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //if not sure assign type HTMLElement
  element: HTMLElement;

  //literal type in constructor
  constructor(private type: 'active' | 'finished') {
    
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement; //! - for sure it is their
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // imports HTML content, pass true  for deep cloning of nested elements from html
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    //firstElementChild - gets first child
    this.element = importedNode.firstElementChild as HTMLElement;
    // add css  id to element
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent () {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

}

//ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLElement; //if not sure assign type HTMLElement
  element: HTMLFormElement;

  //input fields
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement; //! - for sure it is their
    this.hostElement = document.getElementById("app")! as HTMLElement;

    // imports HTML content, pass true  for deep cloning of nested elements from html
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //firstElementChild - gets first child
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // add css  id to element
    this.element.id = "user-input";
    //select input fields using id
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  //gets user input from input fields
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      // + sign will convert it to number
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInput();
    }
  }

  private configure() {
    /*when form submitted, submitHandler gets triggered
    we use bind(this) so this keyword in submitHandler will refer
    to this same as used in configure method*/
    this.element.addEventListener("submit", this.submitHandler);
  }

  //private becoz we won't be accessing it outside of class only inside
  private attach() {
    //inserts right after begin of open tag - afterbegin, this.element - we want to render this in id='app'
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activerPrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');