import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserInfo(): object {
    return {
      name: '亚瑟',
      nickName: '万能王',
      kda: 97
    };
  }
}
