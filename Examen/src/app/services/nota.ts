import { inject, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nota } from '../models/nota.model';

@Service()
export class NotaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/notas';

  private _notas: WritableSignal<Nota[]> = signal([]);
  public notas = this._notas.asReadonly();

  cargarNotas() {
    this.http.get<Nota[]>(this.apiUrl).subscribe({
      next: (data) => this._notas.set(data),
      error: (err) => console.error('Error al obtener notas', err)
    });
  }

  agregarNota(nuevaNota: Nota) {
    this.http.post<Nota>(this.apiUrl, nuevaNota).subscribe({
      next: (notaGuardada) => {
        this._notas.update(notasActuales => [...notasActuales, notaGuardada]);
      },
      error: (err) => console.error('Error al crear nota', err)
    });
  }
}