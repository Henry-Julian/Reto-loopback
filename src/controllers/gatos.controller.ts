import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Gatos} from '../models';
import {GatosRepository} from '../repositories';

export class GatosController {
  constructor(
    @repository(GatosRepository)
    public gatosRepository : GatosRepository,
  ) {}

  @post('/gatos')
  @response(200, {
    description: 'Gatos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gatos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {
            title: 'NewGatos',
            exclude: ['id'],
          }),
        },
      },
    })
    gatos: Omit<Gatos, 'id'>,
  ): Promise<Gatos> {
    return this.gatosRepository.create(gatos);
  }

  @get('/gatos/count')
  @response(200, {
    description: 'Gatos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gatos) where?: Where<Gatos>,
  ): Promise<Count> {
    return this.gatosRepository.count(where);
  }

  @get('/gatos')
  @response(200, {
    description: 'Array of Gatos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gatos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gatos) filter?: Filter<Gatos>,
  ): Promise<Gatos[]> {
    return this.gatosRepository.find(filter);
  }

  @patch('/gatos')
  @response(200, {
    description: 'Gatos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {partial: true}),
        },
      },
    })
    gatos: Gatos,
    @param.where(Gatos) where?: Where<Gatos>,
  ): Promise<Count> {
    return this.gatosRepository.updateAll(gatos, where);
  }

  @get('/gatos/{id}')
  @response(200, {
    description: 'Gatos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gatos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gatos, {exclude: 'where'}) filter?: FilterExcludingWhere<Gatos>
  ): Promise<Gatos> {
    return this.gatosRepository.findById(id, filter);
  }

  @patch('/gatos/{id}')
  @response(204, {
    description: 'Gatos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gatos, {partial: true}),
        },
      },
    })
    gatos: Gatos,
  ): Promise<void> {
    await this.gatosRepository.updateById(id, gatos);
  }

  @put('/gatos/{id}')
  @response(204, {
    description: 'Gatos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gatos: Gatos,
  ): Promise<void> {
    await this.gatosRepository.replaceById(id, gatos);
  }

  @del('/gatos/{id}')
  @response(204, {
    description: 'Gatos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gatosRepository.deleteById(id);
  }
}
