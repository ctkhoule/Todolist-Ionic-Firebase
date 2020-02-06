import { Component } from '@angular/core';
//importer le module AngularFireDatabase
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Declaration de la variable currentDate
  currentDate: string;
  const
  date = new Date();

  myTask = '';
  //a variable booléenne addTask qui servira de condition d’affichage dans le HTML
  addTask: boolean;
//stocker toutes les informations de nos tâches:
  tasks = [];

  constructor(public afDB: AngularFireDatabase) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('fr-FR', options);
    this.getTasks();

  }

  /**
   * Cette fonction ajoute un nouvel item à notre table Tasks,
   * en lui donnant les informations suivantes: le texte, la date, et l’état de la tâche
   */
  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

  /**
   * la fonction showForm() dont le but sera de changer la valeur de cette variable booléenne.
   */
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  /**
   * pour parcourir notre base firebase Tasks/ et récupérer mes informations de nos tâches:
   */
  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }

  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

}
