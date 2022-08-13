import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '../../entities/member.entity';
@Injectable()
export class MemberService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) { }

  // 获取所有用户数据列表(memberRepository.query()方法属于typeoram)
  async send(sql: string): Promise<MemberEntity[]> {
    const res = await this.memberRepository.query(sql);
    return res[0];
  }

}
