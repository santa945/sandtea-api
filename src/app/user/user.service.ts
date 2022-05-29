import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async send(sql: string): Promise<UserEntity[]> {
    return await this.userRepository.query(sql);
  }
  getUserInfo(): object {
    return {
      name: '亚瑟',
      nickName: '万能王',
      kda: 97
    };
  }
}
