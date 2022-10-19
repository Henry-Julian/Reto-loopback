import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Gatos, GatosRelations, Propietario, Veterinariogatos} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {VeterinariogatosRepository} from './veterinariogatos.repository';

export class GatosRepository extends DefaultCrudRepository<
  Gatos,
  typeof Gatos.prototype.id,
  GatosRelations
> {

  public readonly relaciongatopropietario: BelongsToAccessor<Propietario, typeof Gatos.prototype.id>;

  public readonly relaciongatoveterinario: BelongsToAccessor<Veterinariogatos, typeof Gatos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('VeterinariogatosRepository') protected veterinariogatosRepositoryGetter: Getter<VeterinariogatosRepository>,
  ) {
    super(Gatos, dataSource);
    this.relaciongatoveterinario = this.createBelongsToAccessorFor('relaciongatoveterinario', veterinariogatosRepositoryGetter,);
    this.registerInclusionResolver('relaciongatoveterinario', this.relaciongatoveterinario.inclusionResolver);
    this.relaciongatopropietario = this.createBelongsToAccessorFor('relaciongatopropietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('relaciongatopropietario', this.relaciongatopropietario.inclusionResolver);
  }
}
