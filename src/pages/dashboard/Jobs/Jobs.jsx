import {JobsForm} from "./JobsForm";
import {JobsTable} from "./JobsTable";
import { useJobs } from "./UseJobs";

export function Jobs() {
  const { jobs, form, editingId, handleChange, submitJob, editJob, removeJob } =
    useJobs();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">💼 Vacancy Management</h2>

      <JobsForm
        form={form}
        handleChange={handleChange}
        submitJob={submitJob}
        editingId={editingId}
      />

      <JobsTable jobs={jobs} editJob={editJob} removeJob={removeJob} />
    </div>
  );
}
