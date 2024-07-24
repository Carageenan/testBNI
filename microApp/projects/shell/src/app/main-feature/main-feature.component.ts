import { Component, OnInit, ViewChild } from "@angular/core";
import { Comment } from "../interfaces/comment.model";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, NgModel } from "@angular/forms";

@Component({
  selector: "app-main-feature",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./main-feature.component.html",
  styleUrl: "./main-feature.component.scss",
})
export class MainFeatureComponent implements OnInit {
  @ViewChild("createForm") userForm!: NgForm;
  @ViewChild("email") email!: NgModel;
  @ViewChild("comment") comment!: NgModel;

  comments: Comment[] = [];
  modalVisible: boolean = false;
  modalSuccessVisible: boolean = false;
  position: string = "";

  form: Comment = {
    body: "",
    email: "",
    id: null,
    name: "",
    postId: null,
  };

  ngOnInit(): void {
    this.getComment();
  }

  toggleModal(type?: string): void {
    this.modalVisible = !this.modalVisible;
    this.form.body = "";
    this.form.email = "";
    if (type == "edit") {
      this.position = "Edit";
    } else {
      this.position = "Create";
    }
  }

  toggleSuccesModal(): void {
    this.modalSuccessVisible = !this.modalSuccessVisible;
  }

  async getComment(): Promise<void> {
    const getData = await (await fetch("https://jsonplaceholder.typicode.com/comments")).json();
    this.comments = getData;
  }
  async createComment(): Promise<void> {
    if (!this.checkFields()) return;
    const create = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(this.form),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (create.ok) {
      this.toggleModal();
      this.toggleSuccesModal();
      this.getComment();
    }
  }

  handleEdit(data: Comment): void {
    this.toggleModal("edit");
    this.form = data;
  }

  async editComment(): Promise<void> {
    if (!this.checkFields()) return;
    const update = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.form.id}`, {
      method: "PUT",
      body: JSON.stringify(this.form),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (update.ok) {
      this.toggleModal();
      this.position = `Update comment with id ${this.form.id}`;
      this.toggleSuccesModal();
      this.getComment();
    }
  }

  async deleteComment(id: number): Promise<void> {
    const deleteted = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" });
    if (deleteted.ok) {
      this.position = `Delete comment with id ${id}`;
      this.toggleSuccesModal();
      this.getComment();
    }
  }

  checkFields(): boolean {
    let isValid: boolean = true;
    if (!this.form.email) isValid = false;
    if (!this.form.body) isValid = false;
    if (!isValid) {
      this.comment.control.markAsTouched();
      this.email.control.markAsTouched();
    }
    return isValid;
  }
}
