import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propietario,
  Gatos,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioGatosController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/gatos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Gatos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gatos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Gatos>,
  ): Promise<Gatos[]> {
    return this.propietarioRepository.relacionpropiegato(id).find(filter);
  }

  @post('/propietarios/{id}/gatos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gatos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {
            title: 'NewGatosInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) gatos: Omit<Gatos, 'id'>,
  ): Promise<Gatos> {
    return this.propietarioRepository.relacionpropiegato(id).create(gatos);
  }

  @patch('/propietarios/{id}/gatos', {
    responses: {
      '200': {
        description: 'Propietario.Gatos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {partial: true}),
        },
      },
    })
    gatos: Partial<Gatos>,
    @param.query.object('where', getWhereSchemaFor(Gatos)) where?: Where<Gatos>,
  ): Promise<Count> {
    return this.propietarioRepository.relacionpropiegato(id).patch(gatos, where);
  }

  @del('/propietarios/{id}/gatos', {
    responses: {
      '200': {
        description: 'Propietario.Gatos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gatos)) where?: Where<Gatos>,
  ): Promise<Count> {
    return this.propietarioRepository.relacionpropiegato(id).delete(where);
  }
}
