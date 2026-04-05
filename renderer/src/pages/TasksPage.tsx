import AddTaskForm from "../components/tasks/AddTaskForm";
import TaskList from "../components/tasks/TaskList";
import SectionHeader from "../components/ui/SectionHeader";

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Tasks"
        title="Task Manager"
        subtitle="Organize your study work, priorities, and deadlines in one place."
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}