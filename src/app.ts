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
      /* we use bind(this) so this keyword in submitHandler will refer
    to this same as used in configure method */
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
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

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    /*when form submitted, submitHandler gets triggered*/
    this.element.addEventListener("submit", this.submitHandler);
  }

  //private becoz we won't be accessing it outside of class only inside
  private attach() {
    //inserts right after begin of open tag - afterbegin, this.element - we want to render this in id='app'
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
