import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Gatos,
  Veterinariogatos,
} from '../models';
import {GatosRepository} from '../repositories';

export class GatosVeterinariogatosController {
  constructor(
    @repository(GatosRepository)
    public gatosRepository: GatosRepository,
  ) { }

  @get('/gatos/{id}/veterinariogatos', {
    responses: {
      '200': {
        description: 'Veterinariogatos belonging to Gatos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinariogatos)},
          },
        },
      },
    },
  })
  async getVeterinariogatos(
    @param.path.string('id') id: typeof Gatos.prototype.id,
  ): Promise<Veterinariogatos> {
    return this.gatosRepository.relaciongatoveterinario(id);
  }
}
