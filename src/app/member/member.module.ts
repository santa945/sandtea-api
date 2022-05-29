import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../../entities/member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [MemberController],
    providers: [MemberService],
})

export class MemberModule { }
