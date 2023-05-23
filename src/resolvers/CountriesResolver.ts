import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository } from 'typeorm'
import { Countries } from '../entities/Countries'

@Resolver()
export class CountriesResolver {
  //Mise en place des queries et mutations
  
  @Query(() => [Countries])
  async getCountries(): Promise<Countries[]> {
    const countriesRepository = getRepository(Countries)
    return await countriesRepository.find()
  }
  
  @Query(() => Countries, {nullable: true})
  async getCountriesByCode(@Arg('code') code: string): Promise<Countries | null> {
    const countriesRepository = getRepository(Countries)
    const countries = await countriesRepository.findOne({where: {code}})
    return countries || null
  }
  
  @Query(() => [Countries])
  async getCountriesByContinent(@Arg('continent') continent: string): Promise<Countries[]> {
    const countriesRepository = getRepository(Countries)
    return await countriesRepository.find({where: {continent}})
  }
  
  @Mutation(() => Countries)
  async createCountries(
    @Arg('code') code: string,
    @Arg('name') name: string,
    @Arg('emoji') emoji: string,
    @Arg('continent') continent: string,
  ): Promise<Countries> {
    if(!code || !name || !emoji || !continent) {
      throw new Error('Missing required parameters.')
    }
    
    const countriesRepository = getRepository(Countries)
    
    const existingCountries = await countriesRepository.findOne({where: {code}})
    if(existingCountries) {
      throw new Error(`A countries with "${code}" code already exist.`)
    }
    
    const countries = countriesRepository.create({code, name, emoji, continent})
    await countriesRepository.save(countries)
    return countries
  }
}
