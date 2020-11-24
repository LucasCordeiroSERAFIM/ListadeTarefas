import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todos } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public todos: Todos[]=[];//importado do models
  public title: String = 'Minhas Tarefas';
  public form: FormGroup


  constructor(private fb:FormBuilder) {   

    this.form =this.fb.group({
    tarefa:['',Validators.compose([
     Validators.minLength(3),
     Validators.maxLength(60),
     Validators.required,
      ])]
    }); 
    this.load();
  }
 
  alterarTexto(){
    this.title = 'Teste';
  }

  remover(todo:Todos){
  const index = this.todos.indexOf(todo);
/**se nao tem indice ele recebe -1 se nao for -1 pega o indixe e remove */
  if(index !== -1){
    this.todos.splice(index,1);
  }
 this.save();
  }
  markAsDone(todo:Todos){
  todo.done = true;
  this.save();
  }
  markAsUndone(todo:Todos){
    todo.done=false;
    this.save();
  }

  add(){
    const tarefa = this.form.controls['tarefa'].value;
    const id = this. todos.length+1;
    this.todos.push(new Todos(tarefa,false,id))
    this.save();//salva localmente 
    this.clear();
  }
  clear(){
    this.form.reset();
  }

  /*salvando tudo no navegador via localStorage key e Value salvando um Json*/
  
  save(){
    const data = JSON.stringify(this.todos);
   localStorage.setItem('todos',data);
  }

  /*buscando os itens do local  converte para dados*/
  load(){
    const data = localStorage.getItem('todos');
    if(data){
    this.todos = JSON.parse(data);
    }else{
      this.todos = [];
    }
  }
}
