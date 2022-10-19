import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Gatos} from '../models';
import {GatosRepository} from './gatos.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly relacionpropiegato: HasManyRepositoryFactory<Gatos, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('GatosRepository') protected gatosRepositoryGetter: Getter<GatosRepository>,
  ) {
    super(Propietario, dataSource);
    this.relacionpropiegato = this.createHasManyRepositoryFactoryFor('relacionpropiegato', gatosRepositoryGetter,);
    this.registerInclusionResolver('relacionpropiegato', this.relacionpropiegato.inclusionResolver);
  }
}
