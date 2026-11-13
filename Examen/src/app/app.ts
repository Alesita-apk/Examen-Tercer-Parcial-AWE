import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaService } from './services/nota';
import { Nota } from '../app/models/nota.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  notaService = inject(NotaService);

  formNota = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    }),
    contenido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    })
  });

  get tituloControl() {
    return this.formNota.get('titulo');
  }

  get contenidoControl() {
    return this.formNota.get('contenido');
  }

  ngOnInit() {
    this.notaService.cargarNotas();
  }

  guardar() {
    this.formNota.markAllAsTouched();

    if (this.formNota.invalid) {
      return;
    }

    const nuevaNota: Nota = {
      titulo: this.formNota.value.titulo?.trim() ?? '',
      contenido: this.formNota.value.contenido?.trim() ?? ''
    };

    this.notaService.agregarNota(nuevaNota);
    this.formNota.reset();
    this.formNota.markAsUntouched();
  }
}