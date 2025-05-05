export interface Task {
  id?: number
  title: string
  description?: string
  completed: boolean
  _offline?: boolean // Pour marquer les tâches modifiées hors ligne
}
