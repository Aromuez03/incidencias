import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/services/firestore.service';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.css']
})
export class IntroduccionComponent implements OnInit {
  formNewIncidencia = this.fb.group({
    lugarIncidencia: ['', Validators.required],
    descIncidencia: ['', Validators.required],
    arregloIncidencia: ['', Validators.required],
    estadoIncidencia: ['sin leer'],
    revision: ['no revisado']
  })
  indidencia: any;
  constructor(
    private fb: FormBuilder,
    private fire: FirestoreService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.formNewIncidencia.valid){
      this.fire.create("incidencias",this.formNewIncidencia.value);
      alert("Incidencia guardada");
      setTimeout(() => {
        this.formNewIncidencia.reset();
      }, 5000);
    } else {
      alert("Todos los campos son obligatorios");
    }
  }


}
