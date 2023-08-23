import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BadgesService {
  constructor(private prisma: PrismaService) {}

  async assignBadgeToUser(userId: number, badgeId: number) {
    const user = await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        user_badges: {
          connect: { badge_id: badgeId },
        },
      },
    });

    return user;
  }
  async checkAndAssignBadge(userId: number, postPlaceId: number) {
    // 1. 유저 정보 가져오기
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    // 2. 포스트의 장소 정보 가져오기
    const place = await this.prisma.place.findUnique({
      where: { place_id: postPlaceId },
      include: { place_category_map: { include: { category: true } } },
    });

    if (!user || !place) {
      throw new Error("User or place not found");
    }
    console.log(place.place_category_map);
    // // 3. 장소의 카테고리와 관련된 뱃지 정보 가져오기
    // const categoryBadges = await this.prisma.badge.findMany({
    //   where: {
    //     badge_category_id: place.place_category_map.category.categoryId,
    //   },
    // });

    // // 4. 유저가 해당 뱃지를 이미 보유하고 있는지 확인
    // for (const badge of categoryBadges) {
    //   const existingBadge = await this.prisma.badge.findFirst({
    //     where: {
    //       badge_id: badge.badge_id,
    //       badge_user_id: userId,
    //     },
    //   });

    //   // 5. 조건을 충족할 경우 뱃지 부여
    //   if (!existingBadge && user.user_point >= badge.badge_criteria) {
    //     await this.prisma.badge.create({
    //       data: {
    //         badge_name: badge.badge_name,
    //         badge_criteria: badge.badge_criteria,
    //         badge_category: {
    //           connect: { category_id: badge.badge_category_id },
    //         },
    //         badge_user: { connect: { user_id: userId } },
    //       },
    //     });
    //   }
    // }
  }
}
