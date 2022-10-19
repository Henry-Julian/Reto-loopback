import {Entity, model, property, hasMany} from '@loopback/repository';
import {Gatos} from './gatos.model';

@model()
export class Veterinariogatos extends Entity {
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
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @hasMany(() => Gatos)
  relacionveterigato: Gatos[];

  constructor(data?: Partial<Veterinariogatos>) {
    super(data);
  }
}

export interface VeterinariogatosRelations {
  // describe navigational properties here
}

export type VeterinariogatosWithRelations = Veterinariogatos & VeterinariogatosRelations;
