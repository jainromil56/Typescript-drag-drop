// Code goes here!
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLElement; //if not sure assign type HTMLElement
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement; //! - for sure it is their
    this.hostElement = document.getElementById("app")! as HTMLElement;

    // imports HTML content, pass true for deep cloning of nested elements from html
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //firstElementChild - gets first child
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    //inserts right after begin of open tag - afterbegin, this.element - we want to render this in id='app'
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
