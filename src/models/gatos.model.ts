import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Veterinariogatos} from './veterinariogatos.model';

@model()
export class Gatos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @belongsTo(() => Propietario, {name: 'relaciongatopropietario'})
  propietarioId: string;

  @belongsTo(() => Veterinariogatos, {name: 'relaciongatoveterinario'})
  veterinariogatosId: string;

  constructor(data?: Partial<Gatos>) {
    super(data);
  }
}

export interface GatosRelations {
  // describe navigational properties here
}

export type GatosWithRelations = Gatos & GatosRelations;
