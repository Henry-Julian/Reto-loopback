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
  Veterinariogatos,
  Gatos,
} from '../models';
import {VeterinariogatosRepository} from '../repositories';

export class VeterinariogatosGatosController {
  constructor(
    @repository(VeterinariogatosRepository) protected veterinariogatosRepository: VeterinariogatosRepository,
  ) { }

  @get('/veterinariogatos/{id}/gatos', {
    responses: {
      '200': {
        description: 'Array of Veterinariogatos has many Gatos',
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
    return this.veterinariogatosRepository.relacionveterigato(id).find(filter);
  }

  @post('/veterinariogatos/{id}/gatos', {
    responses: {
      '200': {
        description: 'Veterinariogatos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gatos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinariogatos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {
            title: 'NewGatosInVeterinariogatos',
            exclude: ['id'],
            optional: ['veterinariogatosId']
          }),
        },
      },
    }) gatos: Omit<Gatos, 'id'>,
  ): Promise<Gatos> {
    return this.veterinariogatosRepository.relacionveterigato(id).create(gatos);
  }

  @patch('/veterinariogatos/{id}/gatos', {
    responses: {
      '200': {
        description: 'Veterinariogatos.Gatos PATCH success count',
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
    return this.veterinariogatosRepository.relacionveterigato(id).patch(gatos, where);
  }

  @del('/veterinariogatos/{id}/gatos', {
    responses: {
      '200': {
        description: 'Veterinariogatos.Gatos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gatos)) where?: Where<Gatos>,
  ): Promise<Count> {
    return this.veterinariogatosRepository.relacionveterigato(id).delete(where);
  }
}
