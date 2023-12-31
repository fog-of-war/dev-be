import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { GetCurrentUserInfo } from "../auth/decorator";
import { ATGuard } from "src/auth/guard";
import { LoggerService } from "src/logger/logger.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CommentResponse, CommentResponseWithCommentAuthor } from "./responses";
import { UserSubCheckInterceptor } from "src/common/interceptor";

@UseInterceptors(UserSubCheckInterceptor)
@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private logger: LoggerService
  ) {}
  /** -------------------- */

  /** 댓글 생성하기 */
  @Post()
  @UseGuards(ATGuard)
  @ApiOperation({
    summary: "댓글 생성하기",
  })
  @ApiBearerAuth("access_token")
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "",
    type :CommentResponseWithCommentAuthor
  })
  async create(
    @GetCurrentUserInfo() userId: number,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const result = await this.commentsService.create(
      userId["sub"],
      createCommentDto
    );
    this.logger.log("댓글 작성한 사람", userId["user_email"]);
    return result;
  }
  /** -------------------- */

  /** 댓글 가져오기 (comment_id 사용)*/
  @Get(":id")
  @ApiOperation({
    summary: "comment_id로 댓글 가져오기",
  })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "",
    type: CommentResponse,
  })
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }
  /** -------------------- */

  /** 댓글 수정하기 */
  @Patch(":id")
  @UseGuards(ATGuard)
  @ApiOperation({
    summary: "comment_id로 댓글 수정하기",
  })
  @ApiBearerAuth("access_token")
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type :CommentResponseWithCommentAuthor
  })
  update(
    @GetCurrentUserInfo() userId: number,
    @Param("id") commentId: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const result = this.commentsService.update(
      userId["sub"],
      commentId,
      updateCommentDto
    );
    this.logger.log("댓글 수정한 사람", userId["user_email"]);
    return result;
  }
  /** -------------------- */

  /** 댓글 삭제하기 */
  @Delete(":id")
  @UseGuards(ATGuard)
  @ApiOperation({
    summary: "comment_id로 댓글 삭제하기",
  })
  @ApiBearerAuth("access_token")
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  remove(@GetCurrentUserInfo() userId: number, @Param("id") commentId: number) {
    const result = this.commentsService.remove(commentId);
    this.logger.log("댓글 삭제하는 사람", userId["user_email"]);
    return result;
  }
}
