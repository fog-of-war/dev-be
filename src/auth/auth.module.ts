import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { GoogleStrategy, KakaoStrategy, NaverStrategy } from "./strategy";
import { UsersModule } from "src/users/users.module";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { RanksModule } from "src/ranks/ranks.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    UsersModule,
    HttpModule,
    PassportModule,
    RanksModule
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
