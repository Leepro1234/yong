import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Sample } from './sample.entity'
@Injectable()
export class SampleService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample> // Repository 주입
  ) {}
  async getAll(): Promise<any> {
    return this.dataSource.transaction(async manager => {
      const samples = await manager
        .getRepository(Sample)
        .createQueryBuilder('sample')
        .setLock('pessimistic_write') //for Update
        .getMany()

      if (!samples.length) {
        throw new Error('No Data')
      }

      return samples
    })
  }

  async incrementMyIdForUpdate(sampleId: number): Promise<Sample> {
    return this.dataSource.transaction(async manager => {
      // `FOR UPDATE`로 해당 행 잠금
      const sample = await manager
        .getRepository(Sample)
        .createQueryBuilder('sample')
        .setLock('pessimistic_write') // 행 잠금
        .where('sample.id = :id', { id: sampleId })
        .getOne()

      if (!sample) {
        throw new Error('Sample not found')
      }

      // 현재 `myId` 값을 1 증가
      sample.myid += 1

      // 업데이트된 값을 저장
      return manager.save(sample)
    })
  }

  // myId 값을 1 증가시키는 메서드
  async incrementMyId(sampleId: number): Promise<Sample> {
    // 데이터 조회
    const sample = await this.sampleRepository.findOneBy({ id: sampleId })

    if (!sample) {
      throw new Error('Sample not found')
    }

    // myId 값을 증가
    sample.myid += 1

    // 업데이트된 데이터 저장
    return this.sampleRepository.save(sample)
  }
}
