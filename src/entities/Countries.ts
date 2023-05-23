import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Countries {
  //Mise en place des propriétés
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  @Field()
  code: string
  
  @Column()
  @Field()
  name: string
  
  @Column()
  @Field()
  emoji: string
  
  @Column()
  @Field()
  continent: string
}
