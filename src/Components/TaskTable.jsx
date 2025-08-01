import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const tasksRef = ref(db, 'tasks');
      
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const userTasks = Object.entries(data)
            .filter(([id, task]) => task.assignedTo === user.uid)
            .map(([id, task]) => ({ id, ...task }));
          setTasks(userTasks);
        } else {
          setTasks([]);
        }
      });
    }
  }, [user]);

  const markAsCompleted = (taskId) => {
    const db = getDatabase();
    const taskRef = ref(db, `tasks/${taskId}`);
    update(taskRef, { status: 'Submitted' });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Deadline</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.deadline}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">
                  {task.status !== 'Submitted' ? (
                    <button
                      onClick={() => markAsCompleted(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Mark as Complete
                    </button>
                  ) : (
                    <span className="text-green-600 font-medium">Submitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskTable;
