import { fromLocationPayloads } from './location'
import { sortLocationItems } from '../helpers'
import type { Deadline, DeadlinePayload, DeadlineStatus, DeadlineStatusPayload, DeadlineSubmitPayload } from '../models/deadline'
import { fromUserPayload } from '.'

function fromDeadlinePayload({ id, name, description, begin, end, lesson, file_deadline_lesson }: DeadlinePayload, courseId?: number): Deadline {
  return {
    id,
    name,
    description,
    begin: new Date(begin),
    end: new Date(end),
    lessonId: lesson,
    locationItems: sortLocationItems(fromLocationPayloads(file_deadline_lesson)),
    courseId
  }
}

function fromDeadlinesPayload(deadlinesResponse: DeadlinePayload[], courseId?: number): Deadline[] {
  return deadlinesResponse.map((deadlineResponse) => fromDeadlinePayload(deadlineResponse, courseId))
}

function fromDeadlineSubmitPayload({ id, is_finished, finish_at, file_deadlineSubmit_lesson, deadline }: DeadlineSubmitPayload): Deadline {
  return {
    id: deadline.id,
    name: deadline.name,
    description: deadline.description,
    begin: new Date(deadline.begin),
    end: new Date(deadline.end),
    lessonId: deadline.lesson,
    locationItems: sortLocationItems(fromLocationPayloads(deadline.file_deadline_lesson)),
    isFinished: is_finished,
    submitId: id,
    finishAt: finish_at ? new Date(finish_at) : undefined,
    submitItems: sortLocationItems(fromLocationPayloads(file_deadlineSubmit_lesson))
  }
}

function fromDeadlineSubmitsPayload(deadlineSubmitsResponse: DeadlineSubmitPayload[]): Deadline[] {
  return deadlineSubmitsResponse.map((deadlineSubmitResponse) => fromDeadlineSubmitPayload(deadlineSubmitResponse))
}

function fromDeadlineStatusPayloadToDeadlineStatus({
  id,
  is_finished,
  finish_at,
  file_deadlineSubmit_lesson,
  member
}: DeadlineStatusPayload): DeadlineStatus {
  return {
    id,
    isFinished: is_finished,
    finishAt: finish_at ? new Date(finish_at) : undefined,
    submitItems: sortLocationItems(fromLocationPayloads(file_deadlineSubmit_lesson)),
    member: fromUserPayload(member)
  }
}

function fromDeadlinesStatusPayloadToDeadlineStatus(deadlinesStatusResponse: DeadlineStatusPayload[]): DeadlineStatus[] {
  return deadlinesStatusResponse.map((deadlineStatusResponse) => fromDeadlineStatusPayloadToDeadlineStatus(deadlineStatusResponse))
}

export {
  fromDeadlinePayload,
  fromDeadlinesPayload,
  fromDeadlineSubmitPayload,
  fromDeadlineSubmitsPayload,
  fromDeadlineStatusPayloadToDeadlineStatus,
  fromDeadlinesStatusPayloadToDeadlineStatus
}
