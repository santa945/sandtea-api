import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getXtfUid(): object {
    return {
      xtfUid: 'sandtea00001'
    }

  }
}
