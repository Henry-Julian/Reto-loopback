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
  Propietario,
} from '../models';
import {GatosRepository} from '../repositories';

export class GatosPropietarioController {
  constructor(
    @repository(GatosRepository)
    public gatosRepository: GatosRepository,
  ) { }

  @get('/gatos/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Gatos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Gatos.prototype.id,
  ): Promise<Propietario> {
    return this.gatosRepository.relaciongatopropietario(id);
  }
}
