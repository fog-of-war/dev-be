import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log(result);
    return result;
  }
}
