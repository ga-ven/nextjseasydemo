import { NextResponse } from "next/server";
import { Teacher } from "@/types/teacher";
import { teachers } from "../db";

// 获取所有教师
export async function GET() {
  try {
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: "获取教师列表失败" }, { status: 500 });
  }
}

// 新增教师
export async function POST(request: Request) {
  try {
    const newTeacher: Teacher = await request.json();

    // 简单验证
    if (!newTeacher.name || !newTeacher.subject) {
      return NextResponse.json(
        { error: "姓名和科目不能为空" },
        { status: 400 }
      );
    }

    // 生成ID (简单示例，实际应用中应该使用更可靠的ID生成方式)
    newTeacher.id = Date.now().toString();
    teachers.push(newTeacher);

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "创建教师失败" }, { status: 500 });
  }
}
