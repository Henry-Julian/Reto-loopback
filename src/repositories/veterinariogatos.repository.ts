import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veterinariogatos, VeterinariogatosRelations, Gatos} from '../models';
import {GatosRepository} from './gatos.repository';

export class VeterinariogatosRepository extends DefaultCrudRepository<
  Veterinariogatos,
  typeof Veterinariogatos.prototype.id,
  VeterinariogatosRelations
> {

  public readonly relacionveterigato: HasManyRepositoryFactory<Gatos, typeof Veterinariogatos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('GatosRepository') protected gatosRepositoryGetter: Getter<GatosRepository>,
  ) {
    super(Veterinariogatos, dataSource);
    this.relacionveterigato = this.createHasManyRepositoryFactoryFor('relacionveterigato', gatosRepositoryGetter,);
    this.registerInclusionResolver('relacionveterigato', this.relacionveterigato.inclusionResolver);
  }
}
