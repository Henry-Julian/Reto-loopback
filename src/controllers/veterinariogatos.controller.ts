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
import {Veterinariogatos} from '../models';
import {VeterinariogatosRepository} from '../repositories';

export class VeterinariogatosController {
  constructor(
    @repository(VeterinariogatosRepository)
    public veterinariogatosRepository : VeterinariogatosRepository,
  ) {}

  @post('/veterinariogatos')
  @response(200, {
    description: 'Veterinariogatos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinariogatos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinariogatos, {
            title: 'NewVeterinariogatos',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinariogatos: Omit<Veterinariogatos, 'id'>,
  ): Promise<Veterinariogatos> {
    return this.veterinariogatosRepository.create(veterinariogatos);
  }

  @get('/veterinariogatos/count')
  @response(200, {
    description: 'Veterinariogatos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinariogatos) where?: Where<Veterinariogatos>,
  ): Promise<Count> {
    return this.veterinariogatosRepository.count(where);
  }

  @get('/veterinariogatos')
  @response(200, {
    description: 'Array of Veterinariogatos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinariogatos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinariogatos) filter?: Filter<Veterinariogatos>,
  ): Promise<Veterinariogatos[]> {
    return this.veterinariogatosRepository.find(filter);
  }

  @patch('/veterinariogatos')
  @response(200, {
    description: 'Veterinariogatos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinariogatos, {partial: true}),
        },
      },
    })
    veterinariogatos: Veterinariogatos,
    @param.where(Veterinariogatos) where?: Where<Veterinariogatos>,
  ): Promise<Count> {
    return this.veterinariogatosRepository.updateAll(veterinariogatos, where);
  }

  @get('/veterinariogatos/{id}')
  @response(200, {
    description: 'Veterinariogatos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinariogatos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinariogatos, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinariogatos>
  ): Promise<Veterinariogatos> {
    return this.veterinariogatosRepository.findById(id, filter);
  }

  @patch('/veterinariogatos/{id}')
  @response(204, {
    description: 'Veterinariogatos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinariogatos, {partial: true}),
        },
      },
    })
    veterinariogatos: Veterinariogatos,
  ): Promise<void> {
    await this.veterinariogatosRepository.updateById(id, veterinariogatos);
  }

  @put('/veterinariogatos/{id}')
  @response(204, {
    description: 'Veterinariogatos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinariogatos: Veterinariogatos,
  ): Promise<void> {
    await this.veterinariogatosRepository.replaceById(id, veterinariogatos);
  }

  @del('/veterinariogatos/{id}')
  @response(204, {
    description: 'Veterinariogatos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinariogatosRepository.deleteById(id);
  }
}
