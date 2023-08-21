import { Module, ValidationPipe } from "@nestjs/common";
import { PlacesModule } from "./places/places.module";
import { UsersModule } from "./users/users.module";
import { BadgesModule } from "./badges/badges.module";
import { PostsModule } from "./posts/posts.module";
import { SearchModule } from "./search/search.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { CategoriesModule } from "./categories/categories.module";
import { ValidationPipe422 } from "./validation_custom";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PlacesModule,
    UsersModule,
    BadgesModule,
    PostsModule,
    SearchModule,
    AuthModule,
    PrismaModule,
    JwtModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ValidationPipe,
      useClass: ValidationPipe422,
    },
  ],
})
export class AppModule {}
