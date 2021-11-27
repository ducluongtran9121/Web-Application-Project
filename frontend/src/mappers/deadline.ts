import { fromLocationPayloads } from './location'
import type { Deadline, DeadlinePayload } from '../models/deadline'

function fromDeadlinePayload({ id, name, description, begin, end, lesson, file_deadline_lesson }: DeadlinePayload): Deadline {
  return {
    id,
    name,
    description,
    begin: new Date(begin),
    end: new Date(end),
    lesson,
    locationItems: fromLocationPayloads(file_deadline_lesson)
  }
}

function fromDeadlinesPayload(deadlineResponses: DeadlinePayload[]): Deadline[] {
  return deadlineResponses.map((deadlineResponse) => fromDeadlinePayload(deadlineResponse))
}

export { fromDeadlinePayload, fromDeadlinesPayload }
