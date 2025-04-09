'use client';

import { useState, useEffect } from 'react';
import { Teacher } from '@/types/teacher';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    email: '',
    subject: '',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchTeachers();
        setFormData({ name: '', email: '', subject: '' });
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTeachers();
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">教师管理</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="姓名"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="邮箱"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="科目"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          添加教师
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">姓名</th>
              <th className="px-6 py-3 border-b">邮箱</th>
              <th className="px-6 py-3 border-b">科目</th>
              <th className="px-6 py-3 border-b">操作</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 border-b">{teacher.name}</td>
                <td className="px-6 py-4 border-b">{teacher.email}</td>
                <td className="px-6 py-4 border-b">{teacher.subject}</td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}