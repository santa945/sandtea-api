import { Controller, Get, Post, Put, Delete, Query, Param, Body, Bind, Req, HttpCode, Header, Redirect, Headers, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user.entity';
// 自定义装饰器
import { Cookies, Auth } from 'src/decorator/auth.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('getUserInfo')
  getUserInfo(@Cookies('xtf-uid') cookies: string): Promise<UserEntity[]> {
    console.log('cookies', cookies);
    return this.userService.send('SELECT * FROM user');
  }

  @Get('list')
  @Auth('operator')
  getList() {
    return { name: 'xxx' }
  }

  @Get('docs')
  @Redirect()
  getDocs(@Query('keyword') keyword) {
    return {
      redirect: true, //本来是不用加这个字段的，但是项目加上了全局拦截器TransformInterceptor，会将这个对象格式化
      url: `https://www.baidu.com/s?wd=${keyword}`,
      statusCode: 302
    }
  }

  /**
   * 使用@Bind()装饰器来接收参数
   * @body 请求体
   * @query 请求地址栏问号后加的key=value
   * @param 动态路由的数据
   * */
  @Post('add/:id')
  @HttpCode(200) // post请求默认返回201而不是200，可以通过@HttpCode装饰器来修改httpcode
  @Header('kk', 'dd') //设置响应头，Header和Headers是不一样的，不要混淆
  @Bind(Body(), Query(), Param(), Headers())
  create(body: object, query: any, params: any, headers: any) {
    console.log('body', body);
    console.log('query', query);
    console.log('params', params);
    console.log('headers', headers);
    let keys = ''
    let values = ''
    for (let key in body) {
      keys += key + ','
      values += '"' + body[key] + '",'
    }

    //删除多余逗号
    keys = keys.slice(0, -1)
    values = values.slice(0, -1)
    const sql = `INSERT INTO USER(${keys}) VALUES(${values})`
    return this.userService.send(sql);

  }

  /**
   * 不加上ParseIntPipe意味着虽然这里id定义为number，但只是ts校验，静态的，但是无法控制访问者的行为，这里的id将会是名字为id的params对象{id:xxx}
   * 加上了ParseIntPipe意味着这里的id一定要是number，否则请求失败
  */
  @Put('update/:id')
  @Bind(Param('id', ParseIntPipe), Body())
  updateUserInfo(id: number, body: object) {
    let str = ''
    for (let key in body) {
      str += key + '="' + body[key] + '",'
    }
    str = str.slice(0, -1);
    let sql = `UPDATE USER SET ${str} WHERE user_id="${id}"`
    return this.userService.send(sql);
  }

  @Delete('del/:id')
  @Bind(Param('id', ParseIntPipe))
  deleteUserById(id: number) {
    let sql = `DELETE FROM USER WHERE user_id="${id}"`
    return this.userService.send(sql);
  }
}