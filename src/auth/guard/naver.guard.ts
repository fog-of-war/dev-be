import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class NaverAuthGuard extends AuthGuard("naver") {
  canActivate(context: ExecutionContext) {
    try {
      return super.canActivate(context);
    } catch (error) {
      console.log(
        "🔥 ~ file: naver.guard.ts:14 ~ NaverAuthGuard ~ canActivate ~ error:",
        error
      );
      return false; // 예외 발생 시 인증 거부
    }
  }
}
