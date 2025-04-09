import { NextResponse } from "next/server";
import { Teacher } from "@/types/teacher";
import { teachers } from "../../../db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 获取参数 (需要await，确保解构在async函数内)
    const { id } = await params;

    // 参数校验
    if (!id) {
      return NextResponse.json({ error: "无效的请求参数" }, { status: 400 });
    }

    // 模拟数据库连接延迟
    await new Promise((resolve) => setTimeout(resolve, 100));

    const index = teachers.findIndex((teacher) => teacher.id === id);

    if (index === -1) {
      return NextResponse.json(
        {
          error: "教师不存在",
          requestedId: id,
          existingIds: teachers.map((t) => t.id),
        },
        { status: 404 }
      );
    }

    const deletedTeacher = teachers.splice(index, 1);
    return NextResponse.json({
      message: "删除成功",
      deleted: deletedTeacher,
    });
  } catch (error) {
    console.error("删除操作错误:", error);
    return NextResponse.json(
      {
        error: "服务器内部错误",
        details: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 }
    );
  }
}
