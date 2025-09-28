/* eslint-disable react/prop-types */
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        onClick={() => onToggle(task.id)}
        className={`task-text ${task.completed ? "completed" : ""}`}
      >
        {task.completed ? (
          <>
            ✅ <s><i>{task.text}</i></s>{" "}
            <span className="status">(Completed)</span>
          </>
        ) : (
          <>⬜ {task.text}</>
        )}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
