import { Controller, Get, Post, Put, Delete, Query, Param, Body, Bind, Req, HttpCode, Header, Redirect, Headers, ParseIntPipe } from '@nestjs/common';
import { MemberService } from './member.service'
import { MemberEntity } from '../../entities/member.entity';
// 自定义装饰器
import { Cookies } from 'src/decorator/auth.decorator';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  /**
   * 获取优惠券列表
   * /member/coupon/page
   * SELECT * FROM coupon_list WHERE STATUS="2" AND consumeChannels="1"
   */
  @Post('/member/coupon/page')
  @Bind(Body())
  getCouponList(body: object): Promise<MemberEntity[]> {
    let status = ''
    let consumeChannels = ''
    let sql = 'select * from coupon_list'
    for (let key in body) {
      if (key === 'status') {
        status = body[key]
      } else if (key === 'consumeChannels') {
        consumeChannels = body[key]
      }
    }
    sql += ` where status="${status}"`;
    if (consumeChannels) { sql += ` and consumeChannels="${consumeChannels}"`; }
    // 0-未使用，1-已使用，2-已失效
    return this.memberService.send(sql);
  }

  /**
    * 获取会员信息信息
    * /member/getMemberInfo 
    */
  @Get('/member/getMemberInfo')
  @Bind(Body(), Query(), Param())
  getMemberInfo(body: any, query: any, params: any, @Cookies('xtf-uid') cookies: string): Promise<MemberEntity[]> {
    console.log('body', body);
    console.log('query', query);
    console.log('params', params);

    return this.memberService.send(`SELECT * FROM member_list WHERE memberId="${query.memberId}"`);
  }

}